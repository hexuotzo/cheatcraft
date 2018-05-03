# -*- encoding:utf-8 -*-

import sys,re
import datetime
from ftplib import FTP

dir_area = [
#"beijing",
"guangdong",
"shanghai",
"tianjin",
"chongqing",
"liaoning",
"jiangsu",
"hubei",
"sichuan",
"shanxisheng",
"hebei",
"shanxi",
"henan",
"jilin",
"heilongjiang",
"neimenggu",
"shandong",
"anhui",
"zhejiang",
"fujian",
"hunan",
"guangxi",
"jiangxi",
"guizhou",
"yunnan",
"hainan",
"ningxia",
"qinghai",
"xinjiang",
"gansu",
"xizang",
]

def format_time(time):
    year = int(time[:4])
    month = int(time[4:6])
    day = int(time[6:8])
    return year,month,day

if __name__ == "__main__":

	start = sys.argv[1]   #"开始时间"
	end = sys.argv[2]    #"结束时间"

	days = datetime.timedelta(1) #递归日期频度

	s_year,s_month,s_day = format_time(start)
	e_year,e_month,e_day = format_time(end)

	start_time = datetime.date(s_year, s_month, s_day)
	e_time = datetime.date(e_year, e_month, e_day)

	ftp = FTP()

	ftp.connect("218.206.87.169","21")
	#'220 Welcome to Umessage FTP service.'
	ftp.login("ftpuser","L7oRJfq2gm")
	for area in dir_area:
	    s_time = start_time
	    while s_time <= e_time:
	        dir_name = "/%s/%s/"%(area,s_time.strftime("%Y-%m-%d"))
	        try:
	            ftp.cwd(dir_name)
	            for i in ftp.nlst():
		            ftp.delete(i)
	            ftp.rmd(dir_name)
	            print dir_name,"is deleted"
	        except:
	            print dir_name," no such dir"
	        s_time = s_time + days