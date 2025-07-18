import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ChatWidgetWrapper } from "@/components/chat/ChatWidgetWrapper";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
      </head>
      <body
        className={`${playfair.variable} ${poppins.variable} antialiased bg-gray-100 flex justify-center`}
        suppressHydrationWarning
      >
        <div className="w-full max-w-[400px] bg-white min-h-screen shadow-md relative overflow-hidden">
          <Header />
          <main className="w-full">
            {children}
          </main>
          <Footer />
          <ChatWidgetWrapper />
          <CookieConsent />
        </div>
      </body>
    </html>
  );
}
