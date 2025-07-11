"use client";

import React, { useState, useEffect } from 'react';
import NowPlaying from './NowPlaying';
import RecentTracks from './RecentTracks';
import DJSchedule from './DJSchedule';
import { initialMusicState, sampleTracks } from '../data/music';

const MusicSection: React.FC = () => {
  const [musicState, setMusicState] = useState(initialMusicState);
  const [showRecentTracks, setShowRecentTracks] = useState(false);
  const [showDJSchedule, setShowDJSchedule] = useState(false);
  
  // デモ用：30秒ごとに曲を切り替える
  useEffect(() => {
    const switchTrackInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * sampleTracks.length);
      const newTrack = {
        ...sampleTracks[randomIndex],
        playedAt: new Date()
      };
      
      setMusicState(prev => ({
        ...prev,
        isPlaying: true,
        currentTrack: newTrack,
        recentTracks: [
          {
            ...newTrack,
            playedAt: new Date()
          },
          ...prev.recentTracks.slice(0, 9) // 最大10曲まで保持
        ]
      }));
    }, 30000);
    
    // コンポーネントがマウントされたときに最初の曲をセット
    const initialTrack = sampleTracks[0];
    setMusicState(prev => ({
      ...prev,
      isPlaying: true,
      currentTrack: initialTrack
    }));
    
    return () => clearInterval(switchTrackInterval);
  }, []);
  
  // 最近再生した楽曲のトグル
  const toggleRecentTracks = () => {
    setShowRecentTracks(!showRecentTracks);
    if (!showRecentTracks) {
      setShowDJSchedule(false); // 他方を閉じる
    }
  };
  
  // DJスケジュールのトグル
  const toggleDJSchedule = () => {
    setShowDJSchedule(!showDJSchedule);
    if (!showDJSchedule) {
      setShowRecentTracks(false); // 他方を閉じる
    }
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
          <NowPlaying 
            currentTrack={musicState.currentTrack} 
            isPlaying={musicState.isPlaying} 
          />
          
          {/* コントロールボタン */}
          <div className="mt-4 flex space-x-4">
            <button 
              onClick={toggleRecentTracks}
              className={`flex-1 py-3 px-4 rounded-md transition-all ${showRecentTracks 
                ? 'bg-accent text-white shadow-lg' 
                : 'bg-white/10 hover:bg-white/20'}`}
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>最近再生した楽曲</span>
                <span className="ml-2">
                  {showRecentTracks ? '▼' : '▶'}
                </span>
              </div>
            </button>
            
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
          
          {/* 最近再生した楽曲（クリック時のみ表示） */}
          {showRecentTracks && (
            <div className="mt-4 transition-all duration-300 ease-in-out">
              <RecentTracks tracks={musicState.recentTracks} />
            </div>
          )}
        </div>
        
        {/* DJ Schedule（クリック時のみ表示、デスクトップでは常に表示） */}
        <div className="hidden lg:block">
          <DJSchedule schedules={musicState.djSchedules} />
        </div>
        
        {/* モバイル用DJスケジュール */}
        {showDJSchedule && (
          <div className="lg:hidden mt-4 transition-all duration-300 ease-in-out">
            <DJSchedule schedules={musicState.djSchedules} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicSection;
