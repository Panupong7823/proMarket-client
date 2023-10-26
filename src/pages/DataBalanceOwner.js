import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import NavOw from "../components/NavOw";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { format } from "date-fns-tz";
import { th } from "date-fns/locale";
import { Typography } from "@mui/material";
import { Box, Link } from "@mui/material";
import Swal from "sweetalert2";

export default function DataBalanceOwner() {
  const [datauser, serDataUser] = useState([]);
  const [databalanceResult, setDatabalanceResult] = useState([]);

  useEffect(() => {
    UserGet();
    UserData();
  }, []);

  const UserGet = () => {
    fetch("http://localhost:3001/databalances")
      .then((res) => res.json())
      .then((result) => {
        setDatabalanceResult(result.databalanceResult);
      });
  };
  const UserData = () => {
    fetch("http://localhost:3001/data")
      .then((res) => res.json())
      .then((result) => {
        serDataUser(result);
      });
  };

  const Useredit = (id) => {
    window.location = "/owner/updatebalance/" + id;
  };

  const Balancedel = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:3001/deletebl", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        UserGet();
      })
      .catch((error) => console.log("error", error));
  };

  const columns = [
    {
      field: "cs_id",
      headerName: "รหัสลูกค้า",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "firstname",
      headerName: "ชื่อ",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lastname",
      headerName: "นามสกุล",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date_time",
      headerName: "วันเวลา",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        const date = new Date(params.row.date_time);
        const thaiYear = date.getFullYear() + 543;
        return format(date, `dd MMM ${thaiYear} HH:mm`, {
          locale: th,
          era: "long",
        });
      },
    },

    {
      field: "staleAmount",
      headerName: "ยอดค้าง",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) =>
        params.row.status_description === "stale"
          ? params.row.amount
              .toLocaleString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "0",
    },
    {
      field: "payAmount",
      headerName: "ยอดจ่าย",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) =>
        params.row.status_description === "pay"
          ? params.row.amount
              .toLocaleString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "0",
    },
    {
      field: "actions",
      headerName: "ดำเนินการ",
      width: 200,
      headerAlign: "center",
      align: "center",
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
      <NavOw />
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "16px",
          }}
        >
          <Typography
            sx={{ marginLeft: "60px" }}
            variant="h6"
            gutterBottom
            component="div"
          >
            ตารางยอดค้าง
          </Typography>
          <Link href="/owner/balance/create">
            <Button variant="contained" sx={{ marginRight: "60px" }}>
              สร้าง
            </Button>
          </Link>
        </Box>

        <div style={{ height: 450, width: "98%" }}>
          <DataGrid
            rows={databalanceResult.map((row) => ({
              ...row,
              firstname:
                datauser.find((user) => user.cs_id === row.cs_id)?.firstname ||
                "",
              lastname:
                datauser.find((user) => user.cs_id === row.cs_id)?.lastname ||
                "",
            })).sort((a, b) => new Date(b.date_time) - new Date(a.date_time))}
            columns={columns}
            pageSize={2} 
            pageSizeOptions={[5, 10, 15, 100]}
          />
        </div>
      </Container>
    </>
  );
}
