import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// クライアントサイドでのみレンダリングするコンポーネントを動的インポート
const LatteArtGallery = dynamic(() => import('@/components/LatteArtGallery'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse text-gray-500">読み込み中...</div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'ラテアートギャラリー | Kotarou Cafe',
  description: 'Kotarou Cafeのラテアート作品をご紹介します。日々の練習の成果や、お客様への特別な一杯を記録しています。',
  openGraph: {
    title: 'ラテアートギャラリー | Kotarou Cafe',
    description: 'Kotarou Cafeのラテアート作品をご紹介します。日々の練習の成果や、お客様への特別な一杯を記録しています。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Kotarou Cafe',
  },
};

export default function LatteArtPage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <LatteArtGallery />
      </main>
    </>
  );
}
