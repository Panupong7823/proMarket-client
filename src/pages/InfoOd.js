import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import { Button, Typography, Paper, ButtonGroup } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';


export default function InfoOd() {
  const [itemsData, setItemsData] = useState([]);
  const [itemsDataAd, setItemsDataAd] = useState([]);
  const [itemsDataOw, setItemsDataOw] = useState([]);
  const [datatotalResult, setDatatotalResult] = useState([]);


  useEffect(() => {
    fetchData();
    fetchDataAd();
    fetchDataOw();
    fetchDataBalances();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3001/data")
      .then(res => res.json())
      .then(result => {
        setItemsData(result);
      });
  };

  const fetchDataAd = () => {
    fetch("http://localhost:3001/dataAd")
      .then(res => res.json())
      .then(result => {
        setItemsDataAd(result);
      });
  };
  const fetchDataOw = () => {
    fetch("http://localhost:3001/dataOw")
      .then(res => res.json())
      .then(result => {
        setItemsDataOw(result);
      });
  };

  const fetchDataBalances = () => {
    fetch("http://localhost:3001/databalances")
      .then(res => res.json())
      .then(result => {
        setDatatotalResult(result.datatotalResult);
      });
  };

  const Useredit = id => {
    window.location = '/update/' + id
  }
  const AdOwedit = id => {
    window.location = '/updateAdOw/' + id
  }

  const Userdel = (id, isAd) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": id
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3001/delete", requestOptions)
      .then(response => response.json())
      .then(result => {
        alert("Delete Success")
        if (isAd) {
          fetchDataAd();
        } else if (isAd) {
          fetchData();
        } else {
          fetchDataOw();
        }
        fetchDataBalances();
      })
      .catch(error => console.log('error', error));
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
              <Box style={{ marginBottom: '20px' }}>
                <Link href="uc">
                  <Button variant="contained">สร้าง</Button>
                </Link>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>รหัสลูกค้า</TableCell>
                    <TableCell align="center">ชื่อ</TableCell>
                    <TableCell align="center">นามสกุล</TableCell>
                    <TableCell align="center">อาชีพ</TableCell>
                    <TableCell align="center">เบอร์โทรศัพท์</TableCell>
                    <TableCell align="center">เงินเดือน</TableCell>
                    <TableCell align="center">ยอดค้างรวม</TableCell>
                    <TableCell align="center">ดำเนินการ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemsData.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{row.cs_id}</TableCell>
                      <TableCell align="center">{row.firstname}</TableCell>
                      <TableCell align="center">{row.lastname}</TableCell>
                      <TableCell align="center">{row.career}</TableCell>
                      <TableCell align="center">{row.tel}</TableCell>
                      <TableCell align="center">{row.salary.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                      <TableCell align="center">
                        {datatotalResult.find(totalRow => totalRow.cs_id === row.cs_id)?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0}
                      </TableCell>
                      <TableCell align="center">
                        <ButtonGroup>
                          <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={() => Useredit(row.id)}>แก้ไข</Button>
                            <Button onClick={() => Userdel(row.id, false)}> ลบ </Button>
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

        <Container maxWidth="lg" sx={{ p: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex">
              <Box sx={{ flexGrow: 1 }} >
                <Typography variant="h6" gutterBottom component="div">
                  Admins
                </Typography>
              </Box>
              <Box style={{ marginBottom: '20px' }}>
                <Link href="ac">
                  <Button variant="contained">สร้าง</Button>
                </Link>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>รหัสลูกค้า</TableCell>
                    <TableCell align="center">ชื่อ</TableCell>
                    <TableCell align="center">นามสกุล</TableCell>
                    <TableCell align="center">อาชีพ</TableCell>
                    <TableCell align="center">เบอร์โทรศัพท์</TableCell>
                    <TableCell align="center">ดำเนินการ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemsDataAd.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{row.cs_id}</TableCell>
                      <TableCell align="center">{row.firstname}</TableCell>
                      <TableCell align="center">{row.lastname}</TableCell>
                      <TableCell align="center">{row.career}</TableCell>
                      <TableCell align="center">{row.tel}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup>
                          <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={() => AdOwedit(row.id)}>แก้ไข</Button>
                            <Button onClick={() => Userdel(row.id, true)}> ลบ </Button>
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

        <Container maxWidth="lg" sx={{ p: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex">
              <Box sx={{ flexGrow: 1 }} >
                <Typography variant="h6" gutterBottom component="div">
                  Owners
                </Typography>
              </Box>
              <Box style={{ marginBottom: '20px' }}>
                <Link href="oc">
                  <Button variant="contained">สร้าง</Button>
                </Link>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>รหัสลูกค้า</TableCell>
                    <TableCell align="center">ชื่อ</TableCell>
                    <TableCell align="center">นามสกุล</TableCell>
                    <TableCell align="center">อาชีพ</TableCell>
                    <TableCell align="center">เบอร์โทรศัพท์</TableCell>
                    <TableCell align="center">ดำเนินการ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemsDataOw.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{row.cs_id}</TableCell>
                      <TableCell align="center">{row.firstname}</TableCell>
                      <TableCell align="center">{row.lastname}</TableCell>
                      <TableCell align="center">{row.career}</TableCell>
                      <TableCell align="center">{row.tel}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup>
                          <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={() => AdOwedit(row.id)}>แก้ไข</Button>
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
      </React.Fragment>
    </>
  );
}
