import { NextResponse } from 'next/server';
import { getLatteArtWorks, fallbackLatteArtWorks } from '@/lib/notion';

export async function GET() {
  try {
    console.log('🎨 Latte Art API Route called');
    console.log('🔑 Environment variables check:');
    console.log('  - NOTION_API_KEY:', process.env.NOTION_API_KEY ? '✅ Set' : '❌ Missing');
    console.log('  - NOTION_PAGE_ID:', process.env.NOTION_PAGE_ID ? '✅ Set' : '❌ Missing');
    console.log('  - NOTION_LATTE_ART_DATABASE_ID:', process.env.NOTION_LATTE_ART_DATABASE_ID ? '✅ Set' : '❌ Missing');
    
    // 環境変数チェック
    if (!process.env.NOTION_API_KEY) {
      console.log('⚠️ NOTION_API_KEY not found, using fallback data');
      return NextResponse.json({
        success: true,
        data: fallbackLatteArtWorks,
        source: 'fallback',
        message: 'Using fallback data - Please configure NOTION_API_KEY',
        debug: {
          hasApiKey: false,
          hasPageId: !!process.env.NOTION_PAGE_ID,
          hasDatabaseId: !!process.env.NOTION_LATTE_ART_DATABASE_ID,
          dataCount: fallbackLatteArtWorks.length,
          timestamp: new Date().toISOString()
        }
      });
    }
    
    const works = await getLatteArtWorks();
    
    // データが空の場合はフォールバックを使用
    if (works.length === 0) {
      console.log('⚠️ No latte art data from Notion, using fallback');
      return NextResponse.json({
        success: true,
        data: fallbackLatteArtWorks,
        source: 'fallback',
        message: 'No data from Notion database - using fallback',
        debug: {
          hasApiKey: !!process.env.NOTION_API_KEY,
          hasPageId: !!process.env.NOTION_PAGE_ID,
          hasDatabaseId: !!process.env.NOTION_LATTE_ART_DATABASE_ID,
          dataCount: fallbackLatteArtWorks.length,
          timestamp: new Date().toISOString()
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      data: works,
      source: 'notion',
      debug: {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasPageId: !!process.env.NOTION_PAGE_ID,
        hasDatabaseId: !!process.env.NOTION_LATTE_ART_DATABASE_ID,
        dataCount: works.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Latte Art API Error:', error);
    
    // エラー時もフォールバックデータを返す
    return NextResponse.json({
      success: true,
      data: fallbackLatteArtWorks,
      source: 'fallback-error',
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Error occurred - using fallback data',
      debug: {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasPageId: !!process.env.NOTION_PAGE_ID,
        hasDatabaseId: !!process.env.NOTION_LATTE_ART_DATABASE_ID,
        dataCount: fallbackLatteArtWorks.length,
        timestamp: new Date().toISOString()
      }
    });
  }
}
