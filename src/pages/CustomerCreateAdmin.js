import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';

export default function CustomerCreateAdmin() {
    const [cs_id, setCustomerID] = useState('');
    const [firstname, setFname] = useState('');
    const [lastname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [career, setCareer] = useState('');
    const [tel, setTel] = useState('');
    const [salary, setSalary] = useState('');
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
            "cs_id": cs_id,
            "username": username,
            "password": password,
            "firstname": firstname,
            "lastname": lastname,
            "career": career,
            "tel": tel,
            "salary": salary
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/regis", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result['status'] === 'ok') {
                    Swal.fire({
                        title: 'ลงทะเบียนเรียบร้อย',
                        icon: 'success',
                        showConfirmButton: false,
                    });
                    window.location.href = '/admin/datauser';
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
            <CssBaseline />
            <Container maxWidth="sm" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                    สร้างบัญชีผู้ใช้
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {/* Input fields */}
                        <Grid item xs={12} >
                            <TextField id="cs_id" label="รหัสผู้ใช้" variant="outlined" fullWidth required
                                onChange={(e) => setCustomerID(e.target.value)}
                                value={cs_id} />
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
                        <Grid item xs={12} sm={6}>
                            <TextField id="career" label="อาชีพ" variant="outlined" fullWidth required
                                onChange={(e) => setCareer(e.target.value)}
                                value={career} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="tel" label="เบอร์โทรศัพท์" variant="outlined" fullWidth required
                                onChange={(e) => setTel(e.target.value)}
                                value={tel} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="salary" label="เงินเดือน" variant="outlined" fullWidth required
                                onChange={(e) => setSalary(e.target.value)}
                                value={salary} />
                        </Grid>
                        <Grid item xs={12} >
                            <Button type='submit' variant="contained" fullWidth>สร้าง</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
}
