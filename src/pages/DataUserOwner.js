import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NavOw from '../components/NavOw';
import { Button, Typography, ButtonGroup, Paper } from '@mui/material';
import Link from '@mui/material/Link';

export default function DataUserAdmin() {
  const [itemsData, setItemsData] = React.useState([]);
  const [itemsDataOw, setItemsDataOw] = React.useState([]);
  const [datatotalResult, setDatatotalResult] = React.useState([]);

  React.useEffect(() => {
    fetchData();
    fetchDataOw();
    fetchDataBalances();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3001/data")
      .then((res) => res.json())
      .then((result) => {
        setItemsData(result);
      });
  };

  const fetchDataOw = () => {
    fetch("http://localhost:3001/dataOw")
      .then((res) => res.json())
      .then((result) => {
        setItemsDataOw(result);
      });
  };

  const fetchDataBalances = () => {
    fetch("http://localhost:3001/databalances")
      .then((res) => res.json())
      .then((result) => {
        setDatatotalResult(result.datatotalResult);
      });
  };

  const Useredit = (user_id) => {
    window.location = '/owner/update/' + user_id;
  };

  const AdOwedit = (id) => {
    window.location = '/updateAdOw/' + id;
  };

  const Userdel = (id, isAd) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch("http://localhost:3001/delete", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert("Delete Success");
        if (isAd) {
          fetchDataOw();
        } else {
          fetchData();
        }
        fetchDataBalances();
      })
      .catch((error) => console.log('error', error));
  };

  const columns = [
    {
      field: 'cs_id',
      headerName: 'รหัสลูกค้า',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'firstname',
      headerName: 'ชื่อ',
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'lastname',
      headerName: 'นามสกุล',
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'career',
      headerName: 'อาชีพ',
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'tel',
      headerName: 'เบอร์โทรศัพท์',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'salary',
      headerName: 'เงินเดือน',
      type: 'number',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: ({ value }) => {
        if (value != null) {
          return value.toLocaleString();
        }
        return "";
      },
    },
    {
      field: 'total',
      headerName: 'ยอดค้างรวม',
      type: 'number',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        const userId = params.row.cs_id;
        const totalResult = datatotalResult.find((item) => item.cs_id === userId);

        if (totalResult) {
          return totalResult.total;
        }
        return 0;
      },
      valueFormatter: ({ value }) => {
        if (value != null) {
          return value.toLocaleString();
        }
        return "";
      },
    },

    {
      field: 'actions',
      headerName: 'ดำเนินการ',
      width: 200,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <ButtonGroup>
          <Button onClick={() => Useredit(params.row.user_id)}>แก้ไข</Button>
          <Button onClick={() => Userdel(params.row.id, false)}>ลบ</Button>
        </ButtonGroup>
      ),
    },
  ];
  const columnsOwner = [
    {
      field: 'ow_id',
      headerName: 'รหัสลูกค้า',
      width: 300,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'firstname',
      headerName: 'ชื่อ',
      width: 300,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'lastname',
      headerName: 'นามสกุล',
      width: 300,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'actions',
      headerName: 'ดำเนินการ',
      width: 300,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <ButtonGroup>
          <Button onClick={() => AdOwedit(params.row.user_id)}>แก้ไข</Button>
          <Button onClick={() => Userdel(params.row.id, false)}>ลบ</Button>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <>
      <NavOw />
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }} >
        <Paper sx={{ marginTop: '20px', width: 1250 }}>
          <Box sx={{ p: 3 }}>
            <Box display="flex">
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  ลูกค้า
                </Typography>
              </Box>
              <Box style={{ marginBottom: '20px' }}>
                <Link href="/admin/createuser">
                  <Button variant="contained">สร้าง</Button>
                </Link>
              </Box>
            </Box>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={itemsData}
                columns={columns}
                pageSize={5}
                getRowId={(row) => row.user_id}
                pageSizeOptions={[5, 10, 15, 100]}
              />
            </div>
          </Box>
        </Paper>
        <Paper sx={{ marginTop: '60px', width: 1250 }}>
               <Box sx={{ p: 3 }}>
            <Box display="flex">
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  เจ้าของร้าน
                </Typography>
              </Box>
            </Box>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={itemsDataOw}
                columns={columnsOwner}
                pageSize={5}
                getRowId={(row) => row.user_id}
                pageSizeOptions={[5, 10, 15, 100]}
              />
            </div>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
