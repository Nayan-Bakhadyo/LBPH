import React, {useState, useEffect} from 'react';
import UniDashboardContent from '../../components/dashboardcon/dashboardcontent.component';
import './edituser.component.css';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import {getUserDetails, updateUser } from '../../redux/actions/userAction';
import {USER_UPDATE_RESET} from '../../redux/constants/userConstant';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const theme = createTheme();

export default function EditUserPage({match}) {
//   const userId = match.params.id;
  const {id} = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState('');
  const [sex, setSex] = useState("");
  const [status, setStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

//   const py_id = "105013";
console.log('this is user id',id)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/employee');
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setAge(user.age);
        setSex(user.sex);
        setStatus(user.status);
      }
    }
  }, [dispatch,id, user,navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, name, email,isAdmin,age, sex, status }));
  };

    
  return (
    <UniDashboardContent>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
       
          <Typography component="h3" variant="h5">
            Edit User
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  value={age}
                  autoComplete="age"
                  onChange={(e) => setAge(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  select
                  id="sex"
                  value={sex}
                  label="Sex"
                  name="sex"
                  autoComplete="sex"
                  onChange={(e) => setSex(e.target.value)}
                >
                     <MenuItem value="Male" >Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  select
                  id="status"
                  label="Status"
                  name="status"
                  value={status}
                  autoComplete="status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="Infected" >Infected</MenuItem>
                    <MenuItem value="Uninfected">Uninfected</MenuItem>
                </TextField>
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="image"
                  label="Image"
                  type="file"
                  id="image"
                  autoComplete="image"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid> */}
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel component="legend">Admin</FormLabel>
      <RadioGroup
        aria-label="admin"
        defaultValue={isAdmin}
        name="radio-buttons-group"
      >
      <Stack direction="row" spacing={2}>
        <FormControlLabel value="true" onChange={e=> setIsAdmin(e.target.value)} control={<Radio />} label="Admin" />
        <FormControlLabel value="false"  onChange={e=> setIsAdmin(e.target.value)} control={<Radio />} label="User" />
        </Stack>
      </RadioGroup>
    </FormControl>
              </Grid>
            <Button
              type="submit"
              onClick={submitHandler}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </UniDashboardContent>
  );
}