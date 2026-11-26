"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  ShieldAlert,
  BarChart3,
  Users,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  DollarSign,
  Activity,
  AlertTriangle,
  Filter,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Transactions", icon: ArrowLeftRight },
  { name: "Fraud Alerts", icon: ShieldAlert },
  { name: "Analytics", icon: BarChart3 },
  { name: "Users", icon: Users },
];

const transactions = [
  { id: "TXN-001", user: "Ada Okafor", amount: "₦250,000", type: "Transfer", status: "Completed", time: "2 min ago" },
  { id: "TXN-002", user: "Chidi Eze", amount: "₦85,500", type: "Withdrawal", status: "Flagged", time: "18 min ago" },
  { id: "TXN-003", user: "Fatima Bello", amount: "₦1,200,000", type: "Deposit", status: "Completed", time: "32 min ago" },
  { id: "TXN-004", user: "Tunde Bakare", amount: "₦45,000", type: "Transfer", status: "Pending", time: "1 hr ago" },
];

function Sidebar({ open, setOpen, active, setActive }: any) {
  return (
    <aside className={`bg-slate-900 text-white flex flex-col shrink-0 transition-all duration-300 ${open ? "w-64" : "w-20"}`}>
      <div className="flex items-center justify-between p-4">
        {open && <span className="font-bold text-xl">PayTrack</span>}
        <button onClick={() => setOpen(!open)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700">
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.name === active;
          return (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
            >
              <Icon size={20} />
              {open && <span className="text-sm font-medium">{item.name}</span>}
            </button>
          );
        })}
      </nav>

      {open && (
        <div className="p-4 m-2 bg-slate-800 rounded-xl">
          <p className="text-xs text-slate-400">System Status</p>
          <p className="text-sm font-semibold text-emerald-400 flex items-center gap-1"><Activity size={14} /> All Systems Live</p>
        </div>
      )}
    </aside>
  );
}

function StatCard({ title, value, change, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border">
      <div className="flex justify-between">
        <p className="text-sm text-slate-500">{title}</p>
        <div className={`p-2 rounded-lg ${color}`}><Icon size={18} /></div>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1"><ArrowUpRight size={12} /> {change}</p>
    </div>
  );
}

export default function PaytrackDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState("Dashboard");

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} active={active} setActive={setActive} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b px-4 md:px-6 py-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg md:text-2xl font-bold">{active}</h1>
            <p className="text-xs md:text-sm text-slate-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-full">
              <Search size={16} className="text-slate-400" />
              <input placeholder="Search..." className="bg-transparent outline-none text-sm w-32" />
            </div>
            <button className="relative p-2 bg-slate-100 rounded-full"><Bell size={18} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /></button>
            <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        <main className="p-4 md:p-6 space-y-6">
          {active === "Dashboard" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Revenue" value="₦12.4M" change="+12.5% vs last month" icon={DollarSign} color="bg-emerald-100 text-emerald-600" />
                <StatCard title="Transactions" value="8,429" change="+8.2% vs last month" icon={ArrowLeftRight} color="bg-blue-100 text-blue-600" />
                <StatCard title="Active Users" value="3,182" change="+4.1% vs last month" icon={Users} color="bg-purple-100 text-purple-600" />
                <StatCard title="Fraud Alerts" value="23" change="Needs review" icon={AlertTriangle} color="bg-red-100 text-red-600" />
              </div>

              <div className="bg-white rounded-2xl border overflow-hidden">
                <div className="p-4 flex justify-between items-center">
                  <h2 className="font-bold">Recent Transactions</h2>
                  <button className="flex items-center gap-1 text-sm bg-slate-100 px-3 py-1.5 rounded-full"><Filter size={14} /> Filter</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[600px]">
                    <thead className="bg-slate-50 text-left text-slate-500">
                      <tr><th className="p-4">ID</th><th className="p-4">User</th><th className="p-4">Amount</th><th className="p-4">Type</th><th className="p-4">Status</th><th className="p-4">Time</th></tr>
                    </thead>
                    <tbody>
                      {transactions.map((t) => (
                        <tr key={t.id} className="border-t">
                          <td className="p-4 font-medium">{t.id}</td>
                          <td className="p-4">{t.user}</td>
                          <td className="p-4 font-semibold">{t.amount}</td>
                          <td className="p-4">{t.type}</td>
                          <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs ${t.status === "Completed" ? "bg-emerald-100 text-emerald-700" : t.status === "Flagged" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{t.status}</span></td>
                          <td className="p-4 text-slate-500">{t.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {active === "Transactions" && (
            <div className="bg-white p-6 rounded-2xl border">
              <h2 className="font-bold text-lg mb-4">All Transactions</h2>
              <p className="text-slate-500 text-sm">This is your Transactions page. It is now responding.</p>
              <div className="mt-4 space-y-2">
                {transactions.map((t) => (
                  <div key={t.id} className="flex justify-between p-3 bg-slate-50 rounded-xl"><span>{t.user} - {t.id}</span><span className="font-bold">{t.amount}</span></div>
                ))}
              </div>
            </div>
          )}

          {active === "Fraud Alerts" && (
            <div className="bg-white p-6 rounded-2xl border">
              <h2 className="font-bold text-lg mb-2 flex items-center gap-2"><ShieldAlert className="text-red-500" /> Fraud Alerts</h2>
              <p className="text-slate-500 text-sm">23 alerts need review. Chidi Eze - TXN-002 was flagged for unusual amount.</p>
            </div>
          )}

          {active === "Analytics" && (
            <div className="bg-white p-6 rounded-2xl border">
              <h2 className="font-bold text-lg mb-2">Analytics</h2>
              <p className="text-slate-500 text-sm">Revenue is up 12.5%. Transactions are up 8.2%. Your chart will go here.</p>
            </div>
          )}

          {active === "Users" && (
            <div className="bg-white p-6 rounded-2xl border">
              <h2 className="font-bold text-lg mb-2">Users</h2>
              <p className="text-slate-500 text-sm">3,182 active users. Ada, Chidi, Fatima and Tunde are your most recent users.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
