// メニューアイテムの型定義
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isRecommended?: boolean;
  category: string;
}

// メニューカテゴリの型定義
export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
}

// メニューページのプロパティ型
export interface MenuPageProps {
  menuItems: MenuItem[];
  categories: MenuCategory[];
}
