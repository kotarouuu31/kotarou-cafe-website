"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MenuItem } from '@/data/menu-simple';

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export const MenuCard = ({ item, index }: MenuCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
      whileHover={{ y: -2 }}
    >
      {/* 商品画像 */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 400px) 50vw, 200px"
        />
      </div>

      {/* 商品情報 */}
      <div className="p-3 space-y-2">
        <h3 className="font-bold text-gray-900 text-sm line-clamp-1">
          {item.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-base">
            ¥{item.price}
          </span>
        </div>
        
        <p className="text-xs text-gray-600 line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};
