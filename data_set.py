import cv2
import os
import sys

parent_dir = "/Users/nayand/Desktop/Major project/Face Recognition/"
id = 1234
directory = str(id)
path = os.path.join(parent_dir, directory)
os.mkdir(path)

cpt=0
vidStream= cv2.VideoCapture(0)
# directory = id;                             #id will be passed over here
# # Parent Directory path
# parent_dir = 
  
# path = os.path.join(parent_dir, directory)
while True:
    ret,frame = vidStream.read()
    cv2.imshow("Scanning.......", frame)

    cv2.imwrite(r"/Users/nayand/Desktop/Major project/Face Recognition/images/2/image%04i.jpg" %cpt,frame)
    cpt +=1

    if cv2.waitKey(10)==ord('q'):
        break