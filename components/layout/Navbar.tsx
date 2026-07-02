"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Code2 } from "lucide-react";

const links = [
  { href: "/roadmap", label: "نقشه راه" },
  { href: "/questions", label: "بانک سوالات" },
  { href: "/resumes", label: "نمونه رزومه" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]">
      <div className="flex h-16 items-center justify-between px-6">

        <Link href="/" className="flex items-center">
          <Image src={logo} alt="logo" height={20} />
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                pathname.startsWith(link.href)
                  ? "bg-bg-card text-white"
                  : "text-white hover:text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/auth/signin" className="rounded-lg bg-accent-blue px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
          شروع رایگان
        </Link>

      </div>
    </nav>
  );
}