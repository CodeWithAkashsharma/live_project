import React, { useState } from 'react';
import {
  UserCog,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const complaintStats = [
  {
    id: 'total',
    label: 'Total',
    count: 7,
    icon: FileText,
    bgColor: 'bg-blue-600',
    iconBgColor: 'bg-blue-700',
  },
  {
    id: 'open',
    label: 'Open',
    count: 3,
    icon: Clock,
    bgColor: 'bg-blue-500',
    iconBgColor: 'bg-blue-600',
  },
  {
    id: 'in_progress',
    label: 'In Progress',
    count: 0,
    icon: ArrowRight,
    bgColor: 'bg-orange-500',
    iconBgColor: 'bg-orange-600',
  },
  {
    id: 'resolved',
    label: 'Resolved',
    count: 3,
    icon: CheckCircle,
    bgColor: 'bg-green-600',
    iconBgColor: 'bg-green-700',
  },
  {
    id: 'closed',
    label: 'Closed',
    count: 1,
    icon: XCircle,
    bgColor: 'bg-gray-600',
    iconBgColor: 'bg-gray-700',
  },
];

const App = () => {
  const userName = 'nandini sharma';
  const [activeFilter, setActiveFilter] = useState('in_progress');

  const showEmptyState = true; 

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          
          <div className="flex-grow">
            <h1 className="text-xl font-semibold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Welcome, {userName}
            </p>
          </div>

          <div className="flex items-center"> 
            
            <button
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition duration-150 ease-in-out"
              onClick={() => console.log('Admin Profile icon clicked')}
              aria-label="Admin Profile"
            >
              <UserCog className="w-6 h-6" />
            </button>
            
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {complaintStats.map((stat) => (
            <div
              key={stat.id}
              className={`flex items-center justify-between p-5 rounded-xl shadow-md text-white ${stat.bgColor}`}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium opacity-80">{stat.label}</span>
                <span className="text-3xl font-bold mt-1">{stat.count}</span>
              </div>
              <div className={`p-3 rounded-full ${stat.iconBgColor}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg mb-8">
          <div className="flex flex-wrap gap-2">
            {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out ${
                  activeFilter.toLowerCase().replace(' ', '_') === filter.toLowerCase().replace(' ', '_')
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveFilter(filter.toLowerCase().replace(' ', '_'))}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg min-h-[300px] flex items-center justify-center">
          {showEmptyState ? (
            <div className="text-center p-4">
              <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-lg font-semibold text-gray-600 mb-2">
                No Complaints Found
              </h2>
              <p className="text-gray-500 text-sm">
                No complaints match the current filter
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-600">List of complaints will go here...</p>
            </div>
          )}
        </section>

      </main>

    </div>
  );
};

export default App;