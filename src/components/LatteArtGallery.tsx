"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { latteArtWorks } from '@/data/latte-art-simple';

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
          <div className="grid grid-cols-2 gap-4">
            {latteArtWorks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* 作品画像 */}
                <div className="relative aspect-square w-full">
                  <Image
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 400px) 50vw, 200px"
                  />
                </div>

                {/* 作品情報 */}
                <div className="p-3 space-y-2">
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1">
                    {artwork.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-1">
                    {artwork.comment}
                  </p>
                </div>
              </motion.div>
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
