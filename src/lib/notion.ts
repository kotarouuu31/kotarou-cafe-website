import { Client } from '@notionhq/client';

// Notion APIクライアントの初期化
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// ラテアート作品の型定義
export interface LatteArtWork {
  id: string;
  title: string;
  description: string;
  comment?: string; // 既存の互換性のため
  imageUrl: string;
  createdAt: string;
  isPublic: boolean;
  artist?: string;
  difficulty?: string;
  tags?: string[];
}

// Notionデータベースからラテアート作品を取得
export async function getLatteArtWorks(): Promise<LatteArtWork[]> {
  try {
    const databaseId = process.env.NOTION_LATTE_ART_DATABASE_ID;
    
    if (!databaseId) {
      throw new Error('NOTION_LATTE_ART_DATABASE_ID is not defined');
    }

    console.log('🔍 Database ID:', databaseId);

    const response = await notion.databases.query({
      database_id: databaseId,
      // フィルターを一時的に無効化してテスト
      sorts: [
        {
          property: '作成日',
          direction: 'descending'
        }
      ]
    });

    console.log('📊 Raw Response Results Count:', response.results.length);
    
    if (response.results.length > 0) {
      const firstResult = response.results[0] as any;
      console.log('📊 First result properties keys:', Object.keys(firstResult.properties));
      console.log('📊 First result full properties:', JSON.stringify(firstResult.properties, null, 2));
    }

    const latteArtWorks: LatteArtWork[] = response.results.map((page: Record<string, unknown>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const properties = page.properties as Record<string, any>;
      
      console.log('🎨 Processing page ID:', page.id);
      console.log('🎨 Available properties:', Object.keys(properties));
      
      // 画像URLの取得
      let imageUrl = '/images/latte-art/default.jpg'; // デフォルト画像
      if (properties.画像?.files && properties.画像.files.length > 0) {
        const file = properties.画像.files[0];
        imageUrl = file.type === 'external' ? file.external.url : file.file.url;
      }

      const result = {
        id: page.id as string,
        title: properties.作品名?.title?.[0]?.plain_text || 'Untitled',
        description: properties.説明?.rich_text?.[0]?.plain_text || '',
        imageUrl,
        createdAt: properties.作成日?.date?.start || (page.created_time as string),
        isPublic: properties.公開状態?.select?.name === '公開',
        artist: 'Kotarou', // 固定値
        difficulty: properties.技法?.select?.name || '',
        tags: [] // 空配列
      };
      
      console.log('🎨 Mapped result:', result);
      return result;
    });

    console.log('✅ Final mapped works count:', latteArtWorks.length);
    return latteArtWorks;
  } catch (error) {
    console.error('❌ Error fetching latte art works from Notion:', error);
    // エラー時はフォールバック用の空配列を返す
    return [];
  }
}

// 画像URL処理とキャッシュ機能
export function processImageUrl(url: string): string {
  // Notion画像URLの場合は、Next.jsのImage Optimizationを活用
  if (url.includes('notion.so') || url.includes('amazonaws.com')) {
    // Notion画像URLをNext.js Image APIでプロキシ処理
    const encodedUrl = encodeURIComponent(url);
    return `/api/image-proxy?url=${encodedUrl}`;
  }
  return url;
}

// 画像キャッシュ用のヘルパー関数
export function getOptimizedImageUrl(url: string, width?: number, height?: number): string {
  const processedUrl = processImageUrl(url);
  
  // 外部画像の場合はNext.js Image Optimizationを使用
  if (processedUrl.startsWith('/api/image-proxy')) {
    const params = new URLSearchParams();
    params.set('url', url);
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    return `/api/image-proxy?${params.toString()}`;
  }
  
  return processedUrl;
}

// エラーハンドリング用のフォールバックデータ
export const fallbackLatteArtWorks: LatteArtWork[] = [
  {
    id: 'fallback-1',
    title: 'Classic Rosetta',
    description: 'シンプルで美しいロゼッタパターン',
    imageUrl: '/images/latte-art/rosetta.jpg',
    createdAt: '2024-01-01',
    isPublic: true,
    artist: 'Kotarou',
    difficulty: '中級',
    tags: ['ロゼッタ', 'クラシック']
  },
  {
    id: 'fallback-2',
    title: 'Heart Latte',
    description: '愛を込めたハートのラテアート',
    imageUrl: '/images/latte-art/heart.jpg',
    createdAt: '2024-01-02',
    isPublic: true,
    artist: 'Kotarou',
    difficulty: '初級',
    tags: ['ハート', 'ベーシック']
  }
];
