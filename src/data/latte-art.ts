import { LatteArtWork, LatteArtCategory, DifficultyLevel } from '../types/latte-art';

// ラテアート作品データ（カテゴリ別・難易度別）
export const latteArtWorks: LatteArtWork[] = [
  // フリーポア
  {
    id: '1',
    title: '基本のハート',
    comment: '初めて形になったハートです。',
    description: 'ミルクの注ぎ方とカップの動かし方の基本を学びました。',
    imageUrl: "placeholder-photo-1541167760496-1628856ab772",
    beforeImageUrl: "placeholder-photo-1541167760496-1628856ab773",
    category: 'free-pour',
    difficulty: 'beginner',
    techniques: ['フリーポアリング', '基本のハート'],
    tools: ['ラテアートカップ', 'エスプレッソマシン'],
    createdAt: new Date(2025, 0, 15),
    isHighlighted: false
  },
  {
    id: '2',
    title: 'リーフアート',
    comment: '葉脈の流れを表現しました。',
    description: 'ミルクの流れをコントロールして葉脈を描く練習を重ねました。',
    imageUrl: "placeholder-photo-1534040385115-33dcb3acba5b",
    beforeImageUrl: "placeholder-photo-1534040385115-33dcb3acba5c",
    category: 'free-pour',
    difficulty: 'intermediate',
    techniques: ['フリーポアリング', 'リーフパターン'],
    tools: ['ラテアートカップ', 'エスプレッソマシン', 'ピッチャー'],
    createdAt: new Date(2025, 1, 20),
    isHighlighted: false
  },
  
  // エッチング
  {
    id: '3',
    title: '初めてのロゼッタ',
    comment: '初めてのロゼッタに挑戦。',
    description: 'エッチングの基本となるロゼッタパターンの練習。',
    imageUrl: "placeholder-photo-1585091960332-7d31533e2a9d",
    beforeImageUrl: "placeholder-photo-1585091960332-7d31533e2a9e",
    category: 'etching',
    difficulty: 'beginner',
    techniques: ['エッチング', '基本のロゼッタ'],
    tools: ['エッチングペン', 'エスプレッソマシン'],
    createdAt: new Date(2025, 2, 10),
    isHighlighted: false
  },
  {
    id: '4',
    title: '上達したロゼッタ',
    comment: '練習の成果が出てきました！',
    description: '前回よりも滑らかな曲線を描けるようになりました。',
    imageUrl: "placeholder-photo-1577968897966-3d4325b36b61",
    beforeImageUrl: "placeholder-photo-1585091960332-7d31533e2a9d", // 前回の作品をbefore画像として
    category: 'etching',
    difficulty: 'intermediate',
    techniques: ['エッチング', 'ロゼッタの応用'],
    tools: ['エッチングペン', 'エスプレッソマシン'],
    createdAt: new Date(2025, 3, 5),
    isHighlighted: false
  },
  
  // カラーアート
  {
    id: '5',
    title: 'カラーチューリップ',
    comment: 'カラーアートに初挑戦！',
    description: '天然色素を使用したカラーラテアート。色の重なりを意識しました。',
    imageUrl: "placeholder-photo-1529892485617-25f63cd7b1e9",
    beforeImageUrl: "placeholder-photo-1529892485617-25f63cd7b1e8",
    category: 'color-art',
    difficulty: 'advanced',
    techniques: ['カラーアート', 'グラデーション'],
    tools: ['カラーソース', 'エスプレッソマシン', '専用ブラシ'],
    createdAt: new Date(2025, 4, 12),
    isHighlighted: false
  },
  
  // 3Dアート
  {
    id: '6',
    title: '3Dスワン',
    comment: '立体感を出すのが難しかったです。',
    description: 'フォームの盛り上げ方と立体感の出し方を研究しました。',
    imageUrl: "placeholder-photo-1511537190424-bbbab87ac5eb",
    beforeImageUrl: "placeholder-photo-1511537190424-bbbab87ac5ea",
    category: '3d-art',
    difficulty: 'expert',
    techniques: ['3Dアート', '立体造形'],
    tools: ['3Dアート用ツール', 'エスプレッソマシン'],
    createdAt: new Date(2025, 5, 8),
    isHighlighted: false
  },
  
  // 季節限定
  {
    id: '7',
    title: '桜のエッチング',
    comment: '春限定の桜デザインです。',
    description: '春の訪れをイメージした桜のエッチング。花びら一枚一枚にこだわりました。',
    imageUrl: "placeholder-photo-1511537190424-bbbab87ac5ed",
    category: 'seasonal',
    difficulty: 'intermediate',
    techniques: ['エッチング', '季節モチーフ'],
    tools: ['エッチングペン', 'エスプレッソマシン'],
    createdAt: new Date(2025, 2, 25),
    isHighlighted: false
  },
  
  // 最新作（ハイライト）
  {
    id: '8',
    title: 'グラデーションハート',
    comment: '色のグラデーションに挑戦しました！',
    description: '3色のカラーソースを使用してグラデーションを表現。色の重なりが美しい作品に仕上がりました。',
    imageUrl: "placeholder-photo-1511537190424-bbbab87ac5ee",
    beforeImageUrl: "placeholder-photo-1511537190424-bbbab87ac5ef",
    category: 'color-art',
    difficulty: 'advanced',
    techniques: ['カラーアート', 'グラデーション', 'フリーポアリング'],
    tools: ['カラーソース3色', 'エスプレッソマシン', '専用ブラシ'],
    createdAt: new Date(2025, 6, 10),
    isHighlighted: true,
    isNew: true
  },
  
  // 挑戦作
  {
    id: '9',
    title: 'ドラゴンアート',
    comment: '一番の挑戦作です！',
    description: '複雑なドラゴンのデザインに挑戦。細部までこだわりました。',
    imageUrl: "placeholder-photo-1511537190424-bbbab87ac5ec",
    beforeImageUrl: "placeholder-photo-1511537190424-bbbab87ac5ed",
    category: 'challenge',
    difficulty: 'expert',
    techniques: ['エッチング', 'フリーハンド'],
    tools: ['エッチングペン各種', 'エスプレッソマシン'],
    createdAt: new Date(2025, 6, 5),
    isHighlighted: false
  }
];

// 今日のラテアート（ハイライトされている作品を返す）
export function getTodaysLatteArt(): LatteArtWork | null {
  // ハイライトされている作品を探す
  const highlighted = latteArtWorks.find(art => art.isHighlighted);
  if (highlighted) return highlighted;
  
  // ハイライトがない場合は最新の作品を返す
  return [...latteArtWorks].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  )[0];
}

// カテゴリ別に作品を取得
export function getArtworksByCategory(category?: LatteArtCategory): LatteArtWork[] {
  if (!category) return [...latteArtWorks];
  return latteArtWorks.filter(art => art.category === category);
}

// 難易度別に作品を取得
export function getArtworksByDifficulty(difficulty: DifficultyLevel): LatteArtWork[] {
  return latteArtWorks.filter(art => art.difficulty === difficulty);
}

// 新着作品を取得
export function getNewArrivals(limit: number = 4): LatteArtWork[] {
  return [...latteArtWorks]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

// 日付をフォーマット
export function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
