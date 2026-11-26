import Link from "next/link"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-slate-400 text-sm">Download and view your reports</p>
        </div>
        <Link href="/" className="bg-blue-600 px-4 py-2 rounded-lg text-sm">
          Back to Overview
        </Link>
      </div>

      <div className="bg-[#111827] rounded-xl p-6">
        <p className="text-slate-300">Monthly Report - November 2026</p>
        <p className="text-slate-500 text-sm mt-2">Total Transactions: 24,892 | Volume: ₦84.2M</p>
        <button className="bg-white text-black px-4 py-2 rounded-lg text-sm mt-4">
          Download Report
        </button>
      </div>
    </div>
  )
}
