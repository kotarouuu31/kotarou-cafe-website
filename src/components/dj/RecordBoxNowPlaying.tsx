"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { NowPlaying } from '@/types/dj';
import { getRecordBoxData, getDJStats } from '@/lib/recordboxReader';

interface RecordBoxNowPlayingProps {
  className?: string;
}

export const RecordBoxNowPlaying = ({ className = "" }: RecordBoxNowPlayingProps) => {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>({ track: null, startedAt: null });
  const [isLive, setIsLive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [djStats] = useState(getDJStats());
  const [waveform, setWaveform] = useState<number[]>([]);

  useEffect(() => {
    // RecordBoxデータ取得
    const fetchRecordBoxData = async () => {
      try {
        const data = await getRecordBoxData();
        setNowPlaying(data.nowPlaying);
        setIsLive(true);
      } catch (error) {
        console.error('RecordBox data fetch error:', error);
      }
    };

    fetchRecordBoxData();

    // 波形データ生成（視覚効果用）
    const generateWaveform = () => {
      const newWaveform = Array.from({ length: 50 }, () => Math.random() * 100);
      setWaveform(newWaveform);
    };

    // プログレス更新
    const progressInterval = setInterval(() => {
      setProgress(prev => (prev + 0.5) % 100);
      if (Math.random() > 0.7) generateWaveform(); // 30%の確率で波形更新
    }, 500);

    generateWaveform();

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  if (!nowPlaying.track) {
    return (
      <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-center ${className}`}>
        <div className="text-gray-400">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-3xl">🎧</span>
          </div>
          <p className="text-sm">RecordBox Disconnected</p>
        </div>
      </div>
    );
  }

  const { track } = nowPlaying;
  const progressPercent = Math.round((djStats.hoursCompleted / djStats.targetHours) * 100);

  return (
    <div className={`bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-800 rounded-xl p-6 text-white border border-blue-500/20 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-sm font-medium text-green-400">RecordBox LIVE</span>
          </div>
          <div className="text-xs text-blue-400 font-mono">
            DDJ-FLX4 Connected
          </div>
        </div>
        <div className="text-xs text-gray-400">
          Deck {nowPlaying.deck || 'A'}
        </div>
      </div>

      {/* Track Info with Artwork */}
      <div className="flex space-x-4 mb-6">
        {track.artwork && (
          <div className="flex-shrink-0">
            <Image
              src={track.artwork}
              alt={`${track.title} artwork`}
              width={80}
              height={80}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white leading-tight mb-1 truncate">
            {track.title}
          </h3>
          <p className="text-lg text-blue-300 mb-1 truncate">
            {track.artist}
          </p>
          {track.album && (
            <p className="text-sm text-gray-400 truncate">
              {track.album}
            </p>
          )}
          {track.genre && (
            <span className="inline-block mt-2 px-2 py-1 bg-blue-600/30 text-blue-300 text-xs rounded-full">
              {track.genre}
            </span>
          )}
        </div>
      </div>

      {/* Waveform Visualization */}
      <div className="mb-4">
        <div className="flex items-end justify-center space-x-1 h-16 bg-black/30 rounded-lg p-2">
          {waveform.map((height, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-sm transition-all duration-300"
              style={{
                height: `${Math.max(height * 0.6, 5)}%`,
                width: '2px',
                opacity: Math.abs(index - 25) < 5 ? 1 : 0.6
              }}
            />
          ))}
        </div>
      </div>

      {/* Track Details */}
      <div className="grid grid-cols-4 gap-3 text-sm mb-4">
        {track.bpm && (
          <div className="text-center">
            <div className="text-orange-400 font-mono text-lg">{track.bpm}</div>
            <div className="text-gray-400 text-xs">BPM</div>
          </div>
        )}
        {track.key && (
          <div className="text-center">
            <div className="text-purple-400 font-mono text-lg">{track.key}</div>
            <div className="text-gray-400 text-xs">Key</div>
          </div>
        )}
        {track.length && (
          <div className="text-center">
            <div className="text-green-400 font-mono text-lg">{track.length}</div>
            <div className="text-gray-400 text-xs">Length</div>
          </div>
        )}
        {track.rating && (
          <div className="text-center">
            <div className="text-yellow-400 text-lg">
              {'★'.repeat(track.rating)}
            </div>
            <div className="text-gray-400 text-xs">Rating</div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>0:00</span>
          <span>{track.length || '--:--'}</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* DJ Stats */}
      <div className="pt-4 border-t border-gray-700/50">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-400 text-xs mb-1">10,000 Hour Challenge</div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <span className="text-orange-400 font-mono text-xs">{progressPercent}%</span>
            </div>
            <div className="text-yellow-400 font-mono text-lg">
              {djStats.hoursCompleted.toLocaleString()}h
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-400 text-xs mb-1">Today&apos;s Session</div>
            <div className="text-blue-400 font-mono text-lg">
              {djStats.todayHours}h
            </div>
            <div className="text-gray-400 text-xs">
              {djStats.currentStreak} day streak
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
