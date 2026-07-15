import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CheckFlow",
    template: "%s | CheckFlow",
  },
  description:
    "無料で使えるシンプルなオンラインチェックリスト。買い物、旅行、引っ越しなどのタスク管理に最適です。",
  keywords: [
    "チェックリスト",
    "Todo",
    "タスク管理",
    "買い物リスト",
    "旅行チェックリスト",
  ],
  applicationName: "CheckFlow",
  authors: [{ name: "building-vaccine" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-100">
        {children}
      </body>
    </html>
  );
}