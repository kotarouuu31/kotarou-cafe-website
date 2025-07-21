export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: 'coffee' | 'drinks' | 'desserts' | 'food';
}

export const menuCategories = {
  coffee: { label: 'コーヒー', emoji: '☕' },
  drinks: { label: 'ドリンク', emoji: '🥤' },
  desserts: { label: 'デザート', emoji: '🍰' },
  food: { label: 'フード', emoji: '🥪' }
};

export const menuItems: MenuItem[] = [
  // コーヒー
  {
    id: '1',
    name: 'エスプレッソ',
    price: 350,
    description: '濃厚で香り高い本格エスプレッソ',
    imageUrl: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a',
    category: 'coffee'
  },
  {
    id: '2',
    name: 'カフェラテ',
    price: 450,
    description: 'なめらかなミルクとエスプレッソの絶妙なバランス',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
    category: 'coffee'
  },
  {
    id: '3',
    name: 'カプチーノ',
    price: 480,
    description: 'ふわふわのミルクフォームが特徴的',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    category: 'coffee'
  },
  {
    id: '4',
    name: 'アメリカーノ',
    price: 380,
    description: 'すっきりとした味わいのブラックコーヒー',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    category: 'coffee'
  },

  // ドリンク
  {
    id: '5',
    name: 'アイスティー',
    price: 400,
    description: '爽やかな紅茶のアイスドリンク',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574',
    category: 'drinks'
  },
  {
    id: '6',
    name: 'フルーツジュース',
    price: 450,
    description: '季節のフレッシュフルーツを使用',
    imageUrl: 'https://images.unsplash.com/photo-1546173159-315724a31696',
    category: 'drinks'
  },
  {
    id: '7',
    name: 'フラッペ',
    price: 520,
    description: '冷たくて甘いブレンドドリンク',
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add',
    category: 'drinks'
  },

  // デザート
  {
    id: '8',
    name: 'チーズケーキ',
    price: 480,
    description: '濃厚でクリーミーな手作りチーズケーキ',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
    category: 'desserts'
  },
  {
    id: '9',
    name: 'チョコレートクッキー',
    price: 320,
    description: 'サクサクの手作りクッキー',
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e',
    category: 'desserts'
  },
  {
    id: '10',
    name: 'バニラアイス',
    price: 350,
    description: '濃厚なバニラの香りが楽しめる',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
    category: 'desserts'
  },

  // フード
  {
    id: '11',
    name: 'クラブサンドイッチ',
    price: 680,
    description: '新鮮野菜とチキンのボリューム満点サンドイッチ',
    imageUrl: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f',
    category: 'food'
  },
  {
    id: '12',
    name: 'パスタセット',
    price: 780,
    description: '本日のパスタとサラダのセット',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5',
    category: 'food'
  },
  {
    id: '13',
    name: 'シーザーサラダ',
    price: 580,
    description: '新鮮な野菜とクルトンのヘルシーサラダ',
    imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    category: 'food'
  }
];

// カテゴリ別にメニューを取得
export const getMenuByCategory = (category: string) => {
  return menuItems.filter(item => item.category === category);
};
