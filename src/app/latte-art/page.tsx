"use client";

import dynamic from 'next/dynamic';
import { PCLayout } from '@/components/layout/PCLayout';

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
    <PCLayout>
      <div>
        <LatteArtGallery />
      </div>
    </PCLayout>
  );
}
