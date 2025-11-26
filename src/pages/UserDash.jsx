
import React, { useState } from 'react';
import { User, Plus, FileText } from 'lucide-react';
import ComplaintModal from './CompaintForm';
import {Link} from 'react-router-dom'

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userName = 'nandini sharma';

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex-grow">
            <h1 className="text-xl font-semibold text-gray-900">Employee Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Welcome, {userName}</p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out whitespace-nowrap"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Complaint
            </button>

               <Link
      to="/profile"
      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition duration-150 ease-in-out"
      aria-label="User Profile"
    >
      <User className="w-6 h-6" />
    </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg min-h-[400px] flex items-center justify-center">
          <div className="text-center p-4">
            <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-semibold text-gray-600 mb-2">No Complaints Yet</h2>
            <p className="text-gray-500 text-sm">
              Click "<span className="font-medium text-blue-600">New Complaint</span>" to submit your
              first complaint.
            </p>
          </div>
        </div>
      </main>

      <ComplaintModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
