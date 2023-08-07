import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import NavC from '../components/NavC';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function Uedit() {
    const { id } = useParams();
    const [cs_id, setCustomerID] = useState('');
    const [firstname, setFname] = useState('');
    const [lastname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [career, setCareer] = useState('');
    const [tel, setTel] = useState('');

    useEffect(() => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            fetch("http://localhost:3001/data/" + id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setCustomerID(result?.cs_id)
                    setFname(result?.firstname)
                    setLname(result?.lastname)
                    setUsername(result?.username)
                    // setPassword(result?.password)
                    setCareer(result?.career)
                    setTel(result?.tel)
                }
                )
                .catch(error => console.log('error', error));
        }
        catch (err) {
            alert(`${err}`)
        }

        // .catch(error => console.log('error', error));
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
            "tel": tel
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
                alert('Success')
                if (result['status'] === 'ok') {
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
                                <TextField id="cs_id" label="Customer ID" variant="outlined" fullWidth required
                                    onChange={(e) => setCustomerID(e.target.value)}
                                    value={cs_id} />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField id="firstname" label="Firstname" variant="outlined" fullWidth required
                                    onChange={(e) => setFname(e.target.value)}
                                    value={firstname} />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField id="lastname" label="Lastname" variant="outlined" fullWidth required
                                    onChange={(e) => setLname(e.target.value)}
                                    value={lastname} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="username" label="username" variant="outlined" fullWidth required
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="password" label="Password" variant="outlined" fullWidth required
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="career" label="Career" variant="outlined" fullWidth required
                                    onChange={(e) => setCareer(e.target.value)}
                                    value={career} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="tel" label="Telephone" variant="outlined" fullWidth required
                                    onChange={(e) => setTel(e.target.value)}
                                    value={tel} />
                            </Grid>
                            <Grid item xs={12} >
                                <Button type='submit' variant="contained" fullWidth>Edit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </React.Fragment>
        </>
    );
}
