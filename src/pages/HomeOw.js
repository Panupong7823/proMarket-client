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

export default function HomeOW(){
  const [decodedData, setDecodedData] = useState(null);
  const [message, setMessage] = useState('กรุณาชำระเงินไม่เกินวันที่ 25 ของทุกเดือน \n หากเกินกำหนด จะขอยุติการจำหน่ายสินค้าจนกว่าจะชำระเงินเรียบร้อย');
  const [newMessage, setNewMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleEditClick = () => {
    setNewMessage(message); // กำหนดข้อความใหม่ให้เป็นค่าเดิมเมื่อเปิด Popup
    setOpen(true);
  };

  const handleChangeText = () => {
    setOpen(false);
    setMessage(newMessage);
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
      window.location.href = '/'; 
    }
  }, [decodedData]);

  return (
    <>
      <NavOw decodedData={decodedData} />
      <div>
        <h1>ประกาศ</h1>
        <Box display="flex" justifyContent="center">
          <Paper className="pp_noti" elevation={0} sx={{ bgcolor: ' #f9e1fe', padding: '16px', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ whiteSpace: 'pre-line' }}>
              {message}
            </Typography>
          </Paper>
        </Box>
        <button onClick={handleEditClick}>แก้ไข</button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle >แก้ไขข้อความ</DialogTitle>
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
