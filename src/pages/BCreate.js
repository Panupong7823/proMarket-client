import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Bcreate() {

    const navigate = useNavigate()
    const [cs_id, setCustomerID] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "cs_id": cs_id,
            "amount": amount,
            "status": status
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/regisBl", requestOptions)
            .then(response => response.json())
            .then(result => {
                alert('Success')
                if(result['status'] === 'ok'){
                     navigate('/iBl');
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
                                <TextField id="amount" label="Amount" variant="outlined" fullWidth required
                                    onChange={(e) => setAmount(e.target.value)}
                                    value={amount} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="status" label="Status" variant="outlined" fullWidth required
                                    onChange={(e) => setStatus(e.target.value)}
                                    value={status} />
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