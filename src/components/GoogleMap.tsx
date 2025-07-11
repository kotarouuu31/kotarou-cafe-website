"use client";

import React from 'react';

type GoogleMapProps = {
  apiKey?: string;
  address?: string;
  mapHeight?: string;
};

const GoogleMap: React.FC<GoogleMapProps> = ({ 
  apiKey, 
  address = "東京都渋谷区カフェ通り1-2-3", 
  mapHeight = "400px" 
}) => {
  // APIキーがある場合は動的マップを表示
  // ない場合は静的マップを表示（実際のAPIキーを使用する場合に備えて）
  const encodedAddress = encodeURIComponent(address);
  
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      {apiKey ? (
        <iframe
          title="Google Maps"
          width="100%"
          height={mapHeight}
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}&zoom=15`}
        ></iframe>
      ) : (
        // APIキーがない場合はスタイル付きのプレースホルダー
        <div 
          className="bg-gray-100 w-full flex items-center justify-center text-center p-4"
          style={{ height: mapHeight }}
        >
          <div>
            <div className="mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">
              {address}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              (Google Maps APIキーが設定されていません)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
