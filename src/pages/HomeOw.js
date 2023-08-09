import React, { useEffect, useState } from 'react';
import NavOw from '../components/NavOw';
import ConU from '../components/ConU';
import { Paper, Typography } from '@mui/material';
import './Home.css';

export default function HomeOW(){
  const [decodedData, setDecodedData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
      return;
    }
    fetch('http://localhost:3001/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          // ดึงข้อมูลใน decoded token
          setDecodedData(() => {
            localStorage.setItem('decodedData', JSON.stringify(data.decoded));
            return data.decoded
          });
        } else {
          alert('failed');
          localStorage.removeItem(token)
          window.location.href = '/';
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }, []);

  useEffect(() => {
    if (decodedData && decodedData.role !== 1) {
      window.location.href = '/'; // เปลี่ยนเส้นทางไปยังหน้าอื่น
    }
  }, [decodedData]);


  return (
    <>
      <NavOw decodedData={decodedData}/>
      <div>
        <h1>ประกาศ</h1>
        <Paper className="pp_noti" elevation={0} sx={{ bgcolor: ' #f9e1fe' }}>
          <Typography variant="h6">กรุณาชำระเงินไม่เกินวันที่ 25 ของทุกเดือน</Typography>
          <Typography variant="h6">หากเกินกำหนด จะขอยุติการจำหน่ายสินค้าจนกว่าจะชำระเงินเรียบร้อย</Typography>
        </Paper>
      </div>
      <ConU />
    </>
  );
}


