"use client";

import Image from "next/image";
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { PCLayout } from '@/components/layout/PCLayout';
import { EventData, NewsData, LatteArtWork } from '@/lib/notion';
import { RecordBoxNowPlaying } from '@/components/dj/RecordBoxNowPlaying';

// ホーム画面用API呼び出し関数
async function fetchHomeData() {
  try {
    const [newsResponse, eventsResponse, latteArtResponse] = await Promise.all([
      fetch('/api/news'),
      fetch('/api/events'), 
      fetch('/api/latte-art')
    ]);

    const [newsData, eventsData, latteArtData] = await Promise.all([
      newsResponse.json(),
      eventsResponse.json(),
      latteArtResponse.json()
    ]);

    return {
      news: newsData.success ? newsData.data.slice(0, 3) : [],
      events: eventsData.success ? eventsData.data.slice(0, 3) : [],
      latteArt: latteArtData.success ? latteArtData.data.slice(0, 5) : []
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return { news: [], events: [], latteArt: [] };
  }
}

export default function Home() {
  const [homeData, setHomeData] = useState<{
    news: NewsData[];
    events: EventData[];
    latteArt: LatteArtWork[];
  }>({ news: [], events: [], latteArt: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      try {
        const data = await fetchHomeData();
        setHomeData(data);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  // 音符のような装飾エフェクトのアニメーション用
  useEffect(() => {
    // アニメーションの実装はクライアントサイドでのみ実行
  }, []);

  return (
    <PCLayout>
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
      <section className="w-full pt-20 pb-16 px-4 text-center">
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
      <ScrollAnimation className="w-full px-4 mb-16" rootMargin="-50px">
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
      <ScrollAnimation className="w-full px-4 mb-16" rootMargin="-40px" delay={150}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-8">News</h2>
        
        <div className="max-w-xs mx-auto mb-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white/5 p-4 rounded-md shadow-sm animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded mb-1 w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
            ))
          ) : homeData.news.length > 0 ? (
             homeData.news.map((newsItem) => (
               <div key={newsItem.id} className="text-left py-6 border-b border-foreground/10 last:border-b-0">
                 <div className="mb-3">
                   <span className="text-sm text-accent mr-3">
                     {new Date(newsItem.publishDate).toLocaleDateString('ja-JP', { 
                       year: 'numeric', 
                       month: '2-digit', 
                       day: '2-digit' 
                     })}
                   </span>
                   <span className="text-sm text-foreground/70">
                     {newsItem.category || 'Information'}
                   </span>
                 </div>
                 <h3 className="text-base font-medium mb-2">{newsItem.title}</h3>
               </div>
             ))
           ) : (
             <div className="text-center py-6">
               <p className="text-sm text-foreground/70">最新ニュースはまだありません</p>
             </div>
           )}
         </div>
         
         <div className="text-center">
           <Link href="/events?tab=news" className="inline-block px-8 py-3 border border-foreground/20 rounded-md text-sm font-medium hover:bg-foreground/5 transition-colors">
             News All
           </Link>
         </div>
        </div>
        
        <div className="text-center mb-12 mt-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent snap-x snap-mandatory pl-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex-none w-[160px] mr-3 snap-start">
                  <div className="relative aspect-square mb-2 shadow-sm bg-gray-300 animate-pulse rounded-lg"></div>
                  <div className="h-3 bg-gray-300 rounded mb-1 w-3/4"></div>
                  <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))
            ) : homeData.events.length > 0 ? (
              homeData.events.map((event) => (
                <div key={event.id} className="flex-none w-[160px] mr-3 snap-start">
                  <div className="relative aspect-square mb-2 shadow-sm">
                    <Image
                      src={event.eventImage || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819'}
                      alt={event.eventName}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="font-medium text-xs mb-1 line-clamp-2">{event.eventName}</h3>
                  <p className="text-[10px] text-accent">
                    {new Date(event.eventDate).toLocaleDateString('ja-JP', { 
                      month: 'numeric', 
                      day: 'numeric' 
                    })} {event.startTime}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex-none w-full text-center py-4">
                <p className="text-xs text-foreground/70">イベントはまだありません</p>
              </div>
            )}
          </div>
        </div>
      </ScrollAnimation>

      {/* ラテアートギャラリー - 自動スクロール */}
      <ScrollAnimation className="w-full px-4 mb-24" rootMargin="-40px" delay={250}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latte Art Gallery</h2>
          <p className="text-sm text-foreground/80 mb-8">日々進化するラテアート作品</p>
        
          {/* 自動スクロールギャラリー */}
          <div className="relative mb-6 overflow-hidden">
          {loading ? (
            <div className="flex space-x-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex-none w-[160px] mr-3">
                  <div className="relative aspect-square mb-2 shadow-sm bg-gray-300 animate-pulse rounded-lg"></div>
                  <div className="h-3 bg-gray-300 rounded mb-1 w-3/4"></div>
                  <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : homeData.latteArt.length > 0 ? (
            <div 
              className="flex space-x-4" 
              style={{ 
                width: 'max-content', 
                transform: 'translateX(0)', 
                animation: 'marquee 30s linear infinite' 
              }}
            >
              {homeData.latteArt.map((artwork) => (
                <div key={artwork.id} className="flex-none w-[160px] mr-3">
                  <div className="relative aspect-square mb-2 shadow-sm">
                    <Image
                      src={artwork.imageUrl || 'https://images.unsplash.com/photo-1541167760496-1628856ab772'}
                      alt={artwork.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="font-medium text-xs mb-1 line-clamp-1">{artwork.title}</h3>
                  <p className="text-[10px] text-accent">{artwork.difficulty || 'Latte Art'}</p>
                </div>
              ))}
              {/* シームレスループのために重複表示 */}
              {homeData.latteArt.map((artwork) => (
                <div key={`duplicate-${artwork.id}`} className="flex-none w-[160px] mr-3">
                  <div className="relative aspect-square mb-2 shadow-sm">
                    <Image
                      src={artwork.imageUrl || 'https://images.unsplash.com/photo-1541167760496-1628856ab772'}
                      alt={artwork.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="font-medium text-xs mb-1 line-clamp-1">{artwork.title}</h3>
                  <p className="text-[10px] text-accent">{artwork.difficulty || 'Latte Art'}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xs text-foreground/70">ラテアート作品はまだありません</p>
            </div>
           )}
         </div>
         <div className="text-center mt-8">
           <Link href="/latte-art" className="inline-block px-8 py-3 border border-foreground/20 rounded-md text-sm font-medium hover:bg-foreground/5 transition-colors">
             View More
           </Link>
         </div>
        </div>
      </ScrollAnimation>

      {/* RecordBox + DDJ-FLX4 Integration */}
      <ScrollAnimation className="w-full px-4 py-8 mb-20" rootMargin="-40px" delay={225}>
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-lg font-heading font-bold mb-2">RecordBox × DDJ-FLX4</h2>
            <p className="text-xs text-foreground/80 leading-relaxed">
              プロ仕様のDJ機材でお届けする本格的な音楽体験
            </p>
          </div>
            
          <RecordBoxNowPlaying className="mb-6" />
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
    </PCLayout>
  );
}
