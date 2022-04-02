import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
//import Link from '@mui/material/Link';
import Title from '../../components/titles/titles.component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import UniDashboardContent from '../../components/dashboardcon/dashboardcontent.component';

function createData(id, name, email, status, infectedDay) {
    return { id, name, email, status, infectedDay };
  }
  
  const rows = [
    createData(
      '0',
      'Elvi Presley',
      'elvi@hai.com',
      '1',
      '0',
    ),
    createData(
      '1',
      'Paul McCartney',
      'Laron@jam.com',
      '1',
      '4',
      
    ),
  ];

  export default function QuarantinePage() {
    return(
          <UniDashboardContent>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <React.Fragment>
      <Title>Employees</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Infected Days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">{row.infectedDay}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </React.Fragment>
    
                </Paper>
              </Grid>
          </Container>
          </UniDashboardContent>
      
  );
}

