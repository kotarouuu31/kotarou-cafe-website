import { TrackInfo, NowPlaying, HistoryData } from '../types/recordbox';

// モックデータ生成関数
export const generateMockTrack = (index: number): TrackInfo => {
  const artists = ['Daft Punk', 'Justice', 'Disclosure', 'Kaytranada', 'Flume', 'Bonobo', 'Four Tet', 'Tycho', 'Jamie xx', 'Caribou'];
  const titles = ['Digital Love', 'Safe and Sound', 'You & Me', '10%', 'Never Be Like You', 'Kerala', 'Baby', 'Awake', 'Gosh', 'Odessa'];
  
  const now = new Date();
  const playedAt = new Date(now.getTime() - (index * 1000 * 60 * 4)); // 4分ごとに1曲
  
  return {
    id: `track-${index}`,
    title: titles[index % titles.length],
    artist: artists[index % artists.length],
    playedAt,
  };
};

// モックの履歴データを生成
export const generateMockHistoryData = (trackCount: number = 10): HistoryData => {
  const tracks: TrackInfo[] = [];
  
  for (let i = 0; i < trackCount; i++) {
    tracks.push(generateMockTrack(i));
  }
  
  // 最新の曲を現在再生中とする
  const nowPlaying: NowPlaying = {
    track: tracks[0],
    startedAt: new Date(),
  };
  
  return {
    tracks,
    nowPlaying,
  };
};

// 現在再生中の曲情報を取得
export const getNowPlaying = (historyData: HistoryData): NowPlaying => {
  return historyData.nowPlaying;
};

// 再生履歴を取得（最新順）
export const getTrackHistory = (historyData: HistoryData, limit?: number): TrackInfo[] => {
  const tracks = [...historyData.tracks];
  
  // 最新順にソート
  tracks.sort((a, b) => b.playedAt.getTime() - a.playedAt.getTime());
  
  // 制限があれば適用
  if (limit && limit > 0) {
    return tracks.slice(0, limit);
  }
  
  return tracks;
};

// 実際のRecordboxファイルからデータを読み取る関数
// 注意: これはサーバーサイドでのみ動作します
export const getHistoryDataFromFiles = async (): Promise<HistoryData> => {
  // 実際の実装では、サーバーサイドでRecordboxファイルを読み取る処理を行います
  // クライアントサイドでは、APIエンドポイントを呼び出してデータを取得します
  
  // 開発用にモックデータを返す
  return generateMockHistoryData();
};

// 曲の再生経過時間を計算（秒）
export const getElapsedTime = (startedAt: Date | null): number => {
  if (!startedAt) return 0;
  
  const now = new Date();
  return Math.floor((now.getTime() - startedAt.getTime()) / 1000);
};

// 秒を「mm:ss」形式に変換
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
