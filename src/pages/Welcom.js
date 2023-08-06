import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavH from '../components/NavH';
import { useNavigate } from 'react-router-dom';


export default function SignIn() {
  const navigate = useNavigate()
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userRole, setUserRole] = useState(null); // เก็บข้อมูลสิทธิ์ของผู้ใช้
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const logdata = {
      username: data.get('username'),
      password: data.get('password'),
    };

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logdata),
      });

      const data = await response.json();

      if (data.status === 'ok') {
        localStorage.setItem('token', data.token);
        setLoginSuccess(true); // เก็บสถานะการล็อกอินสำเร็จ

        // เก็บสิทธิ์ของผู้ใช้จาก row ของผู้ใช้ที่ล็อกอินเข้าสู่ระบบ
        setUserRole(data.user);

        alert('success');
      } else {
        alert('failed');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  // หากล็อกอินสำเร็จให้เปลี่ยนหน้าไปยังหน้าที่กำหนดตามสิทธิ์ของผู้ใช้
  if (loginSuccess) {
    switch (userRole) {
      case 1:
        navigate('/h'); 
        break;
      case 0:
        navigate('/h'); 
        break;
      default:
        break;
    }
    return renderPageBasedOnUserRole(userRole);
  }

  return (
    <>
      <NavH />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h3" sx={{ color: "purple" }}>
            Welcome
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="ชื่อบัญชีผู้ใช้"
              name="username"
              autoComplete="user"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "purple" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                {/* <Link href="/r" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}


function renderPageBasedOnUserRole(userRole) {
  if (userRole === 1) { 
    return 
  } else if (userRole === 0) { 
    return 
  } else {
    return <div>not found</div>;
  }
}

