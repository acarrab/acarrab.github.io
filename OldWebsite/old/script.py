#website compile

doctype = "html"
lang = "en-US"
author = "Angelo Carrabba"
self.keywords = []
spacing = 0


class webPage():
    def __init__(self):
        self.pageName = ""
        self.title = ""
        self.styleSheets = []
        self.scripts = []
        self.description = ""
        self.menu = ""
    def pl(s,*elements):
        for ele in elements:
            s += str(ele)
        s +=  "\n"
    def toString(self):
        s = ""
        pl(s, "<!DOCTYPE ", doctype, ">")
        pl(s, "html lang=\"", lang, "\">")
        pl(s, "<head>")
        pl(s, "<title>", self.title, "</title>")
        pl(s, "")
        
    def write(self):
        if len(self.pageName) == 0:
            self.printer()





index = webPage()
index.pageName = "index.html"
index.title = "home"

        
