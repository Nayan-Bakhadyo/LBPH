import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
//import Link from '@mui/material/Link';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import UniDashboardContent from '../../components/dashboardcon/dashboardcontent.component';
import Title from '../../components/titles/titles.component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { listUsers } from '../../redux/actions/userAction';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { deleteUser } from '../../redux/actions/userAction';
import './employees.css';

export default function EmployeePage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector(state => state.userList);
  const { users } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector(state => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    }
    else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <UniDashboardContent>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

              <Title>Users</Title>
              <Table size="medium">
                <TableHead>
                  <TableRow>

                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell >Age</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>Operation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users &&
                    users.map((user) => (
                      <TableRow key={user._id}>

                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.status === "Infected" ?
                          (<CoronavirusIcon style={{ color: "red" }} />) : (<CoronavirusIcon />)
                        }</TableCell>
                        <TableCell >{user.age}</TableCell>
                        <TableCell >{user.sex}</TableCell>
                        <TableCell>
                          {user.isAdmin ?
                            (<span style={{ color: "green", fontSize: "24px" }} >✔</span>) : (<span style={{ color: "red", fontSize: "24px" }}>✘</span>)
                          }
                        </TableCell>
                        <TableCell>
                          <Link to={`/edit-user/${user._id}`} ><EditRoundedIcon color="primary" /></Link>||
                          <DeleteRoundedIcon color="alert" onClick={() => {
                            deleteHandler(user._id);
                          }
                          } />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>



            </Paper>
          </Grid>
        </Container>
      </UniDashboardContent>
    </>

    // <>
    // // <table>
    //   <thead>
    //     <tr>
    //       <th>ID</th>
    //       <th>name</th>
    //       </tr>
    //   </thead>
    //   <tbody>
    //     {users&&
    //     users.map(user=>(
    //       <tr key={user._id}>
    //         <td>{user._id}</td>
    //         <td>{user.name}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table> */}

    //   </>
  );

}