"use client";

import dynamic from 'next/dynamic';

// コンポーネントを動的インポート
const LatteArtGallery = dynamic(() => import('@/components/LatteArtGallery'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse text-gray-500">読み込み中...</div>
    </div>
  ),
});

// メタデータはlayout.tsxで定義することを推奨
// このファイルはClient Componentのため、メタデータは使用できません

export default function LatteArtPage() {
  return (
    <div className="min-h-screen overflow-y-auto">
      <main className="max-w-[400px] mx-auto bg-gradient-to-b from-gray-50 to-gray-100">
        <LatteArtGallery />
      </main>
    </div>
  );
}
