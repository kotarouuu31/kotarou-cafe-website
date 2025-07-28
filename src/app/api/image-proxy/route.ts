import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  // const width = searchParams.get('w'); // 将来の拡張用
  // const height = searchParams.get('h'); // 将来の拡張用

  if (!imageUrl) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Notion画像URLの検証
    if (!imageUrl.includes('notion.so') && !imageUrl.includes('amazonaws.com')) {
      return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
    }

    // 画像を取得
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Kotarou-Cafe/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const imageBuffer = await response.arrayBuffer();

    // レスポンスヘッダーを設定（キャッシュ制御）
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400'); // 24時間キャッシュ
    headers.set('Access-Control-Allow-Origin', '*');

    return new NextResponse(imageBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    
    // フォールバック画像を返す
    try {
      const fallbackResponse = await fetch(`${request.nextUrl.origin}/images/latte-art/default.jpg`);
      if (fallbackResponse.ok) {
        const fallbackBuffer = await fallbackResponse.arrayBuffer();
        return new NextResponse(fallbackBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }
    } catch (fallbackError) {
      console.error('Fallback image error:', fallbackError);
    }

    return NextResponse.json(
      { error: 'Failed to load image' },
      { status: 500 }
    );
  }
}

// CORS対応
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
