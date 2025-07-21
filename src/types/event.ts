export interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  description: string;
  price: string;
  imageUrl: string;
  category: 'music' | 'workshop' | 'exhibition' | 'special';
}

export const categoryLabels = {
  music: { label: '音楽', emoji: '🎵' },
  workshop: { label: 'ワークショップ', emoji: '☕' },
  exhibition: { label: '展示', emoji: '🎨' },
  special: { label: '特別イベント', emoji: '✨' }
};
