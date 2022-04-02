import React, {useEffect} from "react";
import axios from "axios";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import "./listitems.component.css";

const streamHandler = async () => {

  const { data } = await axios.get("/api/userfromvideo");
};

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="/dashboard">
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="/employee">
        <ListItemText primary="Users" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalHospitalOutlinedIcon />
      </ListItemIcon>
      <Link to="/logs">
        <ListItemText primary="Logs" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalHospitalOutlinedIcon />
      </ListItemIcon>
      <Link to="/loading">
      <ListItemText primary="Stream" onClick={streamHandler} />
      </Link>
    </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <Link to="/reports">
        <ListItemText primary="Reports" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Application" />
    </ListItem> */}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current week" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last week" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Month End" />
    </ListItem>
  </div>
);

export const userListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="/user-dashboard">
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="/report-user">
        <ListItemText primary="Report User" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalHospitalOutlinedIcon />
      </ListItemIcon>
      <Link to="/corona-reports">
        <ListItemText primary="Corona Reports" />
      </Link>
    </ListItem>
  </div>
);
