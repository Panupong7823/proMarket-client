import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function AdminEditAO() {
    const { id } = useParams();
    const [firstname, setFname] = useState('');
    const [lastname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

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
                    setFname(result?.admin_firstname || result?.owner_firstname || '');
                    setLname(result?.admin_lastname || result?.owner_lastname || '');
                    setUsername(result?.username || '');
                    setPassword(result?.password || '');
                    setRole(result?.role || '');
                })
                .catch(error => console.log('error', error));
        } catch (err) {
            alert(`${err}`);
        }
    }, [id]);
    

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id,
            "username": username,
            "password": password,
            "firstname": firstname,
            "lastname": lastname,
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let updateURL;
        if (role === 2) {
            updateURL = "http://localhost:3001/update/admin/" + id;
        } else if (role === 3) {
            updateURL = "http://localhost:3001/update/owner/" + id;
        }

        fetch(updateURL, requestOptions)
            .then(response => response.json())
            .then(result => {
                alert('Success');
                if (result['status'] === 'ok') {
                    window.location.href = '/admin/datauser';
                } else if (result['status'] === 'error' && result['message'] === 'Not found') {
                    fetch(updateURL, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            if (result['status'] === 'ok') {
                                window.location.href = '/admin/datauser';
                                alert('Success');
                            } else {
                                alert('ไม่พบข้อมูลผู้ใช้');
                            }
                        })
                        .catch(error => console.log('error', error));
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <Nav />
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        แก้ไขบัญชีผู้ใช้
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>

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
                                <TextField
                                    id="password"
                                    label="รหัสผ่าน"
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Button type='submit' variant="contained" fullWidth>แก้ไข</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </React.Fragment>
        </>
    );
}

