import { Metadata } from 'next';

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

export default function LatteArtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
