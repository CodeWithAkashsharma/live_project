import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

export default function UserDashboard() {
  const { user, logoutUser, updateUserInfo, fetchUser } = useContext(AuthContext);
  const [adminRequested, setAdminRequested] = useState(false);
  const userName = user?.fullname || "User";

  // Sync latest user info when component mounts
  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
      setAdminRequested(user?.adminRequested || false);
    };
    loadUser();
  }, []);

  const requestAdmin = async () => {
    try {
      const res = await axiosInstance.post("/auth/request-admin", {});
      alert(res.data.message);
      setAdminRequested(true);

      // Update context
      updateUserInfo({ ...user, adminRequested: true });
    } catch (err) {
      alert(err.response?.data?.message || "Error sending request");
    }
  };

  const handleLogout = () => logoutUser();

  if (!user) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex-grow">
            <h1 className="text-xl font-semibold text-gray-900">Employee Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Welcome, {userName} (Role: {user.role})
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              onClick={() => console.log("New Complaint clicked")}
            >
              New Complaint
            </button>

            {user.role === "user" && (
              <button
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
                onClick={requestAdmin}
                disabled={adminRequested}
              >
                {adminRequested ? "Admin Request Sent" : "Request Admin Role"}
              </button>
            )}

            <button
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <p>Welcome to your dashboard, {userName}!</p>
      </main>
    </div>
  );
}
