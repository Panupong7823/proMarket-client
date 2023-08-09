import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import { Button, Grid, TextField} from '@mui/material';

export default function Bedit() {
    const { id } = useParams();
    const [cs_id, setCustomerID] = useState('');
    const [date_time, setDateTime] = useState('');
    const [amount, setAmount] = useState('');

    
    useEffect(() => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            fetch("http://localhost:3001/datastale/" + id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setCustomerID(result?.cs_id)
                    setDateTime(result?.date_time)
                    setAmount(result?.amount)
                    
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
            "date_time": date_time,
            "amount": amount,
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/updatestale/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                alert('Success')
                if (result['status'] === 'ok') {
                    window.location.href = '/iBl'
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
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    id="cs_id"
                                    label="Customer ID"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={(e) => setCustomerID(e.target.value)}
                                    value={cs_id}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    id="date_time"
                                    label="DateTime"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={(e) => setDateTime(e.target.value)}
                                    value={date_time}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    id="amount"
                                    label="Amount"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={(e) => setAmount(e.target.value)}
                                    value={amount}
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