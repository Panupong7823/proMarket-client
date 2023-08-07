import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NavC from '../components/NavC';
import { Typography, Paper} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



export default function Checkbl() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(()=>token)
    const decodedData = JSON.parse(localStorage.getItem('decodedData'));
    const userId = decodedData?.user_id
    // เรียก API ดึงข้อมูลตารางจากฐานข้อมูล
    fetch(`http://localhost:3001/datauser/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedData = JSON.parse(localStorage.getItem('decodedData'));
    const userId = decodedData?.user_id
    // เรียก API ดึงข้อมูลตารางจากฐานข้อมูล
    fetch(`http://localhost:3001/datauser/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => setData(data))
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
                  Users
                </Typography>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">customer ID</TableCell>
                    <TableCell align="right">FirstName</TableCell>
                    <TableCell align="right">lastname</TableCell>
                    <TableCell align="right">Username</TableCell>
                    <TableCell align="right">Career</TableCell>
                    <TableCell align="right">Tel</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{row.cs_id}</TableCell>
                      <TableCell align="right">{row.firstname}</TableCell>
                      <TableCell align="right">{row.lastname}</TableCell>
                      <TableCell align="right">{row.username}</TableCell>
                      <TableCell align="right">{row.career}</TableCell>
                      <TableCell align="right">{row.tel}</TableCell>
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