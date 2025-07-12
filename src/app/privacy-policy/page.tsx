'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useEffect } from 'react';

export default function PrivacyPolicyPage() {
  const analytics = useAnalytics();
  
  useEffect(() => {
    // ページビューイベントを送信
    analytics.trackPageView('/privacy-policy', 'プライバシーポリシー | Kotarou Cafe');
  }, [analytics]);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">プライバシーポリシー</h1>
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. 個人情報の収集について</h2>
            <p>
              Kotarou Cafeでは、サイトの利用状況を把握し、サービス向上のために以下の情報を収集することがあります：
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>アクセス情報（訪問したページ、滞在時間など）</li>
              <li>デバイス情報（使用ブラウザ、OS、画面サイズなど）</li>
              <li>位置情報（国や地域レベル）</li>
              <li>リファラー情報（どのサイトから訪れたかなど）</li>
            </ul>
            <p className="mt-2">
              これらの情報はGoogle Analytics 4を通じて収集され、個人を特定する目的では使用されません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Cookieの使用について</h2>
            <p>
              当サイトではCookieを使用して、ユーザー体験の向上やアクセス解析を行っています。
              Cookieは小さなテキストファイルで、ブラウザに保存され、サイト訪問時に送信されます。
            </p>
            <p className="mt-2">
              Google Analyticsでは、Cookieを使用してユーザーの行動データを収集します。
              これにより、サイトの利用状況を分析し、コンテンツやサービスの改善に役立てています。
            </p>
            <p className="mt-2">
              ブラウザの設定からCookieを無効にすることも可能ですが、一部の機能が正常に動作しなくなる可能性があります。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Google Analyticsについて</h2>
            <p>
              当サイトではGoogle Analytics 4（GA4）を使用しています。
              Google Analyticsから提供される情報は、サイトの改善やコンテンツの最適化のために使用されます。
            </p>
            <p className="mt-2">
              Google Analyticsの詳細やオプトアウトについては、
              <a 
                href="https://policies.google.com/privacy?hl=ja" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Googleのプライバシーポリシー
              </a>
              をご確認ください。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. データの共有と開示</h2>
            <p>
              収集した情報は、以下の場合を除き、第三者に提供されることはありません：
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>法的な要請があった場合</li>
              <li>サイト運営者の権利や財産を保護する必要がある場合</li>
              <li>ユーザーや公共の安全を守るために必要な場合</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. プライバシーポリシーの変更</h2>
            <p>
              本プライバシーポリシーは、必要に応じて更新されることがあります。
              重要な変更がある場合は、サイト上で通知します。
            </p>
            <p className="mt-2">
              最終更新日: 2025年7月12日
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. お問い合わせ</h2>
            <p>
              プライバシーポリシーに関するご質問やご意見は、お問い合わせフォームからお寄せください。
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
