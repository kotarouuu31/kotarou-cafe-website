"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getNewsByCategory } from '@/data/news';
import { categoryLabels } from '@/types/news';
import { NewsCard } from './NewsCard';

const NewsGallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // カテゴリに基づいてニュースをフィルタリング
  const filteredNews = getNewsByCategory(activeCategory === 'all' ? undefined : activeCategory);

  const categories = [
    { key: 'all', label: '全て', emoji: '📰' },
    ...Object.entries(categoryLabels).map(([key, value]) => ({
      key,
      label: value.label,
      emoji: value.emoji
    }))
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-[400px] mx-auto bg-white relative">
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
              ニュース
            </h1>
            <p className="text-sm text-center text-gray-600">
              Kotarou Cafeの最新情報をお届けします
            </p>
          </div>
        </div>

        {/* カテゴリタブ */}
        <div className="bg-white border-b">
          <div className="px-4 py-4">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <motion.button
                  key={category.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.key)}
                  className={`flex items-center px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category.key
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-1">{category.emoji}</span>
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <main className="px-4 py-6 pb-24">
          {/* ニュース統計 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                {filteredNews.length}件の記事があります
              </span>
            </div>
          </motion.div>

          {/* ニュース一覧 */}
          <div className="space-y-6">
            {filteredNews.length > 0 ? (
              filteredNews.map((article, index) => (
                <NewsCard
                  key={article.id}
                  article={article}
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
                  <span className="text-4xl">📰</span>
                </div>
                <p className="text-gray-500">このカテゴリの記事はありません</p>
                <p className="text-sm text-gray-400 mt-2">
                  他のカテゴリをお試しください
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
              最新情報は随時更新いたします。お楽しみに！
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default NewsGallery;
