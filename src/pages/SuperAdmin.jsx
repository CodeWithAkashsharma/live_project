import React, { useMemo, useState } from "react";
import {
  ShieldCheck,
  UserRound,
  Mail,
  Building2,
  CheckCircle2,
  XCircle,
  Filter,
  LogOut,
  Clock,
} from "lucide-react";

// Final improved responsive SuperAdmin component (Option B)
// Notes:
// - Root container prevents horizontal overflow
// - Cards wrap and action column collapses on small screens
// - Long text breaks properly using break-words / break-all
// - Gradient blobs are clipped to avoid overflow on small screens

const initialRequests = [
  {
    id: 1,
    name: "Nandini Sharma",
    email: "nandini.user@campus.edu",
    department: "Student Affairs",
    currentRole: "User",
    requestedRole: "Admin",
    reason:
      "I coordinate student grievances and need admin access to track case progress.",
    createdAt: "28 Nov 2025 • 10:14 AM",
    status: "pending",
  },
  {
    id: 2,
    name: "Anmol Aggarwal",
    email: "anmol.hr@org.com",
    department: "Human Resources",
    currentRole: "User",
    requestedRole: "Admin",
    reason:
      "Responsible for HR complaints and internal policy escalations for staff.",
    createdAt: "27 Nov 2025 • 05:42 PM",
    status: "approved",
  },
  {
    id: 3,
    name: "Kriti Verma",
    email: "kriti.it@college.in",
    department: "IT & Infrastructure",
    currentRole: "User",
    requestedRole: "Admin",
    reason:
      "Handles all tech issues and outage reports; needs admin view to prioritize tickets.",
    createdAt: "26 Nov 2025 • 09:30 AM",
    status: "rejected",
  },
  {
    id: 4,
    name: "Rohit Gupta",
    email: "rohit.hostel@campus.edu",
    department: "Hostel Management",
    currentRole: "User",
    requestedRole: "Admin",
    reason:
      "Oversees hostel complaints and maintenance requests for multiple blocks.",
    createdAt: "25 Nov 2025 • 03:05 PM",
    status: "pending",
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

export default function SuperAdminResponsive() {
  const [requests, setRequests] = useState(initialRequests);
  const [activeFilter, setActiveFilter] = useState("pending");

  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "pending").length;
    const approved = requests.filter((r) => r.status === "approved").length;
    const rejected = requests.filter((r) => r.status === "rejected").length;
    return { total, pending, approved, rejected };
  }, [requests]);

  const filteredRequests =
    activeFilter === "all"
      ? requests
      : requests.filter((r) => r.status === activeFilter);

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: action === "approve" ? "approved" : "rejected",
            }
          : req
      )
    );
  };

  const statusChipClasses = (status) => {
    if (status === "pending")
      return "bg-amber-50 text-amber-700 border border-amber-100";
    if (status === "approved")
      return "bg-emerald-50 text-emerald-700 border border-emerald-100";
    if (status === "rejected")
      return "bg-rose-50 text-rose-700 border border-rose-100";
    return "bg-slate-100 text-slate-700";
  };

  const statusLabel = (status) => {
    if (status === "pending") return "Pending review";
    if (status === "approved") return "Approved";
    if (status === "rejected") return "Rejected";
    return status;
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto bg-gradient-to-br from-sky-100 via-white to-indigo-200 flex flex-col">
      {/* Gradient blobs (clipped) */}
      <div className="pointer-events-none absolute inset-0 opacity-60 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-24 h-72 w-72 rounded-full bg-sky-200 blur-3xl transform-gpu" />
        <div className="absolute top-40 -right-24 h-80 w-80 rounded-full bg-indigo-200 blur-3xl transform-gpu" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white text-[11px] font-bold shadow-[0_12px_40px_rgba(37,99,235,0.6)] flex items-center justify-center">
              CMS
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-sky-700">
                Super Admin Console
              </span>
              <span className="text-[11px] text-slate-500">
                Approve or decline admin elevation requests.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-xs font-semibold text-slate-700">Signed in as</span>
              <span className="text-xs text-slate-500">Root / Producer</span>
            </div>
         <button
                       className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-rose-600 border border-rose-100 rounded-full bg-rose-50/80 hover:bg-rose-100 transition"
                       onClick={() => navigate("/Home")}
                     >
                       <LogOut className="w-3.5 h-3.5" />
                       Logout
                     </button>

          </div>
        </div>
      </header>

      {/* Main content container */}
      <main className="relative z-10 flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Top section: summary + filter */}
          <section className="grid grid-cols-1 lg:grid-cols-[1.45fr_minmax(0,1fr)] gap-5 sm:gap-6">
            <div className="rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/70 shadow-[0_18px_60px_rgba(15,23,42,0.06)] px-4 sm:px-6 py-5 sm:py-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <h2 className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-900">
                    <ShieldCheck className="h-4 w-4 text-sky-600" />
                    Admin Access Requests
                  </h2>
                  <p className="mt-1 text-xs sm:text-[13px] text-slate-500 max-w-xl">
                    Review elevation requests from power users before granting administrative control.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 border border-sky-100 px-3 py-1 text-[11px] text-sky-700 font-medium">
                    <Filter className="h-3 w-3" />
                    {activeFilter === "all"
                      ? "All requests"
                      : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} only`}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                <StatPill label="Total" value={stats.total} tone="slate" description="All time" />
                <StatPill label="Pending" value={stats.pending} tone="amber" description="Awaiting action" />
                <StatPill label="Approved" value={stats.approved} tone="emerald" description="Granted admin" />
                <StatPill label="Rejected" value={stats.rejected} tone="rose" description="Declined" />
              </div>
            </div>

            <div className="rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/70 shadow-[0_18px_60px_rgba(15,23,42,0.05)] px-4 sm:px-6 py-5 sm:py-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-2">View by status</p>
                <div className="flex flex-wrap gap-2">
                  {FILTERS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFilter(f.id)}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium border transition ${
                        activeFilter === f.id
                          ? "bg-sky-600 text-white border-sky-600 shadow-[0_12px_30px_rgba(37,99,235,0.45)]"
                          : "bg-white/80 text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-slate-500 mt-3">
                Changes are <strong>immediate</strong> for active sessions. Make sure you trust the requester's role and responsibility before approving.
              </div>
            </div>
          </section>

          {/* Requests list */}
          <section className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-semibold text-slate-900">Incoming Elevation Requests</h3>
              <p className="text-[11px] text-slate-500">
                Showing <span className="font-semibold">{filteredRequests.length}</span> of {requests.length}
              </p>
            </div>

            {filteredRequests.length === 0 ? (
              <div className="rounded-2xl bg-white/80 border border-dashed border-slate-200/70 px-4 py-8 sm:px-6 text-center shadow-sm">
                <p className="text-sm font-semibold text-slate-700 mb-1">No requests in this view.</p>
                <p className="text-[12px] text-slate-500">Switch the filter above or check back when new elevation requests arrive.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRequests.map((req) => (
                  <article
                    key={req.id}
                    className="rounded-2xl bg-white/95 border border-white/80 shadow-[0_12px_45px_rgba(15,23,42,0.06)] px-4 sm:px-5 py-4 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-between items-start flex-wrap"
                  >
                    {/* Left: main info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white text-xs font-semibold flex items-center justify-center">
                            {req.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{req.name}</p>
                            <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                              <UserRound className="h-3 w-3 text-slate-400" />
                              {req.currentRole} → {req.requestedRole}
                            </p>
                          </div>
                        </div>

                        <span className={`ml-0 sm:ml-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${statusChipClasses(req.status)}`}>
                          {req.status === "approved" && <CheckCircle2 className="h-3.5 w-3.5" />}
                          {req.status === "rejected" && <XCircle className="h-3.5 w-3.5" />}
                          {req.status === "pending" && <ShieldCheck className="h-3.5 w-3.5" />}
                          {statusLabel(req.status)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 text-[11px] text-slate-600 break-words">
                        <span className="inline-flex items-center gap-1 min-w-0 truncate">
                          <Mail className="h-3.5 w-3.5 text-sky-500" />
                          <span className="truncate">{req.email}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 min-w-0 truncate">
                          <Building2 className="h-3.5 w-3.5 text-indigo-500" />
                          <span className="truncate">{req.department}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 min-w-0 truncate">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          <span className="truncate">Requested: {req.createdAt}</span>
                        </span>
                      </div>

                      <p className="mt-1 text-[12px] text-slate-700 break-words">{req.reason}</p>
                    </div>

                    {/* Right: actions */}
                    <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                      <div className="flex gap-2 w-full sm:w-44">
                        <button
                          onClick={() => handleAction(req.id, "approve")}
                          disabled={req.status === "approved"}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-semibold transition ${
                            req.status === "approved"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default"
                              : "bg-emerald-500 text-white shadow-[0_12px_35px_rgba(16,185,129,0.6)] hover:bg-emerald-600"
                          }`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {req.status === "approved" ? "Approved" : "Approve"}
                        </button>

                        <button
                          onClick={() => handleAction(req.id, "reject")}
                          disabled={req.status === "rejected"}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-semibold transition border ${
                            req.status === "rejected"
                              ? "bg-rose-50 text-rose-600 border-rose-100 cursor-default"
                              : "bg-white text-rose-600 border-rose-200 hover:bg-rose-50"
                          }`}
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          {req.status === "rejected" ? "Rejected" : "Reject"}
                        </button>
                      </div>

                      {/* small hint on mobile */}
                      <div className="text-[11px] text-slate-400 hidden sm:block">&nbsp;</div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}


function StatPill({ label, value, tone, description }) {
  const toneClasses = {
    slate: "bg-slate-50 border-slate-100 text-slate-800",
    amber: "bg-amber-50 border-amber-100 text-amber-800",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-800",
    rose: "bg-rose-50 border-rose-100 text-rose-800",
  }[tone];

  return (
    <div className={`flex flex-col justify-between rounded-2xl border px-3.5 py-3 shadow-sm ${toneClasses}`}>
      <span className="text-[11px] uppercase tracking-wide opacity-85">{label}</span>
      <span className="mt-0.5 text-lg font-semibold">{value}</span>
      <span className="mt-0.5 text-[11px] opacity-80">{description}</span>
    </div>
  );
}
