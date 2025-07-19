"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { NowPlaying as NowPlayingType } from '@/types/recordbox';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

type RecordPlayerProps = {
  nowPlaying?: NowPlayingType;
  autoUpdate?: boolean;
  updateInterval?: number;
  className?: string;
};

const RecordPlayer: React.FC<RecordPlayerProps> = ({
  nowPlaying: initialNowPlaying,
  autoUpdate = false,
  updateInterval = 30000,
  className = ''
}) => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingType>(initialNowPlaying || { track: null, startedAt: null });
  const { track, startedAt } = nowPlaying;
  const isPlaying = !!track && !!startedAt;
  const isOnline = useOnlineStatus();
  const offlineMode = !isOnline && track;
  const [retryCount, setRetryCount] = useState(0);
  const [backoffUntil, setBackoffUntil] = useState<number | null>(null);

  // APIから最新の曲情報を取得
  const fetchLatestTrackInfo = useCallback(async () => {
    if (!isOnline) return;
    
    // バックオフ期間中ならスキップ
    const now = Date.now();
    if (backoffUntil && now < backoffUntil) {
      return;
    }
    
    try {
      const response = await fetch('/api/now-playing');
      
      // レート制限の場合はバックオフ
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : Math.min(60000 * Math.pow(2, retryCount), 300000);
        
        setBackoffUntil(now + waitTime);
        setRetryCount(prev => prev + 1);
        return;
      }
      
      // 成功した場合はリトライカウンタをリセット
      if (response.ok) {
        setRetryCount(0);
        setBackoffUntil(null);
      } else {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // 現在の曲と同じ場合は更新しない
      if (track && data.track && track.id === data.track.id) {
        return;
      }
      
      setNowPlaying(data);
      
      // オフライン用にローカルストレージに保存
      if (typeof window !== 'undefined' && data.track) {
        localStorage.setItem('lastNowPlaying', JSON.stringify(data));
      }
    } catch (err) {
      console.error('Failed to fetch now playing:', err);
      
      // オフラインモードに切り替え
      if (typeof window !== 'undefined') {
        try {
          const savedData = localStorage.getItem('lastNowPlaying');
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            setNowPlaying(parsedData);
          }
        } catch (e) {
          console.error('Failed to load offline data:', e);
        }
      }
    }
  }, [isOnline, setNowPlaying, setRetryCount, setBackoffUntil, retryCount, backoffUntil, track]);

  // 自動更新の設定
  useEffect(() => {
    if (!autoUpdate || !isOnline) return;
    
    let lastRequestTime = 0;
    
    // 初回読み込み
    fetchLatestTrackInfo();
    lastRequestTime = Date.now();

    // 定期的に更新
    const intervalId = setInterval(() => {
      const now = Date.now();
      if (now - lastRequestTime >= 30000) {
        fetchLatestTrackInfo();
        lastRequestTime = now;
      }
    }, updateInterval);

    return () => clearInterval(intervalId);
  }, [autoUpdate, updateInterval, isOnline, fetchLatestTrackInfo]);

  // 外部からpropsが更新された場合
  useEffect(() => {
    if (initialNowPlaying) {
      setNowPlaying(initialNowPlaying);
    }
  }, [initialNowPlaying]);

  // オンライン状態が変わった時の処理
  useEffect(() => {
    if (isOnline && autoUpdate) {
      // オンラインに戻ったら即時更新
      fetchLatestTrackInfo();
    }
  }, [isOnline, autoUpdate, fetchLatestTrackInfo]);

  return (
    <div className={`relative ${className}`}>
      {/* レコード盤とプレーヤー */}
      <div className="flex flex-col sm:flex-row items-center">
        <div className="relative mb-4 sm:mb-0">
          {/* レコード盤 */}
          <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-gray-900 to-black shadow-lg ${isPlaying ? 'animate-spin-slow' : ''}`}>
            {/* レコード溝 */}
            <div className="absolute inset-2 rounded-full border-2 border-gray-800"></div>
            <div className="absolute inset-5 rounded-full border border-gray-800"></div>
            <div className="absolute inset-8 rounded-full border border-gray-800"></div>
            
            {/* レコード中央のジャケット画像 */}
            <div className="absolute inset-0 m-auto w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary overflow-hidden shadow-inner">
              {track?.albumArt ? (
                <Image 
                  src={track.albumArt} 
                  alt={track.title} 
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white">
                  <span className="text-[8px] sm:text-xs font-bold">KOTAROU</span>
                </div>
              )}
            </div>
            
            {/* レコード中央の穴 */}
            <div className="absolute inset-0 m-auto w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-inner"></div>
          </div>
          
          {/* トーンアーム（再生中のみ表示） */}
          {isPlaying && (
            <div className="absolute top-2 -right-4 sm:top-3 sm:-right-6 w-12 sm:w-16 h-2 sm:h-3 bg-gradient-to-r from-gray-400 to-gray-300 rounded-r-full origin-left transform rotate-30 shadow-md"></div>
          )}
        </div>
        
        {/* 曲情報 */}
        <div className="w-full sm:ml-4 sm:flex-1 text-center sm:text-left">
          {isPlaying ? (
            <>
              <div className="font-medium text-sm sm:text-base truncate">{track.title}</div>
              <div className="text-xs sm:text-sm text-gray-200/80 truncate">{track.artist}</div>
              {track.genre && <div className="text-[10px] sm:text-xs text-gray-200/60 mt-0.5 sm:mt-1">{track.genre}</div>}
              {offlineMode && (
                <span className="text-[10px] sm:text-xs text-amber-400 mt-0.5 sm:mt-1 block">オフラインモード</span>
              )}
            </>
          ) : (
            <div className="text-xs sm:text-sm text-gray-200/80">再生中の曲はありません</div>
          )}
        </div>
      </div>
    </div>
  );
};

// 自動更新付きのRecordPlayerコンポーネント
export function AutoUpdatingRecordPlayer(props: Omit<RecordPlayerProps, 'autoUpdate' | 'nowPlaying'>) {
  const [offlineData, setOfflineData] = useState<NowPlayingType | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedData = localStorage.getItem('lastNowPlaying');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setOfflineData(parsedData);
      }
    } catch (err) {
      console.error('Failed to load offline data:', err);
    }
  }, []);

  return <RecordPlayer autoUpdate={true} nowPlaying={offlineData} {...props} />;
}

export default RecordPlayer;
