export type LatteArtWork = {
  id: string;
  title: string;
  comment: string; // 一言コメント
  imageUrl: string;
  createdAt: Date;
  isHighlighted?: boolean; // 今日のラテアートかどうか
};

