import { NextResponse } from 'next/server';
import { getEvents } from '@/lib/notion';

// フォールバックイベントデータ
const fallbackEvents = [
  {
    id: 'event-1',
    eventName: 'Friday Night Jazz Session',
    eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1週間後
    startTime: '19:00',
    endTime: '22:00',
    genre: 'Jazz',
    djArtist: 'DJ Kotarou',
    price: 2000,
    description: '金曜日の夜はジャズの調べとともに。厳選されたジャズナンバーをお楽しみください。',
    eventImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    status: '開催予定',
    isPublic: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'event-2',
    eventName: 'Latte Art Workshop',
    eventDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10日後
    startTime: '14:00',
    endTime: '16:00',
    genre: 'Workshop',
    djArtist: 'Barista Kotarou',
    price: 3500,
    description: 'プロのバリスタから学ぶラテアート体験。基本から応用まで丁寧に指導します。',
    eventImage: 'https://images.unsplash.com/photo-1541167760496-1628856ab772',
    status: '募集中',
    isPublic: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'event-3',
    eventName: 'DJ Mix Night - Electronic',
    eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2週間後
    startTime: '20:00',
    endTime: '23:00',
    genre: 'Electronic',
    djArtist: 'DJ Kotarou feat. DDJ-FLX4',
    price: 1500,
    description: 'DDJ-FLX4による本格的なエレクトロニックミュージックナイト。Web MIDI連携のライブビジュアルも必見。',
    eventImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    status: '開催予定',
    isPublic: true,
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  try {
    console.log('🎵 Events API Route called');
    console.log('🔑 Environment variables check:');
    console.log('  - NOTION_API_KEY:', process.env.NOTION_API_KEY ? '✅ Set' : '❌ Missing');
    console.log('  - NOTION_PAGE_ID:', process.env.NOTION_PAGE_ID ? '✅ Set' : '❌ Missing');
    console.log('  - NOTION_EVENTS_DATABASE_ID:', process.env.NOTION_EVENTS_DATABASE_ID ? '✅ Set' : '❌ Missing');
    
    // 環境変数チェック
    if (!process.env.NOTION_API_KEY) {
      console.log('⚠️ NOTION_API_KEY not found, using fallback data');
      return NextResponse.json({
        success: true,
        data: fallbackEvents,
        source: 'fallback',
        message: 'Using fallback data - Please configure NOTION_API_KEY',
        debug: {
          hasApiKey: false,
          hasPageId: !!process.env.NOTION_PAGE_ID,
          hasEventsDbId: !!process.env.NOTION_EVENTS_DATABASE_ID,
          dataCount: fallbackEvents.length,
          timestamp: new Date().toISOString()
        }
      });
    }
    
    const events = await getEvents();
    
    // データが空の場合はフォールバックを使用
    if (events.length === 0) {
      console.log('⚠️ No events data from Notion, using fallback');
      return NextResponse.json({
        success: true,
        data: fallbackEvents,
        source: 'fallback',
        message: 'No data from Notion database - using fallback',
        debug: {
          hasApiKey: !!process.env.NOTION_API_KEY,
          hasPageId: !!process.env.NOTION_PAGE_ID,
          hasEventsDbId: !!process.env.NOTION_EVENTS_DATABASE_ID,
          dataCount: fallbackEvents.length,
          timestamp: new Date().toISOString()
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      data: events,
      source: 'notion',
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
    
    // エラー時もフォールバックデータを返す
    return NextResponse.json({
      success: true,
      data: fallbackEvents,
      source: 'fallback-error',
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Error occurred - using fallback data',
      debug: {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasPageId: !!process.env.NOTION_PAGE_ID,
        hasEventsDbId: !!process.env.NOTION_EVENTS_DATABASE_ID,
        dataCount: fallbackEvents.length,
        timestamp: new Date().toISOString()
      }
    });
  }
}
