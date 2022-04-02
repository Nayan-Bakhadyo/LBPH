import multiprocessing
from multiprocessing.pool import TERMINATE
import time
import numpy as numpy
import cv2
import os
import psutil
import face_recognition as fr 

id = []
def recognition(dir, pid):
    face_recognizer=cv2.face.LBPHFaceRecognizer_create()
    # print("==============================================")
    # print(dir)
    face_recognizer.read("/Users/nayand/Desktop/LBPH/Face Recognition/images/"+dir+"/trainingData.yml")

    cap=cv2.VideoCapture(0)
    size = (
        int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)),
        int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)),
    )

    while True:
        ret,test_img=cap.read()
        faces_detected,gray_img=fr.faceDetection(test_img)
        # print("face Detected: ",faces_detected)
        for(x,y,w,h) in faces_detected:
            cv2.rectangle(test_img,(x,y),(x+w,y+h),(0,255,0),thickness=1)

        for face in faces_detected: 
            (x,y,w,h)=face
            roi_gray=gray_img[y:y+w,x:x+h]
            label,confidence=face_recognizer.predict(roi_gray)
            # print("Label: ", dir)
            # print("Confidence: ", confidence)
            if(confidence<35):
                # id.append(dir)
                print(dir)
                fr.put_text2(test_img,dir,x,y)
            else:
                fr.put_text2(test_img,'Unknown',x,y)
            fr.draw_rect(test_img,face)
        
        resized_img=cv2.resize(test_img,(1000,700))
        cv2.imshow("face detection ",resized_img)
        if cv2.waitKey(10)==ord('q'):
            cv2.destroyAllWindows()
            p = psutil.Process(pid)
            p.terminate() 
            break

folder = "/Users/nayand/Desktop/LBPH/Face Recognition/images/"
sub_folders = [name for name in os.listdir (folder) if os.path.isdir (os.path.join(folder, name))]
processes = []
for dir in sub_folders:
     if __name__ == '__main__':
            # print("inside main")
            p = multiprocessing.Process(target=recognition, args=(dir,os.getpid()))
            p.start()
            processes.append(p)
            time.sleep(2)
for p in processes:
    p.join()