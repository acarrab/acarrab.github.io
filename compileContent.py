import pexpect 
import re 
import markdown2

fout = open("./src/MarkdownPages.tsx", "w")

allPages = "["
def wr(s):
    global fout
    fout.write(s)

def compileToHtml(fileName, compileLocation):
    open(compileLocation,'w').write(pexpect.run("pandoc {} -s -f markdown -t html5".format(fileName)).decode())

def getDirectories(directory = "./Content"):
    return pexpect.run("find {} -mindepth 1 -maxdepth 1 -type d".format(directory)).decode().split()

def getPages(directory = "./Content"):
    files = pexpect.run("ls {}".format(directory)).decode().split()
    pages = []
    for file in files:
        if re.match(r".*\.md", file):
            pages.append("{}/{}".format(directory,file))
    return pages

class Page:
    def __init__(self, fileName = "./Content/home.md"):
        # create the name of the web page in the navigation menu
        self.name = re.search(r"([^\/]*)\.md", fileName).group(1).replace("_", " ").title().strip()
        # create the route
        self.route = fileName.replace("//", "/").replace("./Content", "").replace(".md", "") if self.name != "Home" else "/"
        self.route = re.sub(r"/_*", "/", self.route).replace("_|_", "_")
        
        ## create the location
        self.compiledLocation = "./CompiledContent" + re.sub(r"\/.*\/", "/", self.route) + "_.html"
        compileToHtml(fileName, self.compiledLocation)
        # make relative for markdown pages file
        self.compiledLocation = "." + self.compiledLocation
       


spaces = "    "
class Directory:
    def __init__(self, directoryName = "./Content"):
        self.children = [ Directory(d) for d in getDirectories(directoryName) ]
        self.pages = [ Page(p) for p in getPages(directoryName) ]
        self.name = re.search(r"[^\/]*$", directoryName).group(0).replace("_", " ").title()
    
    def printAll(self, sp="    "):
        def wln(s):
            wr(sp+s+'\n')
            
        wln("title: '{}',".format(self.name))
        wln("pages: [")
        pageCount = len(self.pages)
        i = 0
        for page in self.pages:
            wln(spaces + "{")

            wln(spaces * 2 + "name: '{}',".format(page.name))
            wln(spaces * 2 + "source: '{}',".format(page.compiledLocation))
            wln(spaces * 2 + "route: '{}'".format(page.route))
                
            wr(sp + spaces + "}")
            i += 1
            if pageCount == i: 
                wr("\n")
            else:
                wr(",\n")
        wln("],")
        wln("children: [")
        directoryCount = len(self.children)
        i = 0
        for directory in self.children:
            wln(spaces + "{")
            
            directory.printAll(sp + spaces * 2)
            
            wr(sp + spaces + "}")
            i += 1
            if directoryCount == i:
                wr("\n")
            else:
                wr(",\n")
        

        wln("]")

    def linearizePages(self):
        pages = []
        for page in self.pages:
            pages.append(page)
        
        for directory in self.children:
            for page in directory.linearizePages():
                pages.append(page)
                
        return pages
        

wr("""/* Auto generated tsx */

import React from "react";
import ReactMarkdown from "react-markdown";
import { Route, Switch } from "react-router-dom";

export class Page {
    source: string
    name: string
    route: string 
}
export class Directory {
    title: string
    pages: Array<Page>
    children: Array<Directory>
}

export var Content: Directory = {
""")

d = Directory()
d.printAll()





wr("""}

function htmlOf(text) {
    return (
        <div dangerouslySetInnerHTML={{ __html: text}}></div>
    )
}

var pageData = {
""")

allPages = d.linearizePages();

pageCount = len(allPages)
for (i, page) in enumerate(allPages):
    wr("   '{}': require('../node_modules/raw-loader/index.js!{}'){}".format(page.name, page.compiledLocation, "\n" if i == pageCount - 1 else ",\n"))  


wr("""}
export function CompiledRoutes() {
    return (
        <Switch>
""")
def wln(s):
    wr(spaces*3 + s + "\n")



wln("<Route exact path='/' component={() => (htmlOf(pageData['" + allPages[0].name + "']))} />")

for page in allPages[1:]:
    wln("<Route path='"+page.route+"' component={() => (htmlOf(pageData['" + page.name + "']))} />")

    
wr(spaces*2 + "</Switch>\n")
wr(spaces + ");\n")
wr("}")



fout.close()
