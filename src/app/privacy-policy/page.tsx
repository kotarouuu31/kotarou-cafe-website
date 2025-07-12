'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function PrivacyPolicyPage() {
  const analytics = useAnalytics();
  
  useEffect(() => {
    // ページビューイベントを送信
    analytics.trackPageView('/privacy-policy', 'プライバシーポリシー | Kotarou Cafe');
  }, [analytics]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b border-secondary/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-heading text-2xl font-bold text-primary">Kotarou Cafe</Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/menu" className="font-medium text-foreground hover:text-accent transition-colors">
              Menu
            </Link>
            <Link href="/events" className="font-medium text-foreground hover:text-accent transition-colors">
              Events
            </Link>
            <Link href="/about" className="font-medium text-foreground hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/contact" className="font-medium text-foreground hover:text-accent transition-colors">
              Contact
            </Link>
          </nav>
          <button className="md:hidden text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-grow">
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
      
      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Kotarou Cafe</h3>
            <p className="mb-4">東京都渋谷区カフェ通り1-2-3<br />営業時間: 10:00 - 22:00</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/menu" className="hover:text-accent transition-colors">Menu</Link></li>
              <li><Link href="/events" className="hover:text-accent transition-colors">Events</Link></li>
              <li><Link href="/latte-art" className="hover:text-accent transition-colors">Latte Art</Link></li>
              <li><Link href="/music" className="hover:text-accent transition-colors">Music</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Contact Us</h3>
            <p className="mb-2">Phone: 03-1234-5678</p>
            <p className="mb-2">Email: info@kotarou-cafe.com</p>
            <p>Feel free to contact us anytime.</p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Kotarou Cafe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
