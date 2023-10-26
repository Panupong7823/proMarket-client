import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import { Button, Grid, TextField, Typography, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Bcreate() {
    const navigate = useNavigate();
    const [cs_id, setCustomerID] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState(0);
    const [salary, setSalary] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:3001/data", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data && data[0] && data[0].salary) {
                    setSalary(data[0].salary);
                }
            })
            .catch(error => console.log('error', error));

        fetch("http://localhost:3001/databalances", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data && data.datatotalResult && data.datatotalResult[0] && data.datatotalResult[0].total) {
                    setTotal(data.datatotalResult[0].total);
                }
            })
            .catch(error => console.log('error', error));
    }, []);

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;
        setStatus(selectedStatus);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const csIdToCheck = cs_id; 
        let raw = '';

        if (parseInt(total) > parseInt(salary)) {
            if (parseInt(status) === 1) {
                alert(`Customer ID ${csIdToCheck} มียอดค้างมากกว่าเงินเดือน`);
            } else if (parseInt(status) === 2) {
                raw = JSON.stringify({
                    "cs_id": cs_id,
                    "amount": amount,
                    "status": status
                });
            }
        } else {
            raw = JSON.stringify({
                "cs_id": cs_id,
                "amount": amount,
                "status": status
            });
        }
        if (raw !== '') {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

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
                    if (result['status'] === 'ok') {
                        navigate('/InfoBsOw');
                    }
                })
                .catch(error => console.log('error', error));
        }

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
                                <Select
                                    id="status"
                                    fullWidth
                                    required
                                    onChange={handleStatusChange}
                                    value={status}
                                >
                                    <MenuItem value={1}>ค้าง</MenuItem>
                                    <MenuItem value={2}>จ่าย</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="cs_id" label="Customer ID" variant="outlined" fullWidth required
                                    onChange={(e) => setCustomerID(e.target.value)}
                                    value={cs_id} />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="amount" label="Amount" variant="outlined" fullWidth required
                                    onChange={(e) => setAmount(e.target.value)}
                                    value={amount} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type='submit' variant="contained" fullWidth>แก้ไข</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </React.Fragment>
        </>
    );
}
