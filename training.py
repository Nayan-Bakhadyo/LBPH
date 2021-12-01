import numpy as np
import cv2
import os
import sys
import face_recognition as fr 

#user id as id for storing dataset
id=2
str_id = str(id)                # To use in url

test_img=cv2.imread(r'/Users/nayand/Desktop/Major project/Face Recognition/test img/img1.jpg')
print(test_img)
faces_detected,gray_img=fr.faceDetection(test_img)
print("Face detected: ",faces_detected)

#Training will begin from here
faces,faceID=fr.labels_for_training_data(r'/Users/nayand/Desktop/Major project/Face Recognition/images/' +str_id+'/')

# os.system("training.py")


face_recognizer=fr.train_classifier(faces,faceID)
face_recognizer.save(r'/Users/nayand/Desktop/Major project/Face Recognition/images/' + str_id +'/trainingData.yml')

# name={0: 'Nayan Bakhadyo',1: 'Robert Downey Jr'}

for face in faces_detected:
    (x,y,w,h)=face
    roi_gray=gray_img[y:y+w,x:x+h]
    label,confidence=face_recognizer.predict(roi_gray)
    print(label)
    print(confidence)
    fr.draw_rect(test_img,face)
    predict_name=str(label)
    if(confidence>35):
        fr.put_text(test_img,'unknown',x,y)
    else:
        fr.put_text2(test_img,predict_name,x,y)

resized_img=cv2.resize(test_img,(1000,700))

cv2.imshow("face detection ",resized_img)
cv2.waitKey(0)
cv2.destroyAllWindows()