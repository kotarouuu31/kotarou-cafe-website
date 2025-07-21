"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './latte-art/ScrollReveal';
import { LatteArtWork, LatteArtCategory, categoryLabels } from '@/types/latte-art';
import { getTodaysLatteArt, getArtworksByCategory, formatDate } from '@/data/latte-art';
import { CategoryTabs } from './latte-art/CategoryTabs';
import { LatteArtCard } from './latte-art/LatteArtCard';
import { LatteArtDetail } from './latte-art/LatteArtDetail';

const LatteArtGallery: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<LatteArtWork | null>(null);
  const [activeCategory, setActiveCategory] = useState<LatteArtCategory | 'all'>('all');
  const todaysArt = getTodaysLatteArt();
  
  // 選択されたカテゴリに基づいて作品をフィルタリング
  const filteredArtworks = getArtworksByCategory(
    activeCategory === 'all' ? undefined : activeCategory
  ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-y-auto">
      {/* ヘッダー */}
      <ScrollReveal>
        <div className="bg-white shadow-sm">
          <div className="max-w-[400px] mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">
              Kotarou&apos;s Latte Art
            </h1>
            <p className="text-sm text-center text-gray-600">
              一杯一杯、心を込めて作ったラテアートの記録です
            </p>
          </div>
        </div>
      </ScrollReveal>
      
      {/* カテゴリタブ */}
      <ScrollReveal delay={0.2}>
        <CategoryTabs 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </ScrollReveal>
      
      {/* メインコンテンツ */}
      <main className="max-w-[400px] mx-auto px-4 py-6 pb-24">
        {/* 今日のラテアート（ハイライト） */}
        {todaysArt && activeCategory === 'all' && (
          <ScrollReveal delay={0.4}>
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <span className="w-2 h-5 bg-primary mr-2 rounded-full"></span>
                  今日の1杯
                </h2>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  New Arrival
                </span>
              </div>
              
              <div 
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.01]"
                onClick={() => setSelectedArtwork(todaysArt)}
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={`https://source.unsplash.com/${todaysArt.imageUrl}`}
                    alt={todaysArt.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 400px) 100vw, 400px"
                    priority
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900">{todaysArt.title}</h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(todaysArt.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{todaysArt.comment}</p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}
        
        {/* 作品一覧 - 常に表示 */}
        <ScrollReveal delay={activeCategory === 'all' ? 0.6 : 0.4}>
          <section className={activeCategory === 'all' ? 'mt-8' : ''}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                {activeCategory === 'all' ? '作品一覧' : `${categoryLabels[activeCategory].label}の作品`}
              </h2>
              <span className="text-xs text-gray-500">
                {filteredArtworks.length}作品
              </span>
            </div>
            
            {filteredArtworks.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                <AnimatePresence>
                  {filteredArtworks.map((artwork) => (
                    <motion.div
                      key={artwork.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedArtwork(artwork)}
                    >
                      <LatteArtCard artwork={artwork} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">このカテゴリの作品はありません</p>
              </div>
            )}
          </section>
        </ScrollReveal>
      </main>
      
      {/* 作品詳細モーダル */}
      <LatteArtDetail 
        artwork={selectedArtwork} 
        onClose={() => setSelectedArtwork(null)} 
      />
    </div>
  );
};

export default LatteArtGallery;
