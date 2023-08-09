import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import { Typography, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function InfoBalance() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    UserGet();
  }, [])

  const UserGet = (e) => {
    fetch("http://localhost:3001/databalance")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
        }
      )
  }


  return (
    <>
      <Nav />
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ p: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex">
              <Box sx={{ flexGrow: 1 }} >
                <Typography variant="h6" gutterBottom component="div">
                  Users
                </Typography>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">รหัสลูกค้า</TableCell>
                    <TableCell align="center">วันเวลา</TableCell>
                    <TableCell align="center">ยอดค้าง</TableCell>
                    <TableCell align="center">ยอดจ่าย</TableCell>
                    <TableCell align="center">ยอดรวม</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{row.cs_id}</TableCell>
                      <TableCell align="center">{row.date_time}</TableCell>
                      <TableCell align="center">{row.stale}</TableCell>
                      <TableCell align="center">{row.payout}</TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                      <TableCell align="center">

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </React.Fragment>
    </>
  );
}