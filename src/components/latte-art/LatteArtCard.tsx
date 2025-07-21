"use client";

import React from 'react';
import Image from 'next/image';
import { LatteArtWork } from '@/types/latte-art';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LatteArtCardProps {
  artwork: LatteArtWork;
  layoutId?: string;
}

export const LatteArtCard = ({ artwork, layoutId }: LatteArtCardProps) => {
  return (
    <motion.div 
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -4,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      layout={!!layoutId}
    >
      <Link href={`/latte-art/${artwork.id}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 400px) 100vw, 400px"
            priority={artwork.isHighlighted}
          />
          
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-sm font-medium">詳細を見る</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">
            {artwork.title}
          </h3>
          {artwork.comment && (
            <p className="text-sm text-gray-600 line-clamp-2">{artwork.comment}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default LatteArtCard;
