import React, { useState, useEffect } from "react";
import UniDashboardContent from "../../components/dashboardcon/dashboardcontent.component";
import "./UserProfile.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { Card, CardContent } from '@mui/material';

import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/actions/userAction";
import { USER_UPDATE_RESET } from "../../redux/constants/userConstant";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

const theme = createTheme();

export default function EditUserPage({ match }) {
  //   const userId = match.params.id;
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [status, setStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  //   const py_id = "105013";
  //   console.log("this is user id", id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setStatus(user.status);
    }
  }, [dispatch, id, user, navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        id: user._id,
        status,
      })
    );
    navigate("/user-dashboard");
  };

  return (
    <UniDashboardContent>
   <Card className="card-report" style={{ width: 380, height:"90%", marginLeft:410 }}>
        <CardContent>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div><h3 style={{padding:2,marginTop:20,color:"#302e59", fontFamily: 'Patrick Hand' }}> 
            This system will interpret your previous activity and warn those who were directly or
            indirectly in contact with you.</h3>
            <br /><h5 style={{fontWeight:"bold",padding:2,fontFamily: 'Patrick Hand',color:"#302e59"  }} className='info2'>
              You can update your COVID-19 status from form below:</h5></div>
            <Box
              component="form"
              noValidate
              // onSubmit={submitHandler}
              sx={{ mt: 3 }}
              className="dashcontent"
              style={{padding:"20px 33px"}}
            >
              
                <label style={{marginBottom:6,color: "#302e59"}}>Your Status</label>
                <TextField
                  required
                  fullWidth
                  select
                  id="status"
                  label="Status"
                  name="status"
                  autoComplete="status"
                  onChange={(e) => setStatus(e.target.value)}
                
                >
                  <MenuItem value="Infected">Infected</MenuItem>
                  <MenuItem value="Uninfected">Uninfected</MenuItem>
                </TextField>
          
              
              <Button
              style={{backgroundColor: "#302e59",color:"white",borderRadius:"10px",paddingLeft:15,paddingRight:15,paddingTop:8,paddingBottom:8,
              border:"none", marginTop:18}}
                type="submit"
                onClick={submitHandler}
               
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Box>
          </Box>
     </CardContent>
     </Card>
    </UniDashboardContent>
  );
}
