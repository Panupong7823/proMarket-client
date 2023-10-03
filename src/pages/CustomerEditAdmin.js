import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2'

export default function CustomerEditAdmin() {
    const { id } = useParams();
    const [cs_id, setCustomerID] = useState('');
    const [firstname, setFname] = useState('');
    const [lastname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [career, setCareer] = useState('');
    const [tel, setTel] = useState('');
    const [salary, setSalary] = useState('');
    const [decoded, setDecoded] = useState(null)

    useEffect(() => {
        setDecoded(JSON.parse(localStorage.getItem('decodedData')))
    })
    useEffect(() => {
        try {
            if (!id) {
                return;
            }
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch("http://localhost:3001/data/" + id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    setCustomerID(result?.cs_id || '');
                    setFname(result?.firstname || '');
                    setLname(result?.lastname || '');
                    setUsername(result?.username || '');
                    setPassword(result?.password || '');
                    setCareer(result?.career || '');
                    setTel(result?.tel || '');
                    setSalary(result?.salary || '');
                })
                .catch(error => console.log('error', error));
        } catch (err) {
        }
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id,
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
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/update/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {

                if (result['status'] === 'ok') {
                    Swal.fire({
                        icon: 'success',
                        title: 'แก้ไขบัญชีผู่ใช้สำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    if (decoded.role === 2) {
                        window.location.href = '/admin/datauser';
                    } else if (decoded.role === 3) {
                        window.location.href = '/owner/datauser';
                    }
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: `${err}`,
                });
            });
    }

    return (
        <>
            <Nav />
            <CssBaseline />
            <Container maxWidth="sm" sx={{ p: 5 }}>
                <Typography variant="h6" gutterBottom component="div">
                    แก้ไขบัญชีผู้ใช้
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField id="cs_id" label="รหัสผู้ใช้" variant="outlined" fullWidth required
                                onChange={(e) => setCustomerID(e.target.value)}
                                value={cs_id} />
                        </Grid>
                        <Grid item xs={6} >
                            <TextField id="firstname" label="ชื่อ" variant="outlined" fullWidth required
                                onChange={(e) => setFname(e.target.value)}
                                value={firstname} />
                        </Grid>
                        <Grid item xs={6} >
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
                            <TextField
                                id="password"
                                label="รหัสผ่าน"
                                variant="outlined"
                                fullWidth
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password || ''}
                            />
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
                            <Button type='submit' variant="contained" fullWidth>แก้ไข</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
}

