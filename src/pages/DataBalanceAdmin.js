import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { format } from 'date-fns-tz'; // เปลี่ยน import นี้
import { th } from 'date-fns/locale';
import { Typography } from '@mui/material';
import { Box, Link } from '@mui/material';

export default function DataBalanceAdmin() {
  const [databalanceResult, setDatabalanceResult] = React.useState([]);

  React.useEffect(() => {
    UserGet();
  }, []);

  const UserGet = () => {
    fetch("http://localhost:3001/databalances")
      .then(res => res.json())
      .then(result => {
        setDatabalanceResult(result.databalanceResult);
      });
  };

  const Useredit = id => {
    window.location = '/admin/updatebalance/' + id;
  };

  const Balancedel = id => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": id
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("http://localhost:3001/deletebl", requestOptions)
      .then(response => response.json())
      .then(result => {
        alert("Delete Success");
        UserGet();
      })
      .catch(error => console.log('error', error));
  };

  const columns = [
    {
      field: 'cs_id',
      headerName: 'รหัสลูกค้า',
      width: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'date_time',
      headerName: 'วันเวลา',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => {
        const date = new Date(params.row.date_time);
        const thaiYear = date.getFullYear() + 543;
        return format(date, `dd MMM ${thaiYear} HH:mm`, { locale: th, era: 'long' });
      },
    },
    

    {
      field: 'staleAmount',
      headerName: 'ยอดค้าง',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        params.row.status_description === 'stale'
          ? params.row.amount.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '0',
    },
    {
      field: 'payAmount',
      headerName: 'ยอดจ่าย',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        params.row.status_description === 'pay'
          ? params.row.amount.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '0',
    },
    {
      field: 'actions',
      headerName: 'ดำเนินการ',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div>
          <ButtonGroup>
            <Button onClick={() => Useredit(params.row.id)}>แก้ไข</Button>
            <Button onClick={() => Balancedel(params.row.id)}>ลบ</Button>
          </ButtonGroup>
        </div>
      ),
    },
  ];

  return (
    <>
      <Nav />
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: '16px',
          }}
        >
          <Typography sx={{ marginLeft: '60px' }} variant="h6" gutterBottom component="div">
            ตารางยอดค้าง
          </Typography>
          <Link href="/admin/balance/create" >
            <Button variant="contained" sx={{ marginRight: '60px', }}>สร้าง</Button>
          </Link>
        </Box>


        <div style={{ height: 450, width: '85%', }}>
          <DataGrid
            rows={databalanceResult}
            columns={columns}
            pageSize={2}
            pageSizeOptions={[5, 10, 15, 100]} 
          />
        </div>
      </Container>
    </>
  );
}
