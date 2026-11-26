"use client";

import { useState, useEffect, useRef } from "react";
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
  Wallet,
  Activity,
  AlertTriangle,
  X,
  Copy,
  Check,
  LogOut,
  Settings,
  User as UserIcon,
  Ban,
  PauseCircle,
  CheckCircle2,
  Phone,
  ShieldCheck,
  IdCard,
  Lock,
  History,
  Smartphone,
  MapPin,
  Eye,
  EyeOff,
} from "lucide-react";

// LOGIN - CHANGE THIS TO YOUR OWN PASSWORD
const ADMIN_EMAIL = "victor@paytrack.ng";
const ADMIN_PASSWORD = "Victor123";
const ADMIN_NAME = "Victor Idima";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Transactions", icon: ArrowLeftRight },
  { name: "Fraud Alerts", icon: ShieldAlert },
  { name: "Analytics", icon: BarChart3 },
  { name: "Users", icon: Users },
];

const initialTransactions = [
  { id: "TXN-001", user: "Ada Okafor", email: "ada@example.com", phone: "+234 803 123 4567", amount: 250000, amountStr: "₦250,000", type: "Transfer", status: "Completed", time: "2 min ago", date: "26 Nov 2026, 2:32 PM", sender: "Ada Okafor - 0123456789", receiver: "Emeka Obi - 9876543210", bank: "GTBank", reference: "REF-88412001", fee: "₦25", note: "Rent payment" },
  { id: "TXN-002", user: "Chidi Eze", email: "chidi@example.com", phone: "+234 805 987 6543", amount: 85500, amountStr: "₦85,500", type: "Withdrawal", status: "Flagged", time: "18 min ago", date: "26 Nov 2026, 2:16 PM", sender: "Chidi Eze - 0223456789", receiver: "ATM - Lekki Branch", bank: "Access Bank", reference: "REF-88412002", fee: "₦100", note: "Flagged: Unusual amount for this user - 8x normal amount", fraudScore: 85, fraudReasons: ["Amount 8x higher than normal", "New device detected", "New location detected"] },
  { id: "TXN-003", user: "Fatima Bello", email: "fatima@example.com", phone: "+234 809 111 2222", amount: 1200000, amountStr: "₦1,200,000", type: "Deposit", status: "Completed", time: "32 min ago", date: "26 Nov 2026, 2:02 PM", sender: "Fatima Bello - Employer", receiver: "Fatima Bello - 0323456789", bank: "FirstBank", reference: "REF-88412003", fee: "₦0", note: "Salary deposit" },
  { id: "TXN-004", user: "Tunde Bakare", email: "tunde@example.com", phone: "+234 807 333 4444", amount: 45000, amountStr: "₦45,000", type: "Transfer", status: "Pending", time: "1 hr ago", date: "26 Nov 2026, 1:34 PM", sender: "Tunde Bakare - 0423456789", receiver: "Aisha Musa - 0523456789", bank: "OPay", reference: "REF-88412004", fee: "₦10", note: "Waiting for confirmation" },
  { id: "TXN-005", user: "Emeka Obi", email: "emeka@example.com", phone: "+234 806 555 6666", amount: 320000, amountStr: "₦320,000", type: "Transfer", status: "Completed", time: "2 hrs ago", date: "26 Nov 2026, 12:30 PM", sender: "Emeka Obi - 9876543210", receiver: "Ada Okafor - 0123456789", bank: "Kuda", reference: "REF-88412005", fee: "₦25", note: "Business payment" },
  { id: "TXN-006", user: "Aisha Musa", email: "aisha@example.com", phone: "+234 808 777 8888", amount: 15000, amountStr: "₦15,000", type: "Deposit", status: "Completed", time: "3 hrs ago", date: "26 Nov 2026, 11:20 AM", sender: "Aisha Musa - Cash", receiver: "Aisha Musa - 0523456789", bank: "Moniepoint", reference: "REF-88412006", fee: "₦0", note: "Cash deposit" },
];

