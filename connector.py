import sys
import json

def initialize(id):
    data =id
    print(data)
    resp = {
        "Response" : 200,
        "Message":"Data from Python",
        "id":data
    }
    print(json.dumps(resp))
    sys.stdout.flush()

