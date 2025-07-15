import { NextRequest, NextResponse } from 'next/server';

// 現在再生中の曲情報を保存する変数
let currentTrack: {
  title: string;
  artist: string;
  updatedAt: string;
} | null = null;

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: currentTrack,
      message: currentTrack ? '現在再生中の曲情報を取得しました' : '現在再生中の曲はありません'
    });
  } catch (error) {
    console.error('GET /api/now-playing エラー:', error);
    return NextResponse.json({
      success: false,
      error: '曲情報の取得に失敗しました'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, artist } = body;

    // バリデーション
    if (!title || !artist) {
      return NextResponse.json({
        success: false,
        error: '曲名とアーティスト名は必須です'
      }, { status: 400 });
    }

    // 曲情報を更新
    currentTrack = {
      title: title.trim(),
      artist: artist.trim(),
      updatedAt: new Date().toISOString()
    };

    console.log('曲情報を更新:', currentTrack);

    return NextResponse.json({
      success: true,
      data: currentTrack,
      message: '曲情報を更新しました'
    });
  } catch (error) {
    console.error('POST /api/now-playing エラー:', error);
    return NextResponse.json({
      success: false,
      error: '曲情報の更新に失敗しました'
    }, { status: 500 });
  }
}

// DELETE: 現在の曲情報を