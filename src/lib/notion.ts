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

// イベント管理の型定義
export interface EventData {
  id: string;
  eventName: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  genre: string;
  djArtist: string;
  price: number;
  description: string;
  eventImage: string;
  status: string;
  isPublic: boolean;
  createdAt: string;
}

// ニュース管理の型定義
export interface NewsData {
  id: string;
  title: string;
  content: string;
  category: string;
  publishDate: string;
  tags: string[];
  thumbnailImage: string;
  publishStatus: string;
  displayOrder: number;
  relatedEvents: string[];
  createdAt: string;
}

// メニュー管理の型定義
export interface MenuData {
  id: string;
  menuName: string;
  category: string;
  price: number;
  description: string;
  menuImage: string;
  stockStatus: string;
  isSeasonalLimited: boolean;
  isRecommended: boolean;
  allergyInfo: string[];
  displayOrder: number;
  isPublic: boolean;
  createdAt: string;
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

// イベントデータ取得関数
export async function getEvents(): Promise<EventData[]> {
  try {
    const databaseId = process.env.NOTION_EVENTS_DATABASE_ID;
    
    if (!databaseId) {
      throw new Error('NOTION_EVENTS_DATABASE_ID is not defined');
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: '公開設定',
        checkbox: {
          equals: true
        }
      },
      sorts: [
        {
          property: '開催日時',
          direction: 'ascending'
        }
      ]
    });

