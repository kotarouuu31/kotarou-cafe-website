export interface LatteArtWork {
  id: string;
  title: string;
  comment?: string; // 既存の互換性のため
  description?: string; // Notion用の説明
  imageUrl: string;
  createdAt: string; // "2025/07/10"形式
  isPublic?: boolean;
  artist?: string;
  difficulty?: string;
  tags?: string[];
}

