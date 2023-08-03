import React from 'react'
import './Nav.css'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";



function NavC() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/');
  };
  return (
    <div>
      <nav className='Sub'>
        <h4>Subsomboon Supermarket</h4>
      </nav>
      <nav>
        <button className="custom-button" onClick={handleNavigate}>
          <LogoutIcon />
        </button>
        <h2> ทรัพย์สมบูรณ์ซุปเปอร์มาเก็ต</h2>
        <a href='#'>ข้อมูลค้างชำระ</a>
        <a href='/o'>ข้อมูลส่วนตัว</a>
      </nav>
    </div>
  )
}

export default NavC