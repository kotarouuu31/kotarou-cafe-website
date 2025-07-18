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
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-background shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[400px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 transition-transform duration-300">
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
            className="flex items-center p-2"
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
          <nav className="mt-4 pb-2">
            <ul className="space-y-4 text-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block py-2 text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-accent font-semibold'
                          : 'text-foreground/90 hover:text-accent'
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
    </header>
  );
}
