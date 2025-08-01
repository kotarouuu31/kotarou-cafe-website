"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MenuData } from '@/lib/notion';

interface MenuCardProps {
  item: MenuData;
  index: number;
}

export const MenuCard = ({ item, index }: MenuCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-primary/20"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 商品画像 */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={item.menuImage || '/images/menu/default.jpg'}
          alt={item.menuName}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-105"
          sizes="(max-width: 400px) 33vw, 130px"
        />
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 商品情報 */}
      <div className="p-2.5 space-y-1.5">
        <h3 className="font-bold text-gray-900 text-xs leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {item.menuName}
        </h3>
        
        <div className="flex items-center justify-center">
          <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-0.5 rounded-full">
            ¥{item.price}
          </span>
        </div>
        
        <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};
