"use client";

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Footer from './Footer';

interface PCLayoutProps {
  children: ReactNode;
}

// ナビゲーションリンク定義
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/latte-art', label: 'Latte Art' },
  { href: '/events', label: 'Events & News' },
  { href: '/contact', label: 'Contact' },
];

export const PCLayout = ({ children }: PCLayoutProps) => {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.classList.contains('mobile-preview-content')) {
        setScrollY(target.scrollTop);
      }
    };

    // コンポーネントがマウントされた後にスクロールリスナーを設定
    const timer = setTimeout(() => {
      const mobilePreviewContent = document.querySelector('.mobile-preview-content');
      if (mobilePreviewContent) {
        mobilePreviewContent.addEventListener('scroll', handleScroll);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      const mobilePreviewContent = document.querySelector('.mobile-preview-content');
      if (mobilePreviewContent) {
        mobilePreviewContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // スクロール量に応じてモバイルプレビューの位置と高さを調整
  const mobilePreviewTop = Math.max(0, 64 - scrollY); // 初期64px、スクロールで0まで減少
  const mobilePreviewHeight = `calc(100vh - 4rem + ${64 - mobilePreviewTop}px)`; // 上に移動した分だけ高さを増加

  return (
    <div className="min-h-screen lg:w-screen lg:h-screen lg:fixed lg:inset-0 lg:overflow-hidden">
      {/* 背景全体：左側コンテンツを画面全体に表示 */}
      <div className="hidden lg:block lg:absolute lg:inset-0 lg:w-full lg:h-full">
        {/* 背景画像 */}
        <div 
          className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80)',
            filter: 'brightness(0.7)'
          }}
        ></div>
        
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-10"></div>
        
        {/* コンテンツ：中央寄りに配置（右側はモバイルプレビュー用に空ける） */}
        <div className="relative z-20 flex flex-col justify-between w-full h-full pl-24 pr-[45%] py-12 items-center">
          {/* 上部エリア */}
          <div className="flex-1 flex flex-col justify-center">
            {/* ロゴエリア */}
            <div className="mb-16">
              <div className="w-16 h-16 rounded-full border border-white/60 mb-4 flex items-center justify-center backdrop-blur-sm bg-white/5">
                <span className="text-xl">☕</span>
              </div>
              <div className="text-white/90 text-xs font-light tracking-[0.3em] mb-1">KOTAROU CAFE</div>
              <div className="text-white/50 text-[10px] tracking-[0.2em]">EST. 2024</div>
            </div>
            
            {/* メインメッセージ */}
            <div className="mb-12">
              <div className="flex items-start space-x-6">
                <div className="text-white text-4xl font-extralight leading-none tracking-tight writing-mode-vertical">
                  音<br />楽<br />と<br />コ<br />ー<br />ヒ<br />ー<br />が
                </div>
                <div className="text-white text-4xl font-extralight leading-none tracking-tight writing-mode-vertical">
                  織<br />り<br />な<br />す
                </div>
                <div className="text-amber-300 text-4xl font-extralight leading-none tracking-tight writing-mode-vertical">
                  特<br />別<br />な<br />ひ<br />と<br />と<br />き
                </div>
              </div>
            </div>
            
            {/* サブメッセージ */}
            <div className="space-y-4 text-white/80 max-w-md">
              <p className="text-sm leading-relaxed font-light">
                音楽とコーヒー、そして人との出会いが<br />
                新しいインスピレーションを生み出す。
              </p>
              <p className="text-xs leading-relaxed opacity-70">
                一杯のコーヒーから始まる、新しい物語をお楽しみください。
              </p>
            </div>
          </div>
          
          {/* 下部エリア */}
          <div className="flex flex-col space-y-8">
            {/* 装飾的な要素 */}
            <div className="flex items-center space-x-3 text-white/40">
              <div className="w-8 h-px bg-white/30"></div>
              <span className="text-[10px] tracking-[0.2em]">WHERE MUSIC MEETS COFFEE</span>
              <div className="w-8 h-px bg-white/30"></div>
            </div>
            
            {/* ナビゲーションメニュー */}
            <nav>
              <div className="flex items-center space-x-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-light transition-all duration-300 hover:text-amber-300 relative ${
                        isActive 
                          ? 'text-amber-300' 
                          : 'text-white/70'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <div className="absolute -bottom-1 left-0 w-full h-px bg-amber-300"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
        
        {/* 音符の装飾 */}
        <div className="absolute top-1/4 right-1/4 text-white/20 text-4xl animate-float-slow z-15">♪</div>
        <div className="absolute bottom-1/3 right-1/3 text-white/15 text-2xl animate-float-medium z-15">♫</div>
        <div className="absolute top-1/2 right-1/6 text-white/10 text-3xl animate-float-fast z-15">♬</div>
      </div>

      {/* 右側：モバイルプレビューフレーム（背景の上に重ねて表示） */}
      <div 
        className="hidden lg:flex lg:absolute lg:right-4 lg:z-30 lg:transition-all lg:duration-300" 
        style={{
          top: `${mobilePreviewTop}px`,
          transform: 'translateX(-80px) translateY(0)'
        }}
      >
        <div className="bg-black rounded-[2.5rem] p-2 shadow-2xl" style={{width: '400px', height: mobilePreviewHeight}}>
          <div className="bg-white rounded-[2rem] overflow-hidden w-full h-full">
            <div className="h-full overflow-y-auto scrollbar-hide mobile-preview-content flex flex-col">
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>

      {/* モバイル版：既存維持 */}
      <div className="lg:hidden">
        {children}
      </div>
    </div>
  );
};
