import Script from "next/script";

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
  verification: {
    google: "VyGnAUfAjlUAgwsKAvp6BwKQNTe8OTzz0e2m_lArjKM",
  },
  metadataBase: new URL("https://checkflow.vercel.app"),
  openGraph: {
    title: "CheckFlow",
    description:
      "無料で使えるシンプルなオンラインチェックリスト。買い物、旅行、引っ越しなどのタスク管理に最適です。",
    url: "https://あなたのドメイン",
    siteName: "CheckFlow",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "CheckFlow",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "CheckFlow",
    description:
      "無料で使えるシンプルなオンラインチェックリスト。",
    images: ["/opengraph-image.png"],
  },
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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JKYVB39YX1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JKYVB39YX1');
        `}
      </Script>

      <body className="min-h-full flex flex-col bg-slate-100">
        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t bg-white py-6">
          <div className="mx-auto flex max-w-5xl justify-center gap-6 text-sm text-slate-600">
            <a href="/privacy" className="hover:underline">
              プライバシーポリシー
            </a>

            <a href="/terms" className="hover:underline">
              利用規約
            </a>

            <a href="/contact" className="hover:underline">
              お問い合わせ
            </a>
          </div>

          <p className="mt-4 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} CheckFlow
          </p>
        </footer>
      </body>
    </html>
  );
}