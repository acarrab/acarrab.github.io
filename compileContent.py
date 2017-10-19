import pexpect 
import re 

fout = open("./src/MarkdownPages.tsx", "w")

allPages = "["
def wr(s):
    global fout
    fout.write(s)

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
        self.text = open(fileName, "r").read().replace("\n", "\\n").replace("\"", "\\\"")
        self.name = re.search(r"([^\/]*)\.md", fileName).group(1).replace("_", " ").title()
        self.route = fileName.replace("//", "/").replace("./Content", "").replace(".md", "") if self.name != " Home" else "/"


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

            wln(spaces * 2 + 'name: "{}",'.format(page.name))
            wln(spaces * 2 + 'text: "{}",'.format(page.text))
            wln(spaces * 2 + 'route: "{}"'.format(page.route))
                
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
    text: string
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

export function CompiledRoutes() {
    return (
        <Switch>
""")
def wln(s):
    wr(spaces*3 + s + "\n")

def lettersSanitized(s):
    for i in range(len(s)):
        if s[i] == "'": yield "\\"
        yield s[i]
    

i = 0;
allPages = d.linearizePages();
wln("<Route exact path='/' component={() => (<ReactMarkdown source=\"" + "".join([x for x in lettersSanitized(allPages[0].text)]) + "\" />)} />")

for page in allPages[1:]:
    wln("<Route path='"+page.route+"' component={() => (<ReactMarkdown source=\""+ "".join([x for x in lettersSanitized(page.text)]) + "\" />)} />")
    i += 1

    
wr(spaces*2 + "</Switch>\n")
wr(spaces + ");\n")
wr("}")



fout.close()
