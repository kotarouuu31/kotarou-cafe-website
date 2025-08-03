"use client";

import { ReactNode } from 'react';

interface PCLayoutProps {
  children: ReactNode;
}

export const PCLayout = ({ children }: PCLayoutProps) => {
  return (
    <div className="min-h-screen lg:flex">
      {/* 左側：固定コンテンツエリア（画面の60%） */}
      <div className="hidden lg:flex lg:w-[60%] lg:relative lg:h-screen lg:overflow-hidden">
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
        
        {/* コンテンツ：画面全体に配置 */}
        <div className="relative z-20 flex flex-col justify-center items-start w-full h-full p-16">
          {/* ロゴエリア */}
          <div className="mb-12">
            <div className="w-20 h-20 rounded-full border-2 border-white/80 mb-6 flex items-center justify-center backdrop-blur-sm bg-white/10">
              <span className="text-2xl">☕</span>
            </div>
            <div className="text-white/90 text-sm font-light tracking-wider mb-2">KOTAROU CAFE</div>
          </div>
          
          {/* メインメッセージ */}
          <h1 className="text-white text-6xl font-light mb-8 leading-[1.1] tracking-tight">
            音楽と<br />
            コーヒーが<br />
            つながる<br />
            <span className="text-amber-300">特別な時間</span>
          </h1>
          
          {/* サブメッセージ */}
          <div className="space-y-6 text-white/90">
            <p className="text-xl leading-relaxed font-light">
              Kotarou Cafeは、<br />
              DJと音楽を組み合わせた体験を通して、<br />
              日常と非日常をつなぐ場を目指しています。
            </p>
            <p className="text-lg leading-relaxed opacity-80">
              こだわりのコーヒーと心地よい音楽で、<br />
              特別なひとときをお過ごしください。
            </p>
          </div>
          
          {/* 装飾的な要素 */}
          <div className="mt-12 flex items-center space-x-4 text-white/60">
            <div className="w-12 h-px bg-white/40"></div>
            <span className="text-sm tracking-widest">MUSIC & COFFEE EXPERIENCE</span>
            <div className="w-12 h-px bg-white/40"></div>
          </div>
        </div>
        
        {/* 音符の装飾 */}
        <div className="absolute top-1/4 right-1/4 text-white/20 text-4xl animate-float-slow z-15">♪</div>
        <div className="absolute bottom-1/3 right-1/3 text-white/15 text-2xl animate-float-medium z-15">♫</div>
        <div className="absolute top-1/2 right-1/6 text-white/10 text-3xl animate-float-fast z-15">♬</div>
      </div>

      {/* 右側：モバイルプレビューフレーム（画面の40%） */}
      <div className="hidden lg:flex lg:w-[40%] lg:p-8 lg:items-center lg:justify-center lg:h-screen">
        <div className="bg-black rounded-[2.5rem] p-2 shadow-2xl">
          <div className="bg-white rounded-[2rem] overflow-hidden h-[800px] w-[400px]">
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
