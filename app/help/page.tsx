import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Help & Support</h1>
          <p className="text-slate-400 text-sm">How we fit help you?</p>
        </div>
        <Link href="/" className="bg-blue-600 px-4 py-2 rounded-lg text-sm">
          Back to Overview
        </Link>
      </div>

      <div className="space-y-3">
        <div className="bg-[#111827] rounded-xl p-5">
          <p className="font-semibold">How do I view my transactions?</p>
          <p className="text-slate-400 text-sm mt-1">Go to Transactions from the sidebar to see all payments.</p>
        </div>
        <div className="bg-[#111827] rounded-xl p-5">
          <p className="font-semibold">How do I download reports?</p>
          <p className="text-slate-400 text-sm mt-1">Go to Reports and press Download Report.</p>
        </div>
        <div className="bg-[#111827] rounded-xl p-5">
          <p className="font-semibold">Need more help?</p>
          <p className="text-slate-400 text-sm mt-1">Email support@paytrack.com</p>
        </div>
      </div>
    </div>
  )
}
