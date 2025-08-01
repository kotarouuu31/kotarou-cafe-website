"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MenuData } from '@/lib/notion';
import { MenuCard } from './MenuCard';

// API呼び出し関数
async function fetchMenu(): Promise<MenuData[]> {
  try {
    const response = await fetch('/api/menu');
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching menu:', error);
    return [];
  }
}

// Notionカテゴリを表示用カテゴリにマッピング
function mapNotionCategoryToDisplayCategory(notionCategory: string): string {
  const drinkCategories = ['Hot Coffee', 'Iced Coffee', 'Espresso', 'Tea', 'Cold Drinks', 'Alcohol'];
  
  if (drinkCategories.includes(notionCategory)) {
    return 'drinks';
  }
  
  switch (notionCategory) {
    case 'Food':
      return 'food';
    case 'Dessert':
      return 'desserts';
    default:
      return 'other';
  }
}

const MenuGallery = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [menuItems, setMenuItems] = useState<MenuData[]>([]);
  const [loading, setLoading] = useState(true);

  // データ取得
  useEffect(() => {
    const loadMenu = async () => {
      setLoading(true);
      try {
        const menuData = await fetchMenu();
        setMenuItems(menuData);
      } catch (error) {
        console.error('Error loading menu:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  // タブ定義
  const tabs = [
    { id: 'all', label: 'All', count: menuItems.length },
    { 
      id: 'drinks', 
      label: 'Drinks', 
      count: menuItems.filter(item => 
        mapNotionCategoryToDisplayCategory(item.category) === 'drinks'
      ).length 
    },
    { 
      id: 'desserts', 
      label: 'Dessert', 
      count: menuItems.filter(item => 
        mapNotionCategoryToDisplayCategory(item.category) === 'desserts'
      ).length 
    },
    { 
      id: 'food', 
      label: 'Food', 
      count: menuItems.filter(item => 
        mapNotionCategoryToDisplayCategory(item.category) === 'food'
      ).length 
    },
  ];

  // メニューアイテムが利用可能かどうかを判定する関数
  const isItemAvailable = (item: MenuData) => {
    return item.isPublic && item.stockStatus !== '売り切れ' && item.stockStatus !== '品切れ';
  };

  // 表示するメニューアイテムを取得
  const getDisplayItems = () => {
    if (activeTab === 'all') {
      return menuItems.filter(item => isItemAvailable(item));
    }
    
    return menuItems.filter(item => 
      mapNotionCategoryToDisplayCategory(item.category) === activeTab && isItemAvailable(item)
    );
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
              Menu
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
          {loading ? (
            /* ローディング状態 */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <p className="text-sm text-gray-600">メニューを読み込み中...</p>
            </motion.div>
          ) : menuItems.length === 0 ? (
            /* 空状態 */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 mb-2">メニューデータがありません</p>
              <p className="text-sm text-gray-500">しばらくしてから再度お試しください</p>
            </motion.div>
          ) : (
            <>
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
            </>
          )}

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
