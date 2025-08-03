"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  return (
    <div className="min-h-screen lg:flex lg:w-full lg:h-screen lg:fixed lg:inset-0 lg:bg-gray-50">
      {/* 左側：固定コンテンツエリア（画面の60%） */}
      <div className="hidden lg:flex lg:w-[60%] lg:relative lg:h-full lg:overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb" 
            alt="Kotarou Cafe Background" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-10"></div>
        
        {/* コンテンツ：より中央寄せ、余白を活かした配置 */}
        <div className="relative z-20 flex flex-col justify-center items-start w-full h-full px-20 py-16 max-w-4xl">
          {/* ロゴエリア - よりシンプルに */}
          <div className="mb-16">
            <div className="w-16 h-16 rounded-full border border-white/60 mb-6 flex items-center justify-center backdrop-blur-sm bg-white/5">
              <span className="text-xl">☕</span>
            </div>
            <div className="text-white/80 text-xs font-light tracking-[0.2em] mb-2 uppercase">KOTAROU CAFE</div>
          </div>
          
          {/* メインメッセージ - より洗練されたタイポグラフィ */}
          <h1 className="text-white text-5xl lg:text-6xl font-extralight mb-12 leading-[1.1] tracking-tight">
            音楽と<br />
            コーヒーが<br />
            つながる<br />
            <span className="text-amber-200 font-light">特別な時間</span>
          </h1>
          
          {/* サブメッセージ - より余白を活かして */}
          <div className="space-y-8 text-white/90 max-w-lg">
            <p className="text-lg leading-relaxed font-light opacity-90">
              Kotarou Cafeは、<br />
              DJと音楽を組み合わせた体験を通して、<br />
              日常と非日常をつなぐ場を目指しています。
            </p>
            <p className="text-base leading-relaxed opacity-75">
              こだわりのコーヒーと心地よい音楽で、<br />
              特別なひとときをお過ごしください。
            </p>
          </div>
          
          {/* 装飾的な要素 - よりミニマルに */}
          <div className="mt-16 flex items-center space-x-6 text-white/50">
            <div className="w-16 h-px bg-white/30"></div>
            <span className="text-xs tracking-[0.3em] uppercase">Music & Coffee Experience</span>
            <div className="w-16 h-px bg-white/30"></div>
          </div>
          
          {/* ナビゲーションメニュー - よりエレガントに */}
          <nav className="mt-20">
            <div className="space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block text-base font-extralight transition-all duration-500 hover:text-amber-200 hover:tracking-wide ${
                      isActive 
                        ? 'text-amber-200 border-l border-amber-200 pl-4 tracking-wide' 
                        : 'text-white/70 hover:pl-2'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
        
        {/* 音符の装飾 */}
        <div className="absolute top-1/4 right-1/4 text-white/20 text-4xl animate-float-slow z-15">♪</div>
        <div className="absolute bottom-1/3 right-1/3 text-white/15 text-2xl animate-float-medium z-15">♫</div>
        <div className="absolute top-1/2 right-1/6 text-white/10 text-3xl animate-float-fast z-15">♬</div>
      </div>

      {/* 右側：モバイルプレビューフレーム（画面の40%） */}
      <div className="hidden lg:flex lg:w-[40%] lg:p-4 lg:items-center lg:justify-end lg:pr-12 lg:h-full lg:bg-gray-50">
        <div className="bg-black rounded-[2.5rem] p-2 shadow-2xl" style={{width: '380px', height: '760px'}}>
          <div className="bg-white rounded-[2rem] overflow-hidden w-full h-full">
            <div className="h-full overflow-y-auto scrollbar-hide">
              {children}
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
