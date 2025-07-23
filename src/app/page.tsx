"use client";

import Image from "next/image";
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useEffect } from 'react';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { AutoUpdatingRecordPlayer } from '@/components/RecordPlayer';

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
      <ScrollAnimation className="w-full px-4 mb-12" rootMargin="-50px">
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* 1. カフェの内装 */}
          <div className="relative mb-1 shadow-sm stagger-item" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" 
              alt="カフェの内装" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 2. コーヒー豆焼煎 */}
          <div className="relative mb-1 shadow-sm stagger-item delay-100" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1580933073521-dc51f22c5c31" 
              alt="コーヒー豆焼煎" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 3. ラテアート作品 */}
          <div className="relative mb-1 shadow-sm stagger-item delay-200" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1541167760496-1628856ab772" 
              alt="ラテアート作品" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 4. 店内の雰囲気 */}
          <div className="relative mb-1 shadow-sm stagger-item delay-300" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24" 
              alt="店内の雰囲気" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 5. DJブース */}
          <div className="relative mb-1 shadow-sm stagger-item delay-100" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819" 
              alt="DJブース" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 6. カウンター席 */}
          <div className="relative mb-1 shadow-sm stagger-item delay-200" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb" 
              alt="カウンター席" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 7. 外観 */}
          <div className="relative mb-1 shadow-sm stagger-item delay-300" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1453614512568-c4024d13c247" 
              alt="外観" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 8. イベント風景 */}
          <div className="relative mb-1 shadow-sm stagger-item delay-400" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1543007630-9710e4a00a20" 
              alt="イベント風景" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 9. 季節のメニュー */}
          <div className="relative mb-1 shadow-sm stagger-item delay-100" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1579954115545-a95591f28bfc" 
              alt="季節のメニュー" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
          
          {/* 10. お客様の笑顔 */}
          <div className="relative mb-1 shadow-sm stagger-item delay-200" style={{ aspectRatio: '3/4' }}>
            <Image 
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348" 
              alt="お客様の笑顔" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-lg"
            />
          </div>
        </div>
      </ScrollAnimation>

      {/* メニューボタン */}
      <ScrollAnimation className="w-full px-4 mb-12 flex justify-center" rootMargin="-30px" delay={100}>
        <Button 
          href="/menu" 
          variant="accent" 
          size="lg" 
          className="w-full max-w-[400px] min-h-[56px] bg-gradient-to-r from-accent to-primary shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 group relative overflow-hidden"
          aria-label="メニューページへ移動"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <div className="flex items-center justify-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 16h18M9 10h.01M15 10h.01M21 3v18" />
            </svg>
            <span className="font-medium text-base md:text-lg">メニューを見る</span>
          </div>
        </Button>
      </ScrollAnimation>

      {/* ニュースセクション */}
      <ScrollAnimation className="w-full px-4 mb-12" rootMargin="-40px" delay={150}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium">News</h2>
          <Link href="/events?tab=news" className="text-xs text-accent flex items-center">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          {/* ニュース1 */}
          <div className="bg-white/5 p-4 rounded-md shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-xs text-accent mr-2">2023.07.15</span>
              <span className="text-xs px-2 py-0.5 bg-primary/20 rounded-full">イベント</span>
            </div>
            <h3 className="font-medium text-sm mb-1 line-clamp-1">7月のJazz Night開催のお知らせ</h3>
            <p className="text-xs text-foreground/70 line-clamp-2">
              毎月恒例のJazz Nightを7月20日(金)に開催します。今回は特別ゲストとして、ジャズピアニストの山田太郎氏をお迎えします。
            </p>
          </div>
          
          {/* ニュース2 */}
          <div className="bg-white/5 p-4 rounded-md shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-xs text-accent mr-2">2023.07.10</span>
              <span className="text-xs px-2 py-0.5 bg-secondary/20 rounded-full">メニュー</span>
            </div>
            <h3 className="font-medium text-sm mb-1 line-clamp-1">夏季限定ドリンク登場</h3>
            <p className="text-xs text-foreground/70 line-clamp-2">
              暑い夏にぴったりの冷たいドリンク「サマーベリーフラッペ」と「マンゴーコールドブリュー」が登場しました。
              フレッシュなフルーツを使用した爽やかな一杯をお楽しみください。
            </p>
          </div>
          
          {/* ニュース3 */}
          <div className="bg-white/5 p-4 rounded-md shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-xs text-accent mr-2">2023.07.05</span>
              <span className="text-xs px-2 py-0.5 bg-accent/20 rounded-full">お知らせ</span>
            </div>
            <h3 className="font-medium text-sm mb-1 line-clamp-1">営業時間変更のお知らせ</h3>
            <p className="text-xs text-foreground/70 line-clamp-2">
              7月15日より、平日の営業時間を8:00〜22:00に拡大いたします。
              モーニングメニューも充実させ、早朝からご利用いただけるようになりました。
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-4">Upcoming Events</h3>
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
      </ScrollAnimation>

      {/* ラテアートギャラリー - 自動スクロール */}
      <ScrollAnimation className="w-full px-4 mb-12" rootMargin="-40px" delay={200}>
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
            className="flex space-x-4" 
            style={{ 
              width: 'max-content', 
              transform: 'translateX(0)', 
              animation: 'marquee 30s linear infinite' 
            }}
          >
            {/* ラテアート1 */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772"
                  alt="リーフラテアート"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">リーフデザイン</h3>
              <p className="text-[10px] text-accent">Free Pour</p>
            </div>
            
            {/* ラテアート2 */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1577968897966-3d4325b36b61"
                  alt="ハートラテアート"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">ハートデザイン</h3>
              <p className="text-[10px] text-accent">Free Pour</p>
            </div>
            
            {/* ラテアート3 */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1534040385115-33dcb3acba5b"
                  alt="スワンラテアート"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">スワンデザイン</h3>
              <p className="text-[10px] text-accent">Etching</p>
            </div>
            
            {/* ラテアート4 */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1572286258217-215b98b0d184"
                  alt="フラワーラテアート"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-medium text-xs mb-1">フラワーデザイン</h3>
              <p className="text-[10px] text-accent">Free Pour</p>
            </div>
            
            {/* ラテアート5 */}
            <div className="flex-none w-[160px] mr-3">
              <div className="relative aspect-square mb-2 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39"
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
      </ScrollAnimation>

      {/* Music Corner */}
      <ScrollAnimation className="w-full px-4 mb-12" rootMargin="-40px" delay={225}>
        <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-6 rounded-md">
          <h2 className="text-lg font-heading font-bold mb-2 text-center">音楽が、空間を包み込む</h2>
          <p className="text-xs text-foreground/80 mb-6 text-center leading-relaxed">
            厳選されたプレイリストと共に、コーヒーの香りに包まれながら、
            心地よい時間をお過ごしください。
          </p>
          
          {/* レコードプレーヤーとDJスケジュール */}
          <div className="flex flex-col gap-4">
            {/* レコードプレーヤー */}
            <div className="bg-white/10 p-4 rounded-md">
              <AutoUpdatingRecordPlayer className="text-white" />
            </div>
            
            {/* DJ Schedule */}
            <div className="bg-white/10 p-4 rounded-md">
              <h3 className="font-heading text-sm font-bold mb-3 text-center">DJ Schedule</h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/10 p-3 rounded">
                  <p className="text-xs text-foreground/80 mb-1">Friday</p>
                  <p className="font-medium text-xs">DJ Kotarou</p>
                  <p className="text-xs text-accent">House</p>
                </div>
                <div className="bg-white/10 p-3 rounded">
                  <p className="text-xs text-foreground/80 mb-1">Saturday</p>
                  <p className="font-medium text-xs">Guest DJ</p>
                  <p className="text-xs text-accent">Jazz</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* Chat with DJ Nyanko */}
      <ScrollAnimation className="w-full px-4 mb-12" rootMargin="-40px" delay={250}>
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
      </ScrollAnimation>
    </div>
  );
}
