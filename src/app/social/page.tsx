'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SocialFeed, { InstagramPost } from '@/components/SocialFeed';
import LivePost, { LivePostData } from '@/components/LivePost';
import ShareButtons from '@/components/ShareButtons';
import { fetchInstagramPosts, saveLivePost } from '@/lib/social';

export default function SocialPage() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'cafe' | 'dj' | 'latteart'>('all');
  const [livePosts, setLivePosts] = useState<LivePostData[]>([]);
  
  // 管理者モードの状態（実際の実装ではユーザー認証に基づいて設定）
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await fetchInstagramPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('投稿の読み込みエラー:', err);
        setError('投稿の読み込み中にエラーが発生しました。');
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);
  
  // ハッシュタグフィルター
  const getHashtagFilter = (): string => {
    switch (activeTab) {
      case 'cafe':
        return '#CafeVibes';
      case 'dj':
        return '#DJMix';
      case 'latteart':
        return '#LatteArt';
      default:
        return '';
    }
  };
  
  // 新しい投稿を処理
  const handleNewPost = async (post: LivePostData) => {
    try {
      // 実際の実装ではデータベースに保存
      await saveLivePost(post);
      
      // 投稿リストに追加
      setLivePosts(prev => [post, ...prev]);
      
      // 成功メッセージなど
    } catch (err) {
      console.error('投稿保存エラー:', err);
      // エラーメッセージ表示など
    }
  };
  
  // 管理者モード切り替え（デモ用）
  const toggleAdminMode = () => {
    setIsAdmin(prev => !prev);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="font-heading text-3xl font-bold text-primary mb-2">SNS</h1>
            <p className="text-foreground/80 max-w-2xl">
              Kotarou Cafeの最新情報をSNSでチェック。店内の様子、DJイベント、ラテアートなど、リアルタイムで更新中。
            </p>
          </div>
          
          {/* シェアボタン */}
          <div className="mt-4 md:mt-0">
            <ShareButtons 
              url={typeof window !== 'undefined' ? window.location.href : 'https://kotarou-cafe.com/social'}
              title="Kotarou Cafe | SNS"
              hashtags={['KotarouCafe', 'CafeVibes']}
            />
          </div>
        </div>
        
        {/* タブナビゲーション */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-secondary/10 hover:bg-secondary/20 text-foreground'
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setActiveTab('cafe')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'cafe' 
                ? 'bg-primary text-white' 
                : 'bg-secondary/10 hover:bg-secondary/20 text-foreground'
            }`}
          >
            店内の様子
          </button>
          <button
            onClick={() => setActiveTab('dj')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'dj' 
                ? 'bg-primary text-white' 
                : 'bg-secondary/10 hover:bg-secondary/20 text-foreground'
            }`}
          >
            DJ活動
          </button>
          <button
            onClick={() => setActiveTab('latteart')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'latteart' 
                ? 'bg-primary text-white' 
                : 'bg-secondary/10 hover:bg-secondary/20 text-foreground'
            }`}
          >
            ラテアート
          </button>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        {/* 管理者モード切り替えボタン（デモ用） */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={toggleAdminMode}
            className="text-sm px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            {isAdmin ? '管理者モードをオフ' : '管理者モードをオン'}
          </button>
        </div>
        
        {/* リアルタイム投稿フォーム（管理者のみ） */}
        <LivePost isAdmin={isAdmin} onPost={handleNewPost} />
        
        {/* Instagram Feed */}
        <div className="mb-12">
          <SocialFeed 
            posts={posts} 
            loading={loading} 
            error={error || undefined}
            hashtagFilter={getHashtagFilter()}
          />
        </div>
        
        {/* リアルタイム投稿表示（未実装） */}
        {livePosts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">最新の投稿</h2>
            <div className="space-y-4">
              {livePosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                  <p className="mb-2">{post.content}</p>
                  {post.imageUrl && (
                    <div className="relative w-full h-64 mb-3">
                      <Image
                        src={post.imageUrl}
                        alt="投稿画像"
                        width={800}
                        height={600}
                        className="object-contain rounded-lg"
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{post.createdAt.toLocaleString()}</span>
                    <div className="flex space-x-1">
                      {post.hashtags.map((tag, i) => (
                        <span key={i} className="text-primary">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
