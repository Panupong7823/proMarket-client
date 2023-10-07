import React, { useState, useEffect } from 'react'
import './Nav.css'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";



export default function Nav({decodedData}) {
  const navigate = useNavigate();
  const [decoded, setDecoded] = useState(null)

  useEffect(() => {
    setDecoded(JSON.parse(localStorage.getItem('decodedData')))
  }, [decodedData])

  const handleNavigate = () => {
    localStorage.clear()
    navigate('/');
  };
  return (

    <div style={{ width :'100%'}}>
      <nav className='Sub'>
        <h4>Supsomboon Supermarket</h4>
        <p style={{color: 'white',marginRight:'24px'}}>{decoded?.firstname} {decoded?.lastname}</p>
      </nav>
      <nav>
        <button className="custom-button" onClick={handleNavigate}>
          <LogoutIcon />
        </button>
        <h2> ทรัพย์สมบูรณ์ซุปเปอร์มาเก็ต</h2>
        <a href='/admin/home'>หน้าหลัก</a>
        <a href='/admin/balance/data'>ข้อมูลค้างชำระ</a>
        <a href='/admin/datauser'>ข้อมูลส่วนตัว</a>
        <a href='/show'>รายงาน</a>
      </nav>
    </div>
  )
}

