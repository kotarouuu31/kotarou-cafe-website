"use client";

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { latteArtWorks } from '@/data/latte-art-simple';
import { LatteArtCard } from './latte-art/LatteArtCard';

const LatteArtGallery = () => {
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
              Latte Art Gallery
            </h1>
            <p className="text-sm text-center text-gray-600">
              日々進化するラテアート作品
            </p>
          </div>
        </div>

        {/* メインコンテンツ */}
        <main className="px-4 py-6 pb-24">
          {/* 作品統計 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                {latteArtWorks.length}作品を展示中
              </span>
            </div>
          </motion.div>

          {/* 作品ギャラリー（2列グリッド） */}
          <div className="grid grid-cols-2 gap-3">
            {latteArtWorks
              .sort((a, b) => new Date(b.createdAt.replace(/\//g, '-')).getTime() - new Date(a.createdAt.replace(/\//g, '-')).getTime())
              .map((work, index) => (
                <LatteArtCard
                  key={work.id}
                  work={work}
                  index={index}
                  priority={index < 4} // 最初の4枚を優先読み込み
                />
              ))}
          </div>

          {/* フッターメッセージ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500">
              一杯一杯、心を込めて作ったラテアートをお楽しみください
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default LatteArtGallery;
