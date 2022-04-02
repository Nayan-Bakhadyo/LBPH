import numpy as np
import cv2
import os
import sys
import face_recognition as fr 

def training(id):
    str_id = str(id)                # To use in url  #Training will begin from here
    faces,faceID=fr.labels_for_training_data(r'/Users/nayand/Desktop/LBPH/Face Recognition/images/' +str_id+'/')
    face_recognizer=fr.train_classifier(faces,faceID)
    face_recognizer.save(r'/Users/nayand/Desktop/LBPH/Face Recognition/images/' + str_id +'/trainingData.yml')

def report():
    faces,faceID=fr.labels_for_training_data2(r'/Users/nayand/Desktop/LBPH/Face Recognition/Reports/images/')
    face_recognizer=fr.train_classifier(faces,faceID)
    face_recognizer.save(r'/Users/nayand/Desktop/LBPH/Face Recognition/Reports/trainingData.yml')
