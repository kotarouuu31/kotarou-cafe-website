"use client";

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LatteArtWork } from '@/types/latte-art';
import { LatteArtCard } from './latte-art/LatteArtCard';

const LatteArtGallery = () => {
  const [latteArtWorks, setLatteArtWorks] = useState<LatteArtWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 日付フォーマット関数（"2025/07/10"形式に統一）
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`;
    } catch {
      return dateString; // フォーマットに失敗した場合は元の文字列を返す
    }
  };

  useEffect(() => {
    const loadLatteArtWorks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // サーバーサイドAPIからデータを取得
        const response = await fetch('/api/latte-art', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success && result.data && result.data.length > 0) {
          // Notion APIからデータが取得できた場合
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedWorks = result.data.map((work: any) => ({
            ...work,
            comment: work.description || work.comment || '',
            createdAt: formatDate(work.createdAt)
          }));
          setLatteArtWorks(mappedWorks);
        } else {
          // データが取得できない場合はフォールバックデータを使用
          const fallbackData = [
            {
              id: 'fallback-1',
              title: 'Classic Rosetta',
              description: 'シンプルで美しいロゼッタパターン',
              comment: 'シンプルで美しいロゼッタパターン',
              imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=533&fit=crop',
              createdAt: '2024/01/01',
              isPublic: true,
              artist: 'Kotarou',
              difficulty: '中級',
              tags: []
            },
            {
              id: 'fallback-2',
              title: 'Heart Latte',
              description: '愛を込めたハートのラテアート',
              comment: '愛を込めたハートのラテアート',
              imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=533&fit=crop',
              createdAt: '2024/01/02',
              isPublic: true,
              artist: 'Kotarou',
              difficulty: '初級',
              tags: []
            }
          ];
          setLatteArtWorks(fallbackData);
          setError('Notionからデータを取得できませんでした。フォールバックデータを表示しています。');
        }
      } catch (err) {
        console.error('Failed to load latte art works from API:', err);
        
        // エラー時はフォールバックデータを使用
        const fallbackData = [
          {
            id: 'fallback-1',
            title: 'Classic Rosetta',
            description: 'シンプルで美しいロゼッタパターン',
            comment: 'シンプルで美しいロゼッタパターン',
            imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=533&fit=crop',
            createdAt: '2024/01/01',
            isPublic: true,
            artist: 'Kotarou',
            difficulty: '中級',
            tags: []
          },
          {
            id: 'fallback-2',
            title: 'Heart Latte',
            description: '愛を込めたハートのラテアート',
            comment: '愛を込めたハートのラテアート',
            imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=533&fit=crop',
            createdAt: '2024/01/02',
            isPublic: true,
            artist: 'Kotarou',
            difficulty: '初級',
            tags: []
          }
        ];
        setLatteArtWorks(fallbackData);
        
        // エラーメッセージを詳細化
        if (err instanceof Error) {
          setError(`API接続エラー: ${err.message}`);
        } else {
          setError('作品の読み込みに失敗しました。フォールバックデータを表示しています。');
        }
      } finally {
        setLoading(false);
      }
    };

    loadLatteArtWorks();
  }, []);
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-[400px] mx-auto bg-white relative">
        {/* ヘッダー */}
        <div className="bg-white shadow-sm">
          <div className="px-4 py-6">
            <div className="flex items-center mb-4">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  <span className="text-sm font-medium">ホームに戻る</span>
                </motion.button>
              </Link>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">
              Latte Art Gallery
            </h1>
            <p className="text-sm text-center text-gray-600">
              日々進化するラテアート作品
            </p>
          </div>
        </div>

        {/* メインコンテンツ */}
        <main className="px-4 py-6 pb-24">
          {/* ローディング状態 */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-sm text-gray-600">作品を読み込み中...</p>
            </motion.div>
          )}

          {/* エラー状態 */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-600 text-sm">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
                >
                  再読み込み
                </button>
              </div>
            </motion.div>
          )}

          {/* 作品表示 */}
          {!loading && !error && (
            <>
              {/* 作品統計 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 text-center"
              >
                <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full">
                  <span className="text-sm font-medium">
                    {latteArtWorks.length}作品を展示中
                  </span>
                </div>
              </motion.div>

              {/* 作品ギャラリー（2列グリッド） */}
              <div className="grid grid-cols-2 gap-3">
                {latteArtWorks
                  .sort((a, b) => new Date(b.createdAt.replace(/\//g, '-')).getTime() - new Date(a.createdAt.replace(/\//g, '-')).getTime())
                  .map((work, index) => (
                    <LatteArtCard
                      key={work.id}
                      work={work}
                      index={index}
                      priority={index < 4} // 最初の4枚を優先読み込み
                    />
                  ))}
              </div>
            </>
          )}

          {/* フッターメッセージ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500">
              一杯一杯、心を込めて作ったラテアートをお楽しみください
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default LatteArtGallery;
