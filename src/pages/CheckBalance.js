import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import NavC from '../components/NavC';
import { Box } from '@mui/material';

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
    align: 'center'
  },

  {
    field: 'status_description',
    headerName: 'สถานะ',
    width: 150,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) =>
      params.row.status_description === "stale"
        ? parseInt(params.row.amount).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : params.row.status_description === "pay"
          ? parseInt(params.row.amount).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : 0,
  },
];

export default function CheckBalance() {
  const [data, setData] = React.useState([]);
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(() => token);
    const decodedData = JSON.parse(localStorage.getItem('decodedData'));
    const userId = decodedData?.cs_id;
    fetch(`http://localhost:3001/datatotalt/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, [token]);

  return (
    <>
      <NavC />
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }} >
        <Box sx={{ p: 4 }}>

          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              columns={columns}
              rows={data.databl || []}
              pageSizeOptions={[5, 10, 15, 100]} 

            />
          </div>
        </Box>
      </Container>
    </>
  );
}

