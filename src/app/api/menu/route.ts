import { NextResponse } from 'next/server';
import { getMenu } from '@/lib/notion';

export async function GET() {
  try {
    console.log('🍽️ Menu API Route called');
    console.log('🔑 API Key exists:', !!process.env.NOTION_API_KEY);
    console.log('🔑 API Key preview:', process.env.NOTION_API_KEY?.substring(0, 15) + '...');
    console.log('🆔 Page ID (2025 API):', process.env.NOTION_PAGE_ID);
    console.log('🆔 Menu DB ID:', process.env.NOTION_MENU_DATABASE_ID);
    
    const menu = await getMenu();
    
    return NextResponse.json({
      success: true,
      data: menu,
      debug: {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasPageId: !!process.env.NOTION_PAGE_ID,
        hasMenuDbId: !!process.env.NOTION_MENU_DATABASE_ID,
        dataCount: menu.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Menu API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      debug: {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasPageId: !!process.env.NOTION_PAGE_ID,
        hasMenuDbId: !!process.env.NOTION_MENU_DATABASE_ID,
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}
