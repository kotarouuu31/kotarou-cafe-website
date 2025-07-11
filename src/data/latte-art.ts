import { LatteArtWork } from '../types/latte-art';

// シンプル化したラテアート作品データ（時系列順）
export const latteArtWorks: LatteArtWork[] = [
  {
    id: '1',
    title: 'ハート',
    comment: '初めて形になったハートです。まだまだですが頑張ります！',
    imageUrl: "placeholder-photo-1541167760496-1628856ab772",
    createdAt: new Date(2025, 0, 15), // 2025年1月15日
    isHighlighted: false
  },
  {
    id: '2',
    title: 'リーフ',
    comment: '葉っぱの形を意識してみました。少しずつコツがわかってきた気がします。',
    imageUrl: "placeholder-photo-1534040385115-33dcb3acba5b",
    createdAt: new Date(2025, 1, 20), // 2025年2月20日
    isHighlighted: false
  },
  {
    id: '3',
    title: 'ロゼッタ（初挑戦）',
    comment: '初めてのロゼッタ。形は崩れてしまいましたが、少しずつ上達していきます。',
    imageUrl: "placeholder-photo-1585091960332-7d31533e2a9d",
    createdAt: new Date(2025, 2, 10), // 2025年3月10日
    isHighlighted: false
  },
  {
    id: '4',
    title: 'ロゼッタ（2回目）',
    comment: '2回目のロゼッタ。前回よりも形が整ってきました！',
    imageUrl: "placeholder-photo-1577968897966-3d4325b36b61",
    createdAt: new Date(2025, 3, 5), // 2025年4月5日
    isHighlighted: false
  },
  {
    id: '5',
    title: 'チューリップ',
    comment: '新しい技法に挑戦。まだまだ練習が必要ですが、形になってきました。',
    imageUrl: "placeholder-photo-1529892485617-25f63cd7b1e9",
    createdAt: new Date(2025, 4, 12), // 2025年5月12日
    isHighlighted: false
  },
  {
    id: '6',
    title: 'スワン（白鳥）',
    comment: '難しい形に挑戦！首のカーブが難しかったですが、なんとか形になりました。',
    imageUrl: "placeholder-photo-1511537190424-bbbab87ac5eb",
    createdAt: new Date(2025, 5, 8), // 2025年6月8日
    isHighlighted: false
  },
  {
    id: '7',
    title: '多重ロゼッタ',
    comment: '複数のロゼッタを組み合わせる技法に挑戦。半年前は想像もできなかった技術です！',
    imageUrl: "placeholder-photo-1511537190424-bbbab87ac5eb",
    createdAt: new Date(2025, 6, 10), // 2025年7月10日（今日）
    isHighlighted: true
  }
];

// 今日のラテアート
export function getTodaysLatteArt(): LatteArtWork | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return latteArtWorks.find(art => {
    const artDate = new Date(art.createdAt);
    artDate.setHours(0, 0, 0, 0);
    return artDate.getTime() === today.getTime();
  }) || latteArtWorks[latteArtWorks.length - 1]; // 今日の作品がなければ最新の作品を返す
}

// 日付をフォーマット
export function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
