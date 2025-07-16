'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AutoUpdatingNowPlaying } from '@/components/NowPlaying';
import TrackHistory from '@/components/TrackHistory';
import { generateMockHistoryData, getTrackHistory } from '@/lib/recordbox';
import { HistoryData } from '@/types/recordbox';

export default function MusicPage() {
  const [historyData, setHistoryData] = useState<HistoryData | null>(null);
  const [useMockData, setUseMockData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // データ読み込み関数
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 実際のデータ取得かモックデータ生成
      const data = useMockData 
        ? generateMockHistoryData(15)
        : generateMockHistoryData(15); // 将来的にはAPIエンドポイントからデータを取得
      
      setHistoryData(data);
    } catch (error) {
      console.error('Failed to load DJ data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [useMockData]);

  // 初期データ読み込み
  useEffect(() => {
    loadData();
    
    // 30秒ごとにデータを更新
    const intervalId = setInterval(() => {
      loadData();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [loadData]);

  // モックデータ/実データ切り替え
  const toggleDataSource = () => {
    setUseMockData(!useMockData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-primary">DJ Music Corner</h1>
      </div>
      
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          Kotarou Cafeでは毎週金・土曜日の夜にDJイベントを開催しています。
          現在再生中の曲と最近の再生履歴をチェックしてください。
        </p>
        
        <button 
          onClick={toggleDataSource}
          className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/80 transition-colors"
        >
          {useMockData ? 'モックデータ使用中' : '実データ使用中'}
        </button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">読み込み中...</p>
        </div>
      ) : (
        <>
          {historyData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-heading font-semibold mb-4 text-primary">Now Playing</h2>
                  <AutoUpdatingNowPlaying />
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-heading font-semibold mb-4 text-primary">最近の再生履歴</h2>
                  <TrackHistory tracks={getTrackHistory(historyData)} />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
