#! /usr/bin/env ruby
#encoding: utf-8
 
require 'rubygems'
require 'mechanize'
require 'net/smtp'
 
email = ''
passwd = ''
mailenabled = false # set to true if you need mail notification and has mail server configured
 
login_url = 'https://login.xiami.com/member/login'
checkin_url = 'http://www.xiami.com/task/signin'
 
checkin_result = 'Success'
checkin_count = nil
 
def send_mail(email, body)
  Net::SMTP.start('localhost') do |smtp|
	    smtp.send_message body, 'root@localhost', email
	end
end
 
begin
	# login
	agent = Mechanize.new
	page = agent.get(login_url)
	login_form = page.forms[0]
	login_form.email = email
	login_form.password = passwd
	login_page = login_form.submit(login_form.button_with(:value => "登 录"))
 
	# checkin
	agent.post(checkin_url)
rescue Exception => e
	checkin_result = "Failed " + e.message
ensure
	login_page = agent.get(login_url) # reload page to get checkin count
	checkin_count = login_page.link_with(:text => /已连续签到/)
	body = "Checkin Date => #{Time.now}\nCheckin Result => #{checkin_result}\nCheckin Count => #{checkin_count}"
	mailenabled ? send_mail(email, body) : (puts body)
end


#python 版在这里... 一样的问题
#
#import mechanize
#url = "https://login.xiami.com/member/login"
#br = mechanize.Browser()
#br.set_handle_robots(False)
#br.addheaders = [('User-agent', 'Firefox')]
#br.open(url)
#br.select_form(nr=0)
#br['email'] = ""
#br['password'] = ''
#res = br.submit()
