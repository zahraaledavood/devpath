import Navbar from "@/components/layout/Navbar";
import MainMap from "@/components/sections/Map/MainMap";
import { FileText, Zap, MapPlus, CircleQuestionMark, Mic, Briefcase, Rss, LucideIcon } from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
}

interface Feature {
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  title: string;
  desc: string;
  href: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats: Stat[] = [
  { value: "۲.۴k", label: "یادگیرنده فعال" },
  { value: "+۳۸۰", label: "سوال مصاحبه" },
  { value: "۴۸", label: "نمونه رزومه" },
  { value: "%۷۴", label: "نرخ موفقیت" },
];

const features: Feature[] = [
  {
    icon: MapPlus,
    color: "text-accent-blue",
    bg: "bg-accent-blue/10",
    border: "hover:border-accent-blue",
    title: "نقشه راه یادگیری",
    desc: "مسیرهای ساختارمند React، Next.js، Angular و TypeScript از صفر تا ارشد. پیشرفتت رو رصد کن.",
    href: "/roadmap",
  },
  {
    icon: CircleQuestionMark,
    color: "text-accent-emerald",
    bg: "bg-accent-emerald/10",
    border: "hover:border-accent-emerald",
    title: "بانک سوال مصاحبه",
    desc: "+۳۸۰ سوال دسته‌بندی‌شده در React، TypeScript، CSS، پرفورمنس و معماری.",
    href: "/questions",
  },
  {
    icon: FileText,
    color: "text-accent-yellow",
    bg: "bg-accent-yellow/10",
    border: "hover:border-accent-yellow",
    title: "نمونه رزومه",
    desc: "رزومه‌های واقعی از جونیور تا سینیور. نوشتن یه رزومه ی خوب رو یاد بگیر!",
    href: "/resumes",
  },
  {
    icon: Mic,
    color: "text-accent-pink",
    bg: "bg-accent-pink/10",
    border: "hover:border-accent-pink",
    title: "مصاحبه آزمایشی هوش مصنوعی",
    desc: "جلسات مصاحبه واقعی! فنی، رفتاری و طراحی سیستم. نمره بگیر و پیشرفت کن",
    href: "/interview",
  },
  {
    icon: Briefcase,
    color: "text-accent-green",
    bg: "bg-accent-green/10",
    border: "hover:border-accent-green",
    title: "ردیاب فرصت‌های شغلی",
    desc: "با هوش مصنوعی موقعیت‌های مناسب رو سریع پیداکن.",
    href: "/jobs",
  },
  {
    icon: Rss,
    color: "text-accent-purple",
    bg: "bg-accent-purple/10",
    border: "hover:border-accent-purple",
    title: "وبلاگ و راهنماها",
    desc: "تجربه واقعی از برنامه‌نویسانی که مسیر رو طی کردن!",
    href: "/blog",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-primary text-white">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-2 items-baseline gap-16 px-6 ">
        <div className="text-right">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-blue/30 bg-accent-blue/10 px-4 py-1.5 text-sm text-accent-blue">
            <Zap size={13} />
            مسیر شغلی با هوش مصنوعی
          </span>

          <h1 className="mb-5 text-5xl font-extrabold leading-snug">
            شغل رویاییت
            <br />
            رو با برنامه
            <br />
            پیدا کن
          </h1>

          <p className="mb-8 leading-8 text-gray-400">
            همه چیزی که برای گرفتن شغل رویاییت نیاز داری! نقشه راه، بانک سؤال مصاحبه،
            بررسی رزومه با هوش مصنوعی، تمرین مصاحبه واقعی و جامعه‌ای از برنامه‌نویسان فعال.
          </p>

          <div className="flex justify-end gap-3">
            <Link
              href="/roadmap"
              className="rounded-xl bg-accent-blue px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              شروع رایگان
            </Link>
            <Link
              href="/questions"
              className="rounded-xl border border-border bg-bg-card px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-bg-hover"
            >
              بانک سوالات
            </Link>
          </div>
        </div>

        {/* Roadmap */}
        <MainMap />
      </section>

      

      {/* Stats */}
      <div className="border-y border-border bg-bg-secondary">
        <div className="mx-auto grid max-w-6xl grid-cols-4 divide-x divide-x-reverse divide-border px-6 py-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-extrabold text-accent-blue">{s.value}</div>
              <div className="mt-1 text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>


      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-2 text-center text-3xl font-bold">ابزارهای مسیر شغلی</h2>
        <p className="mb-12 text-center text-gray-400">هر چیزی که برای رسیدن به شغل رویاییت نیاز داری</p>

        <div className="grid grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Link key={i} href={f.href} className="group block">
              <div
                className={`h-full rounded-2xl border border-border bg-bg-card p-7 transition-all duration-200 hover:bg-bg-hover ${f.border}`}
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${f.bg}`}>
                  <f.icon size={22} className={f.color} />
                </div>
                <h3 className="mb-2.5 text-base font-bold">{f.title}</h3>
                <p className="text-sm leading-7 text-gray-400">{f.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}