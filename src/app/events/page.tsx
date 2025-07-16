import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EventCalendar from '../../components/Calendar';
import EventList from '../../components/EventList';
import BusinessHoursDisplay from '../../components/BusinessHours';
import { events, regularBusinessHours, specialBusinessHours } from '../../data/events';

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* ヒーローセクション */}
      <section className="relative bg-primary text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">イベント＆スケジュール</h1>
            <p className="text-lg md:text-xl opacity-90">
              Kotarou Cafeで開催される様々なイベントやスケジュール情報をご紹介します。
              ライブ演奏、DJナイト、ワークショップなど、様々なイベントをお楽しみください。
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* メインコンテンツ */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* イベント一覧 */}
          <div className="lg:col-span-2">
            <EventList 
              events={events} 
              title="今後のイベント" 
              showPast={false} 
            />
          </div>
          
          {/* サイドバー */}
          <div className="space-y-8">
            <EventCalendar events={events} />
            <BusinessHoursDisplay 
              regularHours={regularBusinessHours} 
              specialHours={specialBusinessHours} 
            />
          </div>
        </div>
      </section>

      {/* 定期イベント紹介セクション */}
      <section className="bg-primary-light/10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-8">定期イベント</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 定期イベント1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
                  alt="ジャズライブナイト"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-xl font-bold mb-2">ジャズライブナイト</h3>
                <p className="text-sm text-blue-600 mb-2">隔週土曜日 19:00-21:00</p>
                <p className="text-sm">地元ミュージシャンによる心地よいジャズの夕べ。美味しいコーヒーと共にお楽しみください。</p>
              </div>
            </div>
            
            {/* 定期イベント2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1571266028243-e4b4521c1d1d"
                  alt="DJ Night"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-xl font-bold mb-2">DJ Night - アンビエントミュージック</h3>
                <p className="text-sm text-purple-600 mb-2">毎週金曜日 20:00-23:00</p>
                <p className="text-sm">静かな夜に癒しのアンビエント音楽をお届けします。特別なカクテルメニューもご用意。</p>
              </div>
            </div>
            
            {/* 定期イベント3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0"
                  alt="朝活読書会"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-xl font-bold mb-2">朝活読書会</h3>
                <p className="text-sm text-amber-600 mb-2">毎週日曜日 8:00-10:00</p>
                <p className="text-sm">静かな朝の時間に、好きな本を持ち寄って読書を楽しみましょう。モーニングセット付き。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* イベントリクエストセクション */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-center">イベントリクエスト</h2>
          <p className="text-center mb-6">
            開催してほしいイベントやワークショップのリクエストを受け付けています。
            お気軽にお問い合わせください。
          </p>
          <div className="flex justify-center">
            <Link 
              href="/contact" 
              className="bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded-md transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>


    </main>
  );
}
