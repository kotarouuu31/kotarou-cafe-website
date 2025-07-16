/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { TrackInfo } from '@/types/recordbox';

// リクエストレート制限用のメモリストア
// 本番環境ではRedisやデータベースを使用すべき
type RequestData = { count: number, lastRequest: number };
const requestStore = new Map<string, RequestData>();

// レート制限の設定
const RATE_LIMIT_CONFIG = {
  windowMs: 60000, // 1分間
  maxRequests: 10, // 1分間に10リクエストまで
  standardWaitTime: 60 // 標準待機時間（秒）
};

// クライアントIPを取得する関数
function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for') || 'unknown';
  return forwardedFor.split(',')[0].trim();
}

// レート制限をチェックする関数
function checkRateLimit(request: Request): { limited: boolean, retryAfter?: number } {
  const clientIp = getClientIp(request);
  const now = Date.now();
  
  // クライアントのリクエスト情報を取得または初期化
  if (!requestStore.has(clientIp)) {
    requestStore.set(clientIp, { count: 1, lastRequest: now });
    return { limited: false };
  }
  
  const clientData = requestStore.get(clientIp)!;
  
  // 時間枠をリセットする必要があるかチェック
  if (now - clientData.lastRequest > RATE_LIMIT_CONFIG.windowMs) {
    clientData.count = 1;
    clientData.lastRequest = now;
    requestStore.set(clientIp, clientData);
    return { limited: false };
  }
  
  // リクエスト数が制限を超えているかチェック
  if (clientData.count >= RATE_LIMIT_CONFIG.maxRequests) {
    // 次の時間枠までの待機時間を計算
    const timeElapsed = now - clientData.lastRequest;
    const timeRemaining = RATE_LIMIT_CONFIG.windowMs - timeElapsed;
    const retryAfter = Math.ceil(timeRemaining / 1000) || RATE_LIMIT_CONFIG.standardWaitTime;
    
    return { limited: true, retryAfter };
  }
  
  // リクエストカウントを増やす
  clientData.count += 1;
  requestStore.set(clientIp, clientData);
  
  return { limited: false };
}

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
  // 開発環境では認証を無効化する
  if (process.env.NODE_ENV === 'development') {
    console.log('開発環境での認証をスキップします');
    return true;
  }
  
  // 本番環境ではより強固な認証を実装する
  const apiKey = process.env.API_KEY || 'kotarou-cafe-api-key';
  const authHeader = request.headers.get('Authorization') || '';
  console.log(`受信した認証ヘッダー: ${authHeader}`);
  
  // Bearer トークン形式のチェック
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    console.log(`受信したトークン: ${token}, 期待するトークン: ${apiKey}`);
    return token === apiKey;
  }
  
  return false;
}

// 既存のレート制限コードは上部に統合済み

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
    // レート制限をチェック
    const rateLimitResult = checkRateLimit(request);
    if (rateLimitResult.limited) {
      console.warn(`レート制限が適用されました: IP=${getClientIp(request)}, 待機時間=${rateLimitResult.retryAfter}秒`);
      
      // レート制限ヘッダーを追加
      const headers = {
        ...corsHeaders,
        'Retry-After': `${rateLimitResult.retryAfter}`,
        'X-RateLimit-Limit': `${RATE_LIMIT_CONFIG.maxRequests}`,
        'X-RateLimit-Reset': `${Math.ceil(RATE_LIMIT_CONFIG.windowMs / 1000)}`
      };
      
      return NextResponse.json(
        { success: false, error: 'リクエスト間隔が短すぎます。しばらく待ってから再試行してください。' },
        { status: 429, headers }
      );
    }
    
    // 現在再生中の曲情報を取得
    const currentTrack = getCurrentTrack();
    
    // レート制限情報をヘッダーに追加
    const clientIp = getClientIp(request);
    const clientData = requestStore.get(clientIp);
    const headers = {
      ...corsHeaders,
      'X-RateLimit-Limit': `${RATE_LIMIT_CONFIG.maxRequests}`,
      'X-RateLimit-Remaining': `${RATE_LIMIT_CONFIG.maxRequests - (clientData?.count || 0)}`,
      'X-RateLimit-Reset': `${Math.ceil(RATE_LIMIT_CONFIG.windowMs / 1000)}`
    };
    
    return NextResponse.json(
      { ...currentTrack, timestamp: new Date().toISOString(), success: true },
      { headers }
    );
  } catch (error) {
    console.error('Error in GET /api/now-playing:', error);
    return NextResponse.json(
      { success: false, error: '曲情報の取得に失敗しました' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST リクエストハンドラ
export async function POST(request: Request) {
  try {
    // リクエストヘッダーのデバッグ表示
    console.log('受信したリクエストヘッダー:');
    request.headers.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
    // レート制限をチェック
    const rateLimitResult = checkRateLimit(request);
    if (rateLimitResult.limited) {
      console.warn(`レート制限が適用されました: IP=${getClientIp(request)}, 待機時間=${rateLimitResult.retryAfter}秒`);
      
      // レート制限ヘッダーを追加
      const headers = {
        ...corsHeaders,
        'Retry-After': `${rateLimitResult.retryAfter}`,
        'X-RateLimit-Limit': `${RATE_LIMIT_CONFIG.maxRequests}`,
        'X-RateLimit-Reset': `${Math.ceil(RATE_LIMIT_CONFIG.windowMs / 1000)}`
      };
      
      return NextResponse.json(
        { success: false, error: 'リクエスト間隔が短すぎます。しばらく待ってから再試行してください。' },
        { status: 429, headers }
      );
    }
    
    // APIキーの検証（デスクトップアプリからのリクエストのみ許可）
    if (!validateApiKey(request)) {
      console.log('認証失敗: 無効なAPIキー');
      return NextResponse.json(
        { success: false, error: '認証エラー: 無効なAPIキーです' },
        { status: 401, headers: corsHeaders }
      );
    }
    
    console.log('認証成功: 有効なAPIキー');
    
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
    
    // レート制限情報をヘッダーに追加
    const clientIp = getClientIp(request);
    const clientData = requestStore.get(clientIp);
    const headers = {
      ...corsHeaders,
      'X-RateLimit-Limit': `${RATE_LIMIT_CONFIG.maxRequests}`,
      'X-RateLimit-Remaining': `${RATE_LIMIT_CONFIG.maxRequests - (clientData?.count || 0)}`,
      'X-RateLimit-Reset': `${Math.ceil(RATE_LIMIT_CONFIG.windowMs / 1000)}`
    };
    
    return NextResponse.json(
      { success: true, message: '曲情報が正常に更新されました', track: newTrack },
      { headers }
    );
  } catch (error) {
    console.error('POST request error:', error);
    return NextResponse.json(
      { success: false, error: 'サーバーエラーが発生しました' },
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
