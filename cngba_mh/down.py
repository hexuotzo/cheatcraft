#!/usr/bin/env python
from lxml.html import parse
from subprocess import Popen, PIPE
from json import dumps
import sys, re , os

def get_script(url):
    e = parse(url)
    r = e.getroot()
    content = r.cssselect('script')[0].text
    content = content.split(";")
    return content

def image_list(images):
    server = 'http://file.mh.cngba.com/'
    jpg_list = [i.split()[-1].replace("\'","") for i in images if 'jpg' in i]
    for img in jpg_list:
        print server+''+img
        yield server+''+img

def fetch_img(img):
    i = Popen(['curl','-O',img], stdout=PIPE)
    if i.wait()!=0:
        print "fetch error!"

def zip_file(fname, ext="*.*g"):
    dir_name = r'%s' %fname
    os.makedirs(dir_name)
    for i in os.listdir("."):
        if '.jpg' in i:
            os.rename(i,dir_name+'/'+i)
    # z = Popen('zip %s %s' % (fname, ext), shell=True)
    # if z.wait()!=0:
    #     print "zip error!"
    i = Popen(args='rm %s' % ext, shell=True)
    if i.wait()!=0:
        print "rm error!"

def get_fname(url):
    l = url.split("/")
    return "%s_%s.zip" % (l[-2], re.findall(r"\d+",l[-1])[0])

def main(url,fname):
    i_list = get_script(url)
    images = image_list(i_list)
    [fetch_img(img) for img in images]
    zip_file(fname)


if __name__ == '__main__':
    #ex url: 'http://imanhua.com/comic/1119/list_31671.html'
    url,fname = sys.argv[1],sys.argv[2]
    main(url,fname)