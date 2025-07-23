"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { menuItems, getMenuByCategory } from '@/data/menu-simple';
import { MenuCard } from './MenuCard';

const MenuGallery = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  // タブ定義
  const tabs = [
    { id: 'all', label: 'すべて', count: menuItems.length },
    { id: 'drinks', label: 'ドリンク', count: getMenuByCategory('coffee').length + getMenuByCategory('drinks').length },
    { id: 'desserts', label: 'デザート', count: getMenuByCategory('desserts').length },
    { id: 'food', label: 'フード', count: getMenuByCategory('food').length },
  ];

  // 表示するメニューアイテムを取得
  const getDisplayItems = () => {
    if (activeTab === 'all') {
      return menuItems;
    }
    if (activeTab === 'drinks') {
      // コーヒーとドリンクを統合して表示（コーヒー系を先に表示）
      const coffeeItems = getMenuByCategory('coffee');
      const drinkItems = getMenuByCategory('drinks');
      return [...coffeeItems, ...drinkItems];
    }
    return getMenuByCategory(activeTab);
  };

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

          {/* タブナビゲーション */}
          <div className="px-3 pb-4">
            <div className="flex overflow-x-auto scrollbar-hide gap-1.5">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label} ({tab.count})
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <main className="px-3 py-6 pb-24">
          {/* 現在の表示情報 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                {getDisplayItems().length}種類のメニューを表示中
              </span>
            </div>
          </motion.div>

          {/* メニューアイテム表示 */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-3 gap-2"
          >
            {getDisplayItems().map((item, index) => (
              <MenuCard
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </motion.div>

          {/* フッターメッセージ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
