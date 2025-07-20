import { MenuCategory } from '@/types/menu';

interface MenuTabsProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const MenuTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: MenuTabsProps) => {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm mb-6 overflow-x-auto no-scrollbar">
      <div className="flex space-x-1 px-4 py-2 max-w-[400px] mx-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
              activeCategory === category.id
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// スクロールバーを非表示にするためのスタイル
const styles = {
  noScrollbar: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
  },
};
