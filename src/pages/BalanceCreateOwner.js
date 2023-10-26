import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import { Button, Grid, TextField, Typography, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export default function BalanceCreateOwner() {
    const navigate = useNavigate();
    const [cs_id, setCustomerID] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState(1);
    const [salary, setSalary] = useState(0);
    const [total, setTotal] = useState(0);
    const [dataSalary, setDataSalary] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                const salaryResponse = await fetch("http://localhost:3001/data", requestOptions);
                const salaryData = await salaryResponse.json();
                setDataSalary(salaryData);

                const totalResponse = await fetch("http://localhost:3001/databalances", requestOptions);
                const totalData = await totalResponse.json();
                if (totalData && totalData.datatotalResult && totalData.datatotalResult[0] && totalData.datatotalResult[0].total) {
                    setTotal(totalData.datatotalResult[0].total);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const csIdToCheck = cs_id;
        let raw = '';

        try {
            const totalResponse = await fetch(`http://localhost:3001/databalances?cs_id=${cs_id}`, {
                method: 'GET',
                redirect: 'follow'
            });

            const totalData = await totalResponse.json();

            if (totalData) {
                const filterData = totalData?.datatotalResult?.filter((e) =>
                    e.cs_id === cs_id
                );

                const csTotal = filterData[0]?.total ?? 0;

                if (status === 1 && (parseInt(amount) + parseInt(csTotal) > parseInt(salary))) {
                    Swal.fire({
                        title: 'เงินไม่พอ',
                        icon: 'error',
                        confirmButtonText: 'ยืนยัน'
                    })
                    return;
                }

                if (status === 1 && parseInt(csTotal) >= parseInt(salary)) {
                    Swal.fire({
                        title: 'ข้อความแจ้งเตือน',
                        text: `Customer ID ${csIdToCheck} มียอดคงเหลือรวมหรือน้อยกว่ารายได้ของพวกเขา`,
                        icon: 'info', 
                        confirmButtonText: 'ตกลง' 
                      });
                    return;
                }
                raw = JSON.stringify({
                    "cs_id": cs_id,
                    "amount": amount,
                    "status": status
                });

                if (raw !== '') {
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    const response = await fetch("http://localhost:3001/regisBl", requestOptions);
                    const result = await response.json();

                    if (result['status'] === 'ok') {
                        Swal.fire({
                            icon: 'success',
                            title: 'บันทึกสำเร็จ',
                            showConfirmButton: false,
                            timer: 1500
                          })
                        navigate('/owner/balance/data');
                    }
                }
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;
        setStatus(selectedStatus);
    };

    const handleIdChange = (e) => {
        const cs_id = e.target.value;
        const filterData = dataSalary?.find((e) =>
            e.cs_id === cs_id
        );
        setCustomerID(cs_id);
        setSalary(filterData?.salary || 0);
        setFirstName(filterData?.firstname || '');
        setLastName(filterData?.lastname || '');
    };


    return (
        <>
            <Nav />
            <CssBaseline />
            <Container maxWidth="sm" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                    สร้างยอดบัญชี
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="cs_id"
                                label="รหัสผู้ใช้"
                                variant="outlined"
                                fullWidth
                                required
                                onChange={handleIdChange}
                                value={cs_id}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="firstname"
                                label="ชื่อ"
                                variant="outlined"
                                fullWidth
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstname}
                                InputProps={{
                                    readOnly: true, 
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="lastname"
                                label="นามสกุล"
                                variant="outlined"
                                fullWidth
                                required
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastname}
                                InputProps={{
                                    readOnly: true, 
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="amount"
                                label="จำนวนเงิน"
                                variant="outlined"
                                fullWidth
                                required
                                onChange={(e) => setAmount(e.target.value)}
                                value={amount}
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                            <Button type="submit" variant="contained" fullWidth>
                                ยืนยัน
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
}