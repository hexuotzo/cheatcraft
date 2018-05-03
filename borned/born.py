# -*- coding:utf-8 -*-
import datetime as d
import time
import sys
import re
class LengthLife(object):
    def __init__(self,args1):
        self.args1 = args1
        
    def go(self):
        try:
            birth = time.strptime(self.args1,"%Y%m%d")
            return self.age()
        except:
            return self.help()
    def help(self):
        print "\r\n计算你活了多少天的但疼小玩意"
        print "**********用法*********"
        print "帮助 python born.py help"
        print "查询 python born.py YYMMDD  #ex:19861201"
        print "***********************"
    def age(self):
        today = d.date.today()
        now = time.mktime(d.datetime.now().timetuple())
        birth = time.strptime(self.args1,"%Y%m%d")
        birth_to_day = d.date(birth.tm_year,birth.tm_mon,birth.tm_mday)
        birth_to_sec = time.mktime(d.datetime(birth.tm_year,birth.tm_mon,birth.tm_mday).timetuple())
        life = today - birth_to_day
        print "你的生日：%s年%s月%s日"%(self.args1[0:4],self.args1[4:6],self.args1[6:8])
        print "你已经活了%s天"%life.days
        print "你已经活了%s秒"%(now - birth_to_sec)
        
def main(args):
    t = LengthLife(args)
    t.go()
if __name__ == '__main__':
    args  = sys.argv[1]
    main(args)
