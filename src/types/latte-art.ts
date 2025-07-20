export type LatteArtCategory = 'free-pour' | 'etching' | 'color-art' | '3d-art' | 'seasonal' | 'challenge';

export const categoryLabels: Record<LatteArtCategory, { label: string; emoji: string }> = {
  'free-pour': { label: 'フリーポア', emoji: '🎨' },
  'etching': { label: 'エッチング', emoji: '✏️' },
  'color-art': { label: 'カラーアート', emoji: '🌈' },
  '3d-art': { label: '3Dアート', emoji: '🖌️' },
  'seasonal': { label: '季節限定', emoji: '🌸' },
  'challenge': { label: '挑戦作', emoji: '🔥' },
};

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export const difficultyLabels: Record<DifficultyLevel, string> = {
  'beginner': '初級',
  'intermediate': '中級',
  'advanced': '上級',
  'expert': 'エキスパート',
};

export type LatteArtWork = {
  id: string;
  title: string;
  comment: string;
  description?: string; // 詳細な説明
  imageUrl: string;
  beforeImageUrl?: string; // Before画像（進化の様子を見せるため）
  category: LatteArtCategory;
  difficulty: DifficultyLevel;
  techniques: string[]; // 使用した技法
  tools?: string[]; // 使用した道具
  createdAt: Date;
  isHighlighted?: boolean;
  isNew?: boolean; // 新作マーク用
};

