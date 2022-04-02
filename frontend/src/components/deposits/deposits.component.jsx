import React, { useEffect } from "react";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Title from "../titles/titles.component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { affectedUser } from "../../redux/actions/userAction";
import moment from "moment";

export default function Deposits() {
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
    <React.Fragment>
      <Title>Recent Case</Title>
      {affects &&
        affects.slice(0, 4).map((affect) => (
          <div style={{ padding: "5px" }}>
            <Typography component="p" variant="h6">
              {affect.name}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              {moment(affect.updatedAt).format("MMM Do YYYY")}
            </Typography>
          </div>
        ))}
      {/* <Link style={{ paddingTop: "20px" }} to="/user-dashboard">
        View All
      </Link> */}
    </React.Fragment>
  );
}
