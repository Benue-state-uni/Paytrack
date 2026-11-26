"use client"

import { useMemo, useState } from "react"
import { Activity, AlertTriangle, ArrowRight, ArrowUpRight, Bell, ChevronDown, CircleHelp, Download, Ellipsis, FileChartColumn, LayoutDashboard, LifeBuoy, Menu, MoreHorizontal, Search, Settings, ShieldAlert, SlidersHorizontal, Users, Wallet, X } from "lucide-react"
import { transactions as seedTransactions, type Transaction, type TransactionStatus } from "@/data/transactions"

const filters = ["All", "Success", "Pending", "Failed", "Flagged"] as const
const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Transactions", icon: ArrowLeftRight, badge: "12", href: "/transactions" },
  { name: "Fraud Alerts", icon: ShieldAlert, badge: "3", href: "/fraud-alerts" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Users", icon: Users, href: "/users" },
];
const formatNaira = (value: number) => `₦${value.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function StatusBadge({ status }: { status: TransactionStatus }) {
  const styles: Record<TransactionStatus, string> = {
    Success: "status-success",
    Pending: "status-pending",
    Failed: "status-failed",
    Flagged: "status-flagged",
  }
  return <span className={`status-badge ${styles[status]}`}><span className="status-dot" />{status}</span>
}

function Sidebar({ active, setActive, open, close }: { active: string; setActive: (value: string) => void; open: boolean; close: () => void }) {
  return <>
    {open && <button aria-label="Close navigation" className="sidebar-scrim" onClick={close} />}
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand"><div className="brand-mark"><Activity size={19} strokeWidth={2.6} /></div><span>PayTrack</span><button aria-label="Close menu" className="mobile-close" onClick={close}><X size={18} /></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav aria-label="Main navigation" className="side-nav">
        {navItems.map(({ name, icon: Icon, badge, href }) => (
  <button key={name} className={activeNav === name ? "nav-item nav-active" : "nav-item"} onClick={() => { setActiveNav(name); if (href) window.location.href = href; }}>
    <Icon size={18} />
    {open && <span>{name}</span>}
    {badge && <span className="nav-badge">{badge}</span>}
  </button>
))}

function StatCard({ title, value, change, icon: Icon, tone, note }: { title: string; value: string; change: string; icon: typeof Wallet; tone: string; note: string }) {
  return <article className="stat-card"><div className="stat-top"><span>{title}</span><div className={`stat-icon ${tone}`}><Icon size={18} strokeWidth={1.8} /></div></div><div className="stat-value">{value}</div><div className="stat-foot"><span className={change.startsWith("Needs") ? "change-attention" : "change-positive"}>{change.startsWith("Needs") ? <AlertTriangle size={12} /> : <ArrowUpRight size={14} />}{change}</span><span>{note}</span></div></article>
}

function VolumeChart() {
  const bars = [38, 52, 43, 66, 49, 72, 60, 82, 57, 71, 91, 68, 78, 59, 86, 70, 96, 75, 62, 82, 68, 91, 73, 100]
  return <section className="panel chart-panel"><div className="panel-heading"><div><h2>Transaction volume</h2><p>Daily transaction activity</p></div><button className="period-select">Last 7 days <ChevronDown size={14} /></button></div><div className="chart-summary"><strong>₦18.42M</strong><span className="change-positive"><ArrowUpRight size={14} /> 12.8%</span><span className="summary-caption">vs. previous period</span></div><div className="bar-chart" aria-label="Transactions per day bar chart">
    <div className="chart-y-labels"><span>₦3M</span><span>₦2M</span><span>₦1M</span><span>₦0</span></div><div className="chart-plot"><div className="chart-grid"><i /><i /><i /><i /></div><div className="bars">{bars.map((height, index) => <div key={index} className={`bar ${index === 16 ? "bar-highlight" : ""}`} style={{ height: `${height}%` }} title={`${height * 1000} transactions`} />)}</div><div className="chart-x-labels"><span>Mon, 12</span><span>Tue, 13</span><span>Wed, 14</span><span>Thu, 15</span><span>Fri, 16</span><span>Sat, 17</span><span>Sun, 18</span></div></div></div></section>
}

function TypeChart() {
  return <section className="panel type-panel"><div className="panel-heading"><div><h2>Transaction types</h2><p>Breakdown by channel</p></div><button className="icon-button" aria-label="More chart options"><Ellipsis size={19} /></button></div><div className="type-chart-content"><div className="donut-chart" role="img" aria-label="Transaction types: Transfer 52%, Card 24%, USSD 15%, POS 9%"><div className="donut-center"><strong>15.2k</strong><span>transactions</span></div></div><div className="legend"><div><i className="legend-transfer" /><span>Transfer</span><strong>52%</strong></div><div><i className="legend-card" /><span>Card</span><strong>24%</strong></div><div><i className="legend-ussd" /><span>USSD</span><strong>15%</strong></div><div><i className="legend-pos" /><span>POS</span><strong>9%</strong></div></div></div></section>
}

function FraudPanel({ items, onReview }: { items: Transaction[]; onReview: (id: string) => void }) {
  return <section className="panel fraud-panel"><div className="panel-heading"><div className="fraud-title"><div className="fraud-title-icon"><ShieldAlert size={17} /></div><div><h2>Fraud alerts</h2><p>Requires your attention</p></div></div><span className="alert-count">{items.length.toString().padStart(2, "0")}</span></div><div className="fraud-list">{items.length ? items.map((item) => <article className="fraud-item" key={item.id}><div className="fraud-item-top"><span className="risk-tag"><span />HIGH RISK</span><span className="fraud-time">{item.time}</span></div><strong className="fraud-name">{item.sender}</strong><p>{formatNaira(item.amount)} <span>· {item.type}</span></p><div className="fraud-item-bottom"><span className="fraud-id">{item.id}</span><button onClick={() => onReview(item.id)}>Review <ArrowRight size={13} /></button></div></article>) : <div className="fraud-empty">No active alerts. Your transactions look good.</div>}</div><button className="view-alerts">View all alerts <ArrowRight size={14} /></button></section>
}

export function PayTrackDashboard() {
  const [records, setRecords] = useState(seedTransactions)
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")
  const [query, setQuery] = useState("")
  const [globalSearch, setGlobalSearch] = useState("")
  const [activeNav, setActiveNav] = useState("Dashboard")
  const [menuOpen, setMenuOpen] = useState(false)
  const filteredRecords = useMemo(() => records.filter((item) => (filter === "All" || item.status === filter) && `${item.id} ${item.sender} ${item.receiver}`.toLowerCase().includes(query.toLowerCase())), [records, filter, query])
  const fraudItems = records.filter((item) => item.status === "Flagged").slice(0, 3)
  const flagTransaction = (id: string) => setRecords((current) => current.map((item) => item.id === id ? { ...item, status: "Flagged" } : item))
  const reviewAlert = (id: string) => { setFilter("Flagged"); setQuery(id); document.getElementById("transactions")?.scrollIntoView({ behavior: "smooth", block: "start" }) }
  return <div className="dashboard-shell">
    <Sidebar active={activeNav} setActive={setActiveNav} open={menuOpen} close={() => setMenuOpen(false)} />
    <div className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu icon-button" aria-label="Open navigation" onClick={() => setMenuOpen(true)}><Menu size={20} /></button><div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>{activeNav}</strong></div></div><div className="topbar-actions"><label className="top-search"><Search size={16} /><input aria-label="Search the dashboard" placeholder="Search anything..." value={globalSearch} onChange={(event) => setGlobalSearch(event.target.value)} /><kbd>⌘ K</kbd></label><button className="notification-button" aria-label="Notifications"><Bell size={19} /><i /></button><div className="topbar-divider" /><button className="top-profile" aria-label="Admin profile"><span className="top-avatar">VI</span><ChevronDown size={15} /></button></div></header>
      <main className="dashboard-content"><div className="page-heading"><div><div className="eyebrow">MONDAY, JUNE 18, 2024</div><h1>Good morning, Victor <span>✦</span></h1><p>Here&apos;s what&apos;s happening with your transactions today.</p></div><div className="heading-actions"><span className="live-badge"><i /> LIVE</span><button className="export-button" onClick={() => { const csv = ["Transaction ID,Sender,Receiver,Amount,Type,Status,Date", ...records.map((t) => `${t.id},${t.sender},${t.receiver},${t.amount},${t.type},${t.status},${t.date}`)].join("\n"); const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); link.download = "paytrack-transactions.csv"; link.click(); URL.revokeObjectURL(link.href) }}><Download size={15} /> Export report</button></div></div>
        <section className="stats-grid" aria-label="Transaction statistics"><StatCard title="Total transactions" value="24,892" change="12.8%" note="vs last month" icon={Activity} tone="stat-blue" /><StatCard title="Total volume" value="₦84.2M" change="8.2%" note="vs last month" icon={Wallet} tone="stat-violet" /><StatCard title="Success rate" value="98.24%" change="2.4%" note="vs last month" icon={ArrowUpRight} tone="stat-green" /><StatCard title="Flagged transactions" value={String(records.filter((item) => item.status === "Flagged").length).padStart(2, "0")} change="Needs review" note="high priority" icon={AlertTriangle} tone="stat-amber" /></section>
        <div className="analytics-grid"><VolumeChart /><TypeChart /><FraudPanel items={fraudItems} onReview={reviewAlert} /></div>
        <section className="panel transactions-panel" id="transactions"><div className="transactions-heading"><div><h2>Live transactions <span className="live-mini"><i /> Live</span></h2><p>Monitor and manage all your transactions</p></div><button className="icon-button transaction-options" aria-label="Transaction options"><SlidersHorizontal size={17} /></button></div><div className="table-toolbar"><div className="filter-list" role="group" aria-label="Filter transactions by status">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`filter-button ${filter === item ? "filter-active" : ""}`}>{item}{item === "Flagged" && <span className="filter-count">{records.filter((transaction) => transaction.status === "Flagged").length}</span>}</button>)}</div><label className="table-search"><Search size={15} /><input aria-label="Search by sender or transaction ID" placeholder="Search by sender or ID..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>/</kbd></label></div>
          <div className="table-scroll"><table><thead><tr><th>TRANSACTION ID</th><th>SENDER</th><th>RECEIVER</th><th>AMOUNT</th><th>TYPE</th><th>STATUS</th><th>DATE</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{filteredRecords.map((item) => <tr key={item.id} className={item.status === "Flagged" ? "flagged-row" : ""}><td><span className="transaction-id">{item.id}</span></td><td><div className="person-cell"><span className="person-avatar" style={{ backgroundColor: item.color }}>{item.initials}</span><span>{item.sender}</span></div></td><td className="receiver-cell">{item.receiver}</td><td className="amount-cell">{formatNaira(item.amount)}</td><td><span className={`type-pill type-${item.type.toLowerCase()}`}>{item.type}</span></td><td><StatusBadge status={item.status} /></td><td className="date-cell">{item.date}</td><td><button className="row-action" aria-label={`Flag transaction ${item.id}`} title="Flag transaction" onClick={() => flagTransaction(item.id)}><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table>{filteredRecords.length === 0 && <div className="no-results">No transactions match your search.</div>}</div><div className="table-footer"><span>Showing <strong>{filteredRecords.length}</strong> of <strong>{records.length}</strong> transactions</span><button>View all transactions <ArrowRight size={14} /></button></div></section>
        <footer className="page-footer"><span>© 2024 PayTrack Financial Systems</span><span><CircleHelp size={13} /> Secure financial oversight</span></footer>
      </main>
    </div>
  </div>
}
