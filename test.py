from json.decoder import JSONDecoder
import json

data = '{_id: new ObjectId("6230d0b0eb2eeca213adfe96"),user: new ObjectId("623065f2c046e7198117d3f0"),createdAt: 2022-03-15T17:45:20.318Z,updatedAt: 2022-03-15T17:45:20.318Z,__v: 0},{_id: new ObjectId("6237f4ef914aab19cf7f6126"),user: new ObjectId("6230659dc046e7198117d3ec"),createdAt: 2022-03-16T17:45:20.318Z,updatedAt: 2022-03-16T17:45:20.318Z,__v: 0}'
data = data.replace('{','[')
data = data.replace('}',']')
data = '['+data+']'
data = data.split(':')
print(data)
# for d in data:
#     print(d)
#     print('----------')