
from datetime import timedelta
from json.decoder import JSONDecoder
import sys
import json
from dateutil import parser

send_mail_to = set()
tree = []
checked_users = set()

data = json.load(sys.stdin)
new_data = data.split('\t')
id = new_data[0]
log_data = new_data[1]
# log_data = json.loads(log_data)
log_data = log_data.split(',')
# print(id)
tree.append(id)
#Log interpretation using id and log data

def child_users(temp_set):
    for id in temp_set:
        log_interpretation(id)

def log_interpretation(id):
    checked_users.add(id)
    for i in range(len(log_data)):
        data = json.loads(log_data[i])
        log_id = data.keys()
        for i in log_id:
            lg = i
        if id == lg:
            data[lg]=data[lg].replace('GMT+0545 (Nepal Time)','')
            date_time_obj = parser.parse(data[lg])
            min = date_time_obj - timedelta(minutes=1)                      #10 minute delay
            max = date_time_obj + timedelta(minutes=5)
            other_users(min, max)

def other_users(min, max):
    temp_set = set()
    for i in range(len(log_data)):
        data = json.loads(log_data[i])
        log_id = data.keys()
        for i in log_id:
            lg = i
        data[lg]=data[lg].replace('GMT+0545 (Nepal Time)','')
        date_time_obj = parser.parse(data[lg])
        if min<date_time_obj<max:
            if lg in checked_users:
                continue
            temp_set.add(lg)
    if temp_set!={}:
        tree.append(list(temp_set))
        for user in temp_set:
            send_mail_to.add(user)
        child_users(temp_set)
        
log_interpretation(id)
mail_array=''
for m in send_mail_to:
    mail_array+=m
    mail_array+=' '

print(mail_array)

