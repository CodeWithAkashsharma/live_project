import React from 'react';
import { User, Plus, FileText } from 'lucide-react';

// Main Application Component
const App = () => {
  // Mock User Data
  const userName = 'nandini sharma';

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Header / Navbar Section 
        Uses flexbox for alignment and responsive padding
      */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          
          {/* Dashboard Title and Welcome Message (Left Side) */}
          <div className="flex-grow">
            <h1 className="text-xl font-semibold text-gray-900">
              Employee Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Welcome, {userName}
            </p>
          </div>

          {/* Action Buttons (Right Side) */}
          <div className="flex items-center space-x-4">
            
            {/* New Complaint Button */}
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out whitespace-nowrap"
              onClick={() => console.log('New Complaint clicked')}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Complaint
            </button>

            {/* User Profile Icon (Replaces Logout) */}
            <button
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition duration-150 ease-in-out"
              onClick={() => console.log('Profile icon clicked')}
              aria-label="User Profile"
            >
              <User className="w-6 h-6" />
            </button>

            {/* Optional: Add Logout if needed, perhaps in a dropdown under the User icon */}
            {/* <button className="text-sm text-gray-500 hover:text-gray-700">Logout</button> */}
          </div>
        </div>
      </header>

      {/* Main Content Area 
        Centered card for the 'No Complaints Yet' message
      */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg min-h-[400px] flex items-center justify-center">
          
          {/* Empty State Content */}
          <div className="text-center p-4">
            
            {/* File Icon */}
            <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />

            <h2 className="text-lg font-semibold text-gray-600 mb-2">
              No Complaints Yet
            </h2>

            <p className="text-gray-500 text-sm">
              Click "<span className="font-medium text-blue-600">New Complaint</span>" to submit your first complaint.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
};

export default App;