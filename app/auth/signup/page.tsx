"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import bcryptjs from "bcryptjs"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const hashedPassword = await bcryptjs.hash(password, 10)

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: hashedPassword, name }),
    })

    if (res.ok) {
      router.push("/auth/signin")
    } else {
      alert("خطا در ثبت نام")
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary">
      <div className="w-96 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        <h1 className="mb-8 text-3xl font-bold text-white text-center">ثبت نام</h1>

        <form onSubmit={handleSignUp} className="space-y-3 mb-6">
          <input
            type="text"
            placeholder="نام"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-blue/50 focus:bg-white/10 transition-all backdrop-blur-sm"
            required
          />
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-blue/50 focus:bg-white/10 transition-all backdrop-blur-sm"
            required
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-blue/50 focus:bg-white/10 transition-all backdrop-blur-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-accent-blue to-accent-blue/80 hover:from-accent-blue/90 hover:to-accent-blue/70 px-4 py-3 text-white font-medium transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? "درحال ثبت نام..." : "ثبت نام"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          قبلاً ثبت نام کرده‌اید؟{" "}
          <Link href="/auth/signin" className="text-accent-blue hover:text-accent-blue/80 font-medium">
            وارد شوید
          </Link>
        </p>
      </div>
    </div>
  )
}