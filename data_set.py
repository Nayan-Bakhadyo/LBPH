import cv2
import os
import sys

try:
    parent_dir = "/Users/nayand/Desktop/Major project/Face Recognition/images/"
    id = 2                              #Id equivalent to id of new user from front-end
    str_id = str(id)
    path = os.path.join(parent_dir, str_id)
    os.mkdir(path)
    child_dir="/Users/nayand/Desktop/Major project/Face Recognition/images/" + str_id+ "/"
    path = os.path.join(child_dir, str_id)
    os.mkdir(path)
except FileExistsError as e:
    print("The folder you are trying to create already exist. (data_set.py)")


cpt=0
vidStream= cv2.VideoCapture(0)

# path = os.path.join(parent_dir, directory)
while True:
    ret,frame = vidStream.read()
    cv2.imshow("Scanning.......", frame)

    cv2.imwrite(r"/Users/nayand/Desktop/Major project/Face Recognition/images/"+str_id+"/"+str_id+"/image%04i.jpg" %cpt,frame)
    cpt +=1

    if cv2.waitKey(10)==ord('q'):
        break