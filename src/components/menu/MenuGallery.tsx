"use client";

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { menuItems, menuCategories, getMenuByCategory } from '@/data/menu-simple';
import { MenuCard } from './MenuCard';

const MenuGallery = () => {
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
              メニュー
            </h1>
            <p className="text-sm text-center text-gray-600">
              こだわりの食材で作る美味しいメニューをご紹介します
            </p>
          </div>
        </div>

        {/* メインコンテンツ */}
        <main className="px-4 py-6 pb-24">
          {/* メニュー統計 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                {menuItems.length}種類のメニューをご用意
              </span>
            </div>
          </motion.div>

          {/* カテゴリ別メニュー表示 */}
          <div className="space-y-12">
            {Object.entries(menuCategories).map(([categoryKey, categoryInfo], categoryIndex) => {
              const categoryItems = getMenuByCategory(categoryKey);
              
              return (
                <motion.section
                  key={categoryKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                >
                  {/* カテゴリヘッダー */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <span className="mr-2 text-2xl">{categoryInfo.emoji}</span>
                      {categoryInfo.label}
                    </h2>
                    <div className="mt-2 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                  </div>

                  {/* メニューアイテム */}
                  <div className="grid grid-cols-2 gap-3">
                    {categoryItems.map((item, index) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </div>

          {/* フッターメッセージ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500">
              すべて手作りで心を込めてお作りしています
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default MenuGallery;
