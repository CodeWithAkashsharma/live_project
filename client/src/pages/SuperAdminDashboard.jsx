import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import AuthContext from "../context/AuthContext";

export default function SuperAdminDashboard() {
  const { user, logoutUser } = useContext(AuthContext);
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    // Define async function inside effect
    const fetchPendingUsers = async () => {
      try {
        const res = await axiosInstance.get("/auth/pending-admin-requests");
        setPendingUsers(res.data); // Safe inside async function
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Error fetching pending requests");
      }
    };

    fetchPendingUsers(); // Call it immediately
  }, []); // Run once on mount

  const approveAdmin = async (userId) => {
    try {
      const res = await axiosInstance.post(`/auth/approve-admin/${userId}`, {});
      alert(res.data.message);
      // Refresh list after approval
      const refreshed = await axiosInstance.get("/auth/pending-admin-requests");
      setPendingUsers(refreshed.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error approving admin");
    }
  };

  if (!user) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">SuperAdmin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Welcome, {user.fullname}</p>
          </div>

          <button
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Pending Admin Requests</h2>

          {pendingUsers.length === 0 ? (
            <p className="text-gray-500">No pending requests at the moment.</p>
          ) : (
            <div className="space-y-3">
              {pendingUsers.map((pendingUser) => (
                <div
                  key={pendingUser._id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-800">{pendingUser.fullname}</p>
                    <p className="text-sm text-gray-500">{pendingUser.email}</p>
                  </div>
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => approveAdmin(pendingUser._id)}
                  >
                    Approve Admin
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
