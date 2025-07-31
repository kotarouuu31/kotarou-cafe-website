import { NextResponse } from 'next/server';
import { getLatteArtWorks } from '@/lib/notion';

export async function GET() {
  try {
    console.log('🚀 API Route called');
    console.log('🔑 API Key exists:', !!process.env.NOTION_API_KEY);
    console.log('🔑 API Key preview:', process.env.NOTION_API_KEY?.substring(0, 15) + '...');
    console.log('🆔 Page ID (2025 API):', process.env.NOTION_PAGE_ID);
    console.log('🆔 DB ID (legacy):', process.env.NOTION_LATTE_ART_DATABASE_ID);
    
    const works = await getLatteArtWorks();
    
    return NextResponse.json({
      success: true,
      data: works,
      debug: {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasPageId: !!process.env.NOTION_PAGE_ID,
        hasDatabaseId: !!process.env.NOTION_LATTE_ART_DATABASE_ID,
        dataCount: works.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      debug: {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasDatabaseId: !!process.env.NOTION_LATTE_ART_DATABASE_ID,
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}
