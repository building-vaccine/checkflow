import Script from "next/script";
import Link from "next/link";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/src/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: siteConfig.keywords,

  applicationName: siteConfig.name,

  authors: [{ name: siteConfig.author }],

  verification: {
    google: "VyGnAUfAjlUAgwsKAvp6BwKQNTe8OTzz0e2m_lArjKM",
  },

  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: siteConfig.locale.og,
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  twitter: {
    card: siteConfig.twitter.card,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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

        <footer className="border-t bg-white py-10">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                CheckFlow
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                ログイン不要・無料で使えるオンラインチェックリストサービスです。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-slate-900">
                  サービス
                </h4>

                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link href="/" className="text-slate-600 hover:text-blue-600">
                      トップページ
                    </Link>
                  </li>

                  <li>
                    <Link href="/templates" className="text-slate-600 hover:text-blue-600">
                      テンプレート一覧
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900">
                  サポート
                </h4>

                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link href="/privacy" className="text-slate-600 hover:text-blue-600">
                      プライバシーポリシー
                    </Link>
                  </li>

                  <li>
                    <Link href="/terms" className="text-slate-600 hover:text-blue-600">
                      利用規約
                    </Link>
                  </li>

                  <li>
                    <Link href="/contact" className="text-slate-600 hover:text-blue-600">
                      お問い合わせ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} CheckFlow
          </p>
        </footer>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              inLanguage: siteConfig.locale.language.replace("_", "-"),
            }),
          }}
        />
      </body>
    </html>
  );
}