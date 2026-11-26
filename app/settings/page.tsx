import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-slate-400 text-sm">Manage your account and preferences</p>
        </div>
        <Link href="/" className="bg-blue-600 px-4 py-2 rounded-lg text-sm">
          Back to Overview
        </Link>
      </div>

      <div className="bg-[#111827] rounded-xl p-6 space-y-4">
        <div>
          <p className="font-semibold">Business Name</p>
          <p className="text-slate-400 text-sm">PayTrack Inc.</p>
        </div>
        <div>
          <p className="font-semibold">Email</p>
          <p className="text-slate-400 text-sm">victor@paytrack.com</p>
        </div>
        <div>
          <p className="font-semibold">Currency</p>
          <p className="text-slate-400 text-sm">NGN (₦) - Nigerian Naira</p>
        </div>
      </div>
    </div>
  )
}
