import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ChatWidgetWrapper } from "@/components/chat/ChatWidgetWrapper";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
// import { PWAInstallPrompt } from "@/components/pwa/PWAInstallPrompt"; // 自動プロンプト無効化のためコメントアウト

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kotarou Cafe | コーヒーと癒しの空間",
  description: "Kotarou Cafeへようこそ。美味しいコーヒーとくつろぎの空間をお楽しみください。",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kotarou Cafe",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#8B5A2B',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {/* PWA用メタタグ */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B5A2B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kotarou Cafe" />
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
        <meta name="msapplication-TileColor" content="#8B5A2B" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
      </head>
      <body
        className={`${playfair.variable} ${poppins.variable} antialiased bg-gray-100 flex justify-center`}
        suppressHydrationWarning
      >
        <div className="w-full max-w-[400px] bg-white min-h-screen shadow-md relative">
          <div className="lg:hidden">
            <Header />
          </div>
          <main className="w-full">
            {children}
          </main>
          <div className="lg:hidden">
            <Footer />
          </div>
          <Suspense fallback={null}>
            <ChatWidgetWrapper />
          </Suspense>
          <CookieConsent />
          {/* PWA自動インストールプロンプトを無効化 */}
          {/* <PWAInstallPrompt /> */}
        </div>
      </body>
    </html>
  );
}
