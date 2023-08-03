import React from 'react'
import NavC from '../components/NavC'
import { useEffect } from 'react'
import { Paper,Typography } from '@mui/material'
import './Home.css'
import axios from 'axios'

function Home() {
  
  useEffect(() => {
  //   // const token = localStorage.getItem('token')
  //   // fetch("http://localhost:3001/auth", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //     'Authorization':'Bearer '+token
  //   //   },
  //   // })
  //   //   .then(response => response.json())
  //   //   .then(data => {
  //   //     if (data.status === 'ok') {

  //   //     } else
  //   //       alert('failed')
          
        
  //   //     //console.log('Success:',data)
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log('Error', error)
  //   //   })

    
    const token = localStorage.getItem('token');
    axios.post("http://localhost:3001/auth", null, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.data)
      .then(data => {
        if (data.status === 'ok') {
          alert('seccess');
        } else {
          alert('failed');
        }
      })
      .catch(error => {
        console.log('Error', error);
      });
  }, []);

  return (
    <>
    <NavC/>
    <div>
      <h1>ประกาศ</h1>
      <Paper className='pp_noti' elevation={0} sx={{ bgcolor: ' #f9e1fe' }} >
        <Typography variant="h6">กรุณาชำระเงินไม่เกินวันที่ 25 ของทุกเดือน</Typography>
        <Typography variant="h6">หากเกินกำหนด จะขอยุติการจำหน่ายสินค้าจนกว่าจะชำระเงินเรียบร้อย</Typography>
      </Paper>
    </div>
    </>
  )
}

export default Home