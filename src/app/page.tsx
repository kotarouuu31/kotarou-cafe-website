"use client";

import Image from "next/image";
import { AutoUpdatingRecordPlayer } from '@/components/RecordPlayer';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  // 音符のような装飾エフェクトのアニメーション用
  useEffect(() => {
    // アニメーションの実装はクライアントサイドでのみ実行
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      {/* 1. ファーストビュー - 全画面背景 */}
      <section className="relative w-full h-screen flex flex-col justify-end items-center pb-16">
        {/* 背景画像 */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb" 
            alt="Kotarou Cafe Background" 
            fill 
            style={{objectFit: 'cover'}} 
            priority
            className="brightness-[0.85]"
          />
        </div>
        
        {/* 浮遊する音符のような装飾エフェクト */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="music-note absolute top-1/4 left-1/4 text-white text-4xl opacity-70 animate-float-slow">
            ♪
          </div>
          <div className="music-note absolute top-1/3 right-1/3 text-white text-3xl opacity-60 animate-float-medium">
            ♫
          </div>
          <div className="music-note absolute bottom-1/2 right-1/4 text-white text-5xl opacity-50 animate-float-fast">
            ♩
          </div>
          <div className="music-note absolute bottom-1/3 left-1/3 text-white text-4xl opacity-40 animate-float-slow">
            ♬
          </div>
        </div>
        
        {/* ロゴとサブタイトル */}
        <div className="relative z-20 text-center px-4 mb-8">
          <h1 className="font-heading text-4xl font-bold mb-2 text-white drop-shadow-lg">
            Kotarou Cafe
          </h1>
          <p className="text-white/90 text-sm font-medium tracking-wider drop-shadow-md">
            東京のコーヒー & カフェ
          </p>
        </div>
      </section>

      {/* 2. キャッチコピーセクション */}
      <section className="w-full pt-16 pb-12 px-4 text-center">
        <h1 className="font-heading text-2xl font-bold mb-6 text-primary">
          コーヒーとつながり、心を解き放つ。
        </h1>
        <p className="text-sm text-foreground/80 mb-8 leading-relaxed">
          Kotarou Cafeは、コーヒーと音楽を通じて、自然と人、人と人をつなぐ場を目指しています。
          厳選された豆と丁寧な焙煎、そして熟練のバリスタによる抽出。
          心地よい音楽とともに、感覚がふっとひらく。
          「あぁ」と自然にこぼれる、そのひとときが、記憶に、やさしく残る。
        </p>


      </section>

      {/* 2列グリッド画像ギャラリー */}
      <section className="w-full px-4 mb-12">
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* 1. カフェの内装 */}
          <div className="relative mb-1 shadow-sm" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" 
              alt="カフェの内装" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 2. コーヒー豆焙煎 */}
          <div className="relative mb-1 shadow-sm" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1580933073521-dc51f22c5c31" 
              alt="コーヒー豆焙煎" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 3. ラテアート作品 */}
          <div className="relative mb-1 shadow-sm" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1541167760496-1628856ab772" 
              alt="ラテアート作品" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 4. 店内の雰囲気 */}
          <div className="relative mb-1 shadow-sm" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24" 
              alt="店内の雰囲気" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 5. DJブース */}
          <div className="relative mb-1 shadow-sm" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819" 
              alt="DJブース" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 6. カウンター席 */}
          <div className="relative mb-1 shadow-sm" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb" 
              alt="カウンター席" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 7. 外観 */}
          <div className="relative mb-1 shadow-sm" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1453614512568-c4024d13c247" 
              alt="外観" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 8. イベント風景 */}
          <div className="relative mb-1 shadow-sm" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1543007630-9710e4a00a20" 
              alt="イベント風景" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 9. 季節のメニュー */}
          <div className="relative mb-1 shadow-sm" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1579954115545-a95591f28bfc" 
              alt="季節のメニュー" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 10. お客様の笑顔 */}
          <div className="relative mb-1 shadow-sm" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348" 
              alt="お客様の笑顔" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* ニュースセクション */}
      <section className="w-full px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium">News</h2>
          <Link href="/news" className="text-xs text-accent flex items-center">
            News All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="border-l-2 border-primary-light pl-3 mb-6">
          <div className="mb-1">
            <span className="text-[10px] text-foreground/60 mr-2">2025/07/15</span>
            <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-sm">Information</span>
          </div>
          <h3 className="text-sm font-medium">ホームページをリニューアルしました</h3>
        </div>
      </section>

      {/* 4. 既存機能 - Music Corner */}
      <section className="w-full px-4 mb-12">
        <h2 className="text-xl font-heading font-bold mb-4">音楽が、空間を包み込む</h2>
        <p className="text-xs text-foreground/80 mb-6 leading-relaxed">
          厳選された音楽が流れる空間で、コーヒーの味わいがより深まります。
          週末のDJイベントでは、さらに特別な体験を。
        </p>
        <div className="bg-primary-dark text-white p-6 rounded-md">
          <div className="mb-4">
            <AutoUpdatingRecordPlayer />
          </div>
          <div className="bg-white/10 p-3 rounded-md text-sm mb-4">
            <h3 className="font-heading text-base font-bold mb-2">DJ Schedule</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-white/80">Friday</p>
                <p className="font-medium text-sm">DJ Kotarou - House</p>
              </div>
              <div>
                <p className="text-xs text-white/80">Saturday</p>
                <p className="font-medium text-sm">Guest DJ - Jazz</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="w-full px-4 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium">Events & News</h2>
          <Link href="/events" className="text-xs text-accent flex items-center">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {/* 横スクロールコンテナ */}
        <div className="relative mb-6 overflow-hidden">
          <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent snap-x snap-mandatory">
            {/* イベント1 */}
            <div className="flex-none w-[160px] mr-3 snap-start">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
                  alt="Jazz Night"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">Jazz Night</h3>
              <p className="text-[10px] text-accent">7/20 19:00-21:00</p>
            </div>
            
            {/* イベント2 */}
            <div className="flex-none w-[160px] mr-3 snap-start">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1505236858219-8359eb29e329"
                  alt="Coffee Workshop"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">コーヒー教室</h3>
              <p className="text-[10px] text-accent">7/25 14:00-16:00</p>
            </div>
            
            {/* イベント3 */}
            <div className="flex-none w-[160px] mr-3 snap-start">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1511379938547-c1f69419868d"
                  alt="Music Night"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">アコースティックライブ</h3>
              <p className="text-[10px] text-accent">7/27 18:00-20:00</p>
            </div>
            
            {/* イベント4 */}
            <div className="flex-none w-[160px] mr-3 snap-start">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39"
                  alt="Art Exhibition"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">猫アート展</h3>
              <p className="text-[10px] text-accent">8/1-8/15</p>
            </div>
          </div>
        </div>
      </section>

      {/* ラテアートギャラリー - 自動スクロール */}
      <section className="w-full px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium">Latte Art Gallery</h2>
          <Link href="/latte-art" className="text-xs text-accent flex items-center">
            View More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <p className="text-xs text-foreground/80 mb-4">日々進化するラテアート作品</p>
        
        {/* 自動スクロールギャラリー */}
        <div className="relative mb-6 overflow-hidden">
          <div 
            className="flex pb-4 latte-art-scroll"
            aria-label="ラテアートギャラリー"
            role="region"
            aria-roledescription="carousel"
            aria-live="polite"
            style={{
              animation: 'marquee 30s linear infinite',
              width: 'fit-content',
              transform: 'translateX(0)'
            }}
          >
            <span className="sr-only">自動スクロールするラテアートギャラリーです。</span>
            {/* ラテアート1 - Free Pour */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772"
                  alt="ハートのラテアート"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">Heart Latte</h3>
              <p className="text-[10px] text-accent">Free Pour Technique</p>
            </div>
            
            {/* ラテアート2 - Etching */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1534805539898-7cdb82d04a85"
                  alt="猫のラテアート"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">猫ラテ</h3>
              <p className="text-[10px] text-accent">Etching Technique</p>
            </div>
            
            {/* ラテアート3 - Color Art */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1577968897966-3d4325b36b61"
                  alt="カラフルラテアート"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">カラフルラテ</h3>
              <p className="text-[10px] text-accent">Color Art Technique</p>
            </div>
            
            {/* ラテアート4 - 3D Art */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1572286258217-215cf8445d6e"
                  alt="3Dラテアート"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">3Dラテアート</h3>
              <p className="text-[10px] text-accent">Advanced Technique</p>
            </div>
            
            {/* ラテアート5 - Leaf Design */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd"
                  alt="リーフデザイン"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">リーフデザイン</h3>
              <p className="text-[10px] text-accent">Free Pour Technique</p>
            </div>
            
            {/* ラテアート6 - Rosetta */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1515283709260-ee29296f1534"
                  alt="ロゼッタ"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">ロゼッタ</h3>
              <p className="text-[10px] text-accent">Classic Technique</p>
            </div>
            
            {/* ラテアート7 - Swan */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9"
                  alt="白鳥デザイン"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">白鳥デザイン</h3>
              <p className="text-[10px] text-accent">Advanced Pour</p>
            </div>
            
            {/* ラテアート8 - Seasonal */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31"
                  alt="季節のデザイン"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">季節のデザイン</h3>
              <p className="text-[10px] text-accent">Seasonal Special</p>
            </div>
            
            {/* 無限ループ用の複製アイテム */}
            {/* ラテアート1 - Free Pour (複製) */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772"
                  alt="ハートのラテアート"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">Heart Latte</h3>
              <p className="text-[10px] text-accent">Free Pour Technique</p>
            </div>
            
            {/* ラテアート2 - Etching (複製) */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1534805539898-7cdb82d04a85"
                  alt="猫のラテアート"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">猫ラテ</h3>
              <p className="text-[10px] text-accent">Etching Technique</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat with DJ Nyanko */}
      <section className="w-full px-4 mb-12">
        <div className="bg-gradient-to-br from-accent/20 to-primary/20 p-6 rounded-md text-center">
          <h2 className="text-lg font-heading font-bold mb-3">DJ Nyanko AI</h2>
          <p className="text-xs text-foreground/80 mb-4">
            音楽のことならなんでも知っている、Kotarou Cafeの看板猫DJ。
            好きな音楽や気分を伝えれば、ぴったりの一曲をおすすめしてくれます。
          </p>
          <Button href="/chat" variant="accent" size="sm">
            Chat with DJ Nyanko
          </Button>
        </div>
      </section>
    </div>
  );
}
