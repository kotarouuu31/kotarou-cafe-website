import { NewsArticle } from '@/types/news';

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'ホームページをリニューアルしました',
    date: new Date('2025-07-15'),
    category: 'information',
    summary: 'より使いやすく、美しいデザインに生まれ変わりました。モバイルファーストデザインで、どのデバイスからでも快適にご利用いただけます。',
    content: 'この度、Kotarou Cafeのホームページを全面リニューアルいたしました。新しいデザインでは、モバイルファーストの設計を採用し、スマートフォンやタブレットからでも快適にご利用いただけるよう改善いたしました。',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
  },
  {
    id: '2',
    title: '新メニュー追加のお知らせ',
    date: new Date('2025-07-10'),
    category: 'menu',
    summary: '夏にぴったりの新しいドリンクメニューを追加いたしました。冷たくて美味しいアイスコーヒーやフラッペをお楽しみください。',
    content: '暑い夏にぴったりの新メニューが登場しました。特製アイスコーヒーブレンドや、フルーツフラッペなど、この季節ならではの味わいをご提供いたします。',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735'
  },
  {
    id: '3',
    title: '営業時間変更のご案内',
    date: new Date('2025-07-05'),
    category: 'notice',
    summary: '7月より営業時間を一部変更させていただきます。詳細につきましては店舗までお問い合わせください。',
    content: '7月1日より、平日の営業時間を変更させていただきます。月曜日から金曜日は8:00-20:00、土日祝日は9:00-21:00となります。ご不便をおかけいたしますが、何卒ご理解のほどよろしくお願いいたします。',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'
  },
  {
    id: '4',
    title: '夏季限定メニューのご紹介',
    date: new Date('2025-06-28'),
    category: 'menu',
    summary: '7月から9月までの期間限定で、夏らしいスペシャルメニューをご用意いたします。爽やかな味わいをお楽しみください。',
    content: '今年の夏も、季節限定の特別メニューをご用意いたします。マンゴーフラッペ、レモンスカッシュ、抹茶かき氷など、暑い夏を涼しく過ごせるメニューが盛りだくさんです。',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574'
  },
  {
    id: '5',
    title: 'Wi-Fi環境を改善いたしました',
    date: new Date('2025-06-20'),
    category: 'information',
    summary: '店内のWi-Fi環境をアップグレードし、より快適にインターネットをご利用いただけるようになりました。',
    content: 'お客様により快適にお過ごしいただくため、店内のWi-Fi設備を最新のものにアップグレードいたしました。高速で安定したインターネット接続をお楽しみください。',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
  }
];

// 日付順でソート（最新順）
export const getSortedNews = () => {
  return [...newsArticles].sort((a, b) => b.date.getTime() - a.date.getTime());
};

// カテゴリでフィルタリング
export const getNewsByCategory = (category?: string) => {
  if (!category || category === 'all') {
    return getSortedNews();
  }
  return newsArticles
    .filter(article => article.category === category)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};
