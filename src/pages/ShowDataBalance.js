import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import NavOW from '../components/NavOw';
import { Chart } from 'chart.js/auto';

export default function ShowDataBalance() {
    const [totalStaleTotal, setTotalStaleTotal] = useState(0);
    const [totalPayTotal, setTotalPayTotal] = useState(0);
    const [totalTotal, setTotalTotal] = useState(0);
    const [decoded, setDecoded] = useState(null)
    const chartRef = useRef(null);

    useEffect(() => {
        setDecoded(JSON.parse(localStorage.getItem('decodedData')));
    }, []);


    useEffect(() => {
        UserGet();
    }, []);

    const UserGet = () => {
        fetch('http://localhost:3001/databalances')
            .then((res) => res.json())
            .then((result) => {
                setTotalStaleTotal(result.totalStaleTotal);
                setTotalPayTotal(result.totalPayTotal);
                setTotalTotal(result.totalTotal);
            });
    };

    useEffect(() => {
        UserGet();

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('myChart').getContext('2d');
        const newChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['ยอดค้างรวม', 'ยอดจ่ายรวม'],
                datasets: [
                    {
                        data: [totalTotal, totalPayTotal],
                        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                    },
                ],
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const data = context.dataset.data;
                                const total = data.reduce((acc, value) => acc + value, 0);
                                const value = data[context.dataIndex];
                                const percentage = ((value / total) * 100).toFixed(2);
                                return `${context.label}: ${value} (${percentage}%)`;
                            },
                        },
                    },
                },
            },
        });

        chartRef.current = newChart;

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [totalTotal, totalPayTotal]);

    return (
        <>
            {decoded && decoded.role=== 2 && <Nav />}
            {decoded && decoded.role === 3 && <NavOW />}
            <CssBaseline />
            <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
                <Card sx={{ width: '30%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', marginRight: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }} gutterBottom>
                            ยอดค้างรวม
                        </Typography>
                        <Typography variant="h4" sx={{ color: 'black', textAlign: 'center' }}>
                            {totalStaleTotal.toLocaleString()}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width: '30%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', marginRight: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }} gutterBottom>
                            ยอดจ่ายรวม
                        </Typography>
                        <Typography variant="h4" sx={{ color: 'black', textAlign: 'center' }}>
                            {totalPayTotal.toLocaleString()}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width: '30%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }} gutterBottom>
                            ยอดรวม
                        </Typography>
                        <Typography variant="h4" sx={{ color: 'black', textAlign: 'center' }}>
                            {totalTotal.toLocaleString()}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width: '100%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }} gutterBottom>
                            แผนภูมิวงกลม
                        </Typography>
                        <canvas id="myChart"></canvas>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