    return response.results.map((page: Record<string, unknown>) => {
      const typedProperties = (page as { properties: Record<string, unknown> }).properties as {
        'イベント名'?: { title?: Array<{ plain_text: string }> };
        '開催日時'?: { date?: { start: string } };
        '開始時間'?: { rich_text?: Array<{ plain_text: string }> };
        '終了時間'?: { rich_text?: Array<{ plain_text: string }> };
        'ジャンル'?: { select?: { name: string } };
        'DJ/アーティスト'?: { rich_text?: Array<{ plain_text: string }> };
        '料金'?: { number?: number };
        '詳細説明'?: { rich_text?: Array<{ plain_text: string }> };
        'イベント画像'?: { files?: Array<{ file?: { url: string }; external?: { url: string } }> };
        'ステータス'?: { select?: { name: string } };
        '公開設定'?: { checkbox?: boolean };
        '作成日'?: { created_time?: string };
      };
      
      return {
        id: page.id as string,
        eventName: typedProperties['イベント名']?.title?.[0]?.plain_text || '',
        eventDate: typedProperties['開催日時']?.date?.start || '',
        startTime: typedProperties['開始時間']?.rich_text?.[0]?.plain_text || '',
        endTime: typedProperties['終了時間']?.rich_text?.[0]?.plain_text || '',
        genre: typedProperties['ジャンル']?.select?.name || '',
        djArtist: typedProperties['DJ/アーティスト']?.rich_text?.[0]?.plain_text || '',
        price: typedProperties['料金']?.number || 0,
        description: typedProperties['詳細説明']?.rich_text?.[0]?.plain_text || '',
        eventImage: typedProperties['イベント画像']?.files?.[0]?.file?.url || typedProperties['イベント画像']?.files?.[0]?.external?.url || '',
        status: typedProperties['ステータス']?.select?.name || '',
        isPublic: typedProperties['公開設定']?.checkbox || false,
        createdAt: typedProperties['作成日']?.created_time || (page.created_time as string)
      };
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// ニュースデータ取得関数
export async function getNews(): Promise<NewsData[]> {
  try {
    const databaseId = process.env.NOTION_NEWS_DATABASE_ID;
    
    if (!databaseId) {
      throw new Error('NOTION_NEWS_DATABASE_ID is not defined');
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: '公開ステータス',
        select: {
          equals: '公開'
        }
      },
      sorts: [
        {
          property: '表示順序',
          direction: 'ascending'
        },
        {
          property: '公開日',
          direction: 'descending'
        }
      ]
    });

    return response.results.map((page: Record<string, unknown>) => {
      const typedProperties = (page as { properties: Record<string, unknown> }).properties as {
        'タイトル'?: { title?: Array<{ plain_text: string }> };
        '内容'?: { rich_text?: Array<{ plain_text: string }> };
        'カテゴリ'?: { select?: { name: string } };
        '公開日'?: { date?: { start: string } };
        'タグ'?: { multi_select?: Array<{ name: string }> };
        'アイキャッチ画像'?: { files?: Array<{ file?: { url: string }; external?: { url: string } }> };
        '公開ステータス'?: { select?: { name: string } };
        '表示順序'?: { number?: number };
        '関連イベント'?: { relation?: Array<{ id: string }> };
        '作成日'?: { created_time?: string };
      };
      
      return {
        id: page.id as string,
        title: typedProperties['タイトル']?.title?.[0]?.plain_text || '',
        content: typedProperties['内容']?.rich_text?.[0]?.plain_text || '',
        category: typedProperties['カテゴリ']?.select?.name || '',
        publishDate: typedProperties['公開日']?.date?.start || '',
        tags: typedProperties['タグ']?.multi_select?.map((tag) => tag.name) || [],
        thumbnailImage: typedProperties['アイキャッチ画像']?.files?.[0]?.file?.url || typedProperties['アイキャッチ画像']?.files?.[0]?.external?.url || '',
        publishStatus: typedProperties['公開ステータス']?.select?.name || '',
        displayOrder: typedProperties['表示順序']?.number || 0,
        relatedEvents: typedProperties['関連イベント']?.relation?.map((rel) => rel.id) || [],
        createdAt: typedProperties['作成日']?.created_time || (page.created_time as string)
      };
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// メニューデータ取得関数
export async function getMenu(): Promise<MenuData[]> {
  try {
    const databaseId = process.env.NOTION_MENU_DATABASE_ID;
    
    if (!databaseId) {
      throw new Error('NOTION_MENU_DATABASE_ID is not defined');
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: '公開設定',
        checkbox: {
          equals: true
        }
      },
      sorts: [
        {
          property: '表示順序',
          direction: 'ascending'
        },
        {
          property: 'カテゴリ',
          direction: 'ascending'
        }
      ]
    });

    return response.results.map((page: Record<string, unknown>) => {
      const typedProperties = (page as { properties: Record<string, unknown> }).properties as {
        'メニュー名'?: { title?: Array<{ plain_text: string }> };
        'カテゴリ'?: { select?: { name: string } };
        '価格'?: { number?: number };
        '説明'?: { rich_text?: Array<{ plain_text: string }> };
        'メニュー画像'?: { files?: Array<{ file?: { url: string }; external?: { url: string } }> };
        '在庫状況'?: { select?: { name: string } };
        '季節限定'?: { checkbox?: boolean };
        'おすすめ'?: { checkbox?: boolean };
        'アレルギー情報'?: { multi_select?: Array<{ name: string }> };
        '表示順序'?: { number?: number };
        '公開設定'?: { checkbox?: boolean };
        '作成日'?: { created_time?: string };
      };
      
      return {
        id: page.id as string,
        menuName: typedProperties['メニュー名']?.title?.[0]?.plain_text || '',
        category: typedProperties['カテゴリ']?.select?.name || '',
        price: typedProperties['価格']?.number || 0,
        description: typedProperties['説明']?.rich_text?.[0]?.plain_text || '',
        menuImage: typedProperties['メニュー画像']?.files?.[0]?.file?.url || typedProperties['メニュー画像']?.files?.[0]?.external?.url || '',
        stockStatus: typedProperties['在庫状況']?.select?.name || '販売中',
        isSeasonalLimited: typedProperties['季節限定']?.checkbox || false,
        isRecommended: typedProperties['おすすめ']?.checkbox || false,
        allergyInfo: typedProperties['アレルギー情報']?.multi_select?.map((allergy) => allergy.name) || [],
        displayOrder: typedProperties['表示順序']?.number || 0,
        isPublic: typedProperties['公開設定']?.checkbox || false,
        createdAt: typedProperties['作成日']?.created_time || (page.created_time as string)
      };
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return [];
  }
}
