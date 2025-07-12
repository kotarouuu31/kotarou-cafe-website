import { InstagramPost } from '@/components/SocialFeed';
import { LivePostData } from '@/components/LivePost';

/**
 * Instagram投稿を取得するための関数
 * 実際の実装ではInstagram Graph APIを使用する
 */
export const fetchInstagramPosts = async (): Promise<InstagramPost[]> => {
  // 実際の実装ではInstagram Graph APIを呼び出す
  // 現在はモックデータを返す
  return generateMockInstagramPosts(9);
};

/**
 * モックInstagram投稿データを生成する
 */
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

/**
 * 投稿からハッシュタグを抽出する
 */
export const extractHashtags = (text: string): string[] => {
  const matches = text.match(/#[a-zA-Z0-9_]+/g);
  if (!matches) return [];
  
  return matches.map(tag => tag.substring(1)); // #を除去
};

/**
 * 投稿タイプに基づいて自動的にハッシュタグを生成する
 */
export const generateHashtags = (
  postType: 'cafe' | 'dj' | 'latteart' | 'general',
  includeBase: boolean = true
): string[] => {
  const hashtags: string[] = [];
  
  if (includeBase) {
    hashtags.push('KotarouCafe');
  }
  
  switch (postType) {
    case 'cafe':
      hashtags.push('CafeVibes', 'CoffeeTime');
      break;
    case 'dj':
      hashtags.push('DJMix', 'CafeMusic');
      break;
    case 'latteart':
      hashtags.push('LatteArt', 'CoffeeArt');
      break;
    case 'general':
      hashtags.push('CafeLife');
      break;
  }
  
  return hashtags;
};

/**
 * 投稿をSNSでシェアするためのURLを生成する
 */
export const generateShareUrl = (
  platform: 'twitter' | 'facebook' | 'line',
  url: string,
  text: string,
  hashtags: string[] = []
): string => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const encodedHashtags = hashtags.join(',');
  
  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${encodedHashtags}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'line':
      return `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;
    default:
      return '';
  }
};

/**
 * 日付をフォーマットする
 */
export const formatSocialDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

/**
 * リアルタイム投稿を保存する（モック実装）
 */
export const saveLivePost = async (post: LivePostData): Promise<boolean> => {
  // 実際の実装ではデータベースに保存する
  console.log('投稿を保存:', post);
  return true;
};

/**
 * リアルタイム投稿を取得する（モック実装）
 */
export const fetchLivePosts = async (): Promise<LivePostData[]> => {
  // 実際の実装ではデータベースから取得する
  // 現在はモックデータを返す
  return [];
};
