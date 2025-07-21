"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { NewsArticle, categoryLabels } from '@/types/news';
import { Calendar, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export const NewsCard = ({ article, index }: NewsCardProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const categoryInfo = categoryLabels[article.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* 記事画像 */}
      {article.imageUrl && (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 400px) 100vw, 400px"
          />
          <div className="absolute top-3 left-3">
            <span className={`${categoryInfo.color} text-xs font-medium px-2 py-1 rounded-full`}>
              {categoryInfo.emoji} {categoryInfo.label}
            </span>
          </div>
        </div>
      )}

      {/* 記事情報 */}
      <div className="p-4 space-y-3">
        {/* カテゴリと日付（画像がない場合） */}
        {!article.imageUrl && (
          <div className="flex items-center justify-between">
            <span className={`${categoryInfo.color} text-xs font-medium px-2 py-1 rounded-full`}>
              {categoryInfo.emoji} {categoryInfo.label}
            </span>
          </div>
        )}

        {/* 日付 */}
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2 text-primary" />
          <span>{formatDate(article.date)}</span>
        </div>
        
        {/* タイトル */}
        <h3 className="font-bold text-gray-900 text-lg line-clamp-2">
          {article.title}
        </h3>
        
        {/* 概要 */}
        <p className="text-sm text-gray-600 line-clamp-3">
          {article.summary}
        </p>

        {/* 詳細ボタン */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center"
        >
          <span>詳細を読む</span>
          <ArrowRight size={16} className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );
};
