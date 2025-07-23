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
    let timeoutId: NodeJS.Timeout;
    
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const scrollDiff = scrollY - lastScrollY.current;
      
      // スクロール位置が10px以下の場合は常に表示
      if (scrollY <= 10) {
        setIsVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        
        // スクロール差分が5px以上の場合のみ判定（微細な変動を無視）
        if (Math.abs(scrollDiff) > 5) {
          if (scrollDiff > 0 && scrollY > 100) {
            // 下にスクロール中かつ100px以上スクロールした場合は隠す
            setIsVisible(false);
          } else if (scrollDiff < 0) {
            // 上にスクロール中は表示
            setIsVisible(true);
          }
        }
      }
      
      // メニューが開いている場合は常に表示
      if (isMobileMenuOpen) {
        setIsVisible(true);
      }
      
      lastScrollY.current = scrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      // デバウンス処理
      clearTimeout(timeoutId);
      
      if (!ticking.current) {
        requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
      
      // 100ms後に最終的な状態を確定
      timeoutId = setTimeout(() => {
        if (!ticking.current) {
          requestAnimationFrame(updateScrollDirection);
          ticking.current = true;
        }
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header 
            initial={{ y: -100, opacity: 0, scale: 0.95 }}
            animate={{ 
              y: 0, 
              opacity: 1, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.8,
                duration: 0.6
              }
            }}
            exit={{ 
              y: -100, 
              opacity: 0, 
              scale: 0.95,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 35,
                duration: 0.4
              }
            }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[400px]"
            style={{
              filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1))'
            }}
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
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      rotate: 0, 
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.2
                      }
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.9, rotate: -5 }}
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
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ 
                      x: 0, 
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        delay: 0.3
                      }
                    }}
                  >
                    <motion.h1 
                      className="text-lg font-heading font-bold text-primary"
                      whileHover={{ scale: 1.02 }}
                    >
                      Kotarou <motion.span 
                        className="text-accent"
                        initial={{ color: "#8B5A2B" }}
                        animate={{ 
                          color: ["#8B5A2B", "#D4A574", "#8B5A2B"],
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        Cafe
                      </motion.span>
                    </motion.h1>
                    <motion.p 
                      className="text-xs text-gray-500 -mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        transition: {
                          delay: 0.5,
                          duration: 0.8
                        }
                      }}
                    >
                      コーヒーと癒しの空間
                    </motion.p>
                  </motion.div>
                </Link>

                {/* モバイルメニューボタン */}
                <motion.button
                  className="flex items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="メニューを開く"
                  initial={{ scale: 0, opacity: 0, rotate: 90 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.4
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: isMobileMenuOpen ? 0 : 10,
                    backgroundColor: "rgba(139, 90, 43, 0.1)",
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.9 }}
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
                            initial={{ opacity: 0, x: -30, scale: 0.8 }}
                            animate={{ 
                              opacity: 1, 
                              x: 0, 
                              scale: 1,
                              transition: {
                                delay: index * 0.15,
                                duration: 0.5,
                                type: "spring",
                                stiffness: 300,
                                damping: 25
                              }
                            }}
                            whileHover={{ 
                              scale: 1.02, 
                              x: 5,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <motion.div
                              whileHover={{
                                boxShadow: isActive 
                                  ? "0 8px 25px rgba(139, 90, 43, 0.3)"
                                  : "0 4px 15px rgba(139, 90, 43, 0.1)",
                                y: -2
                              }}
                              whileTap={{ scale: 0.98, y: 0 }}
                            >
                              <Link
                                href={link.href}
                                className={`block py-4 px-5 text-base font-medium transition-all duration-300 rounded-xl relative overflow-hidden ${
                                  isActive
                                    ? 'text-white bg-gradient-to-r from-primary to-accent shadow-lg'
                                    : 'text-foreground/80 hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <motion.span
                                  className="relative z-10"
                                  initial={{ y: 0 }}
                                  whileHover={{ y: -1 }}
                                >
                                  {link.label}
                                </motion.span>
                                {isActive && (
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                                    initial={{ x: "-100%" }}
                                    animate={{ 
                                      x: "100%",
                                      transition: {
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                      }
                                    }}
                                  />
                                )}
                              </Link>
                            </motion.div>
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
      <div className="h-20" />
    </>
  );
}
