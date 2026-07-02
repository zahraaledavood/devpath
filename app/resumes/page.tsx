import BackButton from '@/components/backButton/backButton';
import ResumeClient from '@/components/resumes/ResumeClient';
import { prisma } from '@/lib/prisma';
import { Resume } from '@/types/index';

export default async function ResumesPage() {
  let resumes: Resume[] = [];
  let error = false;

  try {
    const rows = await prisma.resume.findMany({
      orderBy: { createdAt: 'desc' },
    });

    resumes = rows.map((r) => ({
      id: r.id,
      full_name: r.fullName,
      role_title: r.roleTitle,
      category: r.category as Resume['category'],
      years_experience: r.yearsExperience,
      stack: r.stack,
      view_count: r.viewCount,
      file_url: r.fileUrl,
      created_at: r.createdAt.toISOString(),
    }));
  } catch {
    error = true;
  }

  return (
    <main dir="rtl" className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex justify-between">
        <div className="mb-6">
            <h1 className="mb-1.5 text-xl font-medium text-slate-100">
            نمونه رزومه‌های برنامه‌نویسان
            </h1>
            <p className="text-sm leading-7 text-slate-400">
            رزومه‌های واقعی افراد رو ببین و ازشون برای رزومه‌ی خودت الگو بگیر.
            </p>
        </div>
        <BackButton/>
      </div>

      {error && (
        <p className="text-sm text-red-400">مشکلی در دریافت رزومه‌ها پیش اومد.</p>
      )}

      <ResumeClient resumes={resumes} />

    </main>
  );
}