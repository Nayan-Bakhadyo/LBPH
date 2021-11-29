from django.shortcuts import render
from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from .models import Detected
import numpy as numpy
import cv2
import os
import sys
# insert at 1, 0 is the script path (or '' in REPL)
sys.path.insert(1, '../../../Face Recognition')
import face_recognition as fr 

def index(request):
    return render(request, 'index.html')

def user_by_id(request, User_id):
    user = Userdetail.objects.get(pk=User_id)
    return HttpResponse("User: {Userdetail.name}, Email: {Userdetail.email}")



def login1(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    else:
        u = request.POST['username']
        p = request.POST['password']
        user = authenticate(username=u, password=p)
        if user is not None:
            login(request,user)
            return redirect('dashboard')
        else:
            messages.add_message(request, messages.ERROR, "Invalid Username and Password")
            return redirect('login')


def signup(request):
    if request.method == 'GET':
        return render(request, 'signup.html')
    else:
        u = request.POST['username']
        e = request.POST['email']
        p1 = request.POST['password']
        p2 = request.POST['cpassword']

        if p1 == p2:
            try:
                u = User(username=u, email=e)
                u.set_password(p1)
                u.save()
            except:
                messages.add_message(request, messages.SUCCESS, "Username alreaady exists")
                return redirect('signup')

            messages.add_message(request, messages.SUCCESS, "Signup Successful")
            return redirect('login')


        else:
            messages.add_message(request, messages.ERROR, "Password doesn't match")
            return redirect('signup')

def dashboard(request):
    # data = Store.objects.all()
    #     context = {
    #         'Store': data
    #     }
        # return render(request, 'dashboard.html', context)
        return render(request, 'dashboard.html')

def detection(request):
    
    # faces_detected,gray_img=fr.faceDetection(test_img)
    # print("Face detected: ",faces_detected)

    #Training will begin from here

    face_recognizer=cv2.face.LBPHFaceRecognizer_create()
    face_recognizer.read(r'C:\Users\user\Desktop\Face Recognition\trainingData.yml')

    cap=cv2.VideoCapture(0)
    size = (
        int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)),
        int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    )
    name={0: 'Nayan Bakhadyo', 1: 'Suyog Karki'}
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
            fr.draw_rect(test_img,face)
            predict_name=name[label]
            if(confidence>47):
                continue                                  
            fr.put_text(test_img,predict_name,x,y)
            # if(validate(label)){

            # }
            
            #put value in database along with datetime.

        resized_img=cv2.resize(test_img,(1000,700))

        cv2.imshow("face detection ",resized_img)
        if cv2.waitKey(10)==ord('q'):
            break
            cv2.destroyAllWindows()
            return render(request, 'dashboard.html')
    return render(request,'dashboard.html')

def dataset(request):
    cpt=0
    vidStream= cv2.VideoCapture(0)

    while True:
        ret,frame = vidStream.read()
        cv2.imshow("Test Frame", frame)

        cv2.imwrite(r"C:\Users\user\Desktop\Face Recognition\images\1\image%04i.jpg" %cpt,frame)
        cpt +=1

        if cv2.waitKey(10)==ord('q'):
            break
    return render(request,'dashboard.html')
                            
def signout(request):
    logout(request)
    return redirect('login')

def add_record(request,id):
    detected=Detected()
    detected.User_id= id

def validate(request):
    # data = detected.objects.all()
    # context = {
    #     'Detected': data
    # }
    # return render(request, 'test.html', context)
    d = Detected(user_id= 5, date="2077/01/01", time="");
    d.save()
    print("Saved successfully!!!!!!!!")
    
    




