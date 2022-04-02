import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
//import Link from '@mui/material/Link';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import {
  mainListItems,
  secondaryListItems,
  userListItems,
} from "../../components/listitems/listitems.component";
import "./dashboardcontent.component.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserProfile } from "../../redux/actions/userAction";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }
//   const navigate = useNavigate();
//   const userRegister = useSelector((state) => state.userRegister);
//   const { userInfo } = userRegister;

// useEffect(() => {
//   if (userInfo) {
//     navigate('/dashboard');
//   }
// }, [navigate, userInfo]);
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export default function UniDashboardContent({ children }) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // let id = userInfo._id;
  // let name = userInfo.name;
  // let email = userInfo.email;
  // let status = userInfo.status;
  // let sex = userInfo.sex;
  // let age = userInfo.age;

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const ProfileHandler = () => {
    navigate("/user/edit");
  };

  const [open, setOpen] = useState(true);

  const [isShow, setShow] = useState(false);
  const toggleDropdown = () => setShow(!isShow);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isShow && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isShow]);

  const [isModalShow, setModalShow] = useState(false);
  const togglingDropdown = () => setModalShow(!isModalShow);

  const refe = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isModalShow && refe.current && !refe.current.contains(e.target)) {
        setModalShow(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isModalShow]);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={8} color="secondary">
                <NotificationsIcon onClick={toggleDropdown}/> 
                {isShow && (  
                 <div ref={ref} className={`dropdown-body ${isShow && 'open'}`}>
                    <div className='dropdown-item'>
                        <span>Messages</span>
                    </div>
                    <div className='dropdown-item'>
                        <span>Trips</span>
                    </div>
                    <div className='dropdown-item'>
                        <span>Saved</span>
                    </div>
                </div>
        )}
              </Badge>
            </IconButton> */}
            <IconButton color="inherit">
              <ArrowDropDownRoundedIcon
                onClick={togglingDropdown}
                style={{
                  "font-size": "44px",
                }}
              />
              {isModalShow && (
                <div
                  ref={refe}
                  className={`dropdown-boy ${isModalShow && "open"}`}
                >
                  <div className="dropdown-item">
                    <Stack direction="row" spacing={2}>
                      <Avatar alt="user-image" />
                      <span>{userInfo.name}</span>
                     
                    </Stack>
                  </div>
                  {!userInfo.isAdmin && (
                    <div className="dropdown-item">
                      <span onClick={ProfileHandler}>Change Status</span>
                    </div>
                  )}
                  <div className="dropdown-item">
                    <button onClick={logoutHandler}>Logout</button>
                  </div>
                </div>
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {userInfo && userInfo.isAdmin ? (
            <List>{mainListItems}</List>
          ) : (
            <List>{userListItems}</List>
          )}
          {/* <Divider />
            <List>{secondaryListItems}</List> */}
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
