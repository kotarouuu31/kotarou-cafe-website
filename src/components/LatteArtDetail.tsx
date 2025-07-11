"use client";

import React, { useState } from 'react';
import { LatteArtWork, LatteArtComment } from '../types/latte-art';
import { getDifficultyText, formatTimeSpent } from '../data/latte-art';

type LatteArtDetailProps = {
  artwork: LatteArtWork;
  onClose: () => void;
};

const LatteArtDetail: React.FC<LatteArtDetailProps> = ({ artwork, onClose }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<LatteArtComment[]>(artwork.comments || []);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(artwork.likes || 0);
  
  // コメント送信処理
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    const newComment: LatteArtComment = {
      id: `c${Date.now()}`,
      author: 'ゲスト',
      content: comment,
      createdAt: new Date()
    };
    
    setComments([...comments, newComment]);
    setComment('');
  };
  
  // いいね処理
  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* 画像エリア */}
          <div className="md:w-1/2 relative h-64 md:h-auto bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center md:rounded-l-lg">
            <div className="text-white font-bold text-2xl">{artwork.title}</div>
            
            {/* Before画像があれば表示ボタン */}
            {artwork.beforeImageUrl && (
              <div className="absolute bottom-4 left-4">
                <button 
                  className="bg-white/80 hover:bg-white text-primary text-sm px-3 py-1 rounded-full shadow-md transition-colors"
                  onClick={() => alert('Before画像は現在利用できません')}
                >
                  Before画像を見る
                </button>
              </div>
            )}
          </div>
          
          {/* 詳細情報エリア */}
          <div className="md:w-1/2 p-6 overflow-y-auto max-h-[90vh] md:max-h-[80vh]">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-heading text-2xl font-bold text-foreground">{artwork.title}</h2>
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700"
                aria-label="閉じる"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700">{artwork.description}</p>
            </div>
            
            {/* 技術情報 */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-lg mb-2">技術情報</h3>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">制作日:</span>
                  <p>{artwork.createdAt.toLocaleDateString('ja-JP')}</p>
                </div>
                
                <div>
                  <span className="text-gray-500">難易度:</span>
                  <p>{getDifficultyText(artwork.difficultyLevel)}</p>
                </div>
                
                <div>
                  <span className="text-gray-500">制作時間:</span>
                  <p>{formatTimeSpent(artwork.timeSpent)}</p>
                </div>
                
                <div>
                  <span className="text-gray-500">使用技法:</span>
                  <p>{artwork.techniques.join(', ')}</p>
                </div>
              </div>
              
              {artwork.tags && artwork.tags.length > 0 && (
                <div className="mt-3">
                  <span className="text-gray-500 text-sm">タグ:</span>
                  <div className="flex flex-wrap mt-1">
                    {artwork.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-primary/5 text-primary text-xs px-2 py-1 rounded-full mr-1 mb-1"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* いいね・コメントエリア */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={handleLike} 
                  className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>{likesCount} いいね</span>
                </button>
                
                <span className="text-gray-500 text-sm">{comments.length} コメント</span>
              </div>
              
              {/* コメント一覧 */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">コメント</h3>
                
                {comments.length > 0 ? (
                  <div className="space-y-3">
                    {comments.map(comment => (
                      <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-xs text-gray-500">
                            {comment.createdAt.toLocaleString('ja-JP', { 
                              month: 'numeric', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">まだコメントはありません。</p>
                )}
              </div>
              
              {/* コメント投稿フォーム */}
              <form onSubmit={handleSubmitComment} className="mt-4">
                <div className="flex">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="コメントを入力..."
                    className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-lg transition-colors"
                    disabled={!comment.trim()}
                  >
                    送信
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatteArtDetail;
