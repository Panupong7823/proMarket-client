import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeCustomer from "./pages/HomeCustomer";
import LogIn from "./pages/LogIn";
import DataUserAdmin from "./pages/DataUserAdmin";
import CustomerCreateAdmin from "./pages/CustomerCreateAdmin";
import CustomerEditAdmin from "./pages/CustomerEditAdmin";
import CheckBalance from "./pages/CheckBalance";
import HomeAdmin from "./pages/HomeAdmin";
import CheckUser from "./pages/CheckUser";
import DataBalanceAdmin from "./pages/DataBalanceAdmin";
import BalanceEditOwner from "./pages/BalanceEditOwner";
import AdminCreate from "./pages/AdminCreate";
import BalanceCreateOwner from "./pages/BalanceCreateOwner";
import AdminEditAO from "./pages/AdminEditAO";
import DataUserOwner from "./pages/DataUserOwner";
import DataBalanceOwner from "./pages/DataBalanceOwner";
import OwnerCreate from "./pages/OwnerCreate";
import HomeOwner from "./pages/HomeOwner";
import BalanceEditAdmin from "./pages/BalanceEditAdmin";
import BalanceCreateAdmin from "./pages/BalanceCreateAdmin";
import ShowDataBalance from "./pages/ShowDataBalance";

export default function App() {
  const role = parseInt(localStorage.getItem("role"), 10); 
  console.log("role", role);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          {role === 1 && (
            <>
              <Route path="/customer/home" element={<HomeCustomer />} />
              <Route path="/customer/check" element={<CheckUser />} />
              <Route path="/balance/check" element={<CheckBalance />} />
            </>
          )}
          {role === 2 && (
            <>
              <Route path="/admin/home" element={<HomeAdmin />} />
              <Route path="/admin/datauser" element={<DataUserAdmin />} />
              <Route
                path="/createuser"
                element={<CustomerCreateAdmin />}
              />
              <Route path="/admin/createadmin" element={<AdminCreate />} />
              <Route path="/admin/createowner" element={<OwnerCreate />} />
              <Route
                path="/admin/balance/data"
                element={<DataBalanceAdmin />}
              />
              <Route
                path="/admin/updatebalance/:id"
                element={<BalanceEditAdmin />}
              />
              <Route
                path="/admin/balance/create"
                element={<BalanceCreateAdmin />}
              />
              <Route path="/update/:id" element={<CustomerEditAdmin />} />
              <Route path="/show" element={<ShowDataBalance />} />
              <Route path="/updateAdOw/:id" element={<AdminEditAO />} />
            </>
          )}
          {role === 3 && (
            <>
              <Route path="/owner/home" element={<HomeOwner />} />
              <Route path="/owner/datauser" element={<DataUserOwner />} />
              <Route
                path="/owner/balance/data"
                element={<DataBalanceOwner />}
              />
              <Route
                path="/createuser"
                element={<CustomerCreateAdmin />}
              />
              <Route
                path="/owner/balance/create"
                element={<BalanceCreateOwner />}
              />
              <Route
                path="/owner/updatebalance/:id"
                element={<BalanceEditOwner />}
              />
              <Route path="/update/:id" element={<CustomerEditAdmin />} />
              <Route path="/show" element={<ShowDataBalance />} />
              <Route path="/updateAdOw/:id" element={<AdminEditAO />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}
