'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Instagram投稿の型定義
export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  timestamp: string;
  permalink: string;
}

interface SocialFeedProps {
  posts?: InstagramPost[];
  loading?: boolean;
  error?: string;
  hashtagFilter?: string;
}

// モック投稿データを生成する関数
export const generateMockInstagramPosts = (count: number = 6): InstagramPost[] => {
  const posts: InstagramPost[] = [];
  const captions = [
    '本日のラテアート🎨 #KotarouCafe #LatteArt',
    '週末のDJイベント準備中🎧 #KotarouCafe #DJMix',
    '新メニューのご紹介☕️ #KotarouCafe #NewMenu',
    '店内の様子をお届け✨ #KotarouCafe #CafeVibes',
    'お客様とのひととき📸 #KotarouCafe #CafeLife',
    '今日のスペシャルケーキ🍰 #KotarouCafe #CakeTime'
  ];
  
  const imageIds = [
    'MqT0asuoIcU', 'vdXMSiX-n6M', 'Lz1J_sLqf50', 
    'XtUd5SiX464', 'tA90pRfL2gM', 'Ven2CV8IJ5A',
    'tNALoIZhqVM', 'sBQTVxr9eFM', 'YzSZN3qvHeo'
  ];
  
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 7)); // 過去7日以内
    
    posts.push({
      id: `mock-${i}`,
      imageUrl: `https://source.unsplash.com/${imageIds[i % imageIds.length]}`,
      caption: captions[i % captions.length],
      likes: Math.floor(Math.random() * 100) + 10,
      timestamp: date.toISOString(),
      permalink: '#'
    });
  }
  
  return posts;
};

// 日付フォーマット関数
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const SocialFeed: React.FC<SocialFeedProps> = ({ 
  posts: propPosts, 
  loading = false,
  error = '',
  hashtagFilter = ''
}) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  
  useEffect(() => {
    // propsから投稿が提供されていればそれを使用、なければモックデータを生成
    if (propPosts && propPosts.length > 0) {
      setPosts(propPosts);
    } else {
      // モックデータを生成
      const mockPosts = generateMockInstagramPosts(9);
      setPosts(mockPosts);
    }
  }, [propPosts]);
  
  // ハッシュタグでフィルタリング（指定があれば）
  const filteredPosts = hashtagFilter 
    ? posts.filter(post => post.caption.includes(hashtagFilter))
    : posts;
  
  // 投稿をシェアする関数
  const sharePost = (post: InstagramPost, platform: 'twitter' | 'facebook' | 'line') => {
    const text = encodeURIComponent(`${post.caption} | Kotarou Cafe`);
    const url = encodeURIComponent(post.permalink);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'line':
        shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-lg">
        <p>エラーが発生しました: {error}</p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-primary flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          Instagram Feed
        </h2>
        <Link 
          href="https://www.instagram.com/kotarou_cafe" 
          target="_blank" 
          className="text-sm text-primary hover:text-accent transition-colors flex items-center"
        >
          すべて見る
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      {/* Instagram投稿グリッド */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {filteredPosts.map(post => (
          <div key={post.id} className="relative group overflow-hidden rounded-lg aspect-square">
            {/* 投稿画像 */}
            <div className="w-full h-full">
              <Image
                src={post.imageUrl}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
            </div>
            
            {/* オーバーレイ（ホバー時に表示） */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
              <p className="text-white text-xs sm:text-sm px-3 line-clamp-2 mb-2 text-center">
                {post.caption}
              </p>
              <p className="text-white text-xs">
                {formatDate(post.timestamp)}
              </p>
              
              {/* シェアボタン */}
              <div className="flex space-x-2 mt-2">
                <button 
                  onClick={() => sharePost(post, 'twitter')}
                  className="text-white hover:text-blue-400 transition-colors"
                  aria-label="Twitterでシェア"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button 
                  onClick={() => sharePost(post, 'facebook')}
                  className="text-white hover:text-blue-600 transition-colors"
                  aria-label="Facebookでシェア"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={() => sharePost(post, 'line')}
                  className="text-white hover:text-green-500 transition-colors"
                  aria-label="LINEでシェア"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* ハッシュタグ表示 */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link 
          href="/tag/kotaroucafe" 
          className="text-sm bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-full transition-colors"
        >
          #KotarouCafe
        </Link>
        <Link 
          href="/tag/latteart" 
          className="text-sm bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-full transition-colors"
        >
          #LatteArt
        </Link>
        <Link 
          href="/tag/djmix" 
          className="text-sm bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-full transition-colors"
        >
          #DJMix
        </Link>
        <Link 
          href="/tag/kotarouchallenge" 
          className="text-sm bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-full transition-colors"
        >
          #KotarouChallenge
        </Link>
      </div>
    </div>
  );
};

export default SocialFeed;
