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
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* 商品画像 */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 400px) 100vw, 400px"
        />
      </div>

      {/* 商品情報 */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900 text-base line-clamp-1 flex-1">
            {item.name}
          </h3>
          <span className="text-primary font-bold text-lg ml-2">
            ¥{item.price}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};
