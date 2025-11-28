import React, { useState } from "react";
import { User, Plus, FileText } from "lucide-react";
import ComplaintModal from "./CompaintForm";
import { Link } from "react-router-dom";
import { userComplaints } from "../sapmle_data/UserDash_data"; 
import { useNavigate } from "react-router-dom";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userName = "nandini sharma";
const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">User Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Welcome, {userName}</p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Complaint
            </button>

            <button
             onClick={()=>{
              navigate('/User/Profile')
             }} 
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"
            >
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Complaint List */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {userComplaints.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-lg font-semibold text-gray-600 mb-2">
                No Complaints Yet
              </h2>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {userComplaints.map((complaint) => (
              <div
                key={complaint.id}
                
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() =>
                 navigate(`/User/ComplaintDetail/${complaint.id}`)
                }
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    {complaint.title}
                  </h3>
                  <span className="text-sm font-medium text-blue-600">
                    {complaint.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  {complaint.description}
                </p>
                <p className="mt-2 text-xs text-gray-400">{complaint.date}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <ComplaintModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
