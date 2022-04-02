import React, { useState } from "react";
import UniDashboardContent from "../../components/dashboardcon/dashboardcontent.component";
import { imageSend } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Card, CardContent } from '@mui/material';
import './workspace.css';
import TextField from "@mui/material/TextField";


export default function ReportUser() {
  const [file, setFile] = useState();
  const [name, setName] = useState();
  // const [uploading, setUploading] = useState(false);
  // const dispatch = useDispatch();
  // const handleSubmit = async (e) => {
  //   // e.preventDefault();
  //   // dispatch(imageSend(image));
  //   // console.log("hello");
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   setUploading(true);

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };
  //     const { data } = await axios.post("/api/imageupload", formData, config);
  //     console.log(data);
  //     setImage(data);
  //     setUploading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setUploading(false);
  //   }
  // };
  // const userDetail = useSelector((state) => state.userLogin);
  // const { userInfo } = userDetail;
  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   setUploading(true);

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };
  //     const { data } = await axios.post("/api/upload", formData, config);
  //     console.log(data);
  //     setImage(data);
  //     setUploading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setUploading(false);
  //   }
  // };

  // const handleImage = async(e)=>{
  //   const file = e.target.files[0];
  //  const formData = new FormData();
  //   formData.append("image", file);
  //  setUploading(true);
  //   const {data}=await axios.post("/api/imageupload",formData);
  // }
  const send =async()=>{
    const data = new FormData();
    console.log(data);
    data.append('name',name);
    data.append('file',file);
    // console.log(data);
    
    await axios.post('/api/imageupload',data).then( await axios.get('/api/recognizeduser')).catch(err=>console.log(err));
   
  }
 
  return (
    <UniDashboardContent>
      <Card className="card-report" style={{ width: 380, height:"90%", marginLeft:410 }}>
        <CardContent>
          <div><h3 style={{padding:2,marginTop:20,color:"#302e59", fontFamily: 'Patrick Hand' }}> You can report any user within the system. We will notify them regarding your report. 
            Your information will no be provided to anyone.</h3>
            <br /><h5 style={{fontWeight:"bold",padding:2,fontFamily: 'Patrick Hand',color:"#302e59"  }} className='info2'>You can submit report by uploading image from form below:</h5></div>
      <div className="dashcontent">
        <form action="#" enctype="multipart/form-data">
          <label style={{marginBottom:6,color: "#302e59"}} for name="image">
            Upload Image
          </label>
          <br />
          <TextField
          style={{padding:1, margin:3}}
            type="file"
            id="file"
            name="file"
            class="up-image"
            // value={image}
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
            }}
          />



          <br />
          <input
            type="hidden"
            id="name"
            class="up-image"
            style={{margin:1,padding:1}}
            // value={image}
            onChange={(e) => {
              const {value} =e.target;
              setName(value);
            }}
          />
       
          <button style={{backgroundColor: "#302e59",color:"white",borderRadius:"10px",paddingLeft:15,paddingRight:15,paddingTop:8,paddingBottom:8,
        border:"none", margin:-2}} onClick = {send} type="submit" class="upload">
           Submit
          </button>
        </form>
      </div>
      </CardContent>
      </Card>
    </UniDashboardContent>
  );
}
