"use client";

import dynamic from 'next/dynamic';

// コンポーネントを動的インポート
const NewsGallery = dynamic(() => import('@/components/news/NewsGallery'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse text-gray-500">読み込み中...</div>
    </div>
  ),
});

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      <NewsGallery />
    </div>
  );
}
