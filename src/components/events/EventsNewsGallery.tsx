"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { EventData, NewsData } from '@/lib/notion';

// API呼び出し関数
async function fetchEvents(): Promise<EventData[]> {
  try {
    const response = await fetch('/api/events');
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

async function fetchNews(): Promise<NewsData[]> {
  try {
    const response = await fetch('/api/news');
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

const EventsNewsGallery = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'events' | 'news'>('events');
  const [events, setEvents] = useState<EventData[]>([]);
  const [news, setNews] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  // URLクエリパラメータからタブを設定
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'news') {
      setActiveTab('news');
    }
  }, [searchParams]);

  // データ取得
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [eventsData, newsData] = await Promise.all([
          fetchEvents(),
          fetchNews()
        ]);
        setEvents(eventsData);
        setNews(newsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // イベントを日付順でソート（最新順）
  const sortedEvents = [...events]
    .filter(event => event.isPublic) // 公開設定のもののみ
    .sort((a, b) => new Date(a.eventDate || '').getTime() - new Date(b.eventDate || '').getTime());

  // ニュースを取得（全て）
  const allNews = [...news]
    .filter(newsItem => newsItem.publishStatus === '公開')
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0) || new Date(b.publishDate || '').getTime() - new Date(a.publishDate || '').getTime());

  const tabs = [
    { id: 'events', label: 'Events', count: sortedEvents.length },
    { id: 'news', label: 'News', count: allNews.length },
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
              Events & News
            </h1>
            <p className="text-sm text-center text-gray-600">
              Stay updated with our latest events and news
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
          {/* ローディング状態 */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          {/* 現在の表示情報 */}
          <motion.div
            key={`info-${activeTab}`}
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
          {!loading && activeTab === 'events' && (
            <motion.div
              key="content-events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {sortedEvents.length > 0 ? (
                sortedEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                        {new Date(event.eventDate || '').toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        }).replace(/\//g, '/')}
                      </span>
                      <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {event.genre || 'イベント'}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">
                      {event.eventName}
                    </h3>
                    
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-2">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{event.startTime} - {event.endTime}</span>
                      <span>{event.djArtist}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">現在、公開中のイベントはありません</p>
                </div>
              )}
            </motion.div>
          )}

          {/* ニュースタブコンテンツ */}
          {!loading && activeTab === 'news' && (
            <motion.div
              key="content-news"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              {allNews.length > 0 ? (
                allNews.map((newsItem, index) => (
                  <motion.div
                    key={newsItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                        {new Date(newsItem.publishDate || '').toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        }).replace(/\//g, '/')}
                      </span>
                      <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {newsItem.category}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">
                      {newsItem.title}
                    </h3>
                    
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {newsItem.content || 'コンテンツがありません'}
                    </p>
                    
                    {newsItem.tags && newsItem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {newsItem.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">現在、公開中のニュースはありません</p>
                </div>
              )}
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
