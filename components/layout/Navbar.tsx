"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2 } from "lucide-react";

const links = [
  { href: "/roadmap", label: "نقشه راه" },
  { href: "/questions", label: "بانک سوالات" },
  { href: "/resumes", label: "نمونه رزومه" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-blue">
            <Code2 size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-white">DevPath</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                pathname.startsWith(link.href)
                  ? "bg-bg-card text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button className="rounded-lg bg-accent-blue px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
          شروع رایگان
        </button>

      </div>
    </nav>
  );
}