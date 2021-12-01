import numpy as np
import cv2
import os
import connector as con
import face_recognition as fr 

number_of_record = len(next(os.walk(r'/Users/nayand/Desktop/Major project/Face Recognition/images'))[1])
closest_id=0                                #To store id of recognized person
confidence_level=1000
# number_of_record=3                          #Number of dataset or we can fetch number of rows in database

test_img=cv2.imread(r'/Users/nayand/Desktop/Major project/Face Recognition/test img/i.jpg')

for i in range(0,number_of_record):
    faces_detected,gray_img=fr.faceDetection(test_img)
    print("Face detected: ",faces_detected)
        
    #Training will begin from here
    face_recognizer=cv2.face.LBPHFaceRecognizer_create()
    face_recognizer.read(r'/Users/nayand/Desktop/Major project/Face Recognition/images/'+str(i)+'/trainingData.yml')

    # name={0: 'Nayan Bakhadyo',1: 'Robert Downey Jr'}

    for face in faces_detected:
        (x,y,w,h)=face
        roi_gray=gray_img[y:y+w,x:x+h]
        label,confidence=face_recognizer.predict(roi_gray)
        print(label)
        print(confidence)
        if (confidence<confidence_level):
            confidence_level = confidence
            closest_id = label
        fr.draw_rect(test_img,face)

predict_name=str(closest_id)
if(confidence_level>25):
    fr.put_text(test_img,'unknown',x,y)
else: 
    fr.put_text(test_img,predict_name,x,y)

print("Id of recognized face: "+ str(closest_id) +" with confidence: "+str(confidence_level))
resized_img=cv2.resize(test_img,(1000,700))

con.initialize(closest_id)
os.system('python connector.py')
cv2.imshow("face detection ",resized_img)
cv2.waitKey(0)
cv2.destroyAllWindows()



# The lower the confidence the better
# Confidence is distance between two histogram