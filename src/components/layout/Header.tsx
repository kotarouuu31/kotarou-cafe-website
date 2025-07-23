'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ナビゲーションリンク定義
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/latte-art', label: 'Latte Art' },
  { href: '/events', label: 'Events & News' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // スクロール方向検出とヘッダー表示制御
  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      
      // スクロール位置が10px以下の場合は常に表示
      if (scrollY < 10) {
        setIsVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        
        // スクロール方向を判定
        if (scrollY > lastScrollY.current && scrollY > 80) {
          // 下にスクロール中かつ80px以上スクロールした場合は隠す
          setIsVisible(false);
        } else if (scrollY < lastScrollY.current) {
          // 上にスクロール中は表示
          setIsVisible(true);
        }
      }
      
      lastScrollY.current = scrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header 
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3 
            }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[400px]"
          >
            <div 
              className={`w-full px-4 py-3 transition-all duration-300 ${
                isScrolled || isMobileMenuOpen
                  ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
                  : 'bg-white/90 backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                {/* ロゴ */}
                <Link href="/" className="flex items-center space-x-3">
                  <motion.div 
                    className="relative w-10 h-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image 
                      src="/images/logo.png" 
                      alt="Kotarou Cafe" 
                      fill
                      className="object-contain rounded-full"
                      sizes="40px"
                      priority
                    />
                  </motion.div>
                  <div>
                    <h1 className="text-lg font-heading font-bold text-primary">
                      Kotarou <span className="text-accent">Cafe</span>
                    </h1>
                    <p className="text-xs text-gray-500 -mt-1">コーヒーと癒しの空間</p>
                  </div>
                </Link>

                {/* モバイルメニューボタン */}
                <motion.button
                  className="flex items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="メニューを開く"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-primary"
                    animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
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
                  </motion.svg>
                </motion.button>
              </div>

              {/* モバイルナビゲーション */}
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.nav 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="mt-4 pb-3 border-t border-gray-200 pt-3"
                  >
                    <ul className="space-y-1">
                      {navLinks.map((link, index) => {
                        const isActive = pathname === link.href;
                        return (
                          <motion.li 
                            key={link.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <Link
                              href={link.href}
                              className={`block py-3 px-4 text-base font-medium transition-all duration-200 rounded-xl ${
                                isActive
                                  ? 'text-white bg-primary shadow-md transform scale-[0.98]'
                                  : 'text-foreground/80 hover:text-primary hover:bg-primary/5 hover:transform hover:scale-[0.98]'
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </motion.nav>
                )}
              </AnimatePresence>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
      
      {/* ヘッダーの高さ分のスペーサー */}
      <div className={`transition-all duration-300 ${
        isVisible ? 'h-20' : 'h-0'
      }`} />
    </>
  );
}
