import React, { useEffect } from "react";
//import Link from '@mui/material/Link';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import UniDashboardContent from "../../components/dashboardcon/dashboardcontent.component";
import Chart from "../../components/chart/chart.component";
import Deposits from "../../components/deposits/deposits.component";
import Orders from "../../components/orders/orders.components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { affectedUser } from "../../redux/actions/userAction";
import moment from "moment";
import './report.css';

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

export default function ReportPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const affectList = useSelector((state) => state.affectList);
  const { affects } = affectList;
  console.log(affectList);

  useEffect(() => {
    // if (userInfo && userInfo.isAdmin) {
    dispatch(affectedUser());
    // }
    // else {
    // navigate('/login');
    // }
  }, [dispatch, navigate]);

  return (
    <UniDashboardContent>
      {/* {affects &&
        affects.map((affect) => (
          <h1>{moment(affect.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</h1>
        ))} */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} >
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9} className="chartcontainer">
            <Paper
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                height: 390,
              }}
            >
              <Chart />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 390,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>
        {/* <Copyright sx={{ pt: 4 }} /> */}
      </Container>
    </UniDashboardContent>
  );
}
