import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import ConU from '../components/ConU';
import { Paper, Typography, Box } from '@mui/material';
import './Home.css';
import Swal from 'sweetalert2'

export default function HomeAdmin() {
  const [decodedData, setDecodedData] = useState(null);
  const [message, setMessage] = useState('');

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
          localStorage.setItem('decodedData', JSON.stringify(data.decoded));
          setDecodedData(data.decoded);
        } else {
          localStorage.removeItem(token);
          window.location.href = '/';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/message')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch message');
        }
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error', 
          title: 'เกิดข้อผิดพลาด',
          text: `${err}`, 
        });
      });

  });

  return (
    <>
      <Nav decodedData={decodedData} />
      <div>
        <h1>ประกาศ</h1>
        <Box display="flex" justifyContent="center">
          <Paper
            className="pp_noti"
            elevation={0}
            sx={{ bgcolor: ' #f9e1fe', padding: '16px', textAlign: 'center' }}
          >
            <Typography variant="h6" sx={{ whiteSpace: 'pre-line' }}>
              {message}
            </Typography>
          </Paper>
        </Box>
      </div>
      <ConU />
    </>
  );
}


