"use client";

import { useState, useEffect } from 'react';
import { NowPlaying } from '@/types/dj';

interface SimpleDJDisplayProps {
  className?: string;
}

export const SimpleDJDisplay = ({ className = "" }: SimpleDJDisplayProps) => {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>({ track: null, startedAt: null });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // モックデータを設定
    const mockTrack = {
      id: '1',
      title: 'Smooth Jazz Vibes',
      artist: 'DJ Kotarou',
      album: 'Cafe Sessions',
      duration: 240,
      bpm: 120,
      key: 'Am',
      genre: 'Jazz',
      rating: 5,
      playedAt: new Date(),
      artworkUrl: '/images/default-album.jpg'
    };

    setNowPlaying({ 
      track: mockTrack, 
      startedAt: new Date() 
    });
    setIsConnected(true);
  }, []);

  if (!nowPlaying.track) {
    return (
      <div className={`relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 ${className}`}>
        {/* DJ機器風フレーム */}
        <div className="bg-black rounded-lg p-4 border-2 border-gray-600">
          {/* LCD画面風表示エリア */}
          <div className="bg-gray-900 rounded p-3 mb-4 border border-green-400/30">
            <div className="text-green-400 font-mono text-center">
              <div className="text-xs mb-1">● DDJ-FLX4 ●</div>
              <div className="text-sm">NO SIGNAL</div>
            </div>
          </div>
          
          {/* 装飾的なノブとボタン */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-500"></div>
              <div className="w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-500"></div>
            </div>
            <div className="text-xs text-gray-500 font-mono">STANDBY</div>
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-500"></div>
              <div className="w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-500"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { track } = nowPlaying;

  return (
    <div className={`relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 ${className}`}>
      {/* DJ機器風フレーム */}
      <div className="bg-black rounded-lg p-4 border-2 border-gray-600">
        {/* LCD画面風表示エリア */}
        <div className="bg-gray-900 rounded p-3 mb-4 border border-green-400/50">
          <div className="text-green-400 font-mono">
            {/* 接続状態 */}
            <div className="flex items-center justify-between text-xs mb-2">
              <span>● DDJ-FLX4</span>
              <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
                {isConnected ? 'CONNECTED' : 'OFFLINE'}
              </span>
            </div>
            
            {/* 楽曲情報 */}
            <div className="text-center">
              <div className="text-sm font-bold truncate mb-1">{track.title}</div>
              <div className="text-xs text-green-300 truncate">{track.artist}</div>
            </div>
          </div>
        </div>
        
        {/* DJ機器風コントロール要素 */}
        <div className="flex justify-between items-center">
          {/* 左側ノブ */}
          <div className="flex space-x-2">
            <div className="relative">
              <div className="w-8 h-8 bg-gray-700 rounded-full border-2 border-gray-500 flex items-center justify-center">
                <div className="w-1 h-3 bg-white rounded"></div>
              </div>
              <div className="text-xs text-gray-400 text-center mt-1">GAIN</div>
            </div>
            <div className="relative">
              <div className="w-8 h-8 bg-gray-700 rounded-full border-2 border-gray-500 flex items-center justify-center">
                <div className="w-1 h-3 bg-white rounded transform rotate-45"></div>
              </div>
              <div className="text-xs text-gray-400 text-center mt-1">EQ</div>
            </div>
          </div>

          {/* 中央のレベルメーター風 */}
          <div className="flex flex-col items-center">
            <div className="flex space-x-1 mb-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-4 rounded-sm ${
                    i < 5 ? 'bg-green-500' : i < 7 ? 'bg-yellow-500' : 'bg-red-500'
                  } ${i < 6 ? 'opacity-100' : 'opacity-30'}`}
                ></div>
              ))}
            </div>
            <div className="text-xs text-gray-400 font-mono">LEVEL</div>
          </div>

          {/* 右側ノブ */}
          <div className="flex space-x-2">
            <div className="relative">
              <div className="w-8 h-8 bg-gray-700 rounded-full border-2 border-gray-500 flex items-center justify-center">
                <div className="w-1 h-3 bg-white rounded transform -rotate-45"></div>
              </div>
              <div className="text-xs text-gray-400 text-center mt-1">TRIM</div>
            </div>
            <div className="relative">
              <div className="w-8 h-8 bg-gray-700 rounded-full border-2 border-gray-500 flex items-center justify-center">
                <div className="w-1 h-3 bg-white rounded"></div>
              </div>
              <div className="text-xs text-gray-400 text-center mt-1">FILTER</div>
            </div>
          </div>
        </div>

        {/* 下部のフェーダー風要素 */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-400">A</span>
            <div className="w-16 h-3 bg-gray-700 rounded-full relative">
              <div className="w-3 h-5 bg-white rounded absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 shadow-sm"></div>
            </div>
            <span className="text-xs text-gray-400">B</span>
          </div>
        </div>
      </div>

      {/* RecordBox ロゴ風 */}
      <div className="absolute top-2 right-2">
        <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
          rekordbox
        </div>
      </div>
    </div>
  );
};
