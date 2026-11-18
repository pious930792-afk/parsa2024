import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "آکادمی کدنویسی و بازی‌سازی پارسا خیری | با کمک جمینای",
  description: "سامانه هوشمند کدنویسی، ساخت و اجرای بازی‌های تعاملی، دستیار هوش مصنوعی جمینای، اشتراک‌گذاری عمومی و سیستم دوستان - توسعه یافته توسط پارسا خیری با کمک جمینای",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <head>
        <meta name="theme-color" content="#030712" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#030712] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 cyber-grid">
        {children}
      </body>
    </html>
  );
}
