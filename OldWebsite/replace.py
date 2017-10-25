import re, pexpect
def x_with_y(x, y):
    files = re.findall(r"(\w+.html)", pexpect.run("ls"))
    for f in files:
        curr = re.sub(x, y, open(f, "r").read())
        open(f, "w").write(curr)
        
        

