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
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-heading text-2xl font-bold text-primary">
              Kotarou Cafe
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-primary transition-colors">
                ホーム
              </Link>
              <Link href="/menu" className="hover:text-primary transition-colors">
                メニュー
              </Link>
              <Link href="/events" className="text-primary font-medium">
                イベント
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                お問い合わせ
              </Link>
            </nav>
            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

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

      {/* フッター */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">Kotarou Cafe</h3>
              <p className="mb-4">美味しいコーヒーとくつろぎの空間をお届けします。</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-accent transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">リンク</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="hover:text-accent transition-colors">
                    メニュー
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-accent transition-colors">
                    イベント
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-accent transition-colors">
                    お問い合わせ
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">お問い合わせ</h3>
              <p className="mb-2">電話: 03-1234-5678</p>
              <p className="mb-2">メール: info@kotarou-cafe.com</p>
              <p>お気軽にお問い合わせください。</p>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p>© {new Date().getFullYear()} Kotarou Cafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
