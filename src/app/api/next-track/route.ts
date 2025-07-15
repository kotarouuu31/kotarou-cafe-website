import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { TrackInfo } from '@/types/recordbox';

// データ保存用のファイルパス
const DATA_DIR = path.join(process.cwd(), 'data');
const NEXT_TRACK_FILE = path.join(DATA_DIR, 'next-track.json');

// データディレクトリが存在しない場合は作成
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 次の曲情報を取得
function getNextTrack(): { track: TrackInfo | null } {
  try {
    if (fs.existsSync(NEXT_TRACK_FILE)) {
      const data = fs.readFileSync(NEXT_TRACK_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading next track data:', error);
  }
  
  return { track: null };
}

// 次の曲情報を保存
function saveNextTrack(track: TrackInfo | null): void {
  try {
    const data = JSON.stringify({ track }, null, 2);
    fs.writeFileSync(NEXT_TRACK_FILE, data, 'utf-8');
  } catch (error) {
    console.error('Error saving next track data:', error);
  }
}

// 曲情報のバリデーション
function validateTrackInfo(data: Record<string, unknown>): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  
  if (!data) {
    return { valid: false, errors: ['リクエストボディが空です'] };
  }
  
  if (!data.title || typeof data.title !== 'string') {
    errors.push('曲名は必須で、文字列である必要があります');
  }
  
  if (!data.artist || typeof data.artist !== 'string') {
    errors.push('アーティスト名は必須で、文字列である必要があります');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

// CORS設定
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// OPTIONS リクエストハンドラ (CORS プリフライト)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET リクエストハンドラ
export async function GET() {
  const nextTrack = getNextTrack();
  
  // 次の曲がない場合は404を返す
  if (!nextTrack.track) {
    return NextResponse.json(
      { success: false, message: '次の曲情報がありません' },
      { status: 404, headers: corsHeaders }
    );
  }
  
  return NextResponse.json(nextTrack, {
    headers: corsHeaders
  });
}

// POST リクエストハンドラ
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validation = validateTrackInfo(data);
    
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // 新しい曲情報の作成
    const newTrack: TrackInfo = {
      id: `track-${Date.now()}`,
      title: data.title as string,
      artist: data.artist as string,
      playedAt: new Date(),
      genre: data.genre as string | undefined,
      bpm: data.bpm as number | undefined,
      dj: data.dj as string | undefined,
      albumArt: data.albumArt as string | undefined
    };
    
    // 次の曲情報を保存
    saveNextTrack(newTrack);
    
    return NextResponse.json(
      { success: true, track: newTrack },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error processing next track request:', error);
    
    return NextResponse.json(
      { success: false, error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500, headers: corsHeaders }
    );
  }
}
