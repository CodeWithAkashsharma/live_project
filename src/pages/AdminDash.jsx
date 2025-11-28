import React, { useState } from 'react';
import { UserCog, FileText, LogOut } from 'lucide-react';
import { complaintStats, complaints } from '../sapmle_data/adminDash_data';

import { useNavigate } from 'react-router-dom';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'closed', label: 'Closed' },
];

const App = () => {
  const navigate = useNavigate();
  const userName = 'nandini sharma';
  const [activeFilter, setActiveFilter] = useState('open');

  const filteredComplaints =
    activeFilter === 'all'
      ? complaints
      : complaints.filter((c) => c.status === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Welcome, {userName}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition"
              onClick={() => navigate("/Admin/Profile")}
              aria-label="Admin Profile"
            >
              <UserCog className="w-6 h-6" />
            </button>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              onClick={() => navigate("/Login")}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Top stats cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {complaintStats.map((stat) => (
            <div
              key={stat.id}
              className={`flex items-center justify-between p-5 rounded-xl shadow-md text-white ${stat.bgColor}`}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium opacity-80">
                  {stat.label}
                </span>
                <span className="text-3xl font-bold mt-1">{stat.count}</span>
              </div>
              <div className={`p-3 rounded-full ${stat.iconBgColor}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </section>

        {/* Filters row */}
        <section className="mb-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
                  activeFilter === filter.id
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* Complaints list */}
        <section className="space-y-4">
          {filteredComplaints.length === 0 ? (
            <div className="flex items-center justify-center bg-white border border-gray-200 rounded-xl p-10 shadow-sm">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h2 className="text-lg font-semibold text-gray-600 mb-2">
                  No Complaints Found
                </h2>
                <p className="text-gray-500 text-sm">
                  No complaints match the current filter
                </p>
              </div>
            </div>
          ) : (
            filteredComplaints.map((complaint) => (
              <article
                key={complaint.id}
                className="flex items-start justify-between bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm"
                onClick={()=>{
                  navigate(`/Admin/ComplainDetail/${complaint.id}`)
                }}
              >
                <div className="pr-4">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-semibold text-gray-900">
                      {complaint.title}
                    </h3>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wide">
                      {complaint.statusLabel}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Category:</span>{' '}
                    {complaint.category}
                    <span className="mx-3">Employee:</span>
                    {complaint.employee}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    {complaint.description}
                  </p>
                </div>

                <div className="pt-1">
                  <p className="text-xs text-gray-400 whitespace-nowrap">
                    {complaint.date}
                  </p>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
