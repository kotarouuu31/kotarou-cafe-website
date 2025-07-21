"use client";

import React from 'react';
import Image from 'next/image';
import { LatteArtWork } from '@/types/latte-art';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LatteArtCardProps {
  work: LatteArtWork;
}

export const LatteArtCard = ({ work }: LatteArtCardProps) => {
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
    >
      <Link href={`/latte-art/${work.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={work.imageUrl}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 400px) 50vw, 200px"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* 作品情報 */}
        <div className="p-3 space-y-2">
          <h3 className="font-bold text-gray-900 text-sm line-clamp-1">
            {work.title}
          </h3>
          
          <p className="text-xs text-gray-500">
            {work.createdAt}
          </p>
          
          {work.comment && (
            <p className="text-xs text-gray-600 line-clamp-2">
              {work.comment}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default LatteArtCard;