const userHistoryDB: any = {
  "Chidi Eze": { avgAmount: 9875, avgStr: "₦9,875", totalTxns: 24, totalVolume: "₦237,000", joined: "Jan 2026", usualDevice: "iPhone 13 - Lagos", usualLocation: "Lagos, Nigeria", risk: "High", currentDevice: "Samsung Galaxy - Abuja (NEW)", currentLocation: "Abuja, Nigeria (NEW)", last5: [ { id: "TXN-089", amount: "₦10,000", type: "Transfer", date: "24 Nov 2026", device: "iPhone 13 - Lagos", status: "Completed" }, { id: "TXN-076", amount: "₦8,000", type: "Withdrawal", date: "20 Nov 2026", device: "iPhone 13 - Lagos", status: "Completed" }, { id: "TXN-061", amount: "₦12,000", type: "Transfer", date: "15 Nov 2026", device: "iPhone 13 - Lagos", status: "Completed" }, { id: "TXN-052", amount: "₦9,500", type: "Transfer", date: "10 Nov 2026", device: "iPhone 13 - Lagos", status: "Completed" }, { id: "TXN-044", amount: "₦10,000", type: "Deposit", date: "05 Nov 2026", device: "iPhone 13 - Lagos", status: "Completed" }, ], },
  "Ada Okafor": { avgAmount: 180000, avgStr: "₦180,000", totalTxns: 42, totalVolume: "₦7,560,000", joined: "Nov 2025", usualDevice: "iPhone 15 - Abuja", usualLocation: "Abuja, Nigeria", risk: "Low", currentDevice: "iPhone 15 - Abuja", currentLocation: "Abuja, Nigeria", last5: [ { id: "TXN-098", amount: "₦200,000", type: "Transfer", date: "25 Nov 2026", device: "iPhone 15 - Abuja", status: "Completed" }, { id: "TXN-091", amount: "₦150,000", type: "Transfer", date: "22 Nov 2026", device: "iPhone 15 - Abuja", status: "Completed" }, { id: "TXN-084", amount: "₦180,000", type: "Deposit", date: "18 Nov 2026", device: "iPhone 15 - Abuja", status: "Completed" }, { id: "TXN-079", amount: "₦210,000", type: "Transfer", date: "12 Nov 2026", device: "iPhone 15 - Abuja", status: "Completed" }, { id: "TXN-072", amount: "₦160,000", type: "Transfer", date: "08 Nov 2026", device: "iPhone 15 - Abuja", status: "Completed" }, ], },
  "Fatima Bello": { avgAmount: 950000, avgStr: "₦950,000", totalTxns: 18, totalVolume: "₦17,100,000", joined: "Mar 2026", usualDevice: "Samsung S24 - Kano", usualLocation: "Kano, Nigeria", risk: "Low", currentDevice: "Samsung S24 - Kano", currentLocation: "Kano, Nigeria", last5: [ { id: "TXN-095", amount: "₦1,200,000", type: "Deposit", date: "26 Nov 2026", device: "Samsung S24 - Kano", status: "Completed" }, { id: "TXN-088", amount: "₦800,000", type: "Transfer", date: "20 Nov 2026", device: "Samsung S24 - Kano", status: "Completed" }, { id: "TXN-071", amount: "₦900,000", type: "Deposit", date: "10 Nov 2026", device: "Samsung S24 - Kano", status: "Completed" }, { id: "TXN-060", amount: "₦1,100,000", type: "Deposit", date: "01 Nov 2026", device: "Samsung S24 - Kano", status: "Completed" }, { id: "TXN-050", amount: "₦750,000", type: "Transfer", date: "25 Oct 2026", device: "Samsung S24 - Kano", status: "Completed" }, ], },
  "Tunde Bakare": { avgAmount: 38000, avgStr: "₦38,000", totalTxns: 31, totalVolume: "₦1,178,000", joined: "Feb 2026", usualDevice: "Tecno Camon - Ibadan", usualLocation: "Ibadan, Nigeria", risk: "Low", currentDevice: "Tecno Camon - Ibadan", currentLocation: "Ibadan, Nigeria", last5: [ { id: "TXN-090", amount: "₦40,000", type: "Transfer", date: "24 Nov 2026", device: "Tecno Camon - Ibadan", status: "Completed" }, { id: "TXN-082", amount: "₦35,000", type: "Transfer", date: "19 Nov 2026", device: "Tecno Camon - Ibadan", status: "Completed" }, { id: "TXN-068", amount: "₦42,000", type: "Withdrawal", date: "14 Nov 2026", device: "Tecno Camon - Ibadan", status: "Completed" }, { id: "TXN-055", amount: "₦30,000", type: "Transfer", date: "09 Nov 2026", device: "Tecno Camon - Ibadan", status: "Completed" }, { id: "TXN-047", amount: "₦38,000", type: "Deposit", date: "03 Nov 2026", device: "Tecno Camon - Ibadan", status: "Completed" }, ], },
  "Emeka Obi": { avgAmount: 280000, avgStr: "₦280,000", totalTxns: 35, totalVolume: "₦9,800,000", joined: "Dec 2025", usualDevice: "iPhone 14 - Enugu", usualLocation: "Enugu, Nigeria", risk: "Low", currentDevice: "iPhone 14 - Enugu", currentLocation: "Enugu, Nigeria", last5: [ { id: "TXN-094", amount: "₦320,000", type: "Transfer", date: "26 Nov 2026", device: "iPhone 14 - Enugu", status: "Completed" }, { id: "TXN-085", amount: "₦250,000", type: "Transfer", date: "21 Nov 2026", device: "iPhone 14 - Enugu", status: "Completed" }, { id: "TXN-074", amount: "₦300,000", type: "Deposit", date: "16 Nov 2026", device: "iPhone 14 - Enugu", status: "Completed" }, { id: "TXN-063", amount: "₦270,000", type: "Transfer", date: "11 Nov 2026", device: "iPhone 14 - Enugu", status: "Completed" }, { id: "TXN-051", amount: "₦290,000", type: "Transfer", date: "06 Nov 2026", device: "iPhone 14 - Enugu", status: "Completed" }, ], },
  "Aisha Musa": { avgAmount: 22000, avgStr: "₦22,000", totalTxns: 19, totalVolume: "₦418,000", joined: "Apr 2026", usualDevice: "Infinix - Kaduna", usualLocation: "Kaduna, Nigeria", risk: "Low", currentDevice: "Infinix - Kaduna", currentLocation: "Kaduna, Nigeria", last5: [ { id: "TXN-087", amount: "₦15,000", type: "Deposit", date: "26 Nov 2026", device: "Infinix - Kaduna", status: "Completed" }, { id: "TXN-080", amount: "₦25,000", type: "Transfer", date: "22 Nov 2026", device: "Infinix - Kaduna", status: "Completed" }, { id: "TXN-069", amount: "₦20,000", type: "Deposit", date: "17 Nov 2026", device: "Infinix - Kaduna", status: "Completed" }, { id: "TXN-058", amount: "₦28,000", type: "Transfer", date: "12 Nov 2026", device: "Infinix - Kaduna", status: "Completed" }, { id: "TXN-046", amount: "₦18,000", type: "Deposit", date: "07 Nov 2026", device: "Infinix - Kaduna", status: "Completed" }, ], },
};

