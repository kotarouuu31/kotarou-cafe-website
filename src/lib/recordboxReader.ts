import { TrackInfo, NowPlaying, RecordBoxData } from '@/types/dj';

/**
 * RecordBox履歴データを読み取る（クライアントサイド対応）
 * @returns 解析された履歴データ
 */
export async function readRecordBoxHistory(): Promise<TrackInfo[]> {
  try {
    // クライアントサイドではモックデータを使用
    // 実際のRecordBox連携は将来的にAPIエンドポイント経由で実装
    console.log('RecordBox履歴データを取得中...');
    return generateMockTracks();
    
  } catch (error) {
    console.error('RecordBox履歴読み取りエラー:', error);
    return generateMockTracks();
  }
}

/**
 * 現在の再生中楽曲を取得
 * @param tracks 楽曲リスト
 * @returns 現在再生中の情報
 */
export function getNowPlaying(tracks: TrackInfo[]): NowPlaying {
  if (tracks.length === 0) {
    return { track: null, startedAt: null };
  }
  
  const currentTrack = tracks[0];
  return {
    track: currentTrack,
    startedAt: currentTrack.playedAt,
    deck: 'A',
    isPlaying: true
  };
}

/**
 * RecordBox用モックデータ生成
 * @returns モック楽曲データ
 */
function generateMockTracks(): TrackInfo[] {
  const now = new Date();
  
  return [
    {
      id: 'rb-track-1',
      title: 'Cafe del Mar (Original Mix)',
      artist: 'Energy 52',
      album: 'Cafe del Mar',
      genre: 'Trance',
      length: '6:45',
      bpm: 132,
      key: 'A minor',
      rating: 5,
      playedAt: new Date(now.getTime() - 1000 * 30), // 30秒前
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300'
    },
    {
      id: 'rb-track-2',
      title: 'Deep House Morning',
      artist: 'Kotarou',
      album: 'Coffee Sessions',
      genre: 'Deep House',
      length: '5:20',
      bpm: 124,
      key: 'C major',
      rating: 4,
      playedAt: new Date(now.getTime() - 1000 * 60 * 6), // 6分前
      artwork: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300'
    },
    {
      id: 'rb-track-3',
      title: 'Ambient Cafe',
      artist: 'Lounge Collective',
      album: 'Chill Vibes Vol.2',
      genre: 'Ambient',
      length: '4:15',
      bpm: 95,
      key: 'F major',
      rating: 4,
      playedAt: new Date(now.getTime() - 1000 * 60 * 12), // 12分前
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300'
    }
  ];
}

/**
 * RecordBox統合データを取得
 * @returns 統合データ
 */
export async function getRecordBoxData(): Promise<RecordBoxData> {
  const tracks = await readRecordBoxHistory();
  const nowPlaying = getNowPlaying(tracks);
  
  return {
    tracks,
    nowPlaying,
    session: {
      id: `session-${Date.now()}`,
      startedAt: new Date(Date.now() - 1000 * 60 * 45), // 45分前に開始
      tracksPlayed: tracks,
      totalDuration: 45 * 60 // 45分
    }
  };
}

/**
 * DDJ-FLX4 + RecordBox 統計データ
 */
export function getDJStats() {
  return {
    totalSessions: 1247,
    hoursCompleted: 2847,
    targetHours: 10000,
    avgSessionLength: 2.3,
    favoriteBPM: 124,
    mostPlayedGenre: 'Deep House',
    currentStreak: 12, // 連続日数
    todayHours: 3.5
  };
}
