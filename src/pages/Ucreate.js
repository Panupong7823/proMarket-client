import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import NavC from '../components/NavC';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function Ucreate() {

    const [firstname, setFname] = useState('');
    const [lastname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [career, setCareer] = useState('');
    const [tel, setTel] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": username,
            "password": password,
            "firstname": firstname,
            "lastname": lastname,
            "career": career,
            "tel": tel
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
                alert('Success')
                if(result['status'] === 'ok'){
                    window.location.href = '/o'
                }
            })
            .catch(error => console.log('error', error));
    }
    return (
        <>
            <NavC />
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Create User
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField id="firstname" label="Firstname" variant="outlined" fullWidth required
                                    onChange={(e) => setFname(e.target.value)} />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField id="lastname" label="Lastname" variant="outlined" fullWidth required
                                    onChange={(e) => setLname(e.target.value)} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="username" label="username" variant="outlined" fullWidth required
                                    onChange={(e) => setUsername(e.target.value)} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="password" label="Password" variant="outlined" fullWidth required
                                    onChange={(e) => setPassword(e.target.value)} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="career" label="Career" variant="outlined" fullWidth required
                                    onChange={(e) => setCareer(e.target.value)} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="tel" label="Telephone" variant="outlined" fullWidth required
                                    onChange={(e) => setTel(e.target.value)} />
                            </Grid>
                            <Grid item xs={12} >
                                <Button type='submit' variant="contained" fullWidth>Create</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </React.Fragment>
        </>
    );
}
