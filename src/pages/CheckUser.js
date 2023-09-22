import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NavC from '../components/NavC';
import { Typography, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ConU from '../components/ConU';

export default function CheckUser() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(() => token);
    const decodedData = JSON.parse(localStorage.getItem('decodedData'));
    const userId = decodedData?.cs_id;

    fetch(`http://localhost:3001/datauser/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => {
        setData(prevData => ({ ...prevData, datauser: data }));
      })
      .catch(error => console.error('Error:', error));

    fetch(`http://localhost:3001/datatotaltl/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(datatlData => setData(prevData => ({ ...prevData, datatl: datatlData.datatl })))
      .catch(error => console.error('Error:', error));
  }, [token]);

  return (
    <>
      <NavC />
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ p: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex">
              <Box sx={{ flexGrow: 1 }} >
                <Typography variant="h6" gutterBottom component="div">
                  ผู้ใช้งาน
                </Typography>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">รหัสลูกค้า</TableCell>
                    <TableCell align="center">ชื่อ</TableCell>
                    <TableCell align="center">นามสกุล</TableCell>
                    <TableCell align="center">อาชีพ</TableCell>
                    <TableCell align="center">เบอร์โทรศัพท์</TableCell>
                    <TableCell align="center">เงินเดือน</TableCell>
                    <TableCell align="center">ยอดค้างรวม</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.datauser && data.datatl && data.datauser.map(row => {
                    const datatlRow = data.datatl.find(datatlRow => datatlRow.cs_id === row.cs_id);
                    return (
                      <TableRow
                        key={row.user_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{row.cs_id}</TableCell>
                        <TableCell align="center">{row.firstname}</TableCell>
                        <TableCell align="center">{row.lastname}</TableCell>
                        <TableCell align="center">{row.career}</TableCell>
                        <TableCell align="center">{row.tel}</TableCell>
                        <TableCell align="center">
                          {row.salary ? row.salary.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ''}
                        </TableCell>
                        <TableCell align="center">
                          {datatlRow ? datatlRow.total.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </React.Fragment>
      <ConU />
    </>
  );
}

