"use client";

import { useState } from "react";

type Transaction = {
  id: string;
  customer: string;
  email: string;
  amount: number;
  date: string;
  status: "Completed" | "Pending" | "Failed";
  method: string;
};

const transactions: Transaction[] = [
  { id: "TXN-001", customer: "John Doe", email: "john.doe@example.com", amount: 250000, date: "Nov 26, 2026", status: "Completed", method: "Bank Transfer" },
  { id: "TXN-002", customer: "Jane Smith", email: "jane.smith@example.com", amount: 180000, date: "Nov 26, 2026", status: "Pending", method: "Card Payment" },
  { id: "TXN-003", customer: "Michael Brown", email: "michael.b@example.com", amount: 95000, date: "Nov 25, 2026", status: "Completed", method: "Bank Transfer" },
  { id: "TXN-004", customer: "Sarah Wilson", email: "sarah.w@example.com", amount: 320000, date: "Nov 25, 2026", status: "Completed", method: "Card Payment" },
  { id: "TXN-005", customer: "David Johnson", email: "david.j@example.com", amount: 145000, date: "Nov 24, 2026", status: "Pending", method: "Bank Transfer" },
  { id: "TXN-006", customer: "Emily Davis", email: "emily.d@example.com", amount: 275000, date: "Nov 24, 2026", status: "Completed", method: "Card Payment" },
];

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  const total = filtered.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div style={{ padding: "32px", fontFamily: "Inter, sans-serif", background: "#F8FAFC", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "4px" }}>Transactions</h1>
      <p style={{ color: "#64748B", marginBottom: "24px" }}>
        View, search, and manage all customer transactions.
      </p>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          placeholder="Search by customer or transaction ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #E2E8F0", minWidth: "280px", flex: 1 }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #E2E8F0" }}
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #E2E8F0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F1F5F9", textAlign: "left" }}>
              <th style={{ padding: "14px" }}>Transaction ID</th>
              <th style={{ padding: "14px" }}>Customer</th>
              <th style={{ padding: "14px" }}>Amount</th>
              <th style={{ padding: "14px" }}>Date</th>
              <th style={{ padding: "14px" }}>Method</th>
              <th style={{ padding: "14px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} style={{ borderTop: "1px solid #F1F5F9" }}>
                <td style={{ padding: "14px", fontWeight: 600 }}>{t.id}</td>
                <td style={{ padding: "14px" }}>
                  <div style={{ fontWeight: 600 }}>{t.customer}</div>
                  <div style={{ color: "#64748B", fontSize: "13px" }}>{t.email}</div>
                </td>
                <td style={{ padding: "14px", fontWeight: 600 }}>₦{t.amount.toLocaleString()}</td>
                <td style={{ padding: "14px" }}>{t.date}</td>
                <td style={{ padding: "14px" }}>{t.method}</td>
                <td style={{ padding: "14px" }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                      background: t.status === "Completed" ? "#DCFCE7" : t.status === "Pending" ? "#FEF9C3" : "#FEE2E2",
                      color: t.status === "Completed" ? "#166534" : t.status === "Pending" ? "#854D0E" : "#991B1B",
                    }}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p style={{ padding: "24px", textAlign: "center", color: "#64748B" }}>
            No transactions match your search.
          </p>
        )}
      </div>

      <p style={{ marginTop: "16px", color: "#64748B" }}>
        Showing {filtered.length} transactions • Total: <strong>₦{total.toLocaleString()}</strong>
      </p>
    </div>
  );
}
