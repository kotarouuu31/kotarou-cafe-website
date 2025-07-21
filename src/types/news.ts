export interface NewsArticle {
  id: string;
  title: string;
  date: Date;
  category: 'information' | 'menu' | 'notice' | 'event';
  summary: string;
  content?: string;
  imageUrl?: string;
}

export const categoryLabels = {
  information: { label: 'お知らせ', emoji: '📢', color: 'bg-blue-100 text-blue-700' },
  menu: { label: 'メニュー', emoji: '☕', color: 'bg-green-100 text-green-700' },
  notice: { label: '重要', emoji: '⚠️', color: 'bg-red-100 text-red-700' },
  event: { label: 'イベント', emoji: '🎉', color: 'bg-purple-100 text-purple-700' }
};
