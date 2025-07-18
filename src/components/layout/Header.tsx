'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// ナビゲーションリンク定義
const navLinks = [
  { href: '/', label: 'ホーム' },
  { href: '/menu', label: 'メニュー' },
  { href: '/latte-art', label: 'ラテアート' },
  { href: '/events', label: 'イベント' },
  { href: '/social', label: 'ソーシャル' },
  { href: '/contact', label: 'お問い合わせ' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ヘッダー用の空白スペース */}
      <div className="h-16"></div>
      
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white shadow-sm' 
            : 'bg-white'
        }`}
      >
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[400px] px-4 py-3">
            <div className="flex items-center justify-between">
              {/* ロゴ */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative w-8 h-8">
                  <Image 
                    src="/images/logo.png" 
                    alt="Kotarou Cafe" 
                    fill
                    className="object-contain"
                    sizes="32px"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-base font-heading font-bold text-primary">
                    Kotarou <span className="text-accent">Cafe</span>
                  </h1>
                </div>
              </Link>

              {/* モバイルメニューボタン */}
              <button
                className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="メニューを開く"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* モバイルナビゲーション */}
            {isMobileMenuOpen && (
              <nav className="mt-3 pb-2 border-t border-gray-100 pt-2">
                <ul className="space-y-0">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`block py-3 px-2 text-base font-medium transition-colors duration-200 rounded-md ${
                            isActive
                              ? 'text-accent font-semibold bg-accent/5'
                              : 'text-foreground/90 hover:text-accent hover:bg-gray-50'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
