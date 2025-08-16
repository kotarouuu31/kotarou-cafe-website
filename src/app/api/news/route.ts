import { NextResponse } from 'next/server';
import { getNews } from '@/lib/notion';

// フォールバックニュースデータ
const fallbackNews = [
  {
    id: 'news-1',
    title: '【新メニュー】秋の限定ラテアート登場',
    content: '紅葉をモチーフにした美しいラテアートをお楽しみください。熟練バリスタが一杯一杯丁寧にお作りします。',
    category: 'メニュー',
    publishDate: new Date().toISOString().split('T')[0],
    tags: ['新メニュー', 'ラテアート', '秋限定'],
    thumbnailImage: 'https://images.unsplash.com/photo-1541167760496-1628856ab772',
    publishStatus: '公開',
    displayOrder: 1,
    relatedEvents: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'news-2', 
    title: '【DDJ-FLX4導入】本格DJ機材でライブミックス',
    content: 'Pioneer社製DDJ-FLX4を導入し、Web MIDI APIと連携したリアルタイム可視化システムを構築しました。',
    category: '設備',
    publishDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    tags: ['DJ機材', 'テクノロジー', 'Pioneer'],
    thumbnailImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    publishStatus: '公開',
    displayOrder: 2,
    relatedEvents: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'news-3',
    title: '【営業時間変更】より長時間のカフェタイムを',
    content: 'お客様のご要望にお応えし、営業時間を延長いたします。夜のひと時もゆっくりとお過ごしください。',
    category: '営業',
    publishDate: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    tags: ['営業時間', '変更', 'お知らせ'],
    thumbnailImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    publishStatus: '公開',
    displayOrder: 3,
    relatedEvents: [],
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  try {
    console.log('📰 News API Route called');
    console.log('🔑 Environment variables check:');
    console.log('  - NOTION_API_KEY:', process.env.NOTION_API_KEY ? '✅ Set' : '❌ Missing');
    console.log('  - NOTION_PAGE_ID:', process.env.NOTION_PAGE_ID ? '✅ Set' : '❌ Missing');
    console.log('  - NOTION_NEWS_DATABASE_ID:', process.env.NOTION_NEWS_DATABASE_ID ? '✅ Set' : '❌ Missing');
    
    // 環境変数チェック
    if (!process.env.NOTION_API_KEY) {
      console.log('⚠️ NOTION_API_KEY not found, using fallback data');
      return NextResponse.json({
        success: true,
        data: fallbackNews,
        source: 'fallback',
        message: 'Using fallback data - Please configure NOTION_API_KEY',
        debug: {
          hasApiKey: false,
          hasPageId: !!process.env.NOTION_PAGE_ID,
          hasNewsDbId: !!process.env.NOTION_NEWS_DATABASE_ID,
          dataCount: fallbackNews.length,
          timestamp: new Date().toISOString()
        }
      });
    }
    
    const news = await getNews();
    
    // データが空の場合はフォールバックを使用
    if (news.length === 0) {
      console.log('⚠️ No news data from Notion, using fallback');
      return NextResponse.json({
        success: true,
        data: fallbackNews,
        source: 'fallback',
        message: 'No data from Notion database - using fallback',
        debug: {
          hasApiKey: !!process.env.NOTION_API_KEY,
          hasPageId: !!process.env.NOTION_PAGE_ID,
          hasNewsDbId: !!process.env.NOTION_NEWS_DATABASE_ID,
          dataCount: fallbackNews.length,
          timestamp: new Date().toISOString()
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      data: news,
      source: 'notion',
      debug: {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasPageId: !!process.env.NOTION_PAGE_ID,
        hasNewsDbId: !!process.env.NOTION_NEWS_DATABASE_ID,
        dataCount: news.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ News API Error:', error);
    
    // エラー時もフォールバックデータを返す
    return NextResponse.json({
      success: true,
      data: fallbackNews,
      source: 'fallback-error',
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Error occurred - using fallback data',
      debug: {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasPageId: !!process.env.NOTION_PAGE_ID,
        hasNewsDbId: !!process.env.NOTION_NEWS_DATABASE_ID,
        dataCount: fallbackNews.length,
        timestamp: new Date().toISOString()
      }
    });
  }
}
