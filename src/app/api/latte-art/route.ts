import { NextResponse } from 'next/server';
import { getLatteArtWorks } from '@/lib/notion';

export async function GET() {
  try {
    const latteArtWorks = await getLatteArtWorks();
    
    return NextResponse.json({
      success: true,
      data: latteArtWorks
    });
  } catch (error) {
    console.error('API Error fetching latte art works:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch latte art works',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
