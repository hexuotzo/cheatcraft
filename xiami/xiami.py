# -*- coding:utf-8 -*-
import mechanize
LOGIN_URL = "http://www.xiami.com/web/login"

def main():    
    br = mechanize.Browser()
    br.set_handle_robots(False)
    br.addheaders = [('User-agent', 'Firefox')]
    br.open(LOGIN_URL)
    br.select_form(nr=0)
    br['email'] = ''
    br['password'] = ''
    br.submit()
    check_in = br.follow_link(text_regex = '签到')
    print check_in.read()

if __name__ == '__main__':
    main()