const monthlyData = [
  { month: "Jan", revenue: 4.2, txns: 3200 }, { month: "Feb", revenue: 5.1, txns: 3800 }, { month: "Mar", revenue: 4.8, txns: 3600 }, { month: "Apr", revenue: 6.5, txns: 4500 }, { month: "May", revenue: 7.2, txns: 5100 }, { month: "Jun", revenue: 6.8, txns: 4900 }, { month: "Jul", revenue: 8.4, txns: 5800 }, { month: "Aug", revenue: 9.1, txns: 6200 }, { month: "Sep", revenue: 8.7, txns: 6000 }, { month: "Oct", revenue: 10.5, txns: 7200 }, { month: "Nov", revenue: 12.4, txns: 8429 },
];

const notifications = [
  { id: 1, title: "Fraud Alert - TXN-002", desc: "Chidi Eze • ₦85,500 flagged - Fraud Score 85%", time: "18 min ago", color: "bg-red-100 text-red-600", icon: AlertTriangle, txnId: "TXN-002" },
  { id: 2, title: "New Deposit Received", desc: "Fatima Bello • ₦1,200,000 salary deposit", time: "32 min ago", color: "bg-emerald-100 text-emerald-600", icon: Wallet, txnId: "TXN-003" },
  { id: 3, title: "Transaction Pending", desc: "Tunde Bakare • ₦45,000 waiting confirmation", time: "1 hr ago", color: "bg-amber-100 text-amber-600", icon: ArrowLeftRight, txnId: "TXN-004" },
];

