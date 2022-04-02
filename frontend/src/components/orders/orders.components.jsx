import React, { useEffect } from "react";
// import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../titles/titles.component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { affectedUser } from "../../redux/actions/userAction";
import moment from "moment";
import '../../pages/employees/employees.css';

//import CoronavirusIcon from '@mui/icons-material/Coronavirus';

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
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
      <Title>Infections</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Infected Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {affects &&
            affects.slice(0, 3).map((affect) => (
              <TableRow key={affect.id}>
                <TableCell>{affect.name}</TableCell>
                <TableCell>{affect.email}</TableCell>
                <TableCell>{affect.status}</TableCell>
                <TableCell align="right">
                  {moment(affect.updatedAt).format("MMM Do YYYY")}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
