"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { LatteArtWork } from '../types/latte-art';
import { getDifficultyText, formatTimeSpent } from '../data/latte-art';

type LatteArtCardProps = {
  artwork: LatteArtWork;
  onClick?: () => void;
};

const LatteArtCard: React.FC<LatteArtCardProps> = ({ artwork, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 技法をバッジとして表示
  const renderTechniques = () => {
    return artwork.techniques.map((technique, index) => (
      <span 
        key={index} 
        className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mr-1 mb-1"
      >
        {technique}
      </span>
    ));
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 画像エリア - Before/After表示 */}
      <div className="relative h-64 w-full overflow-hidden">
        {artwork.beforeImageUrl && isHovered ? (
          <div className="absolute inset-0 flex">
            <div className="w-1/2 relative bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
              <div className="text-white font-bold text-lg">{artwork.title} Before</div>
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                Before
              </div>
            </div>
            <div className="w-1/2 relative bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center">
              <div className="text-white font-bold text-lg">{artwork.title} After</div>
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                After
              </div>
            </div>
          </div>
        ) : (
          <div 
            className="w-full h-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center transition-transform duration-500"
          >
            <div className="text-white font-bold text-xl">{artwork.title}</div>
          </div>
        )}
        
        {/* 今日のラテアート表示 */}
        {artwork.isHighlighted && (
          <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            今日のラテアート
          </div>
        )}
        
        {/* 難易度レベル */}
        <div className="absolute bottom-3 right-3 bg-white/90 text-primary text-xs font-medium px-2 py-1 rounded-full shadow-sm flex items-center">
          <span className="mr-1">難易度:</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill={i < artwork.difficultyLevel ? 'currentColor' : 'none'} 
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      
      {/* 情報エリア */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading text-lg font-bold text-foreground">{artwork.title}</h3>
          <span className="text-xs text-gray-500">
            {artwork.createdAt.toLocaleDateString('ja-JP')}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{artwork.description}</p>
        
        <div className="flex flex-wrap mb-3">
          {renderTechniques()}
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>制作時間: {formatTimeSpent(artwork.timeSpent)}</span>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>{artwork.likes || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatteArtCard;
