# -*- coding: utf-8 -*-

import MySQLdb
import sys

HOST = ""
USER = ""
PASSWD = ""
DBNAME = ""


def get_patch_connection():
    """
        manually create a connection for the patch database using MySQLdb.
    """
    conn = MySQLdb.connect(host = HOST,
                           user = USER,
                           passwd = PASSWD,
                           db = DBNAME,
                           charset="utf8")
    cursor = conn.cursor()
    return (conn, cursor)

def execute_sql(sql):
    """
    execute sql and log errors
    """
    connection, cursor = get_patch_connection()
    cursor.execute(sql)
    res = [line for line in cursor.fetchall()]
    cursor.close()
    connection.close()
    return res

def get_create_sql(table):
    sql = "SHOW CREATE TABLE %s" % table
    create_table_sql = execute_sql(sql)
    create_table_sql = create_table_sql[0][1]
    return create_table_sql

def get_select_ind(table):
    sql = "DESC %s" % table
    desc_table = execute_sql(sql)
    ind = [i[0] for i in desc_table]
    return ",".join(ind[1:])  #delect column `id`    

def format_value(t):
	r = []
	for i in t:
		try:
			i = i.encode("utf-8")
		except:
			i = str(i)
		r.append("\'%s\'"%i)
	return r

def get_insert_value(ind,table):
    sql = "select %s from %s" % (ind,table)
    res = execute_sql(sql)
    r = ["(%s),\n" % ",".join(format_value(i)) for i in res]
    r = "".join(r)
    r = "%s;\n" % r[:-2]  #去掉最后一个逗号,改为分号
    return r

def main(table):
    create_table_sql = get_create_sql(table)
    ind = get_select_ind(table)
    ind = ind.encode("utf-8")
    insert_value = get_insert_value(ind,table)
    insert_sql = "INSERT INTO %s (%s) VALUES %s " % (table,ind,insert_value)
    
    f = open("%s.sql" % table,"w")
    f.write("%s;\n\n" % create_table_sql.encode("utf-8"))
    f.write(insert_sql)
    f.close()

if __name__ == '__main__':
    #ex : python sql_statement.py report_sale_odrsource_day
    table_name = sys.argv[1]
    main(table_name)

#and then shell >>	
'''
ls -l *sql|awk 'BEGIN{b=1}{a= $NF;gsub(".sql","",$NF);print b"."$NF;print "    sql语句:"a;b++}'	
'''	