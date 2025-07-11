import React from 'react';
import Link from 'next/link';
import LatteArtGallery from '../../components/LatteArtGallery';

export default function LatteArtPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b border-secondary/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-heading text-2xl font-bold text-primary">Kotarou Cafe</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium text-foreground hover:text-accent transition-colors">
              ホーム
            </Link>
            <Link href="/menu" className="font-medium text-foreground hover:text-accent transition-colors">
              メニュー
            </Link>
            <Link href="/events" className="font-medium text-foreground hover:text-accent transition-colors">
              イベント
            </Link>
            <Link href="/latte-art" className="font-medium text-primary hover:text-accent transition-colors">
              ラテアート
            </Link>
            <Link href="/about" className="font-medium text-foreground hover:text-accent transition-colors">
              お店について
            </Link>
            <Link href="/contact" className="font-medium text-foreground hover:text-accent transition-colors">
              お問い合わせ
            </Link>
          </nav>
          <button className="md:hidden text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <LatteArtGallery />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">Kotarou Cafe</h3>
              <p className="mb-4">心地よい空間で、こだわりのコーヒーとお食事をお楽しみください。</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">営業時間</h3>
              <p>月〜金: 9:00 - 20:00</p>
              <p>土日祝: 10:00 - 22:00</p>
              <p className="mt-2">※イベント開催日は変更あり</p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">お問い合わせ</h3>
              <p>〒123-4567</p>
              <p>東京都渋谷区カフェ通り1-2-3</p>
              <p>TEL: 03-1234-5678</p>
              <p>Email: info@kotarou-cafe.com</p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p>&copy; 2025 Kotarou Cafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
