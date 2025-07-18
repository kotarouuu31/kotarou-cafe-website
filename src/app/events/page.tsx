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
      <section className="relative bg-primary text-white py-8">
        <div className="max-w-[400px] mx-auto px-4">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold mb-3">イベント＆スケジュール</h1>
            <p className="text-sm opacity-90">
              Kotarou Cafeで開催される様々なイベントやスケジュール情報をご紹介します。
              ライブ演奏、DJナイト、ワークショップなど、様々なイベントをお楽しみください。
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* メインコンテンツ */}
      <section className="max-w-[400px] mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* イベント一覧 */}
          <div>
            <EventList 
              events={events} 
              title="今後のイベント" 
              showPast={false} 
            />
          </div>
          
          {/* カレンダーとビジネスアワー */}
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
      <section className="bg-primary-light/10 py-8">
        <div className="max-w-[400px] mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-center mb-6">定期イベント</h2>
          
          <div className="space-y-6">
            {/* 定期イベント1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-52">
                <Image
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
                  alt="ジャズライブナイト"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-lg font-bold mb-2">ジャズライブナイト</h3>
                <p className="text-xs text-blue-600 mb-2">隔週土曜日 19:00-21:00</p>
                <p className="text-xs">地元ミュージシャンによる心地よいジャズの夕べ。美味しいコーヒーと共にお楽しみください。</p>
              </div>
            </div>
            
            {/* 定期イベント2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-52">
                <Image
                  src="https://images.unsplash.com/photo-1571266028243-e4b4521c1d1d"
                  alt="DJ Night"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-lg font-bold mb-2">DJ Night - アンビエントミュージック</h3>
                <p className="text-xs text-purple-600 mb-2">毎週金曜日 20:00-23:00</p>
                <p className="text-xs">静かな夜に癒しのアンビエント音楽をお届けします。特別なカクテルメニューもご用意。</p>
              </div>
            </div>
            
            {/* 定期イベント3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-52">
                <Image
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0"
                  alt="朝活読書会"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-lg font-bold mb-2">朝活読書会</h3>
                <p className="text-xs text-amber-600 mb-2">毎週日曜日 8:00-10:00</p>
                <p className="text-xs">静かな朝の時間に、好きな本を持ち寄って読書を楽しみましょう。モーニングセット付き。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* イベントリクエストセクション */}
      <section className="max-w-[400px] mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="font-heading text-xl font-bold mb-3 text-center">イベントリクエスト</h2>
          <p className="text-xs text-center mb-4">
            開催してほしいイベントやワークショップのリクエストを受け付けています。
            お気軽にお問い合わせください。
          </p>
          <div className="flex justify-center">
            <Link 
              href="/contact" 
              className="bg-primary hover:bg-primary-dark text-white text-sm py-2 px-4 rounded-md transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
