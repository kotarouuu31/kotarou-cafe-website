'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

// GA4 測定ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// GA4イベント送信関数
export const sendGAEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  }
};

// ページビュー送信関数
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function' && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Google Analytics コンポーネント
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    pageview(url);
  }, [pathname, searchParams]);

  // GA_MEASUREMENT_IDが設定されていない場合は何も表示しない
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}
