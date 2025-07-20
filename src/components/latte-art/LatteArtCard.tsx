"use client";

import Image from 'next/image';
import { LatteArtWork, categoryLabels, difficultyLabels } from '@/types/latte-art';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Link from 'next/link';

interface LatteArtCardProps {
  artwork: LatteArtWork;
  layoutId?: string;
}

export const LatteArtCard = ({ artwork, layoutId }: LatteArtCardProps) => {
  const category = categoryLabels[artwork.category];
  
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
            src={`https://source.unsplash.com/${artwork.imageUrl}`}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 400px) 100vw, 400px"
            priority={artwork.isHighlighted}
          />
          
          {/* カテゴリバッジ */}
          <motion.div 
            className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="mr-1.5">{category.emoji}</span>
            <span className="text-xs">{category.label}</span>
          </motion.div>
          
          {/* 新作バッジ */}
          {artwork.isNew && (
            <motion.div 
              className="absolute top-3 right-3 bg-primary text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: 'spring',
                stiffness: 500,
                damping: 15,
                delay: 0.1
              }}
            >
              <span className="relative flex h-2 w-2 mr-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              NEW
            </motion.div>
          )}
          
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-sm font-medium">詳細を見る</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1">
              {artwork.title}
            </h3>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
              {new Date(artwork.createdAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </span>
          </div>
          
          <div className="mt-2 flex items-center">
            <div className="flex items-center text-amber-400">
              {[1, 2, 3, 4, 5].map((i) => {
                const difficulty = typeof artwork.difficulty === 'number' ? artwork.difficulty : 1;
                return (
                  <Star 
                    key={i} 
                    size={14} 
                    className={`${i <= difficulty ? 'fill-current' : 'fill-gray-200'} ${i <= difficulty ? 'text-amber-400' : 'text-gray-200'}`} 
                    strokeWidth={1.5}
                  />
                );
              })}
            </div>
            <span className="ml-2 text-xs font-medium text-gray-600">
              {difficultyLabels[artwork.difficulty]}
            </span>
          </div>
          
          <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {artwork.comment}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default LatteArtCard;
