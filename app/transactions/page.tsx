import Link from "next/link"

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-slate-400 text-sm">All your payments in one place</p>
        </div>
        <Link href="/" className="bg-blue-600 px-4 py-2 rounded-lg text-sm">
          Back to Overview
        </Link>
      </div>

      <div className="bg-[#111827] rounded-xl p-6">
        <p className="text-slate-300">Your transactions list go show here.</p>
        <p className="text-slate-500 text-sm mt-2">Next we go connect am to your real transaction data.</p>
      </div>
    </div>
  )
        }
