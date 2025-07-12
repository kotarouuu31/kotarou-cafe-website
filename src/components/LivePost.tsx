'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

// 投稿の型定義
export interface LivePostData {
  id: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  type: 'cafe' | 'dj' | 'latteart';
  hashtags: string[];
}

interface LivePostProps {
  onPost?: (post: LivePostData) => void;
  isAdmin?: boolean;
}

const LivePost: React.FC<LivePostProps> = ({ onPost, isAdmin = false }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [postType, setPostType] = useState<'cafe' | 'dj' | 'latteart'>('cafe');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 画像選択ハンドラ
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // 画像サイズチェック (5MB以下)
    if (file.size > 5 * 1024 * 1024) {
      setError('画像サイズは5MB以下にしてください');
      return;
    }
    
    // 画像タイプチェック
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      setError('JPG、PNG、GIF形式の画像のみアップロード可能です');
      return;
    }
    
    setSelectedImage(file);
    setError(null);
    
    // プレビュー表示
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // 投稿タイプ変更ハンドラ
  const handleTypeChange = (type: 'cafe' | 'dj' | 'latteart') => {
    setPostType(type);
  };
  
  // 投稿送信ハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('投稿内容を入力してください');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // 実際の実装では、ここでAPIを呼び出して画像アップロードと投稿処理を行う
      // 今回はモックデータを生成
      
      // ハッシュタグを自動生成
      const hashtags = ['KotarouCafe'];
      
      // 投稿タイプに応じたハッシュタグを追加
      switch (postType) {
        case 'cafe':
          hashtags.push('CafeVibes');
          break;
        case 'dj':
          hashtags.push('DJMix');
          break;
        case 'latteart':
          hashtags.push('LatteArt');
          break;
      }
      
      // 投稿内容からハッシュタグを抽出して追加
      const contentHashtags = content.match(/#[a-zA-Z0-9_]+/g);
      if (contentHashtags) {
        contentHashtags.forEach(tag => {
          const cleanTag = tag.substring(1); // #を除去
          if (!hashtags.includes(cleanTag)) {
            hashtags.push(cleanTag);
          }
        });
      }
      
      // モック投稿データを作成
      const newPost: LivePostData = {
        id: `post-${Date.now()}`,
        content,
        imageUrl: imagePreview || undefined,
        createdAt: new Date(),
        type: postType,
        hashtags
      };
      
      // 実際の実装では、selectedImageを使用して画像をアップロードする
      // 例: if (selectedImage) { await uploadImage(selectedImage); }
      
      // 親コンポーネントに投稿データを渡す
      if (onPost) {
        onPost(newPost);
      }
      
      // フォームをリセット
      setContent('');
      setSelectedImage(null);
      setImagePreview(null);
      setPostType('cafe');
      
      // 成功メッセージ（実際の実装では必要に応じて）
      console.log('投稿が成功しました！');
      
    } catch (err) {
      setError('投稿に失敗しました。後でもう一度お試しください。');
      console.error('投稿エラー:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 管理者でない場合は表示しない
  if (!isAdmin) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="font-heading text-lg font-bold mb-4 text-primary">店内リアルタイム投稿</h3>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* 投稿タイプ選択 */}
        <div className="flex space-x-2 mb-4">
          <button
            type="button"
            onClick={() => handleTypeChange('cafe')}
            className={`px-3 py-1 rounded-full text-sm ${
              postType === 'cafe' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            店内の様子
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('dj')}
            className={`px-3 py-1 rounded-full text-sm ${
              postType === 'dj' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            DJ活動
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('latteart')}
            className={`px-3 py-1 rounded-full text-sm ${
              postType === 'latteart' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ラテアート
          </button>
        </div>
        
        {/* テキスト入力 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`${postType === 'cafe' ? '店内' : postType === 'dj' ? 'DJ' : 'ラテアート'}の様子を投稿しましょう... #KotarouCafe`}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary mb-3"
          rows={3}
          disabled={isSubmitting}
        />
        
        {/* 画像プレビュー */}
        {imagePreview && (
          <div className="relative w-full h-48 mb-3">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                setSelectedImage(null);
                setImagePreview(null);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              aria-label="画像を削除"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        
        {/* アクションボタン */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
            disabled={isSubmitting}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            画像を追加
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
            disabled={isSubmitting}
          />
          
          <div className="flex items-center space-x-2">
            {/* ハッシュタグ自動生成ヒント */}
            <div className="text-xs text-gray-500">
              自動ハッシュタグ: #KotarouCafe #{postType === 'cafe' ? 'CafeVibes' : postType === 'dj' ? 'DJMix' : 'LatteArt'}
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? '投稿中...' : '投稿する'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LivePost;
