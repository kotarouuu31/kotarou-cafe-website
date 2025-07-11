"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import LatteArtCard from './LatteArtCard';
import LatteArtDetail from './LatteArtDetail';
import { LatteArtWork } from '../types/latte-art';
import { latteArtWorks, getTodaysLatteArt, upcomingChallenges } from '../data/latte-art';

const LatteArtGallery: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<LatteArtWork | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const todaysArt = getTodaysLatteArt();
  
  // フィルター適用済みの作品リスト
  const filteredArtworks = latteArtWorks.filter(artwork => {
    if (filter === 'all') return true;
    if (filter === 'easy' && artwork.difficultyLevel <= 2) return true;
    if (filter === 'medium' && artwork.difficultyLevel === 3) return true;
    if (filter === 'hard' && artwork.difficultyLevel >= 4) return true;
    if (filter === 'freepour' && artwork.techniques.includes('フリーポア')) return true;
    if (filter === 'etching' && artwork.techniques.includes('エッチング')) return true;
    return false;
  });
  
  return (
    <div className="bg-gradient-to-br from-[#f9f5f1] to-[#f0e6d8] py-12 px-4 rounded-lg shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
            ラテアート ギャラリー
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            日々のラテアート作品と技術向上の記録。お客様からのリクエストも受け付けています。
          </p>
        </div>
        
        {/* 今日のラテアート */}
        {todaysArt && (
          <div className="mb-12">
            <h3 className="font-heading text-2xl font-bold text-center mb-6 flex items-center justify-center">
              <span className="inline-block w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white mr-2">
                ✨
              </span>
              今日のラテアート
            </h3>
            
            <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-72 md:h-auto bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center">
                  <div className="text-white font-bold text-3xl">{todaysArt.title}</div>
                </div>
                
                <div className="md:w-1/2 p-6">
                  <h4 className="font-heading text-xl font-bold mb-2">{todaysArt.title}</h4>
                  <p className="text-gray-600 mb-4">{todaysArt.description}</p>
                  
                  <div className="flex flex-wrap mb-4">
                    {todaysArt.techniques.map((technique, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mr-1 mb-1"
                      >
                        {technique}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedArtwork(todaysArt)}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
                  >
                    詳細を見る
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* フィルターオプション */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              すべて
            </button>
            <button 
              onClick={() => setFilter('easy')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'easy' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              初級
            </button>
            <button 
              onClick={() => setFilter('medium')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'medium' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              中級
            </button>
            <button 
              onClick={() => setFilter('hard')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'hard' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              上級
            </button>
            <button 
              onClick={() => setFilter('freepour')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'freepour' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              フリーポア
            </button>
            <button 
              onClick={() => setFilter('etching')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'etching' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              エッチング
            </button>
          </div>
        </div>
        
        {/* 作品ギャラリー */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map(artwork => (
            <LatteArtCard 
              key={artwork.id} 
              artwork={artwork} 
              onClick={() => setSelectedArtwork(artwork)}
            />
          ))}
        </div>
        
        {/* 次の挑戦 */}
        <div className="mt-16">
          <h3 className="font-heading text-2xl font-bold text-center mb-6">次に挑戦する作品</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {upcomingChallenges.map((challenge, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-accent">
                <h4 className="font-heading text-lg font-bold mb-2">{challenge.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap">
                    {challenge.techniques.map((technique, i) => (
                      <span 
                        key={i} 
                        className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mr-1 mb-1"
                      >
                        {technique}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{challenge.plannedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* リクエスト募集 */}
        <div className="mt-16 bg-accent/10 rounded-lg p-6 max-w-3xl mx-auto">
          <div className="text-center">
            <h3 className="font-heading text-2xl font-bold mb-3">お客様からのリクエスト受付中</h3>
            <p className="text-gray-600 mb-6">
              特別なラテアートをご希望の方は、ご来店時にスタッフまでお気軽にお申し付けください。
              できる限りご要望にお応えいたします。
            </p>
            
            <button className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-full font-medium transition-colors">
              リクエストについて詳しく見る
            </button>
          </div>
        </div>
      </div>
      
      {/* 詳細モーダル */}
      {selectedArtwork && (
        <LatteArtDetail 
          artwork={selectedArtwork} 
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  );
};

export default LatteArtGallery;
