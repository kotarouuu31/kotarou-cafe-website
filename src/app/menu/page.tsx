"use client";

import { useState } from 'react';
import { MenuItem as MenuItemType, MenuCategory } from '@/types/menu';
import { MenuItem } from '@/components/menu/MenuItem';
import { MenuTabs } from '@/components/menu/MenuTabs';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import Image from 'next/image';
import Link from 'next/link';

export default function Menu() {
  // メニューカテゴリ
  const categories: MenuCategory[] = [
    { id: 'all', name: 'すべて', icon: '🍽️' },
    { id: 'coffee', name: 'コーヒー', icon: '☕' },
    { id: 'tea', name: '紅茶・ティー', icon: '🍵' },
    { id: 'sweets', name: 'スイーツ', icon: '🍰' },
    { id: 'food', name: 'フード', icon: '🥪' },
  ];

  // メニューアイテムデータ
  const menuItems: MenuItemType[] = [
    {
      id: 1,
      name: "スペシャルティコーヒー",
      description: "厳選された豆から抽出した、香り高い一杯をお楽しみください。",
      price: 550,
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      isRecommended: true,
      category: 'coffee',
    },
    {
      id: 2,
      name: "カフェラテ",
      description: "濃厚なエスプレッソと滑らかなミルクの組み合わせ。",
      price: 600,
      image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f",
      category: 'coffee',
    },
    {
      id: 3,
      name: "カプチーノ",
      description: "エスプレッソにふわふわのミルクフォームをのせた一杯。",
      price: 600,
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213",
      isRecommended: true,
      category: 'coffee',
    },
    {
      id: 4,
      name: "アメリカーノ",
      description: "エスプレッソにお湯を注いだすっきりとした味わい。",
      price: 500,
      image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
      category: 'coffee',
    },
    {
      id: 5,
      name: "抹茶ラテ",
      description: "高級抹茶を使用した、まろやかな味わいのラテです。",
      price: 600,
      image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d",
      isRecommended: true,
      category: 'tea',
    },
    {
      id: 6,
      name: "ほうじ茶ラテ",
      description: "香ばしいほうじ茶とミルクのハーモニー。",
      price: 580,
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3",
      category: 'tea',
    },
    {
      id: 7,
      name: "アールグレイティー",
      description: "ベルガモットの香りが特徴的な紅茶。",
      price: 550,
      image: "https://images.unsplash.com/photo-1576867757603-05b134ebc379",
      category: 'tea',
    },
    {
      id: 8,
      name: "ベイクドチーズケーキ",
      description: "濃厚でなめらかな口当たりの自家製チーズケーキです。",
      price: 500,
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
      isRecommended: true,
      category: 'sweets',
    },
    {
      id: 9,
      name: "ガトーショコラ",
      description: "濃厚なチョコレートの風味が楽しめる一品。",
      price: 550,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
      category: 'sweets',
    },
    {
      id: 10,
      name: "アップルパイ",
      description: "シナモンの香りとサクサクのパイ生地が絶妙。",
      price: 580,
      image: "https://images.unsplash.com/photo-1568571780765-9276107225d8",
      isRecommended: true,
      category: 'sweets',
    },
    {
      id: 11,
      name: "パンケーキ",
      description: "ふわふわ食感のパンケーキにメープルシロップをかけて。",
      price: 650,
      image: "https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7",
      category: 'sweets',
    },
    {
      id: 12,
      name: "クラブサンドイッチ",
      description: "ボリューム満点のクラブサンドイッチ。",
      price: 780,
      image: "https://images.unsplash.com/photo-1551183053-bf91a1f81111",
      isRecommended: true,
      category: 'food',
    },
  ];

  // アクティブなカテゴリの状態管理
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // カテゴリに基づいてメニューアイテムをフィルタリング
  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <ScrollAnimation>
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <Image
            src="/images/menu-hero.jpg"
            alt="メニュー"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="font-heading text-3xl font-bold mb-2">メニュー</h1>
              <p className="text-sm max-w-xs mx-auto">
                Kotarou Cafeでは、厳選された素材を使用した
                様々なドリンクとスイーツをご用意しております。
              </p>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* カテゴリタブ */}
      <MenuTabs 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* メニューアイテムグリッド */}
      <div className="max-w-[400px] mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 gap-6">
          {filteredItems.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </div>
      </div>

      {/* ホームに戻るボタン */}
      <div className="fixed bottom-6 right-6 z-20">
        <Link
          href="/"
          className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="ホームに戻る"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
