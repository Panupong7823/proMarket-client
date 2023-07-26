import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider,Route,Link } from 'react-router-dom';
import Welcome from'./pages/Welcom.js';
import ReTem from'./pages/ReTem.js';
import Home from './pages/Home';
import InfoOd from './pages/InfoOd';


const router = createBrowserRouter([
  {
  path: "/",
  element: <Welcome />
  },
  {
    path: "/h",
    element: <Home />
  },
  {
    path: "/r",
    element: <ReTem />
  },
  {
    path: "/o",
    element: <InfoOd />
  }
])




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
