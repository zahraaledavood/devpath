'use client';

import { Eye, ChevronLeft } from 'lucide-react';
import { Resume, CATEGORY_LABELS, CATEGORY_COLORS } from '@/types';

function getInitials(fullName: string) {
  const parts = fullName.trim().split(' ');
  return parts.slice(0, 2).map((p) => p[0]).join(' ');
}

export default function ResumeRow({ resume }: { resume: Resume }) {
  const colors = CATEGORY_COLORS[resume.category];

  return (
    <a
      href={resume.file_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-3.5 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 transition-colors hover:bg-white/[0.05]"
    >
      <span
        className="absolute inset-y-0 right-0 w-[3px]"
        style={{ backgroundColor: colors.bar }}
      />

      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-medium"
        style={{ backgroundColor: colors.bg, color: colors.text }}
      >
        {getInitials(resume.full_name)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="mb-2 truncate text-sm font-medium text-slate-100">
          {resume.full_name}
        </p>
        <p className="mb-2.5 truncate text-xs text-slate-400">
          {resume.role_title} · {resume.years_experience} سال سابقه
        </p>
        <div className="flex flex-wrap gap-1.5">
          {resume.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-md px-2 py-0.5 text-[11px]"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Eye size={14} />
          {resume.view_count}
        </span>
        <ChevronLeft
          size={18}
          className="text-slate-600 transition-transform group-hover:-translate-x-0.5"
        />
      </div>
    </a>
  );
}