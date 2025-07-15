import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { TrackInfo } from '@/types/recordbox';

// データ保存用のファイルパス
const DATA_DIR = path.join(process.cwd(), 'data');
const NOW_PLAYING_FILE = path.join(DATA_DIR, 'now-playing.json');

// データディレクトリが存在しない場合は作成
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 現在の曲情報を取得
function getCurrentTrack(): { track: TrackInfo | null, startedAt: string | null } {
  try {
    if (fs.existsSync(NOW_PLAYING_FILE)) {
      const data = fs.readFileSync(NOW_PLAYING_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading now playing data:', error);
  }
  
  return { track: null, startedAt: null };
}

// 現在の曲情報を保存
function saveCurrentTrack(track: TrackInfo | null, startedAt: string | null): void {
  try {
    const data = JSON.stringify({ track, startedAt }, null, 2);
    fs.writeFileSync(NOW_PLAYING_FILE, data, 'utf-8');
  } catch (error) {
    console.error('Error saving now playing data:', error);
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
  const currentTrack = getCurrentTrack();
  
  return NextResponse.json(currentTrack, {
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
      title: data.title,
      artist: data.artist,
      playedAt: new Date()
    };
    
    // 曲情報の保存
    saveCurrentTrack(newTrack, new Date().toISOString());
    
    return NextResponse.json(
      { success: true, track: newTrack },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    
    return NextResponse.json(
      { success: false, error: 'リクエスト処理中にエラーが発生しました' },
      { status: 500, headers: corsHeaders }
    );
  }
}
