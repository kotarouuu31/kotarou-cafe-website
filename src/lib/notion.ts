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

// Notionデータベースからラテアート作品を取得（2025年API対応：親ページ経由）
export async function getLatteArtWorks(): Promise<LatteArtWork[]> {
  try {
    // 2025年Notion APIでは親ページIDを使用
    const pageId = process.env.NOTION_PAGE_ID;
    const databaseId = process.env.NOTION_LATTE_ART_DATABASE_ID;
    
    if (!pageId && !databaseId) {
      throw new Error('NOTION_PAGE_ID or NOTION_LATTE_ART_DATABASE_ID is not defined');
    }

    // 親ページIDが設定されている場合は、親ページ経由でデータベースを検索
    if (pageId) {
      console.log('🔍 Using Parent Page ID:', pageId);
      return await getLatteArtWorksFromPage(pageId);
    } else {
      console.log('🔍 Using Database ID (legacy):', databaseId);
      return await getLatteArtWorksFromDatabase(databaseId!);
    }
  } catch (error) {
    console.error('❌ Error fetching latte art works from Notion:', error);
    return [];
  }
}

// 親ページ経由でデータベースにアクセス（2025年API対応）
async function getLatteArtWorksFromPage(pageId: string): Promise<LatteArtWork[]> {
  try {
    // 親ページの子要素（データベース）を検索
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });

    console.log('📊 Parent page children:', response.results.length);
    
    // データベースブロックを検索
    const databaseBlock = response.results.find(
      (block) => (block as { type?: string }).type === 'child_database'
    );

    if (!databaseBlock) {
      console.log('❌ No database found in parent page');
      return [];
    }

    const databaseId = databaseBlock.id;
    console.log('🔍 Found database ID from parent page:', databaseId);
    
    return await getLatteArtWorksFromDatabase(databaseId);
  } catch (error) {
    console.error('❌ Error accessing parent page:', error);
    return [];
  }
}

// データベースから直接データを取得（共通関数）
async function getLatteArtWorksFromDatabase(databaseId: string): Promise<LatteArtWork[]> {
  try {

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
      const firstResult = response.results[0] as Record<string, unknown>;
      const properties = (firstResult as { properties: Record<string, unknown> }).properties;
      console.log('📊 First result properties keys:', Object.keys(properties));
      console.log('📊 First result full properties:', JSON.stringify(properties, null, 2));
    }

    const latteArtWorks: LatteArtWork[] = response.results.map((page: Record<string, unknown>) => {
      const properties = page.properties as Record<string, unknown>;
      
      console.log('🎨 Processing page ID:', page.id);
      console.log('🎨 Available properties:', Object.keys(properties));
      
      // 画像URLの取得
      let imageUrl = '/images/latte-art/default.jpg'; // デフォルト画像
      const typedProperties = properties as {
        画像?: { files?: Array<{ type: string; external?: { url: string }; file?: { url: string } }> };
        作品名?: { title?: Array<{ plain_text: string }> };
        説明?: { rich_text?: Array<{ plain_text: string }> };
        作成日?: { date?: { start: string } };
        公開状態?: { select?: { name: string } };
        技法?: { select?: { name: string } };
      };
      
      if (typedProperties.画像?.files && typedProperties.画像.files.length > 0) {
        const file = typedProperties.画像.files[0];
        imageUrl = file.type === 'external' ? file.external?.url || imageUrl : file.file?.url || imageUrl;
      }

      const result = {
        id: page.id as string,
        title: typedProperties.作品名?.title?.[0]?.plain_text || 'Untitled',
        description: typedProperties.説明?.rich_text?.[0]?.plain_text || '',
        imageUrl,
        createdAt: typedProperties.作成日?.date?.start || (page.created_time as string),
        isPublic: typedProperties.公開状態?.select?.name === '公開',
        artist: 'Kotarou', // 固定値
        difficulty: typedProperties.技法?.select?.name || '',
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
