"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { NowPlaying as NowPlayingType } from '@/types/recordbox';
import { getElapsedTime } from '@/lib/recordbox';

type NowPlayingProps = {
  nowPlaying?: NowPlayingType;
  autoUpdate?: boolean;
};

const NowPlaying: React.FC<NowPlayingProps> = ({ nowPlaying: initialNowPlaying, autoUpdate = false }) => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingType>(initialNowPlaying || { track: null, startedAt: null });
  const { track, startedAt } = nowPlaying;
  const isPlaying = !!track && !!startedAt;
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  
  // APIから最新の曲情報を取得
  const fetchLatestTrackInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/now-playing');
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // 新しいトラックが来た場合のみアニメーション
      if (data.track && (!track || data.track.id !== track.id)) {
        setFadeIn(true);
        setTimeout(() => setFadeIn(false), 1000);
      }
      
      setNowPlaying(data);
    } catch (err) {
      console.error('Failed to fetch track info:', err);
      setError('曲情報の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [track]);
  
  // 自動更新の設定
  useEffect(() => {
    if (autoUpdate) {
      // 初回読み込み
      fetchLatestTrackInfo();
      
      // 30秒ごとに更新
      const intervalId = setInterval(fetchLatestTrackInfo, 30000);
      
      return () => clearInterval(intervalId);
    }
  }, [autoUpdate, fetchLatestTrackInfo]);
  
  // 外部からpropsが更新された場合
  useEffect(() => {
    if (initialNowPlaying) {
      setNowPlaying(initialNowPlaying);
    }
  }, [initialNowPlaying]);
  
  // トラックが変わったらプログレスをリセット
  useEffect(() => {
    setProgress(0);
  }, [track?.id]);
  
  // 再生中は進行状況を更新
  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    
    const timer = setInterval(() => {
      // 固定の長さ（3分）を使用
      const trackLength = 180;
      const elapsedSeconds = getElapsedTime(startedAt);
      const progressPercent = Math.min((elapsedSeconds / trackLength) * 100, 100);
      
      setProgress(progressPercent);
    }, 500);
    
    return () => clearInterval(timer);
  }, [isPlaying, track, startedAt]);
  
  return (
    <div className={`bg-gradient-to-r from-primary-dark/90 to-primary/90 text-white rounded-lg shadow-lg p-4 backdrop-blur-sm transition-opacity duration-500 ${fadeIn ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex items-center">
        <div className="mr-4 relative">
          {/* 音楽ジャケット画像 */}
          <div className="w-16 h-16 md:w-24 md:h-24 relative overflow-hidden rounded-md shadow-md">
            {false ? (
              <Image
                src="/images/default-album.jpg"
                alt={`${track?.title || 'Unknown'} by ${track?.artist || 'Unknown'}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
            )}
            
            {/* 再生中アニメーション */}
            {isPlaying && (
              <div className="absolute bottom-1 right-1 flex space-x-1">
                <div className="w-1 h-3 bg-white animate-music-bar1"></div>
                <div className="w-1 h-3 bg-white animate-music-bar2"></div>
                <div className="w-1 h-3 bg-white animate-music-bar3"></div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center">
            <div className="mr-2">
              {isPlaying ? (
                <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-green-500 text-white">
                  <span className="animate-pulse mr-1">●</span> Now Playing
                </span>
              ) : (
                <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-gray-600 text-white">
                  {loading ? '更新中...' : '準備中...'}
                </span>
              )}
            </div>
          </div>
          
          {error && (
            <div className="mt-2 text-red-300 text-sm">
              <p>{error}</p>
            </div>
          )}
          
          {track ? (
            <>
              <h3 className="font-bold text-lg md:text-xl mt-1 line-clamp-1">{track.title}</h3>
              <p className="text-sm md:text-base text-white/80">{track.artist}</p>
              
              {/* プログレスバー */}
              <div className="mt-2">
                <div className="w-full bg-white/20 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-accent h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1 text-white/60">
                  <span>0:00</span>
                  <span>3:00</span>
                </div>
              </div>
            </>
          ) : (
            <div className="py-2">
              <p className="text-white/80">現在再生中の曲はありません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// APIから自動更新するバージョンのエクスポート
export const AutoUpdatingNowPlaying: React.FC = () => {
  return <NowPlaying autoUpdate={true} />;
};

export default NowPlaying;
