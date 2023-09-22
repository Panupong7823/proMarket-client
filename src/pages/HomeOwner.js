import React, { useEffect, useState } from 'react';
import NavOw from '../components/NavOw';
import ConU from '../components/ConU';
import { Paper, Typography, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Home.css';

export default function HomeOwner() {
  const [decodedData, setDecodedData] = useState(null);
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleEditClick = () => {
    setNewMessage(message);
    setOpen(true);
  };

  const handleChangeText = () => {
    fetch('http://localhost:3001/message', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ newMessage }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update message');
        }
      })
      .then((data) => {
        setMessage(data.message);
        setOpen(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(error.message);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      .catch((error) => {
        console.error('Error:', error);
        alert(error.message);
      });

  });

  return (
    <>
      <NavOw decodedData={decodedData} />
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
        <div style={{ display: 'flex', justifyContent: 'right',padding: '10px' }}>
        <Button variant="contained" color="primary" onClick={handleEditClick}>
          แก้ไขประกาศ
        </Button>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>แก้ไขข้อความ</DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              value={newMessage}
              style={{ width: '350px', height: 'auto' }}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleChangeText} variant="contained" color="primary">
              บันทึก
            </Button>
            <Button onClick={handleClose}>ยกเลิก</Button>
          </DialogActions>
        </Dialog>
      </div>
      <ConU />
    </>
  );
}
