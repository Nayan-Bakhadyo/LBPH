from json.decoder import JSONDecoder
import cv2
import os
import sys
import json
import training as t

data = json.load(sys.stdin)
id = data["_id"]
print(id)
try:
    parent_dir = "/Users/nayand/Desktop/LBPH/Face Recognition/images/"
    str_id = str(id)
    path = os.path.join(parent_dir, str_id)
    os.mkdir(path)
    child_dir="/Users/nayand/Desktop/LBPH/Face Recognition/images/" + str_id+ "/"
    path = os.path.join(child_dir, str_id)
    os.mkdir(path)
except FileExistsError as e:
    print("The folder you are trying to create already exist. (data_set.py)")


cpt=0
vidStream= cv2.VideoCapture(0)
# vidStream = cv2.VideoCapture(0, cv2.CAP_DSHOW)

# path = os.path.join(parent_dir, directory)
while True:
    ret,frame = vidStream.read()
    cv2.imshow("Scanning..", frame)
    cv2.imwrite("/Users/nayand/Desktop/LBPH/Face Recognition/images/"+str_id+"/"+str_id+"/image%04i.jpg" %cpt,frame)
    cpt +=1

    if cv2.waitKey(10)==ord('q'):
        cv2.destroyAllWindows()
        break

t.training(str_id)

# del_dir = "/Users/nayand/Desktop/LBPH/Face Recognition/images/"+str_id+"/"+str_id
# for f in os.listdir(del_dir):
#     os.remove(os.path.join(del_dir, f))

print('Complete')