function RevenueChart() {
  const max = 13; const [selected, setSelected] = useState(10);
  return (
    <div className="bg-white p-5 rounded-2xl border">
      <div className="flex justify-between items-start"><div><h3 className="font-bold">Revenue Growth</h3><p className="text-sm text-slate-500">Jan - Nov 2026 • Tap a bar</p></div><div className="text-right"><p className="text-2xl font-bold">₦{monthlyData[selected].revenue}M</p><p className="text-xs text-slate-500">{monthlyData[selected].month} • {monthlyData[selected].txns.toLocaleString()} transactions</p></div></div>
      <div className="flex items-end justify-between gap-2 h-48 mt-6">{monthlyData.map((d, i) => (<button key={d.month} onClick={() => setSelected(i)} className="flex-1 flex flex-col items-center gap-2 group"><div className={`w-full rounded-t-lg transition-all ${i === selected ? "bg-blue-600" : "bg-blue-200 group-hover:bg-blue-300"}`} style={{ height: `${(d.revenue / max) * 160}px` }} /><span className={`text-[11px] ${i === selected ? "font-bold text-blue-600" : "text-slate-500"}`}>{d.month}</span></button>))}</div>
    </div>
  );
}
function Sidebar({ open, setOpen, active, setActive }: any) {
  return (
    <aside className={`bg-slate-900 text-white flex flex-col shrink-0 transition-all duration-300 ${open ? "w-64" : "w-20"}`}>
      <div className="flex items-center justify-between p-4">{open && <span className="font-bold text-xl">PayTrack</span>}<button onClick={() => setOpen(!open)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700">{open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}</button></div>
      <nav className="flex-1 p-2 space-y-1">{navItems.map((item) => { const Icon = item.icon; const isActive = item.name === active; return (<button key={item.name} onClick={() => setActive(item.name)} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}><Icon size={20} />{open && <span className="text-sm font-medium">{item.name}</span>}</button>); })}</nav>
      {open && (<div className="p-4 m-2 bg-slate-800 rounded-xl"><p className="text-xs text-slate-400">System Status</p><p className="text-sm font-semibold text-emerald-400 flex items-center gap-1"><Activity size={14} /> All Systems Live</p></div>)}
    </aside>
  );
}
function StatCard({ title, value, change, icon: Icon, color }: any) {
  return (<div className="bg-white p-5 rounded-2xl shadow-sm border"><div className="flex justify-between"><p className="text-sm text-slate-500">{title}</p><div className={`p-2 rounded-lg ${color}`}><Icon size={18} /></div></div><p className="text-2xl font-bold mt-2">{value}</p><p className="text-xs text-emerald-600 flex items-center gap-1 mt-1"><ArrowUpRight size={12} /> {change}</p></div>);
}
function StatusBadge({ status }: any) {
  const style = status === "Completed" ? "bg-emerald-100 text-emerald-700" : status === "Flagged" ? "bg-red-100 text-red-700" : status === "Pending" ? "bg-amber-100 text-amber-700" : status === "Blocked" ? "bg-slate-900 text-white" : status === "On Hold" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700";
  return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${style}`}>{status}</span>;
}

export default function PaytrackDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedTxn, setSelectedTxn] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifRead, setNotifRead] = useState(false);
  const [actionMsg, setActionMsg] = useState("");
  const [verifyCall, setVerifyCall] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [verifyID, setVerifyID] = useState(false);
  const [calling, setCalling] = useState(false);
  // LOGIN STATE - NEW
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const notifRef = useRef<any>(null);
  const profileRef = useRef<any>(null);

  useEffect(() => { if (window.innerWidth < 768) setSidebarOpen(false); }, []);
  useEffect(() => {
    const handler = (e: any) => { if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false); if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false); };
    document.addEventListener("mousedown", handler); return () => document.removeEventListener("mousedown", handler);
  }, []);
  useEffect(() => { setVerifyCall(false); setVerifyOTP(false); setVerifyID(false); setCalling(false); }, [selectedTxn?.id]);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (isLocked) return;
    if (loginEmail.trim().toLowerCase() === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      setIsLoggedIn(true); setLoginError(""); setLoginAttempts(0); setLoginPassword("");
    } else {
      const attempts = loginAttempts + 1; setLoginAttempts(attempts);
      if (attempts >= 3) { setIsLocked(true); setLoginError("Too many wrong attempts. Account locked for 30 seconds for security."); setTimeout(() => { setIsLocked(false); setLoginAttempts(0); setLoginError(""); }, 30000); }
      else setLoginError(`Wrong email or password. Attempt ${attempts}/3 - ${3 - attempts} tries left.`);
    }
  };
  const handleLogout = () => { setIsLoggedIn(false); setShowProfile(false); setSelectedTxn(null); setSelectedUser(null); setLoginEmail(""); setLoginPassword(""); };

  const filtered = transactions.filter((t) => {
    if (filterStatus !== "All" && t.status !== filterStatus) return false;
    const q = search.toLowerCase().trim(); if (!q) return true;
    return t.user.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || t.type.toLowerCase().includes(q) || t.status.toLowerCase().includes(q) || t.amountStr.toLowerCase().includes(q) || t.reference.toLowerCase().includes(q);
  });
  const copyId = () => { if (!selectedTxn) return; navigator.clipboard?.writeText(selectedTxn.id); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const openFromNotif = (txnId: string) => { const txn = transactions.find((t) => t.id === txnId); if (txn) setSelectedTxn(txn); setShowNotif(false); setNotifRead(true); };
  const openUserHistory = (userName: string) => { const h = userHistoryDB[userName]; const txn = transactions.find((t) => t.user === userName); if (h && txn) setSelectedUser({ ...h, user: userName, email: txn.email, phone: txn.phone, currentTxn: txn }); };
  const simulateCall = () => { setCalling(true); setTimeout(() => { setCalling(false); setVerifyCall(true); setActionMsg(`📞 Called ${selectedTxn?.user} on ${selectedTxn?.phone} - User answered: "Yes, that's me"`); setTimeout(() => setActionMsg(""), 4000); }, 1500); };
  const needsVerification = selectedTxn && (selectedTxn.status === "Flagged" || selectedTxn.status === "On Hold");
  const verified = verifyOTP && verifyID;
  const verifyCount = [verifyCall, verifyOTP, verifyID].filter(Boolean).length;
  const handleAction = (action: "approve" | "hold" | "block") => {
    if (!selectedTxn) return;
    if (action === "approve" && needsVerification && !verified) { setActionMsg(`🔒 Cannot Approve yet. Complete verification first: OTP + ID required (${verifyCount}/3 done).`); setTimeout(() => setActionMsg(""), 4000); return; }
    let newStatus = ""; let newNote = ""; let msg = "";
    if (action === "approve") { newStatus = "Completed"; newNote = needsVerification ? `Verified & Released by Victor Idima - Call: ${verifyCall ? "Yes" : "Skipped"}, OTP: ${verifyOTP ? "Confirmed" : "No"}, ID: ${verifyID ? "Matched" : "No"} - Funds released.` : `Approved by Victor Idima - checked, legit transaction.`; msg = `✅ ${selectedTxn.id} Verified & Released - money sent.`; }
    if (action === "hold") { newStatus = "On Hold"; newNote = `Put On Hold by Victor Idima - suspicious, waiting for user verification. Money frozen. Complete Call + OTP + ID to release.`; msg = `⏸️ ${selectedTxn.id} On Hold - money frozen. Now verify user below.`; }
    if (action === "block") { newStatus = "Blocked"; newNote = `Blocked & Refunded by Victor Idima - confirmed fraud / verification failed. User account flagged, money refunded to sender.`; msg = `🚫 ${selectedTxn.id} Blocked & Refunded.`; }
    const updated = { ...selectedTxn, status: newStatus, note: newNote };
    setTransactions((prev) => prev.map((t) => (t.id === selectedTxn.id ? updated : t))); setSelectedTxn(updated); setActionMsg(msg); setTimeout(() => setActionMsg(""), 5000);
  };

  // LOGIN SCREEN - BLOCKS EVERYTHING IF NOT LOGGED IN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto text-white font-bold text-2xl">P</div>
            <h1 className="text-2xl font-bold mt-4">PayTrack Admin</h1>
            <p className="text-slate-500 text-sm mt-1">Secure Admin Login<br />Only authorised admins can access transactions.</p>
          </div>
          <form onSubmit={handleLogin} className="mt-6 space-y-3">
            <div><label className="text-xs font-bold text-slate-500">ADMIN EMAIL</label><input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="victor@paytrack.ng" className="w-full mt-1 px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:border-blue-600 text-sm" required /></div>
            <div><label className="text-xs font-bold text-slate-500">PASSWORD</label><div className="relative mt-1"><input type={showPassword ? "text" : "password"} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter password" className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:border-blue-600 text-sm pr-11" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-slate-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
            {loginError && <div className="bg-red-50 border border-red-100 text-red-700 text-xs px-3 py-2.5 rounded-xl font-medium">🚫 {loginError}</div>}
            <button type="submit" disabled={isLocked} className={`w-full py-3.5 rounded-xl font-bold text-white ${isLocked ? "bg-slate-300" : "bg-blue-600 hover:bg-blue-700"}`}>{isLocked ? "Locked - Wait 30s..." : "🔒 Log In Securely"}</button>
          </form>
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
            <p className="text-xs font-bold text-blue-800">DEMO LOGIN - For Testing</p>
            <p className="text-xs text-blue-700 mt-1">Email: <b>victor@paytrack.ng</b><br />Password: <b>Victor123</b></p>
            <button onClick={() => { setLoginEmail(ADMIN_EMAIL); setLoginPassword(ADMIN_PASSWORD); }} className="mt-2 text-xs bg-white border px-3 py-1.5 rounded-full font-semibold text-blue-700">Fill Demo Login →</button>
          </div>
          <p className="text-[11px] text-slate-400 text-center mt-4 flex items-center justify-center gap-1"><Lock size={11} /> Protected • 3 wrong attempts = 30s lock • Session ends on Logout</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} active={active} setActive={setActive} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b px-4 md:px-6 py-4 flex items-center justify-between gap-3 sticky top-0 z-20">
          <div><h1 className="text-lg md:text-2xl font-bold">{active}</h1><p className="text-xs md:text-sm text-slate-500">Welcome back, Victor • 🔒 Logged in as Admin</p></div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-full"><Search size={16} className="text-slate-400 shrink-0" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, ID, type..." className="bg-transparent outline-none text-sm w-28 md:w-48" />{search && <button onClick={() => setSearch("")}><X size={14} /></button>}</div>
            <div className="relative" ref={notifRef}>
              <button onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }} className="relative p-2 bg-slate-100 rounded-full"><Bell size={18} />{!notifRead && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}</button>
              {showNotif && (<div className="absolute right-0 top-12 w-80 max-w-[90vw] bg-white border rounded-2xl shadow-xl overflow-hidden z-30"><div className="p-4 flex justify-between items-center border-b"><p className="font-bold">Notifications</p><button onClick={() => { setNotifRead(true); setShowNotif(false); }} className="text-xs text-blue-600">Mark all read</button></div><div className="divide-y max-h-80 overflow-y-auto">{notifications.map((n) => { const NIcon = n.icon; return (<button key={n.id} onClick={() => openFromNotif(n.txnId)} className="w-full flex gap-3 p-4 hover:bg-blue-50 text-left"><div className={`p-2 rounded-lg h-fit shrink-0 ${n.color}`}><NIcon size={16} /></div><div className="min-w-0"><p className="font-semibold text-sm">{n.title}</p><p className="text-xs text-slate-500 break-words">{n.desc}</p><p className="text-[11px] text-slate-400 mt-1">{n.time} • Tap to view →</p></div></button>); })}</div></div>)}
            </div>
            <div className="relative" ref={profileRef}>
              <button onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }} className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">VI</button>
              {showProfile && (<div className="absolute right-0 top-12 w-64 bg-white border rounded-2xl shadow-xl overflow-hidden z-30"><div className="p-4 flex gap-3 border-b"><div className="w-11 h-11 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">VI</div><div className="min-w-0"><p className="font-bold truncate">Victor Idima</p><p className="text-xs text-slate-500 truncate">victor@paytrack.ng</p><span className="text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Admin</span></div></div><button onClick={() => setShowProfile(false)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-sm text-left"><UserIcon size={16} /> My Profile</button><button onClick={() => setShowProfile(false)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-sm text-left"><Settings size={16} /> Settings</button><button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-left text-red-600 border-t"><LogOut size={16} /> Log Out</button></div>)}
            </div>
          </div>
        </header>
        {actionMsg && (<div className="px-4 md:px-6 pt-4"><div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3 rounded-xl font-medium">{actionMsg}</div></div>)}
        {(search || filterStatus !== "All") && (<div className="px-4 md:px-6 pt-4"><div className="bg-blue-50 border border-blue-100 text-blue-800 text-sm px-4 py-2 rounded-xl">Showing <b>{filtered.length}</b> result(s) {search && <>for "<b>{search}</b>"</>} {filterStatus !== "All" && <>• Status: <b>{filterStatus}</b></>} <button onClick={() => { setSearch(""); setFilterStatus("All"); }} className="underline ml-2">Clear all</button></div></div>)}
        <main className="p-4 md:p-6 space-y-6">
          {active === "Dashboard" && (<><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><StatCard title="Total Revenue" value="₦12.4M" change="+12.5% vs last month" icon={Wallet} color="bg-emerald-100 text-emerald-600" /><StatCard title="Transactions" value="8,429" change="+8.2% vs last month" icon={ArrowLeftRight} color="bg-blue-100 text-blue-600" /><StatCard title="Active Users" value="3,182" change="+4.1% vs last month" icon={Users} color="bg-purple-100 text-purple-600" /><StatCard title="Fraud Alerts" value="23" change="Needs review" icon={AlertTriangle} color="bg-red-100 text-red-600" /></div><div className="bg-white rounded-2xl border overflow-hidden"><div className="p-4 flex flex-col gap-3"><div className="flex justify-between items-center"><h2 className="font-bold">Recent Transactions • Tap to view</h2><span className="text-xs text-slate-500">{filtered.length} shown</span></div><div className="flex gap-2 flex-wrap">{["All", "Completed", "Flagged", "Pending", "On Hold", "Blocked"].map((s) => (<button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${filterStatus === s ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{s}{s === "All" ? ` (${transactions.length})` : ` (${transactions.filter((t) => t.status === s).length})`}</button>))}</div></div><div className="overflow-x-auto"><table className="w-full text-sm min-w-[600px]"><thead className="bg-slate-50 text-left text-slate-500"><tr><th className="p-4">ID</th><th className="p-4">User</th><th className="p-4">Amount</th><th className="p-4">Type</th><th className="p-4">Status</th><th className="p-4">Time</th></tr></thead><tbody>{filtered.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-slate-500">No results.</td></tr>}{filtered.map((t) => (<tr key={t.id} onClick={() => setSelectedTxn(t)} className="border-t hover:bg-blue-50 cursor-pointer"><td className="p-4 font-medium text-blue-600 underline">{t.id}</td><td className="p-4"><button onClick={(e) => { e.stopPropagation(); openUserHistory(t.user); }} className="font-medium text-blue-600 underline decoration-dotted">{t.user} <span className="text-[10px] text-slate-400 no-underline">• History</span></button></td><td className="p-4 font-semibold">{t.amountStr}</td><td className="p-4">{t.type}</td><td className="p-4"><StatusBadge status={t.status} /></td><td className="p-4 text-slate-500">{t.time}</td></tr>))}</tbody></table></div><p className="text-[11px] text-slate-400 px-4 pb-3">Tip: Tap a blue name to see history - average, device, location.</p></div></>)}
          {active === "Transactions" && (<div className="bg-white rounded-2xl border overflow-hidden"><div className="p-5"><h2 className="font-bold text-lg">All Transactions</h2><p className="text-sm text-slate-500">Tap row for details. Tap name for history.</p><div className="flex gap-2 flex-wrap mt-3">{["All", "Completed", "Flagged", "Pending", "On Hold", "Blocked"].map((s) => (<button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${filterStatus === s ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>{s}</button>))}</div></div><div className="divide-y">{filtered.map((t) => (<div key={t.id} className="flex justify-between items-center p-4 hover:bg-blue-50"><button onClick={() => setSelectedTxn(t)} className="text-left flex-1"><p className="font-semibold">{t.user} <span className="text-blue-600 text-xs">• {t.id}</span></p><p className="text-xs text-slate-500">{t.type} • {t.time}</p></button><button onClick={() => openUserHistory(t.user)} className="text-xs bg-slate-100 px-2 py-1 rounded-full mr-2">History</button><button onClick={() => setSelectedTxn(t)} className="text-right"><p className="font-bold">{t.amountStr}</p><StatusBadge status={t.status} /></button></div>))}{filtered.length === 0 && <p className="p-6 text-center text-slate-500">No results for "{search}"</p>}</div></div>)}
          {active === "Fraud Alerts" && (<div className="bg-white p-6 rounded-2xl border"><h2 className="font-bold text-lg mb-2 flex items-center gap-2"><ShieldAlert className="text-red-500" /> Fraud Alerts</h2><p className="text-slate-500 text-sm mb-4">System auto-detected this from history. Tap to compare with history.</p><button onClick={() => setSelectedTxn(transactions.find((t) => t.id === "TXN-002"))} className="w-full text-left p-4 bg-red-50 border border-red-100 rounded-xl flex justify-between"><div><p className="font-bold">Chidi Eze - TXN-002</p><p className="text-sm text-red-600">₦85,500 • {transactions.find((t) => t.id === "TXN-002")?.status} • Fraud Score 85% • Avg is ₦9,875</p></div><span className="text-blue-600 text-sm">Verify →</span></button><button onClick={() => openUserHistory("Chidi Eze")} className="w-full mt-3 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold">📜 View Chidi's Full History - Why He Was Flagged</button></div>)}
          {active === "Analytics" && (<div className="space-y-4"><div className="grid grid-cols-1 sm:grid-cols-3 gap-4"><StatCard title="Revenue (Nov)" value="₦12.4M" change="+18% vs Oct" icon={Wallet} color="bg-emerald-100 text-emerald-600" /><StatCard title="Transactions (Nov)" value="8,429" change="+17% vs Oct" icon={ArrowLeftRight} color="bg-blue-100 text-blue-600" /><StatCard title="Avg. Transaction" value="₦147,000" change="+2.3% vs Oct" icon={BarChart3} color="bg-purple-100 text-purple-600" /></div><RevenueChart /><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="bg-white p-5 rounded-2xl border"><h3 className="font-bold">By Type</h3><div className="mt-3 space-y-3 text-sm"><div><div className="flex justify-between"><span>Transfer</span><span className="font-bold">62%</span></div><div className="h-2 bg-slate-100 rounded-full mt-1"><div className="h-2 bg-blue-600 rounded-full" style={{ width: "62%" }} /></div></div><div><div className="flex justify-between"><span>Deposit</span><span className="font-bold">24%</span></div><div className="h-2 bg-slate-100 rounded-full mt-1"><div className="h-2 bg-emerald-500 rounded-full" style={{ width: "24%" }} /></div></div><div><div className="flex justify-between"><span>Withdrawal</span><span className="font-bold">14%</span></div><div className="h-2 bg-slate-100 rounded-full mt-1"><div className="h-2 bg-amber-500 rounded-full" style={{ width: "14%" }} /></div></div></div></div><div className="bg-white p-5 rounded-2xl border"><h3 className="font-bold">Insight</h3><p className="text-sm text-slate-600 mt-2">Revenue grew from <b>₦4.2M in Jan</b> to <b>₦12.4M in Nov</b> - almost 3x. November is your best month. Transfers drive 62% of volume.</p></div></div></div>)}
          {active === "Users" && (<div className="bg-white p-6 rounded-2xl border"><h2 className="font-bold text-lg mb-2">Users</h2><p className="text-slate-500 text-sm mb-4">Tap History to see why system trusts or flags them.</p><div className="space-y-2">{filtered.map((t) => (<div key={t.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl"><button onClick={() => setSelectedTxn(t)} className="text-left"><span className="font-medium">{t.user} • {t.email}</span><span className="block text-xs text-slate-500">Avg: {userHistoryDB[t.user]?.avgStr} • {userHistoryDB[t.user]?.totalTxns} txns</span></button><button onClick={() => openUserHistory(t.user)} className="text-blue-600 text-sm font-semibold shrink-0">History →</button></div>))}</div></div>)}
        </main>
      </div>

      {selectedTxn && !selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4" onClick={() => setSelectedTxn(null)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl md:rounded-3xl p-5 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start gap-3"><div className="min-w-0"><p className="text-xs text-slate-500">TRANSACTION DETAILS</p><h2 className="text-xl font-bold">{selectedTxn.amountStr}</h2><p className="text-sm text-slate-500">{selectedTxn.date}</p></div><button onClick={() => setSelectedTxn(null)} className="p-2 bg-slate-100 rounded-full shrink-0"><X size={18} /></button></div>
            <div className="flex items-center gap-2 mt-4 flex-wrap"><StatusBadge status={selectedTxn.status} /><span className="text-sm bg-slate-100 px-2 py-1 rounded-full">{selectedTxn.type}</span></div>
            {selectedTxn.fraudScore && (<div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl"><p className="font-bold text-red-700 text-sm flex items-center gap-1"><AlertTriangle size={14} /> Fraud Score: {selectedTxn.fraudScore}% - HIGH RISK</p><div className="h-2 bg-red-100 rounded-full mt-2"><div className="h-2 bg-red-600 rounded-full" style={{ width: `${selectedTxn.fraudScore}%` }} /></div><ul className="text-xs text-red-700 mt-2 space-y-1">{selectedTxn.fraudReasons?.map((r: string) => (<li key={r}>• {r}</li>))}</ul><button onClick={() => openUserHistory(selectedTxn.user)} className="mt-3 w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold">📜 See History Proof - Why Flagged?</button></div>)}
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-3"><span className="text-slate-500 shrink-0">Transaction ID</span><span className="font-semibold flex items-center gap-1 text-right break-all">{selectedTxn.id}<button onClick={copyId} className="text-blue-600 shrink-0">{copied ? <Check size={14} /> : <Copy size={14} />}</button></span></div>
              <div className="flex justify-between gap-3"><span className="text-slate-500 shrink-0">Reference</span><span className="font-semibold text-right break-all">{selectedTxn.reference}</span></div>
              <div className="flex justify-between gap-3"><span className="text-slate-500 shrink-0">User</span><button onClick={() => openUserHistory(selectedTxn.user)} className="font-semibold text-right text-blue-600 underline decoration-dotted">{selectedTxn.user} • History →</button></div>
              <div className="flex justify-between gap-3"><span className="text-slate-500 shrink-0">Phone</span><span className="font-semibold text-right">{selectedTxn.phone}</span></div>
              <div className="flex justify-between gap-3"><span className="text-slate-500 shrink-0">Email</span><span className="font-semibold text-right break-all">{selectedTxn.email}</span></div>
              <div className="flex justify-between gap-3"><span className="text-slate-500 shrink-0">Sender</span><span className="font-semibold text-right break-words">{selectedTxn.sender}</span></div>
              <div className="flex justify-between gap-3"><span className="text-slate-500 shrink-0">Receiver</span><span className="font-semibold text-right break-words">{selectedTxn.receiver}</span></div>
              <div className="flex justify-between gap-3"><span className="text-slate-500 shrink-0">Bank</span><span className="font-semibold text-right break-words">{selectedTxn.bank}</span></div>
              <div className="flex justify-between gap-3"><span className="text-slate-500 shrink-0">Fee</span><span className="font-semibold">{selectedTxn.fee}</span></div>
              <div className="bg-slate-50 p-3 rounded-xl"><p className="text-slate-500 text-xs">Note / Admin Action</p><p className="font-medium break-words">{selectedTxn.note}</p></div>
            </div>
            {needsVerification && (<div className="mt-5 p-4 bg-blue-50 border border-blue-100 rounded-2xl"><div className="flex justify-between items-center"><p className="font-bold text-sm flex items-center gap-1"><ShieldCheck size={16} className="text-blue-600" /> Verify User Before Release</p><span className="text-xs font-bold bg-white px-2 py-1 rounded-full">{verifyCount}/3 done</span></div><div className="h-2 bg-white rounded-full mt-2"><div className="h-2 bg-blue-600 rounded-full transition-all" style={{ width: `${(verifyCount / 3) * 100}%` }} /></div><button onClick={simulateCall} disabled={verifyCall} className={`w-full mt-3 flex items-center justify-between p-3 rounded-xl border text-left ${verifyCall ? "bg-emerald-50 border-emerald-200" : "bg-white"}`}><span className="flex items-center gap-2 text-sm font-medium"><Phone size={16} className="text-blue-600" /> 1. Call User - {selectedTxn.phone}</span><span className="text-xs font-bold">{calling ? "Calling..." : verifyCall ? "✅ Done" : "Call →"}</span></button><button onClick={() => setVerifyOTP(!verifyOTP)} className={`w-full mt-2 flex items-center justify-between p-3 rounded-xl border text-left ${verifyOTP ? "bg-emerald-50 border-emerald-200" : "bg-white"}`}><span className="flex items-center gap-2 text-sm font-medium"><Lock size={16} className="text-amber-600" /> 2. OTP - User confirmed code</span><span className={`w-5 h-5 rounded border flex items-center justify-center text-xs shrink-0 ${verifyOTP ? "bg-emerald-600 text-white border-emerald-600" : "bg-white"}`}>{verifyOTP ? "✓" : ""}</span></button><button onClick={() => setVerifyID(!verifyID)} className={`w-full mt-2 flex items-center justify-between p-3 rounded-xl border text-left ${verifyID ? "bg-emerald-50 border-emerald-200" : "bg-white"}`}><span className="flex items-center gap-2 text-sm font-medium"><IdCard size={16} className="text-purple-600" /> 3. ID Check - NIN / Selfie matches</span><span className={`w-5 h-5 rounded border flex items-center justify-center text-xs shrink-0 ${verifyID ? "bg-emerald-600 text-white border-emerald-600" : "bg-white"}`}>{verifyID ? "✓" : ""}</span></button>{!verified && <p className="text-[11px] text-blue-700 mt-2 text-center">🔒 Approve is locked until OTP + ID are checked.</p>}{verified && <p className="text-[11px] text-emerald-700 font-bold mt-2 text-center">✅ Verified! You can now Approve & Release funds.</p>}</div>)}
            <div className="mt-5"><p className="text-xs font-bold text-slate-500 mb-2">ADMIN ACTION</p><div className="grid grid-cols-3 gap-2"><button onClick={() => handleAction("approve")} disabled={needsVerification && !verified} className={`py-3 px-1 rounded-xl font-semibold text-xs flex flex-col items-center gap-1 ${needsVerification && !verified ? "bg-slate-200 text-slate-400" : "bg-emerald-600 text-white"}`}><CheckCircle2 size={18} /> {needsVerification && !verified ? "Locked" : "Approve"}</button><button onClick={() => handleAction("hold")} className="py-3 px-1 bg-amber-500 text-white rounded-xl font-semibold text-xs flex flex-col items-center gap-1"><PauseCircle size={18} /> Hold</button><button onClick={() => handleAction("block")} className="py-3 px-1 bg-red-600 text-white rounded-xl font-semibold text-xs flex flex-col items-center gap-1"><Ban size={18} /> Block & Refund</button></div></div>
            <div className="grid grid-cols-2 gap-3 mt-4"><button onClick={() => setSelectedTxn(null)} className="py-3 bg-slate-100 rounded-xl font-semibold">Close</button><button onClick={copyId} className="py-3 bg-blue-600 text-white rounded-xl font-semibold">{copied ? "Copied!" : "Copy ID"}</button></div>
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 flex items-end md:items-center justify-center z-[60] p-0 md:p-4" onClick={() => setSelectedUser(null)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl md:rounded-3xl p-5 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start"><div><p className="text-xs text-slate-500 flex items-center gap-1"><History size={12} /> USER HISTORY - DATABASE RECORD</p><h2 className="text-xl font-bold">{selectedUser.user}</h2><p className="text-sm text-slate-500">{selectedUser.email} • {selectedUser.phone}</p><p className="text-xs text-slate-400">Joined: {selectedUser.joined}</p></div><button onClick={() => setSelectedUser(null)} className="p-2 bg-slate-100 rounded-full shrink-0"><X size={18} /></button></div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center"><div className="bg-slate-50 p-3 rounded-xl"><p className="text-[11px] text-slate-500">Avg Amount</p><p className="font-bold">{selectedUser.avgStr}</p></div><div className="bg-slate-50 p-3 rounded-xl"><p className="text-[11px] text-slate-500">Total Txns</p><p className="font-bold">{selectedUser.totalTxns}</p></div><div className="bg-slate-50 p-3 rounded-xl"><p className="text-[11px] text-slate-500">Total Volume</p><p className="font-bold">{selectedUser.totalVolume}</p></div></div>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl"><p className="font-bold text-sm">⚖️ THIS Transaction vs NORMAL</p><div className="flex justify-between text-sm mt-2"><span>Normal Avg:</span><b>{selectedUser.avgStr}</b></div><div className="flex justify-between text-sm"><span>This Txn:</span><b className="text-red-600">{selectedUser.currentTxn.amountStr}</b></div><div className="flex justify-between text-sm"><span>Times Normal:</span><b className={selectedUser.currentTxn.amount / selectedUser.avgAmount > 3 ? "text-red-600" : "text-emerald-600"}>{(selectedUser.currentTxn.amount / selectedUser.avgAmount).toFixed(1)}x {selectedUser.currentTxn.amount / selectedUser.avgAmount > 3 ? "🚩 TOO HIGH" : "✅ Normal"}</b></div><div className="h-2 bg-white rounded-full mt-2 overflow-hidden"><div className="h-2 bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (selectedUser.avgAmount / selectedUser.currentTxn.amount) * 100)}%` }} /></div><p className="text-[11px] text-slate-500 mt-1">Blue = Normal average. If current is way bigger, system auto-flags.</p></div>
            <div className="mt-4 space-y-2 text-sm"><div className="flex gap-2 items-start bg-slate-50 p-3 rounded-xl"><Smartphone size={16} className="mt-0.5 shrink-0" /><div><p className="text-slate-500 text-xs">Usual Device</p><p className="font-medium">{selectedUser.usualDevice}</p><p className="text-slate-500 text-xs mt-1">This Time:</p><p className={`font-medium ${selectedUser.currentDevice.includes("NEW") ? "text-red-600" : "text-emerald-600"}`}>{selectedUser.currentDevice}</p></div></div><div className="flex gap-2 items-start bg-slate-50 p-3 rounded-xl"><MapPin size={16} className="mt-0.5 shrink-0" /><div><p className="text-slate-500 text-xs">Usual Location</p><p className="font-medium">{selectedUser.usualLocation}</p><p className="text-slate-500 text-xs mt-1">This Time:</p><p className={`font-medium ${selectedUser.currentLocation.includes("NEW") ? "text-red-600" : "text-emerald-600"}`}>{selectedUser.currentLocation}</p></div></div></div>
            <p className="font-bold text-sm mt-4 mb-2">Last 5 Transactions - Proof of Normal Behaviour</p><div className="space-y-2">{selectedUser.last5.map((h: any) => (<div key={h.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl text-sm"><div><p className="font-semibold">{h.id} • {h.amount}</p><p className="text-xs text-slate-500">{h.type} • {h.date} • {h.device}</p></div><StatusBadge status={h.status} /></div>))}</div>
            <div className="bg-blue-50 p-3 rounded-xl mt-4 text-xs text-blue-800"><b>How System Detected:</b> It compared THIS transaction (₦{selectedUser.currentTxn.amount.toLocaleString()}) to HISTORY (Avg {selectedUser.avgStr}). {selectedUser.currentTxn.amount / selectedUser.avgAmount > 3 ? `It's ${(selectedUser.currentTxn.amount / selectedUser.avgAmount).toFixed(1)}x higher + new device + new location = Auto-Flagged.` : "It's normal, same device, same location = Auto-Approved."}</div>
            <div className="grid grid-cols-2 gap-3 mt-4"><button onClick={() => setSelectedUser(null)} className="py-3 bg-slate-100 rounded-xl font-semibold">Close</button><button onClick={() => { setSelectedUser(null); setSelectedTxn(selectedUser.currentTxn); }} className="py-3 bg-blue-600 text-white rounded-xl font-semibold">Back to Transaction →</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
