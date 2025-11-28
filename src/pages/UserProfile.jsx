// src/UserProfilePage.jsx
import React from "react";

const navItems = [
  { label: "Dashboard", active: false, icon: "dashboard" },
  { label: "Profile", active: true, icon: "profile" },
  { label: "Logout", active: false, icon: "logout" },
];

const Icon = ({ type }) => {
  if (type === "dashboard") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="5" rx="2" />
        <rect x="13" y="10" width="8" height="11" rx="2" />
        <rect x="3" y="13" width="8" height="8" rx="2" />
      </svg>
    );
  }
  if (type === "profile") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="8" r="3.2" />
        <path d="M6 19.2c.9-2.3 3-3.8 6-3.8s5.1 1.5 6 3.8" />
      </svg>
    );
  }
  if (type === "logout") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />
        <path d="M15 16l3-3-3-3" />
        <path d="M18 13H10" />
      </svg>
    );
  }
  return null;
};

const UserProfilePage = () => {
  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900">
      <aside className="w-72 bg-slate-800 text-slate-50 rounded-r-3xl m-4 flex flex-col">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-700">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-xl font-semibold">▶</span>
          </div>
          <span className="text-xl font-semibold tracking-wide">COMPANY</span>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition ${
                    item.active
                      ? "bg-slate-700/80 text-white"
                      : "text-slate-100/80 hover:bg-slate-700/70"
                  }`}
                >
                  <Icon type={item.icon} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 m-4 ml-0">
        <div className="h-full w-full bg-white rounded-3xl shadow-sm px-12 py-10">
          <h1 className="text-3xl font-semibold tracking-tight">User Profile</h1>

          <div className="mt-8 flex flex-col items-center">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200"
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover"
            />
            <h2 className="mt-4 text-2xl font-semibold">John Doe</h2>
            <p className="mt-1 text-sm text-slate-500">
              johndoe@example.com
            </p>
          </div>

          <div className="mt-10 max-w-3xl mx-auto space-y-8">
            <section className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-6">
              <div className="grid grid-cols-[auto,1fr] gap-x-16 gap-y-5 text-sm">
                <div className="font-medium text-slate-600">Name</div>
                <div className="text-slate-900">John Doe</div>

                <div className="font-medium text-slate-600">Email</div>
                <div className="text-slate-900">johndoe@example.com</div>

                <div className="font-medium text-slate-600">Role</div>
                <div className="text-slate-900">Administrator</div>

                <div className="font-medium text-slate-600">Created At</div>
                <div className="text-slate-900">March 15, 2023</div>
              </div>
            </section>

            <section className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-6">
              <h3 className="text-base font-semibold text-slate-800">
                Complaints Submitted
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-y-4 gap-x-16 text-sm">
                <div className="font-medium text-slate-600">Solved</div>
                <div className="text-slate-900">18</div>

                <div className="font-medium text-slate-600">Closed</div>
                <div className="text-slate-900">5</div>

                <div className="font-medium text-slate-600">Open</div>
                <div className="text-slate-900">7</div>

                <div className="font-medium text-slate-600">In Progress</div>
                <div className="text-slate-900">2</div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
