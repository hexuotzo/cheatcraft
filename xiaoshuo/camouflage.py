# -*- coding:utf-8 -*-
import random
import sys

class Camouflage(object):
    def __init__(self,fname,codefile="TestBT.py"):
        self.filename = fname
        self.codefile = codefile
    def go(self):
        p1,p2 = 0,0
        finame = open("cheatcraft.py","w")
        print >> finame,"# -*- coding:utf-8 -*-"
        print >> finame,"import sys"
        print >> finame,"import os"
        print >> finame,"import datetime"
        print >> finame,"from deyunshe import Guodegang"
        code = open(self.codefile).readlines()
        f = open(self.filename).readlines()
        f = [x.strip() for x in f]
        l = len(f)
        while p1 < l:
            if random.randint(1,10000)>3500:
                finame.write(code[p2])
                p2 = p2 + 1
            else:
                finame.write("        #%s\n"%f[p1])
                p1 = p1 + 1
            if p2 >= len(code):p2=0
        finame.close()

def main():
    f = sys.argv[1]
    u = Camouflage(f)
    u.go()
    
if __name__ == '__main__':
    main()
            
            
