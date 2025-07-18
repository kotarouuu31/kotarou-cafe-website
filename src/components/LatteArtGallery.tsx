"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { LatteArtWork } from '../types/latte-art';
import { latteArtWorks, getTodaysLatteArt, formatDate } from '../data/latte-art';

const LatteArtGallery: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<LatteArtWork | null>(null);
  const todaysArt = getTodaysLatteArt();
  
  // 時系列順に並べた作品リスト（新しい順）
  const sortedArtworks = [...latteArtWorks].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );
  
  return (
    <div className="bg-gradient-to-br from-[#f9f5f1] to-[#f0e6d8] py-8 px-4 rounded-lg shadow-lg">
      <div className="max-w-[400px] mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl font-bold text-primary mb-3">
            Kotarouのラテアート成長記録
          </h2>
          <p className="text-sm text-gray-600 max-w-xs mx-auto">
            日々の練習と成長の記録。一杯一杯、心を込めて。
          </p>
        </div>
        
        {/* 今日のラテアート */}
        {todaysArt && (
          <div className="mb-10">
            <h3 className="font-heading text-xl font-bold text-center mb-4 flex items-center justify-center">
              <span className="inline-block w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white mr-2">
                ✨
              </span>
              最新作
            </h3>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col">
                <div className="relative h-64 w-full">
                  <Image 
                    src={`https://source.unsplash.com/${todaysArt.imageUrl}`} 
                    alt={todaysArt.title} 
                    className="object-cover"
                    fill
                    sizes="100vw"
                    priority
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-heading text-lg font-bold">{todaysArt.title}</h4>
                    <span className="text-xs text-gray-500">{formatDate(todaysArt.createdAt)}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{todaysArt.comment}</p>
                  
                  <button 
                    onClick={() => setSelectedArtwork(todaysArt)}
                    className="w-full mt-2 px-3 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary/90 transition-colors"
                  >
                    拡大して見る
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 成長の軌跡 - 時系列で並べた作品一覧 */}
        <div className="mt-10">
          <h3 className="font-heading text-xl font-bold text-center mb-4">
            成長の軌跡
          </h3>
          
          <div className="space-y-6">
            {sortedArtworks.map(artwork => (
              <div key={artwork.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-52 w-full">
                  <Image 
                    src={`https://source.unsplash.com/${artwork.imageUrl}`} 
                    alt={artwork.title} 
                    className="object-cover"
                    fill
                    sizes="100vw"
                    onClick={() => setSelectedArtwork(artwork)}
                  />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-sm">{artwork.title}</h4>
                    <span className="text-xs text-gray-500">{formatDate(artwork.createdAt)}</span>
                  </div>
                  <p className="text-xs text-gray-600">{artwork.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* リクエスト募集 */}
        <div className="mt-10 bg-accent/10 rounded-lg p-4">
          <div className="text-center">
            <h3 className="font-heading text-lg font-bold mb-2">お客様からのリクエスト受付中</h3>
            <p className="text-xs text-gray-600 mb-4">
              特別なラテアートをご希望の方は、ご来店時にスタッフまでお気軽にお申し付けください。
              できる限りご要望にお応えいたします。
            </p>
            
            <button className="bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              リクエストについて詳しく見る
            </button>
          </div>
        </div>
      </div>
      
      {/* 詳細モーダル */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-[400px] max-h-[90vh] overflow-auto">
            <div className="p-3 flex justify-between items-center border-b">
              <h3 className="font-bold text-base">{selectedArtwork?.title}</h3>
              <button onClick={() => setSelectedArtwork(null)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-3">
              <div className="relative w-full h-[50vh] mb-3">
                <Image 
                  src={`https://source.unsplash.com/${selectedArtwork?.imageUrl}`} 
                  alt={selectedArtwork?.title || ''} 
                  className="object-contain"
                  fill
                  sizes="100vw"
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-base">{selectedArtwork?.title}</h4>
                <span className="text-xs text-gray-500">{formatDate(selectedArtwork?.createdAt)}</span>
              </div>
              <p className="text-sm text-gray-600">{selectedArtwork?.comment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatteArtGallery;
