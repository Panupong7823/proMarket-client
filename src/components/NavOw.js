import React, { useState, useEffect } from 'react'
import './Nav.css'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";


export default function NavOw({decodedData}) {
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
    <div>
      <nav className='Sub'>
        <h4>Subsomboon Supermarket</h4>
        <p>{decoded?.firstname} {decoded?.lastname}</p>
      </nav>
      <nav>
        <button className="custom-button" onClick={handleNavigate}>
          <LogoutIcon />
        </button>
        <h2> ทรัพย์สมบูรณ์ซุปเปอร์มาเก็ต</h2>
        <a href='/homeOw'>หน้าหลัก</a>
        <a href='/InfoBsOw'>ข้อมูลค้างชำระ</a>
        <a href='/InfoUserOw'>ข้อมูลส่วนตัว</a>
      </nav>
    </div>
  )
}

