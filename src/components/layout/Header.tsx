'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// ナビゲーションリンク定義
const navLinks = [
  { href: '/', label: 'ホーム' },
  { href: '/menu', label: 'メニュー' },
  { href: '/events', label: 'イベント' },
  { href: '/music', label: 'ミュージック' },
  { href: '/latte-art', label: 'ラテアート' },
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-md' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
              <Image 
                src="/images/logo.png" 
                alt="Kotarou Cafe" 
                fill
                className="object-contain"
                sizes="(max-width: 768px) 40px, 48px"
                priority
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-heading font-bold text-primary">
                Kotarou <span className="text-accent">Cafe</span>
              </h1>
              <p className="text-xs md:text-sm text-foreground/70">
                コーヒーと癒しの空間
              </p>
            </div>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-primary/10 ${
                    isActive
                      ? 'text-primary font-semibold bg-primary/5'
                      : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden flex items-center p-2 rounded-md hover:bg-primary/10"
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
          <nav className="md:hidden mt-3 pb-3 border-t border-secondary/20 pt-2">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-primary font-semibold bg-primary/5'
                          : 'text-foreground/80 hover:text-primary hover:bg-primary/10'
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
