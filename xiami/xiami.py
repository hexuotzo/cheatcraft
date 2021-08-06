# -*- coding:utf-8 -*-
import mechanize
import time

LOGIN_URL = "http://www.xiami.com/web/login"
CHECKIN_URL = "http://www.xiami.com/web"

def main():
    br = mechanize.Browser()
    br.set_handle_robots(False)
    br.addheaders = [('gid', '153251503539418'),
        ('_unsign_token', 'cbe5b82d8d9b35a73fc58d07e81e10f4'),
        ('UM_distinctid', '164d103ae546c-0b5696e726281f-163b6952-1aeaa0-164d103ae559dd'),
        ('cna', '3EDfE80VEC8CAXlFg6JwDJXp'),
        ('xmgid', '2d80abe4-a661-4c5f-9a98-b91d28a80d70'),
        ('PHPSESSID', '6f8dd23f2b94b82ccfdf6b84b5aa7c76'),
        ('_xiamitoken', '18380296fc7a02cac134a8a6bc5b08f7'),
        ('uidXM', '1494058'),
        ('t_sign_auth', '2'),
        ('xm_token', 'dee9fb374fadff9c1278db20a04215d6'),
        ('member_auth', 'g2mbGY0d7Twy16jHHtZLGk1o45mCc1HTiMwahuNu3wYjYOhWFN6q9cPJBncJul%2BXrw5cGYSd2TJKH%2BtVEoH1gezUWwmG'),
        ('isg', 'BA8PUgHpiMBZMIyiQ5MxLX2GnqUTNq3mECEUqiEckn6F8C_yKgXFp3jy9GBrkzvO')]


    # login
    # br.open(LOGIN_URL)
    # br.select_form(nr=0)
    # br['email'] = 'hexuotzo@gmail.com'
    # br['password'] = 'a861201a'
    # br['validate'] = '10'
    # br.submit()

    #checkin
    br.open(CHECKIN_URL)
    print br.title()
    check_in = br.follow_link(text_regex='签到')
    print check_in.read()

if __name__ == '__main__':
    main()
