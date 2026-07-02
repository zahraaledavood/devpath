import localFont from "next/font/local";

export const iranYekanX = localFont({
  src: [
    {
      path: "../public/fonts/IRANYekanX-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanX-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanX-DemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanX-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanX-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanX-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanX-ExtraBlack.ttf",
      weight: "950",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" className={iranYekanX.className}>
      <body className="relative">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent-blue/15 blur-[120px]" />
          <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-accent-purple/15 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-accent-emerald/15 blur-[120px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
