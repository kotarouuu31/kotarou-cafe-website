"use client";

import React, { useState, useEffect } from 'react';
import NowPlaying from './NowPlaying';
import DJSchedule from './DJSchedule';
import Link from 'next/link';
import { generateMockHistoryData } from '@/lib/recordbox';
import { NowPlaying as NowPlayingType } from '@/types/recordbox';

const MusicSection: React.FC = () => {
  const [showDJSchedule, setShowDJSchedule] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlayingType>({ track: null, startedAt: null });
  
  // デモ用：30秒ごとに曲を切り替える
  useEffect(() => {
    // 初期データをセット
    const mockData = generateMockHistoryData(5);
    setNowPlaying(mockData.nowPlaying);
    
    // 定期的に更新
    const switchTrackInterval = setInterval(() => {
      const mockData = generateMockHistoryData(5);
      setNowPlaying(mockData.nowPlaying);
    }, 30000);
    
    return () => clearInterval(switchTrackInterval);
  }, []);
  
  // DJスケジュールのトグル
  const toggleDJSchedule = () => {
    setShowDJSchedule(!showDJSchedule);
  };
  
  return (
    <div className="bg-gradient-to-br from-primary-dark to-primary-light/80 text-white py-8 px-4 rounded-lg shadow-xl">
      <h2 className="font-heading text-3xl font-bold mb-6 text-center">
        <span className="inline-block animate-bounce-slow mr-2">🎧</span>
        Music Corner
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Now Playing */}
        <div className="lg:col-span-2">
          <NowPlaying nowPlaying={nowPlaying} />
          
          {/* コントロールボタン */}
          <div className="mt-4 flex space-x-4">
            <Link 
              href="/music"
              className="flex-1 py-3 px-4 rounded-md transition-all bg-white/10 hover:bg-white/20"
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>再生履歴を見る</span>
                <span className="ml-2">▶</span>
              </div>
            </Link>
            
            <button 
              onClick={toggleDJSchedule}
              className={`flex-1 py-3 px-4 rounded-md transition-all ${showDJSchedule 
                ? 'bg-accent text-white shadow-lg' 
                : 'bg-white/10 hover:bg-white/20'}`}
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>DJスケジュール</span>
                <span className="ml-2">
                  {showDJSchedule ? '▼' : '▶'}
                </span>
              </div>
            </button>
          </div>
          
          {/* 最近再生した楽曲は専用ページに移動 */}
        </div>
        
        {/* DJ Schedule（クリック時のみ表示、デスクトップでは常に表示） */}
        <div className="hidden lg:block">
          <DJSchedule />
        </div>
        
        {/* モバイル用DJスケジュール */}
        {showDJSchedule && (
          <div className="lg:hidden mt-4 transition-all duration-300 ease-in-out">
            <DJSchedule />
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicSection;
