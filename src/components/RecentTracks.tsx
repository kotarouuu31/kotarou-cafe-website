"use client";

import React from 'react';
import Image from 'next/image';
import { Track } from '../types/music';
import { formatPlayedAt } from '../data/music';

type RecentTracksProps = {
  tracks: Track[];
};

const RecentTracks: React.FC<RecentTracksProps> = ({ tracks }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-4">
      <h3 className="font-heading text-xl font-bold mb-4 text-white flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        最近再生した楽曲
      </h3>
      
      <div className="space-y-3">
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <div 
              key={`${track.id}-${track.playedAt?.getTime()}`} 
              className="flex items-center p-2 rounded-md hover:bg-white/10 transition-colors group"
            >
              {/* ジャケット画像 */}
              <div className="w-10 h-10 relative overflow-hidden rounded-md mr-3 flex-shrink-0">
                {track.coverImage ? (
                  <Image
                    src={track.coverImage}
                    alt={`${track.title} by ${track.artist}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* 曲情報 */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white line-clamp-1">{track.title}</p>
                    <p className="text-xs text-white/70 line-clamp-1">{track.artist}</p>
                  </div>
                  {track.playedAt && (
                    <span className="text-xs text-white/50 ml-2 flex-shrink-0">
                      {formatPlayedAt(track.playedAt)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white/70 py-4">再生履歴がありません</p>
        )}
      </div>
    </div>
  );
};

export default RecentTracks;
