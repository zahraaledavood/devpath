"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary">
      <div className="w-96 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        <h1 className="mb-8 text-3xl font-bold text-white text-center">ورود به DevPath</h1>
        
        <div className="space-y-3 mb-6">
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full rounded-xl bg-white/10 hover:bg-white/15 px-4 py-3 text-white font-medium transition-all backdrop-blur-sm border border-white/20"
          >
            ورود با GitHub
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-bg-primary to-bg-secondary text-gray-400">یا</span>
          </div>
        </div>

        <form className="space-y-3 mb-6">
          <input
            type="email"
            placeholder="ایمیل"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-blue/50 focus:bg-white/10 transition-all backdrop-blur-sm"
          />
          <input
            type="password"
            placeholder="رمز عبور"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-blue/50 focus:bg-white/10 transition-all backdrop-blur-sm"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-accent-blue to-accent-blue/80 hover:from-accent-blue/90 hover:to-accent-blue/70 px-4 py-3 text-white font-medium transition-all shadow-lg"
          >
            ورود
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          حسابی ندارید؟{" "}
          <Link href="/auth/signup" className="text-accent-blue hover:text-accent-blue/80 font-medium">
            ثبت نام کنید
          </Link>
        </p>
      </div>
    </div>
  )
}