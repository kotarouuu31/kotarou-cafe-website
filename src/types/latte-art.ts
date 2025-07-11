export type LatteArtTechnique = 'フリーポア' | 'エッチング' | 'スタック' | 'マルチレイヤー' | 'カラーアート';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type LatteArtWork = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  beforeImageUrl?: string;
  createdAt: Date;
  techniques: LatteArtTechnique[];
  difficultyLevel: DifficultyLevel;
  timeSpent: number; // 分単位
  isHighlighted?: boolean;
  likes?: number;
  comments?: LatteArtComment[];
  tags?: string[];
};

export type LatteArtComment = {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
};

export type LatteArtRequest = {
  id: string;
  requestedBy: string;
  description: string;
  status: 'pending' | 'accepted' | 'completed' | 'rejected';
  createdAt: Date;
  completedWorkId?: string;
};
