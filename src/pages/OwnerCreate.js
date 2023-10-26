import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2'

export default function OwnerCreate() {
    const [ow_id, setOwnerID] = useState('');
    const [firstname, setFname] = useState('');
    const [lastname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkUsername, setCheckUsername] = useState([]);

    useEffect(() => {
        fetchUsernames();
    }, []);

    const fetchUsernames = async () => {
        try {
            const response = await fetch("http://localhost:3001/checkusername");
            if (response.ok) {
                const data = await response.json();
                setCheckUsername(data);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'ดึงข้อมูลชื่อผู้ใช้ไม่สำเร็จ',
                    icon: 'error',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'เกิดข้อผิดพลาดขณะดึงข้อมูลชื่อผู้ใช้',
                icon: 'error',
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isUsernameTaken = checkUsername.includes(username);

        if (isUsernameTaken) {
            Swal.fire({
                title: 'Error',
                text: 'ชื่อผู้ใช้นี้มีผู้ใช้แล้ว',
                icon: 'error',
                confirmButtonText: 'ยืนยัน'
            });
            return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "ow_id": ow_id,
            "username": username,
            "password": password,
            "firstname": firstname,
            "lastname": lastname,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/regisOw", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result['status'] === 'ok') {
                    Swal.fire({
                        title: 'ลงทะเบียนเรียบร้อย',
                        icon: 'success',
                        showConfirmButton: false,
                    }).then(()=>{window.location.href = '/admin/datauser';})
                } else if (result['status'] === 'error' && result['message'] && result['message']['code'] === 'ER_DUP_ENTRY') {
                    Swal.fire({
                        title: 'Error',
                        text: 'รหัสผู้ใช้นี้มีแล้ว',
                        icon: 'error',
                        confirmButtonText: 'ยืนยัน'
                    });
                } else if (result['status'] === 'error' && result['message'] && result['message']['code'] === 'ER_BAD_FIELD_ERROR') {
                    Swal.fire({
                        title: 'Error',
                        text: 'มีคอลัมน์ที่ไม่รู้จักในฐานข้อมูล',
                        icon: 'error',
                        confirmButtonText: 'ยืนยัน'
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'เกิดข้อผิดพลาด: ' + JSON.stringify(result),
                        icon: 'error',
                        confirmButtonText: 'ยืนยัน'
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: 'เกิดข้อผิดพลาดขณะส่งคำขอ: ' + error.message,
                    icon: 'error',
                    confirmButtonText: 'ยืนยัน'
                });
            });

    };

    return (
        <>
            <Nav />
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        สร้างบัญชีผู้ใช้
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField id="ow_id" label="รหัสผู้ใช้" variant="outlined" fullWidth required
                                    onChange={(e) => setOwnerID(e.target.value)}
                                    value={ow_id} />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField id="firstname" label="ชื่อ" variant="outlined" fullWidth required
                                    onChange={(e) => setFname(e.target.value)}
                                    value={firstname} />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField id="lastname" label="นามสกุล" variant="outlined" fullWidth required
                                    onChange={(e) => setLname(e.target.value)}
                                    value={lastname} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="username" label="ชื่อผู้ใช้" variant="outlined" fullWidth required
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="password" label="รหัสผ่าน" variant="outlined" type="password" fullWidth required
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password} />
                            </Grid>

                            <Grid item xs={12} >
                                <Button type='submit' variant="contained" fullWidth>สร้าง</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </React.Fragment>
        </>
    );
}
