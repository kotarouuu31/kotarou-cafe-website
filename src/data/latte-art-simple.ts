export interface LatteArtWork {
  id: string;
  title: string;
  comment: string;
  imageUrl: string;
  createdAt: string;
}

export const latteArtWorks: LatteArtWork[] = [
  {
    id: '1',
    title: 'ハートラテ',
    comment: '愛を込めて',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    createdAt: '2025/07/20'
  },
  {
    id: '2',
    title: '猫ラテ',
    comment: '可愛らしく',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574',
    createdAt: '2025/07/18'
  },
  {
    id: '3',
    title: 'リーフデザイン',
    comment: '自然の美しさ',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
    createdAt: '2025/07/15'
  },
  {
    id: '4',
    title: 'ロゼッタ',
    comment: 'クラシックな技法',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    createdAt: '2025/07/12'
  },
  {
    id: '5',
    title: 'スワンラテ',
    comment: '優雅な仕上がり',
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add',
    createdAt: '2025/07/10'
  },
  {
    id: '6',
    title: 'フラワーアート',
    comment: '花のような美しさ',
    imageUrl: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a',
    createdAt: '2025/07/08'
  }
];
