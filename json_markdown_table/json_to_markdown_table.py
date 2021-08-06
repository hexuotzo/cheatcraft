# -*-coding:utf-8 -*-

'''
api json 返回值 转为markdown table格式

============================输入==============================: 
{
    "resultCode": 200,
    "message": "success",
    "data": {
        "items": [
            {
                "engineSpeedRange": 0,
                "outputTorqueMileageList": [
                    {
                        "outputTorqueRatio": -1,
                        "reasonableMileage": 0.0108,
                        "reasonableMileageRatio": 0.0,
                        "unreasonableMileage": 0.0492,
                        "unreasonableMileageRatio": 0.0001
                    },
                    {
                        "outputTorqueRatio": 0,
                        "reasonableMileage": 0.043,
                        "reasonableMileageRatio": 0.0001,
                        "unreasonableMileage": 0.0138,
                        "unreasonableMileageRatio": 0.0
                    }
                ]
            }
        ]
    }
}

============================返回==============================: 

|字段名||||类型|备注|
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|resultCode||||int||
|data||||map||
||items|||list||
|||outputTorqueMileageList||list||
||||unreasonableMileage|float||
||||reasonableMileage|float||
||||outputTorqueRatio|int||
||||unreasonableMileageRatio|float||
||||reasonableMileageRatio|float||
|||engineSpeedRange||int||
|message||||string||
'''


transtype = {'unicode': 'string', 'NoneType': '', 'dict': 'map'}


def getdictkeys(data):
    result=[]
    
    def get_all_dict(data, n = 0):
        n += 1
        string = n * '|'
        
        if isinstance(data,dict):
            for x in range(len(data)): 
                temp_key = list(data.keys())[x] 
                temp_value = data[temp_key]
                result.append([n, temp_key, transtype.get(type(temp_value).__name__, type(temp_value).__name__)])
                get_all_dict(temp_value, n)
        elif isinstance(data,list) and isinstance(data[0],dict):
            data = data[0]
            for x in range(len(data)): 
                temp_key = list(data.keys())[x] 
                temp_value = data[temp_key]
                result.append([n, temp_key, transtype.get(type(temp_value).__name__, type(temp_value).__name__)])
                get_all_dict(temp_value, n)
                
    get_all_dict(data)
    
    #print result
    
    fl = max([i[0] for i in result])
    print fl
    
    title = "|字段名%s|类型|备注|" % ((fl-1)*"|")
    print title
    print "%s|" % ((fl+2) * "| :------------ ")
    
    for n, key, t in result:
        print "%s%s%s|%s||" % ((n * "|"), key, ((fl -n) * "|"), t)
                
            
if __name__ == '__main__':    
    ex = {u'resultCode': 200, u'data': {'test': [1,2,3], u'userId': u'cfd2554570864f02939a76f3c25739a7', u'loginType': 0, u'popupEntity': {u'content': None, u'specialContent': None, u'code': None, u'title': None}, u'token': u'6yWxZxHTChJqopSGE3rFgEASfqE=', u'nickname': None, u'id': 298497, u'bindCarStatus': u'false'}, u'message': u'OK'}
    getdictkeys(ex)
    
    