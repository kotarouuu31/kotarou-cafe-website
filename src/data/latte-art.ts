import { LatteArtWork, LatteArtRequest } from '../types/latte-art';

// サンプルのラテアート作品データ
export const latteArtWorks: LatteArtWork[] = [
  {
    id: '1',
    title: 'ハート',
    description: 'シンプルながら奥深いハートのラテアート。ミルクの注ぎ方で繊細な表現を実現しました。',
    imageUrl: "placeholder-photo-1541167760496-1628856ab772",
    beforeImageUrl: "placeholder-photo-1442512595331-e89e73853f31",
    createdAt: new Date(2025, 6, 9), // 2025年7月9日
    techniques: ['フリーポア'],
    difficultyLevel: 2,
    timeSpent: 3,
    isHighlighted: true,
    likes: 24,
    comments: [
      {
        id: 'c1',
        author: 'コーヒー好き',
        content: '素敵なハートですね！いつも癒されます。',
        createdAt: new Date(2025, 6, 9, 14, 30)
      }
    ],
    tags: ['初心者向け', 'クラシック']
  },
  {
    id: '2',
    title: '白鳥',
    description: '繊細な羽の表現にこだわった白鳥のデザイン。ミルクの温度と注ぎのタイミングが重要でした。',
    imageUrl: "placeholder-photo-1534040385115-33dcb3acba5b",
    createdAt: new Date(2025, 6, 8), // 2025年7月8日
    techniques: ['フリーポア', 'エッチング'],
    difficultyLevel: 4,
    timeSpent: 7,
    likes: 18,
    tags: ['動物', '上級者向け']
  },
  {
    id: '3',
    title: '紅葉',
    description: '秋をイメージした紅葉のデザイン。エッチングとフリーポアを組み合わせた技法で表現しました。',
    imageUrl: "placeholder-photo-1585091960332-7d31533e2a9d",
    beforeImageUrl: "placeholder-photo-1442512595331-e89e73853f31",
    createdAt: new Date(2025, 6, 7), // 2025年7月7日
    techniques: ['エッチング', 'カラーアート'],
    difficultyLevel: 3,
    timeSpent: 5,
    likes: 15,
    tags: ['季節', '中級者向け']
  },
  {
    id: '4',
    title: 'ロゼッタ',
    description: 'クラシックなロゼッタパターン。シンメトリーと流れるような線を意識して作りました。',
    imageUrl: "placeholder-photo-1577968897966-3d4325b36b61",
    createdAt: new Date(2025, 6, 6), // 2025年7月6日
    techniques: ['フリーポア'],
    difficultyLevel: 3,
    timeSpent: 4,
    likes: 12,
    tags: ['クラシック', '中級者向け']
  },
  {
    id: '5',
    title: '猫',
    description: 'お客様からのリクエストで作った猫のラテアート。耳と髭の表現に苦労しました。',
    imageUrl: "placeholder-photo-1529892485617-25f63cd7b1e9",
    beforeImageUrl: "placeholder-photo-1442512595331-e89e73853f31",
    createdAt: new Date(2025, 6, 5), // 2025年7月5日
    techniques: ['エッチング', 'フリーポア'],
    difficultyLevel: 4,
    timeSpent: 8,
    likes: 27,
    comments: [
      {
        id: 'c2',
        author: '猫好き',
        content: 'とても可愛いです！また注文します！',
        createdAt: new Date(2025, 6, 5, 16, 45)
      }
    ],
    tags: ['動物', 'リクエスト作品']
  },
  {
    id: '6',
    title: '花束',
    description: 'マルチレイヤー技法を使った花束のデザイン。奥行きと立体感を表現しました。',
    imageUrl: "placeholder-photo-1511537190424-bbbab87ac5eb",
    createdAt: new Date(2025, 6, 4), // 2025年7月4日
    techniques: ['マルチレイヤー', 'フリーポア'],
    difficultyLevel: 5,
    timeSpent: 10,
    likes: 31,
    tags: ['花', '上級者向け']
  }
];

// お客様からのリクエスト
export const latteArtRequests: LatteArtRequest[] = [
  {
    id: 'r1',
    requestedBy: 'Aさん',
    description: '誕生日ケーキのようなデザイン',
    status: 'accepted',
    createdAt: new Date(2025, 6, 8)
  },
  {
    id: 'r2',
    requestedBy: 'Bさん',
    description: '柴犬のデザイン',
    status: 'pending',
    createdAt: new Date(2025, 6, 9)
  },
  {
    id: 'r3',
    requestedBy: 'Cさん',
    description: '富士山の風景',
    status: 'completed',
    createdAt: new Date(2025, 6, 3),
    completedWorkId: '6'
  }
];

// 次に挑戦予定の作品
export const upcomingChallenges = [
  {
    title: '3Dキューブ',
    description: '立体感のある幾何学模様に挑戦します。',
    techniques: ['マルチレイヤー', 'エッチング'],
    plannedDate: '2025年7月15日'
  },
  {
    title: '龍',
    description: 'アジアンテイストの龍のデザイン。複雑な曲線と細部の表現がポイントです。',
    techniques: ['フリーポア', 'エッチング'],
    plannedDate: '2025年7月20日'
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
  }) || latteArtWorks[0]; // 今日の作品がなければ最新の作品を返す
}

// 難易度をテキストで表現
export function getDifficultyText(level: number): string {
  switch(level) {
    case 1: return '初級';
    case 2: return '初級〜中級';
    case 3: return '中級';
    case 4: return '中級〜上級';
    case 5: return '上級';
    default: return '不明';
  }
}

// 制作時間をフォーマット
export function formatTimeSpent(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}分`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}時間`;
  }
  
  return `${hours}時間${remainingMinutes}分`;
}
