"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Lock,
  LogOut,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  RefreshCw,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  Sparkles,
  Users
} from "lucide-react";

interface InquiryItem {
  _id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "in_progress" | "closed";
  ipAddress?: string;
  createdAt: string;
}

interface ApplicationItem {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  portfolioUrl?: string;
  note?: string;
  resumeFileName?: string;
  resumeFileSize?: number;
  resumeDataUrl?: string;
  status: "submitted" | "under_review" | "shortlisted" | "rejected";
  createdAt: string;
}

interface SubscriberItem {
  _id: string;
  email: string;
  status: "active" | "unsubscribed";
  source: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"inquiries" | "applications" | "subscribers">("inquiries");
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Selected item modal
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/verify");
      const data = await res.json();
      setAuthenticated(data.authenticated === true);
      if (data.authenticated === true) {
        fetchData();
      }
    } catch {
      setAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAuthenticated(true);
        setPassword("");
        fetchData();
      } else {
        setLoginError(data.error || "Incorrect password. Please try again.");
      }
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setAuthenticated(false);
    }
  };

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const [inqRes, appRes, subRes] = await Promise.all([
        fetch("/api/admin/inquiries"),
        fetch("/api/admin/applications"),
        fetch("/api/admin/subscribers"),
      ]);
      const inqData = await inqRes.json();
      const appData = await appRes.json();
      const subData = await subRes.json();

      if (inqData.success) setInquiries(inqData.inquiries || []);
      if (appData.success) setApplications(appData.applications || []);
      if (subData.success) setSubscribers(subData.subscribers || []);
    } catch (err) {
      console.error("Fetch data error:", err);
    } finally {
      setDataLoading(false);
    }
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to remove this newsletter subscriber?")) return;
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscribers((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, status: newStatus as any } : item
          )
        );
        if (selectedInquiry?._id === id) {
          setSelectedInquiry((prev) => prev ? { ...prev, status: newStatus as any } : null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item._id !== id));
        if (selectedInquiry?._id === id) setSelectedInquiry(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateAppStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, status: newStatus as any } : item
          )
        );
        if (selectedApp?._id === id) {
          setSelectedApp((prev) => prev ? { ...prev, status: newStatus as any } : null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteApp = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this application?")) return;
    try {
      const res = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
      if (res.ok) {
        setApplications((prev) => prev.filter((item) => item._id !== id));
        if (selectedApp?._id === id) setSelectedApp(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered lists
  const filteredInquiries = inquiries.filter((item) => {
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    const matchSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      (item.company && item.company.toLowerCase().includes(search.toLowerCase())) ||
      item.service.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const filteredApplications = applications.filter((item) => {
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    const matchSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const filteredSubscribers = subscribers.filter((item) => {
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    const matchSearch =
      !search ||
      item.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Loading screen while checking auth
  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#050811] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-medium">Verifying Session...</span>
        </div>
      </div>
    );
  }

  // Login view
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#050811] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-md w-full relative">
          <div className="rounded-3xl bg-[#0c1424]/90 border border-slate-800 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative w-44 h-14 mb-4">
                <Image
                  src="/axiora-logo-v2.png"
                  alt="Axiora Software Labs"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 text-[11px] font-semibold uppercase tracking-wider mb-2">
                <Shield className="w-3.5 h-3.5" /> Administrative Gateway
              </div>
              <h2 className="text-xl font-bold text-white">Command Center</h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your administrative passphrase to access client inquiries & candidate records.
              </p>
            </div>

            {loginError && (
              <div className="mb-5 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Admin Passphrase
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#070c16] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all pr-10"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {loginLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span>Access Dashboard</span>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
              <a
                href="/"
                className="text-xs text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
              >
                ← Return to Public Website
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#060b13]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="relative w-36 h-10 block">
              <Image
                src="/axiora-logo-v2.png"
                alt="Axiora"
                fill
                className="object-contain"
                priority
              />
            </a>
            <div className="h-5 w-px bg-slate-800 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-cyan-400 text-[11px] font-semibold">
                Control Center
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                MongoDB Atlas Connected
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={dataLoading}
              className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${dataLoading ? "animate-spin text-cyan-400" : ""}`} />
            </button>

            <a
              href={`/api/admin/export?type=${activeTab}`}
              download
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-950/70 border border-cyan-800/50 text-cyan-400 text-xs font-semibold hover:bg-cyan-900/60 transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-300 hover:bg-rose-900/50 hover:text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-[#0c1424] border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Client Inquiries
              </p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-extrabold text-white">{inquiries.length}</span>
                <span className="text-xs text-cyan-400 font-medium">
                  ({inquiries.filter((i) => i.status === "new").length} New)
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
              <Mail className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c1424] border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Job Applications
              </p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-extrabold text-white">{applications.length}</span>
                <span className="text-xs text-emerald-400 font-medium">
                  ({applications.filter((a) => a.status === "submitted").length} Pending)
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c1424] border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Subscribers
              </p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-extrabold text-white">{subscribers.length}</span>
                <span className="text-xs text-purple-400 font-medium">
                  Active Leads
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/50 flex items-center justify-center text-purple-400">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c1424] border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Notification Pipeline
              </p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-sm font-bold text-white">Resend + Atlas</span>
                <span className="text-xs text-emerald-400 font-medium">Active</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 truncate max-w-[200px]">
                {process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL || "faysulahmed14@gmail.com"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Selector & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0c1424] border border-slate-800 w-fit">
            <button
              onClick={() => {
                setActiveTab("inquiries");
                setStatusFilter("all");
              }}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "inquiries"
                  ? "bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Mail className="w-4 h-4" /> Client Inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => {
                setActiveTab("applications");
                setStatusFilter("all");
              }}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "applications"
                  ? "bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Briefcase className="w-4 h-4" /> Job Applications ({applications.length})
            </button>
            <button
              onClick={() => {
                setActiveTab("subscribers");
                setStatusFilter("all");
              }}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "subscribers"
                  ? "bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" /> Subscribers ({subscribers.length})
            </button>
          </div>

          {/* Search & Status Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder={
                  activeTab === "inquiries"
                    ? "Search client, company..."
                    : activeTab === "applications"
                    ? "Search candidate, role..."
                    : "Search subscriber email..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-56 sm:w-64 px-3.5 py-2 pl-9 rounded-xl bg-[#0c1424] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {activeTab !== "subscribers" && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#0c1424] border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
              >
                <option value="all">All Statuses</option>
                {activeTab === "inquiries" ? (
                  <>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </>
                ) : (
                  <>
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </>
                )}
              </select>
            )}
          </div>
        </div>

        {/* Content Table */}
        <div className="rounded-2xl bg-[#0c1424] border border-slate-800 overflow-hidden shadow-xl">
          {activeTab === "inquiries" ? (
            /* Inquiries Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#070c16] border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Client</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Budget</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        {dataLoading ? "Loading records..." : "No client inquiries found."}
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedInquiry(item)}
                      >
                        <td className="py-4 px-4">
                          <div className="font-bold text-white">{item.name}</div>
                          <div className="text-slate-400 text-[11px]">{item.email}</div>
                          {item.company && (
                            <div className="text-cyan-400/80 text-[11px] font-medium">
                              {item.company}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4 font-medium text-slate-200">
                          {item.service}
                        </td>
                        <td className="py-4 px-4 text-slate-300">
                          {item.budget || "Not specified"}
                        </td>
                        <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={item.status}
                            onChange={(e) => updateInquiryStatus(item._id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                              item.status === "new"
                                ? "bg-cyan-950/80 border-cyan-500/50 text-cyan-300"
                                : item.status === "contacted"
                                ? "bg-amber-950/80 border-amber-500/50 text-amber-300"
                                : item.status === "in_progress"
                                ? "bg-indigo-950/80 border-indigo-500/50 text-indigo-300"
                                : "bg-slate-900 border-slate-700 text-slate-400"
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-slate-400 whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td
                          className="py-4 px-4 text-right space-x-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => setSelectedInquiry(item)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteInquiry(item._id)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : activeTab === "applications" ? (
            /* Applications Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#070c16] border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Candidate</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">CV / Portfolio</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Applied At</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        {dataLoading ? "Loading records..." : "No job applications found."}
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((app) => (
                      <tr
                        key={app._id}
                        className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedApp(app)}
                      >
                        <td className="py-4 px-4">
                          <div className="font-bold text-white">{app.name}</div>
                          <div className="text-slate-400 text-[11px]">{app.email}</div>
                          <div className="text-slate-400 text-[11px] font-mono">{app.phone}</div>
                        </td>
                        <td className="py-4 px-4 font-medium text-slate-200">
                          {app.role}
                        </td>
                        <td className="py-4 px-4 space-y-1" onClick={(e) => e.stopPropagation()}>
                          {app.resumeFileName ? (
                            <span className="inline-flex items-center gap-1.5 text-cyan-400 font-medium">
                              <FileText className="w-3.5 h-3.5" />
                              {app.resumeDataUrl ? (
                                <a
                                  href={app.resumeDataUrl}
                                  download={app.resumeFileName}
                                  className="underline hover:text-cyan-300"
                                >
                                  {app.resumeFileName}
                                </a>
                              ) : (
                                <span>{app.resumeFileName}</span>
                              )}
                            </span>
                          ) : (
                            <span className="text-slate-500">No CV file</span>
                          )}

                          {app.portfolioUrl && (
                            <div>
                              <a
                                href={app.portfolioUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
                              >
                                Portfolio <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={app.status}
                            onChange={(e) => updateAppStatus(app._id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                              app.status === "submitted"
                                ? "bg-cyan-950/80 border-cyan-500/50 text-cyan-300"
                                : app.status === "under_review"
                                ? "bg-amber-950/80 border-amber-500/50 text-amber-300"
                                : app.status === "shortlisted"
                                ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                                : "bg-rose-950/80 border-rose-500/50 text-rose-300"
                            }`}
                          >
                            <option value="submitted">Submitted</option>
                            <option value="under_review">Under Review</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-slate-400 whitespace-nowrap">
                          {new Date(app.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td
                          className="py-4 px-4 text-right space-x-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteApp(app._id)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* Subscribers Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#070c16] border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Subscriber Email</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Channel / Source</th>
                    <th className="py-3.5 px-4">Subscribed At</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500">
                        {dataLoading ? "Loading records..." : "No newsletter subscribers found."}
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((sub) => (
                      <tr key={sub._id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                          <Mail className="w-4 h-4 text-cyan-400" />
                          <span>{sub.email}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold">
                            Active
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                          {sub.source}
                        </td>
                        <td className="py-4 px-4 text-slate-400 whitespace-nowrap">
                          {new Date(sub.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => deleteSubscriber(sub._id)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Remove Subscriber"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="max-w-xl w-full rounded-3xl bg-[#0c1424] border border-slate-700 p-6 sm:p-8 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  Client Inquiry Details
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">
                  {selectedInquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#070c16] border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Email</span>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="text-cyan-400 font-semibold hover:underline"
                >
                  {selectedInquiry.email}
                </a>
              </div>
              <div className="p-3 rounded-xl bg-[#070c16] border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Company</span>
                <span className="text-white font-semibold">
                  {selectedInquiry.company || "Not provided"}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#070c16] border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Service</span>
                <span className="text-white font-semibold">{selectedInquiry.service}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#070c16] border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Budget</span>
                <span className="text-white font-semibold">{selectedInquiry.budget}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-xs font-semibold mb-1.5">
                Client Message & Project Scope:
              </span>
              <div className="p-4 rounded-xl bg-[#070c16] border border-slate-800 text-slate-200 text-xs leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                {selectedInquiry.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
              <span>
                Received: {new Date(selectedInquiry.createdAt).toLocaleString()}
              </span>
              <div className="flex items-center gap-2">
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => updateInquiryStatus(selectedInquiry._id, e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry with Axiora Software Labs`}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="max-w-xl w-full rounded-3xl bg-[#0c1424] border border-slate-700 p-6 sm:p-8 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Candidate Application
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">{selectedApp.name}</h3>
                <p className="text-xs text-slate-400 font-medium">{selectedApp.role}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#070c16] border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Email</span>
                <a
                  href={`mailto:${selectedApp.email}`}
                  className="text-cyan-400 font-semibold hover:underline"
                >
                  {selectedApp.email}
                </a>
              </div>
              <div className="p-3 rounded-xl bg-[#070c16] border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Phone</span>
                <a
                  href={`tel:${selectedApp.phone}`}
                  className="text-white font-semibold hover:underline"
                >
                  {selectedApp.phone}
                </a>
              </div>
            </div>

            {selectedApp.portfolioUrl && (
              <div className="p-3 rounded-xl bg-[#070c16] border border-slate-800 text-xs">
                <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">
                  Portfolio / GitHub Link
                </span>
                <a
                  href={selectedApp.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  {selectedApp.portfolioUrl} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {selectedApp.resumeFileName && (
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 text-slate-200">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="font-bold text-white">{selectedApp.resumeFileName}</div>
                    <div className="text-[10px] text-slate-400">Attached Candidate Resume</div>
                  </div>
                </div>
                {selectedApp.resumeDataUrl && (
                  <a
                    href={selectedApp.resumeDataUrl}
                    download={selectedApp.resumeFileName}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all inline-flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Download CV
                  </a>
                )}
              </div>
            )}

            {selectedApp.note && (
              <div>
                <span className="text-slate-400 block text-xs font-semibold mb-1.5">
                  Candidate Note:
                </span>
                <div className="p-4 rounded-xl bg-[#070c16] border border-slate-800 text-slate-200 text-xs leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {selectedApp.note}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
              <span>Applied: {new Date(selectedApp.createdAt).toLocaleString()}</span>
              <div className="flex items-center gap-2">
                <select
                  value={selectedApp.status}
                  onChange={(e) => updateAppStatus(selectedApp._id, e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold"
                >
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
                <a
                  href={`mailto:${selectedApp.email}?subject=Axiora Software Labs Application - ${selectedApp.role}`}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all"
                >
                  Contact Candidate
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
