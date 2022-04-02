import numpy as np
import cv2
import os
import shutil
import random
from zmq import NULL
import face_recognition as fr 
import training as t
closest_id='0'                                #To store id of recognized person
confidence_level=1000                         #Number of dataset or we can fetch number of rows in database

test_img=cv2.imread("/Users/nayand/Desktop/LBPH/Face Recognition/test img/0.jpg")
folder = "/Users/nayand/Desktop/LBPH/Face Recognition/images/"
faces_detected,gray_img=fr.faceDetection(test_img)
face_recognizer=cv2.face.LBPHFaceRecognizer_create()
face_recognizer.read("/Users/nayand/Desktop/LBPH/Face Recognition/Reports/trainingData.yml")
for face in faces_detected:
    (x,y,w,h)=face
    roi_gray=gray_img[y:y+w,x:x+h]
    label,confidence=face_recognizer.predict(roi_gray)
    if (confidence<confidence_level):
        confidence_level = confidence
if confidence_level != 0:
    sub_folders = [name for name in os.listdir (folder) if os.path.isdir (os.path.join(folder, name))]

    for dir in sub_folders:
        faces_detected,gray_img=fr.faceDetection(test_img)
        # if faces_detected==NULL:
        #    print('6alsknoqlwkremf')
        #Training will begin from here
        face_recognizer=cv2.face.LBPHFaceRecognizer_create()
        face_recognizer.read("/Users/nayand/Desktop/LBPH/Face Recognition/images/" +dir+ "/trainingData.yml")

        for face in faces_detected:
            (x,y,w,h)=face
            roi_gray=gray_img[y:y+w,x:x+h]
            label,confidence=face_recognizer.predict(roi_gray)
            # print(label)
            # print(confidence)
            if (confidence<confidence_level):
                confidence_level = confidence
                closest_id = dir
            fr.draw_rect(test_img,face)

    predict_name=closest_id
    if(confidence_level>35):
        fr.put_text(test_img,'unknown',x,y)
    else: 
        fr.put_text(test_img,predict_name,x,y)

    # print("Id of recognized face: "+ str(closest_id) +" with confidence: "+str(confidence_level))
    # resized_img=cv2.resize(test_img,(1000,700))

    cv2.imshow("face detection",test_img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    file_source = '/Users/nayand/Desktop/LBPH/Face Recognition/test img/'
    file_destination = '/Users/nayand/Desktop/LBPH/Face Recognition/Reports/images/0/'
    get_files = os.listdir(file_source)
    for g in get_files:
        new_name = len(os.listdir('/Users/nayand/Desktop/LBPH/Face Recognition/Reports/images/0/')) +1
        shutil.move(file_source + g, file_destination)
        os.rename(file_destination+g, file_destination +str(new_name)+'.jpg')
        
    t.report()
    if confidence_level < 35:
        print(closest_id)
    else:
        print('0')
    # The lower the confidence the better
    # Confidence is distance between two histogram
else:
    print('1')