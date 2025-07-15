import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { TrackInfo } from '@/types/recordbox';

// データ保存用のファイルパス
const DATA_DIR = path.join(process.cwd(), 'data');
const HISTORY_FILE = path.join(DATA_DIR, 'track-history.json');

// データディレクトリが存在しない場合は作成
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 履歴データを取得
function getTrackHistory(): TrackInfo[] {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      const data = fs.readFileSync(HISTORY_FILE, 'utf-8');
      const history = JSON.parse(data);
      
      // 日付文字列をDateオブジェクトに変換
      return history.map((track: any) => ({
        ...track,
        playedAt: new Date(track.playedAt)
      }));
    }
  } catch (error) {
    console.error('Error reading track history:', error);
  }
  
  return [];
}

// 履歴データを保存
function saveTrackHistory(history: TrackInfo[]): void {
  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving track history:', error);
  }
}

// CORS設定
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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
    
    // クエリパラメータの取得
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    
    // 履歴データを取得
    const history = getTrackHistory();
    
    // ページネーション
    const paginatedHistory = history.slice(offset, offset + limit);
    const total = history.length;
    
    return NextResponse.json({
      success: true,
      history: paginatedHistory,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    }, {
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

// DELETE リクエストハンドラ (管理者用)
export async function DELETE(request: Request) {
  try {
    // APIキーの検証（簡易版）
    const apiKey = process.env.ADMIN_API_KEY || 'kotarou-cafe-admin-key';
    const authHeader = request.headers.get('Authorization') || '';
    
    if (!authHeader.startsWith('Bearer ') || authHeader.substring(7) !== apiKey) {
      return NextResponse.json(
        { success: false, error: '認証エラー: 管理者権限が必要です' },
        { status: 401, headers: corsHeaders }
      );
    }
    
    // クエリパラメータの取得
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (id) {
      // 特定のIDの履歴を削除
      let history = getTrackHistory();
      const initialLength = history.length;
      
      history = history.filter(track => track.id !== id);
      
      if (history.length === initialLength) {
        return NextResponse.json(
          { success: false, error: '指定されたIDの履歴が見つかりません' },
          { status: 404, headers: corsHeaders }
        );
      }
      
      saveTrackHistory(history);
      
      return NextResponse.json(
        { success: true, message: '履歴を削除しました' },
        { headers: corsHeaders }
      );
    } else {
      // 全履歴を削除
      saveTrackHistory([]);
      
      return NextResponse.json(
        { success: true, message: '全ての履歴を削除しました' },
        { headers: corsHeaders }
      );
    }
  } catch (error) {
    console.error('DELETE request error:', error);
    return NextResponse.json(
      { success: false, error: 'サーバーエラーが発生しました' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST リクエストハンドラ (管理者用 - 履歴の編集)
export async function POST(request: Request) {
  try {
    // APIキーの検証（簡易版）
    const apiKey = process.env.ADMIN_API_KEY || 'kotarou-cafe-admin-key';
    const authHeader = request.headers.get('Authorization') || '';
    
    if (!authHeader.startsWith('Bearer ') || authHeader.substring(7) !== apiKey) {
      return NextResponse.json(
        { success: false, error: '認証エラー: 管理者権限が必要です' },
        { status: 401, headers: corsHeaders }
      );
    }
    
    const data = await request.json();
    
    if (!data.id) {
      return NextResponse.json(
        { success: false, error: 'IDが必要です' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // 履歴を取得
    let history = getTrackHistory();
    const trackIndex = history.findIndex(track => track.id === data.id);
    
    if (trackIndex === -1) {
      return NextResponse.json(
        { success: false, error: '指定されたIDの履歴が見つかりません' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    // 履歴を更新
    history[trackIndex] = {
      ...history[trackIndex],
      ...data,
      // playedAtは文字列で来る可能性があるので変換
      playedAt: data.playedAt ? new Date(data.playedAt) : history[trackIndex].playedAt
    };
    
    saveTrackHistory(history);
    
    return NextResponse.json(
      { success: true, track: history[trackIndex] },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('POST request error:', error);
    return NextResponse.json(
      { success: false, error: 'サーバーエラーが発生しました' },
      { status: 500, headers: corsHeaders }
    );
  }
}
