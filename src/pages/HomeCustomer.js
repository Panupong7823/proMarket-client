import React, { useEffect, useState } from 'react';
import NavC from '../components/NavC';
import ConU from '../components/ConU';
import { Paper, Typography, Box } from '@mui/material';
import './Home.css';

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
          alert('Failed');
          localStorage.removeItem('token');
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
      .catch((error) => {
        console.error('Error:', error);
        alert(error.message);
      });

  }, []);

  return (
    <>
      <NavC decodedData={decodedData} />
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
