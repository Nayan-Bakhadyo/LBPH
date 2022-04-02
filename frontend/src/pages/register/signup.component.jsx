import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userAction";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import "./signup.component.css";
// import axios from "axios";
const theme = createTheme();

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  //   const py_id = "105013";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, error } = userRegister;
  // navigate('/loading'); navigate("/login");
  useEffect(() => {
    if (userInfo) {
      navigate("/loading");
    }
  }, [navigate, userInfo]);
  // console.log(document.getElementById("age").value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name == "" ||
      email == "" ||
      age == "" ||
      sex == "" ||
      password == "" ||
      confirmPassword == "" ||
      status == ""
    ) {
      setMsg("Fill all the fields");
    } else if (age <= 0 && age > 105) {
      console.log("Fill age field");
      setMsg("Enter valid age");
    } else if (password !== confirmPassword) {
      console.log("Password do not match");
      setMsg("Password do not match");
    } else {
      dispatch(register(name, email, password, age, sex, status));
    }
  };

  return (
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1"  style={{fontWeight:"350", fontSize:30}}>
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {msg && <div className="errormsg">{msg} </div>}
            {error && <div variant="danger">{error}</div>}
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
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
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
                  label="Sex"
                  name="sex"
                  autoComplete="sex"
                  onChange={(e) => setSex(e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
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
                  autoComplete="status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="Infected">Infected</MenuItem>
                  <MenuItem value="Uninfected">Uninfected</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <h6 style={{padding:2,fontFamily: 'Patrick Hand',color:"#302e59"  }} className='info2'>
              Note* By clicking Next, your camera will be accessed by this system to scan your face</h6>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{fontSize:18,
                backgroundColor: "#302e59",color:"white",borderRadius:"10px",fontWeight:"430"}}
            >
              Next
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  <span className="botlink">
                    {" "}
                    Already have an account? Sign in
                  </span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
