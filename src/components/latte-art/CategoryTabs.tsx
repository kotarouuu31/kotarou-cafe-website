import { LatteArtCategory, categoryLabels } from '@/types/latte-art';

interface CategoryTabsProps {
  activeCategory: LatteArtCategory | 'all';
  onCategoryChange: (category: LatteArtCategory | 'all') => void;
  className?: string;
}

export const CategoryTabs = ({
  activeCategory,
  onCategoryChange,
  className = '',
}: CategoryTabsProps) => {
  const categories = [
    { id: 'all' as const, label: 'すべて', emoji: '✨' },
    ...Object.entries(categoryLabels).map(([id, { label, emoji }]) => ({
      id: id as LatteArtCategory,
      label,
      emoji,
    })),
  ];

  return (
    <div className={`sticky top-0 z-10 bg-white shadow-sm ${className}`}>
      <div className="max-w-[400px] mx-auto px-4">
        <div className="flex space-x-2 py-3 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{category.emoji}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
