import numpy as numpy
import cv2
import os
import face_recognition as fr 

test_img=cv2.imread(r'test img/img2.jpg')

faces_detected,gray_img=fr.faceDetection(test_img)
print("Face detected: ",faces_detected)

#Training will begin from here
i=0
face_recognizer=cv2.face.LBPHFaceRecognizer_create()
face_recognizer.read(r'images/'+str(i)+'/trainingData.yml')

cap=cv2.VideoCapture(0)
size = (
    int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)),
    int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)),
)
name={0: 'Nayan Bakhadyo', 1: 'Robert Downey Jr'}
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
        print("Label: ", label)
        print("Confidence: ", confidence)
        predict_name=name[label]
        print("Name: ", predict_name)
        fr.draw_rect(test_img,face)
        if(confidence>35):
            continue                                  
        fr.put_text2(test_img,predict_name,x,y)

    resized_img=cv2.resize(test_img,(1000,700))
    cv2.imshow("face detection ",resized_img)
    if cv2.waitKey(10)==ord('q'):
        cv2.destroyAllWindows()
        break