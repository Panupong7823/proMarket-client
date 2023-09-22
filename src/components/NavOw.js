import React, { useState, useEffect } from 'react'
import './Nav.css'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";


export default function NavOw({ decodedData }) {
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
    <div style={{ maxWidth: 'xl' }}>
      <nav className='Sub'>
        <h4>Subsomboon Supermarket</h4>
        <p>{decoded?.firstname} {decoded?.lastname}</p>
      </nav>
      <nav>
        <button className="custom-button" onClick={handleNavigate}>
          <LogoutIcon />
        </button>
        <h2> ทรัพย์สมบูรณ์ซุปเปอร์มาเก็ต</h2>
        <a href='/owner/home'>หน้าหลัก</a>
        <a href='/owner/balance/data'>ข้อมูลค้างชำระ</a>
        <a href='/owner/datauser'>ข้อมูลส่วนตัว</a>
      </nav>
    </div>
  )
}

