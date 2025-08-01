import { NextResponse } from 'next/server';
import { getEvents } from '@/lib/notion';

export async function GET() {
  try {
    console.log('🎵 Events API Route called');
    console.log('🔑 API Key exists:', !!process.env.NOTION_API_KEY);
    console.log('🔑 API Key preview:', process.env.NOTION_API_KEY?.substring(0, 15) + '...');
    console.log('🆔 Page ID (2025 API):', process.env.NOTION_PAGE_ID);
    console.log('🆔 Events DB ID:', process.env.NOTION_EVENTS_DATABASE_ID);
    
    const events = await getEvents();
    
    return NextResponse.json({
      success: true,
      data: events,
      debug: {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasPageId: !!process.env.NOTION_PAGE_ID,
        hasEventsDbId: !!process.env.NOTION_EVENTS_DATABASE_ID,
        dataCount: events.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Events API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      debug: {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasPageId: !!process.env.NOTION_PAGE_ID,
        hasEventsDbId: !!process.env.NOTION_EVENTS_DATABASE_ID,
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}
