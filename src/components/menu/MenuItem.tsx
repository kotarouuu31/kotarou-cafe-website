import Image from "next/image";
import { ScrollAnimation } from "../ui/ScrollAnimation";

interface MenuItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isRecommended?: boolean;
}

export const MenuItem = ({
  id,
  name,
  description,
  price,
  image,
  isRecommended = false,
}: MenuItemProps) => {
  return (
    <ScrollAnimation className="w-full mb-8" delay={id * 50}>
      <div className="relative group overflow-hidden rounded-lg shadow-sm bg-white">
        {/* おすすめバッジ */}
        {isRecommended && (
          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            おすすめ
          </div>
        )}
        
        {/* メニュー画像 */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={`${image}?auto=format&fit=crop&w=800&q=80`}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* メニュー情報 */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-heading font-bold text-lg text-gray-900">{name}</h3>
            <p className="text-primary font-bold">¥{price.toLocaleString()}</p>
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </ScrollAnimation>
  );
};
