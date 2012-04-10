#!/usr/bin/env python
from lxml.html import parse
from subprocess import Popen, PIPE
import sys, os, shutil
import time

from down import main


#MAIN_URL = 'http://www.imanhua.com'
#TEMP_JS = 'temp.js'

def get_comic_list(url):
    e = parse(url)
    r = e.getroot()
    page = r.cssselect("div.b ul li a")
    return page

def comic_capture(comic, start, end):
    return comic[start:end]

def get_comic(url, fname, target):
    main(url,fname)
    try:
        shutil.move('%s.zip' % fname, target)
    except:
        print "%s has been download" % fname
 
def fetch_comic(url, target, start, end):
    comic_list = get_comic_list(url)
    comic_list = comic_capture(comic_list, start, end)
    for comic in comic_list:
        furl =  comic.get('href','')
        fname = comic.text
        get_comic(furl, fname, target)
        time.sleep(5)

if __name__ == '__main__':
    #ex1(100-150): ./down_comic_batch.py http://www.imanhua.com/comic/55/ onepiece 100 150
    #ex2(100-now): ./down_comic_batch.py http://www.imanhua.com/comic/55/ onepiece 100
    #ex3(all): ./down_comic_batch.py http://www.imanhua.com/comic/55/ onepiece

    url, target = sys.argv[1], sys.argv[2]
    #get number of capture range
    #python's list start by 0 ,so need "start = start -1"
    start = int(sys.argv[3])-1 if len(sys.argv)>=4 and sys.argv[3].isdigit() else None     
    end = int(sys.argv[4]) if len(sys.argv)==5 and sys.argv[4].isdigit() else None

    if not os.path.exists(target):
        os.mkdir(target)
    else:
        pass
    fetch_comic(url, target, start, end)
