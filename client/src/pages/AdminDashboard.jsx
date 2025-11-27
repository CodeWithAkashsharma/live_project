import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCog, FileText, Clock, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import AuthContext from "../context/AuthContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, fetchUser, logoutUser } = useContext(AuthContext);
  const [activeFilter, setActiveFilter] = useState("all");

  // Hardcoded temporary stats -> will be fetched from backend later
  const complaintStats = [
    { id: "total", label: "Total", count: 0, icon: FileText, bg: "bg-blue-600", iconBg: "bg-blue-700" },
    { id: "open", label: "Open", count: 0, icon: Clock, bg: "bg-blue-500", iconBg: "bg-blue-600" },
    { id: "in_progress", label: "In Progress", count: 0, icon: ArrowRight, bg: "bg-orange-500", iconBg: "bg-orange-600" },
    { id: "resolved", label: "Resolved", count: 0, icon: CheckCircle, bg: "bg-green-600", iconBg: "bg-green-700" },
    { id: "closed", label: "Closed", count: 0, icon: XCircle, bg: "bg-gray-600", iconBg: "bg-gray-700" },
  ];

  // Fetch latest user info on mount
  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
    };
    loadUser();
  }, []);

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user]);

  if (!user) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex-grow">
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Welcome, {user.fullname}</p>
          </div>

          <button
            onClick={logoutUser}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"
          >
            <UserCog className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {complaintStats.map((stat) => (
            <div key={stat.id} className={`flex items-center justify-between p-5 rounded-xl shadow-md text-white ${stat.bg}`}>
              <div>
                <p className="text-sm opacity-80">{stat.label}</p>
                <h2 className="text-3xl font-bold">{stat.count}</h2>
              </div>
              <div className={`p-3 rounded-full ${stat.iconBg}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg mb-8">
          <div className="flex flex-wrap gap-2">
            {["All", "Open", "In Progress", "Resolved", "Closed"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter.toLowerCase().replace(" ", "_"))}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeFilter === filter.toLowerCase().replace(" ", "_")
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg min-h-[300px] flex items-center justify-center">
          <div className="text-center p-4">
            <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-semibold text-gray-600">No Complaints Found</h2>
            <p className="text-gray-500 text-sm">No complaints match the current filter</p>
          </div>
        </section>
      </main>
    </div>
  );
}
