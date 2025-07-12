'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// シンプルな404ページコンポーネント - useSearchParamsを使用しない
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Kotarou Cafe
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/#about" className="text-gray-600 hover:text-primary">
                About
              </Link>
              <Link href="/menu" className="text-gray-600 hover:text-primary">
                Menu
              </Link>
              <Link href="/latte-art" className="text-gray-600 hover:text-primary">
                Latte Art
              </Link>
              <Link href="/music" className="text-gray-600 hover:text-primary">
                Music
              </Link>
              <Link href="/events" className="text-gray-600 hover:text-primary">
                Events
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ - シンプルな404ページ */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <div className="mb-8">
            <Image
              src="/images/cat-404.svg"
              alt="404 猫"
              width={300}
              height={300}
              className="mx-auto"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - ページが見つからないニャ〜🐱</h1>
          <p className="text-xl text-gray-600 mb-8">
            お探しのページは存在しないか、移動した可能性がありますニャ〜
          </p>
          <Link 
            href="/" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            ホームに戻るニャン
          </Link>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Kotarou Cafe</h3>
              <p className="text-gray-300">東京都渋谷区コーヒー通り123</p>
              <p className="text-gray-300">03-1234-5678</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-lg font-medium mb-2">営業時間</h4>
                <p className="text-gray-300">月〜金: 8:00-20:00</p>
                <p className="text-gray-300">土: 9:00-22:00</p>
                <p className="text-gray-300">日: 9:00-19:00</p>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">リンク</h4>
                <ul className="space-y-1">
                  <li><Link href="/" className="text-gray-300 hover:text-white">ホーム</Link></li>
                  <li><Link href="/menu" className="text-gray-300 hover:text-white">メニュー</Link></li>
                  <li><Link href="/events" className="text-gray-300 hover:text-white">イベント</Link></li>
                  <li><Link href="/contact" className="text-gray-300 hover:text-white">お問い合わせ</Link></li>
                  <li><Link href="/privacy-policy" className="text-gray-300 hover:text-white">プライバシーポリシー</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">フォロー</h4>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-300 hover:text-white">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Kotarou Cafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
