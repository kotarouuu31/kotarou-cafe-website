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
      {/* ヘッダー */}
      <header className="bg-background/90 backdrop-blur-sm border-b border-secondary/20">
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
      </header>
      
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
      
      {/* フッター */}
      <footer className="bg-primary text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">Kotarou Cafe</h3>
              <p className="mb-4">美味しいコーヒーとくつろぎの空間をお楽しみください。</p>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-accent transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-accent transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">リンク</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-accent transition-colors">ホーム</Link></li>
                <li><Link href="/menu" className="hover:text-accent transition-colors">メニュー</Link></li>
                <li><Link href="/events" className="hover:text-accent transition-colors">イベント</Link></li>
                <li><Link href="/latte-art" className="hover:text-accent transition-colors">ラテアート</Link></li>
                <li><Link href="/music" className="hover:text-accent transition-colors">ミュージック</Link></li>

              </ul>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">お問い合わせ</h3>
              <p className="mb-2">電話: 03-1234-5678</p>
              <p className="mb-2">メール: info@kotarou-cafe.com</p>
              <p>お気軽にお問い合わせください。</p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Kotarou Cafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
