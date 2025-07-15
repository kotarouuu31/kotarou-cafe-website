"use client";

import React, { useState, useEffect } from 'react';
import { TrackInfo } from '@/types/recordbox';
import { AutoUpdatingNowPlaying } from '@/components/NowPlaying';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

// 日付をフォーマットする関数
function formatDate(date: Date | string): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export default function AdminMusicPage() {
  const [history, setHistory] = useState<TrackInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    totalTracks: number;
    uniqueTracks: number;
    uniqueArtists: number;
    topArtists: {artist: string, count: number}[];
  }>({
    totalTracks: 0,
    uniqueTracks: 0,
    uniqueArtists: 0,
    topArtists: []
  });
  const isOnline = useOnlineStatus();

  // 再生履歴を取得
  useEffect(() => {
    async function fetchHistory() {
      if (!isOnline) {
        setError('オフラインモード - 履歴を取得できません');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/track-history');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setHistory(data.history || []);
        
        // 統計情報を計算
        calculateStats(data.history || []);
      } catch (err) {
        console.error('Failed to fetch history:', err);
        setError('履歴の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    }
    
    fetchHistory();
  }, [isOnline]);

  // 統計情報を計算
  function calculateStats(tracks: TrackInfo[]) {
    // ユニークな曲とアーティストを計算
    const uniqueTracks = new Set(tracks.map(t => t.title));
    const artists = tracks.map(t => t.artist);
    const uniqueArtists = new Set(artists);
    
    // アーティスト別の再生回数を計算
    const artistCounts: Record<string, number> = {};
    artists.forEach(artist => {
      artistCounts[artist] = (artistCounts[artist] || 0) + 1;
    });
    
    // 再生回数順にソート
    const topArtists = Object.entries(artistCounts)
      .map(([artist, count]) => ({ artist, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // 上位5件
    
    setStats({
      totalTracks: tracks.length,
      uniqueTracks: uniqueTracks.size,
      uniqueArtists: uniqueArtists.size,
      topArtists
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">音楽管理</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">現在再生中</h2>
            <AutoUpdatingNowPlaying 
              showDetails={true} 
              showNextTrack={true} 
              updateInterval={15000} 
              className="mb-4"
            />
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">統計情報</h2>
            {loading ? (
              <p className="text-gray-500">読み込み中...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">総再生曲数</p>
                  <p className="text-2xl font-bold">{stats.totalTracks}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ユニーク曲数</p>
                  <p className="text-2xl font-bold">{stats.uniqueTracks}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">アーティスト数</p>
                  <p className="text-2xl font-bold">{stats.uniqueArtists}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">人気アーティスト</p>
                  <ul className="space-y-1">
                    {stats.topArtists.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span className="truncate">{item.artist}</span>
                        <span className="font-medium">{item.count}回</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">再生履歴</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md">
            <p>{error}</p>
          </div>
        ) : history.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 py-4 text-center">再生履歴がありません</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    再生日時
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    曲名
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    アーティスト
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    ジャンル
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    DJ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {history.map((track, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(track.playedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {track.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {track.artist}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {track.genre || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {track.dj || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
