"use client";

import dynamic from 'next/dynamic';
import { PCLayout } from '@/components/layout/PCLayout';

// コンポーネントを動的インポート
const MenuGallery = dynamic(() => import('@/components/menu/MenuGallery'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse text-gray-500">読み込み中...</div>
    </div>
  ),
});

export default function MenuPage() {
  return (
    <PCLayout>
      <div>
        <MenuGallery />
      </div>
    </PCLayout>
  );
}
