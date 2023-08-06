import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NavC from '../components/NavC';
import { Button, Typography, Paper, ButtonGroup } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';

export default function InfoOd() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    UserGet();
  }, [])

  const UserGet = (e) => {
    fetch("http://localhost:3001/data")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
        }
      )
  }

  const Useredit = id =>{
    window.location = '/update/' + id 
  }

  const Userdel = id => {
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
          UserGet();
      })
      .catch(error => console.log('error', error));
  }


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
              <Box style={{ marginBottom: '20px' }}>
                <Link href="uc">
                  <Button variant="contained">Create</Button>
                </Link>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="center">FirstName</TableCell>
                    <TableCell align="center">LastName</TableCell>
                    <TableCell align="center">Career</TableCell>
                    <TableCell align="center">Telephone</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.firstname}</TableCell>
                      <TableCell align="center">{row.lastname}</TableCell>
                      <TableCell align="center">{row.career}</TableCell>
                      <TableCell align="center">{row.tel}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup>
                          <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={() => Useredit(row.id)}>Edit</Button>
                            <Button onClick={() => Userdel(row.id)}>Del </Button>
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