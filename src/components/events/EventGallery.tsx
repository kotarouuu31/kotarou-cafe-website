"use client";

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { events } from '@/data/events';
import { EventCard } from './EventCard';

const EventGallery = () => {
  // イベントを日付順でソート（最新順）
  const sortedEvents = [...events]
    .filter(event => event.type !== 'closed') // 休業日は除外
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

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
              イベント情報
            </h1>
            <p className="text-sm text-center text-gray-600">
              Kotarou Cafeで開催される素敵なイベントをご紹介します
            </p>
          </div>
        </div>

        {/* メインコンテンツ */}
        <main className="px-4 py-6 pb-24">
          {/* イベント統計 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                {sortedEvents.length}件のイベントが開催予定です
              </span>
            </div>
          </motion.div>

          {/* イベント一覧 */}
          <div className="space-y-6">
            {sortedEvents.length > 0 ? (
              sortedEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 mb-4">
                  <span className="text-4xl">📅</span>
                </div>
                <p className="text-gray-500">現在開催予定のイベントはありません</p>
                <p className="text-sm text-gray-400 mt-2">
                  新しいイベント情報をお楽しみに！
                </p>
              </motion.div>
            )}
          </div>

          {/* フッターメッセージ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500">
              イベントの詳細やご予約については、店舗までお気軽にお問い合わせください
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default EventGallery;
