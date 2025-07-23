"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { events } from '@/data/events';
import { getNewsByCategory } from '@/data/news';
import { EventCard } from './EventCard';
import { NewsCard } from '../news/NewsCard';

const EventsNewsGallery = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'events' | 'news'>('events');

  // URLクエリパラメータからタブを設定
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'news') {
      setActiveTab('news');
    }
  }, [searchParams]);

  // イベントを日付順でソート（最新順）
  const sortedEvents = [...events]
    .filter(event => event.type !== 'closed') // 休業日は除外
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  // ニュースを取得（全て）
  const allNews = getNewsByCategory();

  const tabs = [
    { id: 'events', label: 'イベント', count: sortedEvents.length },
    { id: 'news', label: 'ニュース', count: allNews.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-[400px] mx-auto bg-white min-h-screen relative">
        {/* ヘッダー */}
        <div className="bg-white shadow-sm">
          <div className="px-4 py-6">
            <div className="flex items-center mb-4">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  <span className="text-sm font-medium">ホームに戻る</span>
                </motion.button>
              </Link>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">
              {activeTab === 'events' ? 'イベント情報' : 'ニュース'}
            </h1>
            <p className="text-sm text-center text-gray-600">
              {activeTab === 'events' 
                ? 'Kotarou Cafeで開催される素敵なイベントをご紹介します'
                : 'Kotarou Cafeの最新情報をお届けします'
              }
            </p>
          </div>

          {/* タブナビゲーション */}
          <div className="px-3 pb-4">
            <div className="flex gap-1.5">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'events' | 'news')}
                  className={`flex-1 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab.label} ({tab.count})
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <main className="px-4 py-6 pb-24">
          {/* 現在の表示情報 */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                {activeTab === 'events' 
                  ? `${sortedEvents.length}件のイベントを表示中`
                  : `${allNews.length}件のニュースを表示中`
                }
              </span>
            </div>
          </motion.div>

          {/* イベントタブコンテンツ */}
          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {sortedEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                />
              ))}
            </motion.div>
          )}

          {/* ニュースタブコンテンツ */}
          {activeTab === 'news' && (
            <motion.div
              key="news"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              {allNews.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                      {new Date(news.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }).replace(/\//g, '/')}
                    </span>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {news.category}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {news.summary}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* フッターメッセージ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500">
              {activeTab === 'events' 
                ? '皆様のご参加をお待ちしております'
                : '最新情報は随時更新いたします'
              }
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default EventsNewsGallery;
