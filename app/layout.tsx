import { Vazirmatn } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
});

export const metadata: Metadata = {
  title: 'DevPath | شغل رویاییت رو پیدا کن',
  description: 'نقشه راه، بانک سوال مصاحبه و نمونه رزومه برای توسعه‌دهندگان',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        {children}
      </body>
    </html>
  );
}