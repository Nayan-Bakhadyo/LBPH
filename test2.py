import numpy as numpy
import cv2
import os
import sys
import face_recognition as fr 
import multiprocessing
import time

flag =0
min_confidence=1000000
user_id=0
def recognition(dir):
    global flag
    global user_id
    global min_confidence
    print("REC function")
    print(dir)
    face_recognizer=cv2.face.LBPHFaceRecognizer_create()

    cap=cv2.VideoCapture(0)
    size = (
        int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)),
        int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)),
    )
    face_recognizer.read("/Users/nayand/Desktop/LBPH/Face Recognition/images/"+dir+"/trainingData.yml")
    while flag==0:
        ret,test_img=cap.read()
        faces_detected,gray_img=fr.faceDetection(test_img)
        print("face Detected: ",faces_detected)
        for(x,y,w,h) in faces_detected:
            cv2.rectangle(test_img,(x,y),(x+w,y+h),(0,255,0),thickness=1)

        for face in faces_detected: 
            (x,y,w,h)=face
            roi_gray=gray_img[y:y+w,x:x+h]
            label,confidence=face_recognizer.predict(roi_gray)
            print("Confidence: ", confidence)
            if(confidence<100):
                flag=1
                print(flag)
                print("Label:", dir) 
                                                    #send data from here
                if(min_confidence>confidence):
                    min_confidence=confidence
                    user_id=dir
                    print(min_confidence)
                    print(user_id)
                break 
            else:
                print("Unknown")
            if(flag == 1):
                sys.exit()                                 
    # resized_img=cv2.resize(test_img,(1000,700))
    # cv2.imshow("face detection ",resized_img)

# end of function
folder = "/Users/nayand/Desktop/LBPH/Face Recognition/images/"
sub_folders = [name for name in os.listdir (folder) if os.path.isdir (os.path.join(folder, name))]
for dir in sub_folders:
    flag=0
    print("Main function")
    processes=[]
    if(flag==0):
        if __name__ == '__main__':
            print("inside main")
            p = multiprocessing.Process(target=recognition, args=(dir, ))
            p.start()
            processes.append(p)
            time.sleep(10)
    # time.sleep(10)
# if(p.is_alive()):
#     p.terminate()
result=[]
if __name__ == 'main':
    for p in processes:
        p.join()
        # time.sleep(5)
        print(p.is_alive())
        result.append(p.exitcode)
print("Minimum Confidence")
print(min_confidence)
print("User_id")
print(user_id)