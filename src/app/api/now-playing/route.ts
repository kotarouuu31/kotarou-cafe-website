/* eslint-disable @typescript-eslint/no-unused-vars */
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
  
  // 追加フィールドのバリデーション（オプショナル）
  if (data.genre !== undefined && typeof data.genre !== 'string') {
    errors.push('ジャンルは文字列である必要があります');
  }
  
  if (data.bpm !== undefined) {
    const bpm = Number(data.bpm);
    if (isNaN(bpm)) {
      errors.push('BPMは数値である必要があります');
    }
  }
  
  if (data.dj !== undefined && typeof data.dj !== 'string') {
    errors.push('DJ名は文字列である必要があります');
  }
  
  if (data.albumArt !== undefined && typeof data.albumArt !== 'string') {
    errors.push('アルバムアートのURLは文字列である必要があります');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

// APIキーの検証
function validateApiKey(request: Request): boolean {
  // 本番環境ではより強固な認証を実装する
  const apiKey = process.env.API_KEY || 'kotarou-cafe-api-key';
  const authHeader = request.headers.get('Authorization') || '';
  
  // Bearer トークン形式のチェック
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    return token === apiKey;
  }
  
  return false;
}

// レート制限のチェック（簡易版）
const requestCounts = new Map<string, { count: number, timestamp: number }>();
const RATE_LIMIT = 10; // 1分間に10リクエストまで
const RATE_WINDOW = 60 * 1000; // 1分間（ミリ秒）

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  
  if (!record) {
    // 初回リクエスト
    requestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (now - record.timestamp > RATE_WINDOW) {
    // 時間枠をリセット
    requestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    // レート制限超過
    return false;
  }
  
  // カウントを増やす
  record.count += 1;
  requestCounts.set(ip, record);
  return true;
}

// CORS設定
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
};

// OPTIONS リクエストハンドラ (CORS プリフライト)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET リクエストハンドラ
export async function GET(request: Request) {
  try {
    // クライアントIPの取得（実際の環境に合わせて調整が必要）
    const forwardedFor = request.headers.get('x-forwarded-for') || 'unknown';
    const clientIp = forwardedFor.split(',')[0].trim();
    
    // レート制限のチェック
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, error: 'レート制限を超過しました。しばらく待ってから再試行してください。' },
        { status: 429, headers: corsHeaders }
      );
    }
    
    const currentTrack = getCurrentTrack();
    
    // 曲情報をローカルストレージにキャッシュするためのスクリプトを含める
    const responseData = {
      ...currentTrack,
      timestamp: new Date().toISOString(),
      success: true
    };
    
    return NextResponse.json(responseData, {
      headers: corsHeaders
    });
  } catch (error) {
    console.error('GET request error:', error);
    return NextResponse.json(
      { success: false, error: 'サーバーエラーが発生しました' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST リクエストハンドラ
export async function POST(request: Request) {
  try {
    // APIキーの検証（デスクトップアプリからのリクエストのみ許可）
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { success: false, error: '認証エラー: 無効なAPIキーです' },
        { status: 401, headers: corsHeaders }
      );
    }
    
    // クライアントIPの取得（実際の環境に合わせて調整が必要）
    const forwardedFor = request.headers.get('x-forwarded-for') || 'unknown';
    const clientIp = forwardedFor.split(',')[0].trim();
    
    // レート制限のチェック
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, error: 'レート制限を超過しました。しばらく待ってから再試行してください。' },
        { status: 429, headers: corsHeaders }
      );
    }
    
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
    
    // 現在の曲情報を保存
    saveCurrentTrack(newTrack, new Date().toISOString());
    
    // 履歴に追加（別ファイルに保存）
    addToHistory(newTrack);
    
    return NextResponse.json(
      { success: true, track: newTrack },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    
    return NextResponse.json(
      { success: false, error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// 履歴に追加
function addToHistory(track: TrackInfo): void {
  try {
    const HISTORY_FILE = path.join(DATA_DIR, 'track-history.json');
    let history: TrackInfo[] = [];
    
    // 既存の履歴を読み込み
    if (fs.existsSync(HISTORY_FILE)) {
      const data = fs.readFileSync(HISTORY_FILE, 'utf-8');
      history = JSON.parse(data);
    }
    
    // 新しい曲を先頭に追加
    history.unshift(track);
    
    // 履歴を最大100件に制限
    if (history.length > 100) {
      history = history.slice(0, 100);
    }
    
    // 履歴を保存
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error adding to history:', error);
  }
}
