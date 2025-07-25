"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { NowPlaying as NowPlayingType, TrackInfo } from '@/types/recordbox';
import { getElapsedTime } from '@/lib/recordbox';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

type NowPlayingProps = {
  nowPlaying?: NowPlayingType;
  autoUpdate?: boolean;
  showDetails?: boolean;
  showNextTrack?: boolean;
  updateInterval?: number; // ミリ秒単位
  className?: string;
};

const NowPlaying: React.FC<NowPlayingProps> = ({ 
  nowPlaying: initialNowPlaying, 
  autoUpdate = false,
  showDetails = false,
  showNextTrack = false,
  updateInterval = 30000, // デフォルトは30秒
  className = ''
}) => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingType>(initialNowPlaying || { track: null, startedAt: null });
  const { track, startedAt } = nowPlaying;
  const isPlaying = !!track && !!startedAt;
  const [progress, setProgress] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [nextTrack, setNextTrack] = useState<TrackInfo | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const isOnline = useOnlineStatus();
  const offlineMode = !isOnline && track;

  // 次の曲情報を取得
  const fetchNextTrack = useCallback(async () => {
    if (!isOnline) return;

    try {
      const response = await fetch('/api/next-track');

      if (!response.ok) {
        // 404は次の曲がない場合なのでエラーとして扱わない
        if (response.status === 404) {
          setNextTrack(null);
          return;
        }
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setNextTrack(data);
    } catch (err) {
      console.error('Failed to fetch next track:', err);
      setNextTrack(null);
    }
  }, [isOnline, setNextTrack]);
  
  // リトライカウンタとバックオフ時間を管理するリファレンス
  const [retryCount, setRetryCount] = useState(0);
  const [backoffUntil, setBackoffUntil] = useState<number | null>(null);
  
  // APIから最新の曲情報を取得
  const fetchLatestTrackInfo = useCallback(async () => {
    if (!isOnline) return;
    
    // バックオフ期間中ならスキップ
    const now = Date.now();
    if (backoffUntil && now < backoffUntil) {
      console.log(`レート制限中: 次のリクエストまであと${Math.ceil((backoffUntil - now) / 1000)}秒`);
      return;
    }
    
    try {
      const response = await fetch('/api/now-playing');
      
      // レート制限の場合はバックオフ
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : Math.min(60000 * Math.pow(2, retryCount), 300000);
        
        console.warn(`レート制限検出 (429): ${waitTime / 1000}秒待機します`);
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
      
      // 現在の曲と同じ場合は更新しない（無限ループ防止）
      if (track && data.track && track.id === data.track.id) {
        // 同じ曲の場合は最終更新時間だけ更新
        setLastUpdated(new Date());
        return;
      }
      
      // 新しい曲が来たらフェードイン効果を適用
      if (data.track && (!track || data.track.id !== track.id)) {
        setFadeIn(true);
        setTimeout(() => setFadeIn(false), 1000);
      }
      
      setNowPlaying(data);
      setLastUpdated(new Date());
      
      // ローカルストレージに保存（オフライン時用）
      if (typeof window !== 'undefined' && data.track) {
        localStorage.setItem('lastNowPlaying', JSON.stringify(data));
        localStorage.setItem('lastUpdated', new Date().toISOString());
      }
      
      // 次の曲情報を取得（有効な場合）
      if (showNextTrack) {
        fetchNextTrack();
      }
    } catch (err) {
      console.error('Failed to fetch now playing:', err);
    }
  }, [isOnline, showNextTrack, fetchNextTrack, track, retryCount, backoffUntil]);

  // オフライン時の曲情報を取得
  useEffect(() => {
    if (isOnline || !offlineMode) return;

    try {
      // ローカルストレージから最後の曲情報を取得
      if (typeof window !== 'undefined') {
        const savedData = localStorage.getItem('lastNowPlaying');
        const lastUpdatedStr = localStorage.getItem('lastUpdated');

        if (savedData && lastUpdatedStr) {
          const parsedData = JSON.parse(savedData);
          setNowPlaying(parsedData);
          setLastUpdated(new Date(lastUpdatedStr));
        }
      }
    } catch (err) {
      console.error('Failed to load offline data:', err);
    }
  }, [isOnline, offlineMode]);

  // 自動更新の設定
  useEffect(() => {
    if (!autoUpdate || !isOnline) return;
    
    // 最後のリクエスト時間を追跡するリファレンス
    let lastRequestTime = 0;
    
    // 初回読み込み
    fetchLatestTrackInfo();
    lastRequestTime = Date.now();

    // 定期的に更新、デバウンス処理を追加
    const intervalId = setInterval(() => {
      const now = Date.now();
      // 前回のリクエストから最低30秒経過しているか確認
      if (now - lastRequestTime >= 30000) {
        fetchLatestTrackInfo();
        lastRequestTime = now;
      } else {
        console.log(`リクエスト間隔が短すぎます。スキップします。次のリクエストまであと${Math.ceil((30000 - (now - lastRequestTime)) / 1000)}秒`);
      }
    }, updateInterval);

    return () => clearInterval(intervalId);
  }, [autoUpdate, fetchLatestTrackInfo, updateInterval, isOnline]);

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

  // オンライン状態が変わった時の処理
  useEffect(() => {
    if (isOnline && autoUpdate) {
      // オンラインに戻ったら即時更新
      fetchLatestTrackInfo();
    }
  }, [isOnline, autoUpdate, fetchLatestTrackInfo]);

  return (
    <div className={`bg-gradient-to-r from-primary-dark/90 to-primary/90 text-white rounded-lg shadow-lg p-4 backdrop-blur-sm transition-opacity duration-500 ${fadeIn ? 'opacity-0' : 'opacity-100'} ${className}`}>
      <div className="flex flex-col justify-center">
        <div className="flex items-center">
          <div className="mr-2">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden relative">
              {track?.albumArt ? (
                <Image 
                  src={track.albumArt} 
                  alt={track.title} 
                  width={48} 
                  height={48} 
                  className="object-cover"
                />
              ) : isPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="playing-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className={`flex-1 ${fadeIn ? 'animate-fade-in' : ''}`}>
            {isPlaying ? (
              <>
                <div className="font-medium text-sm md:text-base truncate">{track.title}</div>
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">{track.artist}</div>
                {showDetails && (
                  <div className="flex flex-wrap gap-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {track.genre && <span>{track.genre}</span>}
                    {track.bpm && <span>{track.bpm} BPM</span>}
                    {track.dj && <span>DJ: {track.dj}</span>}
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">再生中の曲はありません</div>
            )}
          </div>
        </div>

        <div className="flex-1">
          {isPlaying && (
            <div className="mt-2">
              <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* 最終更新時間とオフラインステータス */}
              <div className="flex justify-between mt-1 text-xs text-gray-400">
                {lastUpdated && (
                  <span>更新: {lastUpdated.toLocaleTimeString()}</span>
                )}
                {offlineMode && (
                  <span className="text-amber-500">オフラインモード</span>
                )}
              </div>
            </div>
          )}

          {/* 次の曲情報（有効な場合のみ） */}
          {showNextTrack && nextTrack && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">次の曲:</div>
              <div className="flex items-center">
                <div className="mr-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden relative flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-xs truncate">{nextTrack.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{nextTrack.artist}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// オフライン時の曲情報を取得するカスタムフック
export function useOfflineNowPlaying(): NowPlayingType | undefined {
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
  
  return offlineData;
};

// 自動更新付きのNowPlayingコンポーネント
export const AutoUpdatingNowPlaying: React.FC<Omit<NowPlayingProps, 'nowPlaying' | 'autoUpdate'>> = (props) => {
  const [initialNowPlaying, setInitialNowPlaying] = useState<NowPlayingType | undefined>(undefined);
  const isOnline = useOnlineStatus();
  const offlineData = useOfflineNowPlaying();
  
  useEffect(() => {
    // オフライン時はキャッシュデータを使用
    if (!isOnline) {
      if (offlineData) {
        setInitialNowPlaying(offlineData);
      }
      return;
    }
    
    // オンライン時は通常のデータ取得
    async function fetchInitialData() {
      try {
        const response = await fetch('/api/now-playing');
        if (response.ok) {
          const data = await response.json();
          setInitialNowPlaying(data);
          
          // ローカルストレージに保存（オフライン時用）
          if (typeof window !== 'undefined' && data.track) {
            localStorage.setItem('lastNowPlaying', JSON.stringify(data));
            localStorage.setItem('lastUpdated', new Date().toISOString());
          }
        }
      } catch (error) {
        console.error('Failed to fetch initial now playing data:', error);
        // エラー時はキャッシュデータを使用
        if (offlineData) {
          setInitialNowPlaying(offlineData);
        }
      }
    }
    
    fetchInitialData();
  }, [isOnline, offlineData]);
  
  return <NowPlaying nowPlaying={initialNowPlaying} autoUpdate={isOnline} {...props} />;
};

export default NowPlaying;
