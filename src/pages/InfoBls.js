import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Paper, ButtonGroup, Typography } from '@mui/material';
import Link from '@mui/material/Link';

export default function InfoBls() {
  const [databalanceResult, setDatabalanceResult] = useState([]);



  useEffect(() => {
    UserGet();
  }, []);

  const UserGet = () => {
    fetch("http://localhost:3001/databalances")
      .then(res => res.json())
      .then(result => {
        setDatabalanceResult(result.databalanceResult);
      });
  };

  const Useredit = id => {
    window.location = '/updateBdit/' + id
  }

  const Balancedel = id => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": id

    });
    console.log(id)

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("http://localhost:3001/deletebl", requestOptions)
      .then(response => response.json())
      .then(result => {
        alert("Delete Success")
        UserGet();
      })
      .catch(error => console.log('error', error));

  }

  return (
    <>
      <Nav />
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }} >
              <Typography variant="h6" gutterBottom component="div">
                Balance
              </Typography>
            </Box>
            <Box style={{ marginBottom: '20px' }}>
              <Link href="bc">
                <Button variant="contained">สร้าง</Button>
              </Link>
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
                  <TableCell align="center">ดำเนินการ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {databalanceResult.map(row => (
                  <TableRow key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{row.cs_id}</TableCell>
                    <TableCell align="center">{row.date_time}</TableCell>
                    <TableCell align="center">
                      {row.status_description === "stale" ? row.amount.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}
                    </TableCell>
                    <TableCell align="center">
                      {row.status_description === "pay" ? row.amount.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                          <Button onClick={() => Useredit(row.id)}>แก้ไข</Button>
                          <Button onClick={() => Balancedel(row.id)}> ลบ </Button>
                        </ButtonGroup>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}
