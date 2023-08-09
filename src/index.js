import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import InfoOd from './pages/InfoOd';
import Ucreate from './pages/Ucreate';
import Uedit from './pages/Uedit';
import Checkbl from './pages/Checkbl';
import HomeAD from './pages/HomeAD';
import CheckUser from './pages/CheckUser';
import InfoBls from './pages/InfoBls';
import Bedit from './pages/Bedit';
import Adcreate from './pages/Adcreate';
import Bcreate from './pages/BCreate';



const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#c26ccb',
    },
    secondary: {
      main: '#f50057',
    },
    info: {
      main: '#d088de',
    },
  },
})


const router = createBrowserRouter([
  {
  path: "/",
  element: <LogIn />
  },
  {
    path: "/h",
    element: <Home />
  },
  {
    path: "/hAd",
    element: <HomeAD />
  },
  {
    path: "/o",
    element: <InfoOd />
  },
  {
    path: "/iBl",
    element: <InfoBls />
  },
  {
    path: "/uc",
    element: <Ucreate />
  },
  {
    path: "/ac",
    element: <Adcreate/>
  },
  {
    path: "/bc",
    element: <Bcreate />
  },
  {
    path: "/update/:id",
    element: <Uedit />
  }
  ,
  {
    path: "/updateBdit/:id",
    element: <Bedit />
  }
  ,
  {
    path: "/cb",
    element: <Checkbl />
  }
  ,
  {
    path: "/cs",
    element: <CheckUser />
  }
])




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
