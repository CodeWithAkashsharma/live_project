import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AuthForm from "./pages/AuthForm";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

import AuthContext from "./context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!user) return <Navigate to="/" />; 
  if (!allowedRoles.includes(user.role)) return <p className="p-6 text-red-600">Access Denied</p>;

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* LOGIN PAGE */}
        <Route path="/" element={<AuthForm />} />

        {/* USER DASHBOARD */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* SUPERADMIN DASHBOARD */}
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
