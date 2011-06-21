#!/bin/sh


#脚本效果
#输入: 文件 分隔符 字段号 , 讲相应的字段标红输出. 

filename=$1
fs=$2
column=$3



awk 'BEGIN{
         FS=OFS="'$fs'"
     }{
         $'$column'="\033[0;31;1m"$'$column'"\033[0m"
         print $0
}' $filename