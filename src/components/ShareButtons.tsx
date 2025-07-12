'use client';

import React from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
  hashtags?: string[];
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title,
  hashtags = ['KotarouCafe'],
  className = '',
  showLabel = true,
  size = 'md'
}) => {
  // URLとタイトルをエンコード
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedHashtags = hashtags.join(',');
  
  // サイズに応じたアイコンサイズを設定
  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }[size];
  
  // テキストサイズを設定
  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }[size];
  
  // ボタンサイズを設定
  const buttonSize = {
    sm: 'px-2 py-1',
    md: 'px-3 py-1.5',
    lg: 'px-4 py-2'
  }[size];
  
  // シェア関数
  const share = (platform: 'twitter' | 'facebook' | 'line') => {
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=${encodedHashtags}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'line':
        shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Twitter */}
      <button
        onClick={() => share('twitter')}
        className={`${buttonSize} flex items-center justify-center space-x-1 bg-[#1DA1F2] hover:bg-[#1a94df] text-white rounded-md transition-colors`}
        aria-label="Twitterでシェア"
      >
        <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
        {showLabel && <span className={textSize}>Twitter</span>}
      </button>
      
      {/* Facebook */}
      <button
        onClick={() => share('facebook')}
        className={`${buttonSize} flex items-center justify-center space-x-1 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-md transition-colors`}
        aria-label="Facebookでシェア"
      >
        <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
        {showLabel && <span className={textSize}>Facebook</span>}
      </button>
      
      {/* LINE */}
      <button
        onClick={() => share('line')}
        className={`${buttonSize} flex items-center justify-center space-x-1 bg-[#06C755] hover:bg-[#05b54c] text-white rounded-md transition-colors`}
        aria-label="LINEでシェア"
      >
        <svg className={iconSize} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
        {showLabel && <span className={textSize}>LINE</span>}
      </button>
    </div>
  );
};

export default ShareButtons;
