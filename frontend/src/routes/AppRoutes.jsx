import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Accounts from "../pages/Accounts/Accounts";
import Deposit from "../pages/Deposit/Deposit";
import Withdraw from "../pages/Withdraw/Withdraw";
import Transfer from "../pages/Transfer/Transfer";
import Transactions from "../pages/Transactions/Transactions";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
     <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
      <Route
        path="/accounts"
        element={
          <ProtectedRoute>
            <Accounts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/deposit"
        element={
          <ProtectedRoute>
            <Deposit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/withdraw"
        element={
          <ProtectedRoute>
            <Withdraw />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transfer"
        element={
          <ProtectedRoute>
            <Transfer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
