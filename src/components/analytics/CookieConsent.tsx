'use client';

import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const CookieConsent: React.FC = () => {
  const [cookieConsent, setCookieConsent, resetCookieConsent] = useLocalStorage<boolean>(
    'kotarou-cafe-cookie-consent',
    false
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ページ読み込み時に同意状態を確認
    setIsVisible(!cookieConsent);
  }, [cookieConsent]);

  const handleAccept = () => {
    setCookieConsent(true);
    setIsVisible(false);
    
    // Google Analyticsのcookieフラグを設定
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const handleDecline = () => {
    setCookieConsent(false);
    setIsVisible(false);
    
    // Google Analyticsのcookieフラグを設定
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-1">🍪 Cookieの使用について</h3>
          <p className="text-sm text-gray-600">
            当サイトではGoogle Analyticsを使用してサイトの利用状況を把握し、サービス向上に役立てています。
            続行することで、Cookieの使用に同意したことになります。
            詳しくは<a href="/privacy-policy" className="text-primary underline">プライバシーポリシー</a>をご覧ください。
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
          >
            拒否する
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90"
          >
            同意する
          </button>
        </div>
      </div>
    </div>
  );
};
