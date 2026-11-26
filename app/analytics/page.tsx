import Link from "next/link"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-slate-400 text-sm">See how your revenue dey perform</p>
        </div>
        <Link href="/" className="bg-blue-600 px-4 py-2 rounded-lg text-sm">
          Back to Overview
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#111827] rounded-xl p-6">
          <p className="text-slate-400 text-sm">Total Volume</p>
          <p className="text-2xl font-bold mt-2">₦84.2M</p>
        </div>
        <div className="bg-[#111827] rounded-xl p-6">
          <p className="text-slate-400 text-sm">Success Rate</p>
          <p className="text-2xl font-bold mt-2 text-green-400">98.24%</p>
        </div>
      </div>
    </div>
  )
}
