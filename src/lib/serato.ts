import { TrackInfo, NowPlaying, HistoryData } from '../types/serato';

// Seratoファイルの解析結果型定義
export type SeratoFileParseResult = {
  success: boolean;
  message: string;
  data?: HistoryData | null;
  error?: string;
};

// モックデータ生成関数
export const generateMockTrack = (index: number): TrackInfo => {
  const artists = ['Daft Punk', 'Justice', 'Disclosure', 'Kaytranada', 'Flume', 'Bonobo', 'Four Tet', 'Tycho', 'Jamie xx', 'Caribou'];
  const titles = ['Digital Love', 'Safe and Sound', 'You & Me', '10%', 'Never Be Like You', 'Kerala', 'Baby', 'Awake', 'Gosh', 'Odessa'];
  const albums = ['Discovery', 'Woman', 'Settle', 'BUBBA', 'Skin', 'Migration', 'Sixteen Oceans', 'Awake', 'In Colour', 'Swim'];
  const keys = ['Am', 'Gm', 'Cm', 'Fm', 'Dm', 'Em', 'Bm', 'F#m', 'C#m', 'G#m'];
  
  const now = new Date();
  const playedAt = new Date(now.getTime() - (index * 1000 * 60 * 4)); // 4分ごとに1曲
  
  return {
    id: `track-${index}`,
    title: titles[index % titles.length],
    artist: artists[index % artists.length],
    album: albums[index % albums.length],
    length: `${Math.floor(Math.random() * 2) + 3}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    bpm: Math.floor(Math.random() * 40) + 110,
    key: keys[index % keys.length],
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

// 実際のSeratoファイルからデータを読み取る関数
// 注意: これはサーバーサイドでのみ動作します
export const getHistoryDataFromFiles = async (): Promise<HistoryData> => {
  // 実際の実装では、サーバーサイドでSeratoファイルを読み取る処理を行います
  // クライアントサイドでは、APIエンドポイントを呼び出してデータを取得します
  
  // 開発用にモックデータを返す
  return generateMockHistoryData();
};

// CSVファイルからSeratoデータを解析する関数
export const parseSeratoCSV = (csvContent: string): SeratoFileParseResult => {
  try {
    // CSVの行に分割
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      return {
        success: false,
        message: 'CSVファイルの内容が不十分です',
        error: '少なくともヘッダー行と1つのデータ行が必要です'
      };
    }
    
    // ヘッダー行を解析
    const headers = lines[0].split(',').map(header => header.trim().replace(/^"|"$/g, ''));
    
    // 必要なヘッダーが存在するか確認
    const titleIndex = headers.findIndex(h => h.includes('Title') || h.includes('name') || h.includes('Name'));
    const artistIndex = headers.findIndex(h => h.includes('Artist') || h.includes('artist'));
    const bpmIndex = headers.findIndex(h => h.includes('BPM') || h.includes('bpm'));
    const keyIndex = headers.findIndex(h => h.includes('Key') || h.includes('key'));
    const timeIndex = headers.findIndex(h => h.includes('Time') || h.includes('time') || h.includes('Date') || h.includes('date'));
    
    if (titleIndex === -1 || artistIndex === -1) {
      return {
        success: false,
        message: '必要なヘッダーが見つかりません',
        error: 'タイトルとアーティストの列が必要です'
      };
    }
    
    // データ行の解析
    const tracks: TrackInfo[] = [];
    for (let i = 1; i < lines.length; i++) {
      // カンマで分割（引用符内のカンマを考慮）
      const row = parseCSVRow(lines[i]);
      
      if (row.length >= Math.max(titleIndex, artistIndex) + 1) {
        const title = row[titleIndex]?.replace(/^"|"$/g, '') || 'Unknown';
        const artist = row[artistIndex]?.replace(/^"|"$/g, '') || 'Unknown Artist';
        const bpm = bpmIndex !== -1 && row[bpmIndex] ? parseFloat(row[bpmIndex]) : undefined;
        const key = keyIndex !== -1 && row[keyIndex] ? row[keyIndex] : undefined;
        
        // 時間情報の解析（存在する場合）
        let playedAt = new Date(Date.now() - (i * 60000)); // デフォルト: 1分ごとに過去の時間
        if (timeIndex !== -1 && row[timeIndex]) {
          const timeStr = row[timeIndex].replace(/^"|"$/g, '');
          const parsedDate = parseSeratoDate(timeStr);
          if (parsedDate) {
            playedAt = parsedDate;
          }
        }
        
        tracks.push({
          id: `parsed-${i}`,
          title,
          artist,
          bpm,
          key,
          length: '3:30', // デフォルト値
          playedAt
        });
      }
    }
    
    if (tracks.length === 0) {
      return {
        success: false,
        message: '有効なトラックデータが見つかりませんでした',
        error: 'データ形式が正しくないか、データが空です'
      };
    }
    
    // 最新の曲を現在再生中として設定
    const nowPlaying: NowPlaying = {
      track: { ...tracks[0], id: 'current' },
      startedAt: new Date()
    };
    
    const historyData: HistoryData = {
      nowPlaying,
      tracks
    };
    
    return {
      success: true,
      message: `${tracks.length}曲の履歴データを読み込みました`,
      data: historyData
    };
    
  } catch (error) {
    console.error('CSV解析エラー:', error);
    return {
      success: false,
      message: 'CSVファイルの解析中にエラーが発生しました',
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

// CSVの行を適切に分割する関数（引用符内のカンマを考慮）
const parseCSVRow = (row: string): string[] => {
  const result: string[] = [];
  let inQuotes = false;
  let currentValue = '';
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
      currentValue += char;
    } else if (char === ',' && !inQuotes) {
      result.push(currentValue);
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  
  result.push(currentValue); // 最後の値を追加
  return result;
};

// Seratoの日付文字列をパースする関数
const parseSeratoDate = (dateStr: string): Date | null => {
  try {
    // 一般的な日付形式を試行
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date;
    }
    
    // Serato固有の形式を試行（例: "2023/07/12 15:30:45"）
    const patterns = [
      /^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/,  // YYYY/MM/DD HH:MM:SS
      /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/,  // DD/MM/YYYY HH:MM:SS
      /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?\s+(?:AM|PM)?$/  // HH:MM:SS AM/PM
    ];
    
    for (const pattern of patterns) {
      const match = dateStr.match(pattern);
      if (match) {
        if (match.length >= 6) {
          // 完全な日付と時間
          const year = parseInt(match[1]);
          const month = parseInt(match[2]) - 1;
          const day = parseInt(match[3]);
          const hour = parseInt(match[4]);
          const minute = parseInt(match[5]);
          const second = match[6] ? parseInt(match[6]) : 0;
          
          return new Date(year, month, day, hour, minute, second);
        } else if (match.length >= 3) {
          // 時間のみ（今日の日付と組み合わせる）
          const today = new Date();
          const hour = parseInt(match[1]);
          const minute = parseInt(match[2]);
          const second = match[3] ? parseInt(match[3]) : 0;
          
          return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute, second);
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('日付解析エラー:', error);
    return null;
  }
};

// DDJ-FLX4の接続状態をチェックする関数（モック実装）
export const checkDDJConnection = async (): Promise<{
  seratoRunning: boolean;
  ddjConnected: boolean;
  historyFileFound: boolean;
}> => {
  // 実際の実装では、OSのプロセスリストやUSBデバイスリストを確認する処理が必要
  // 開発用にランダムな結果を返す
  return {
    seratoRunning: Math.random() > 0.3,
    ddjConnected: Math.random() > 0.4,
    historyFileFound: Math.random() > 0.5
  };
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

// 文字列をトラック長さ（mm:ss）に変換
export const parseTrackLength = (lengthStr: string | null): number => {
  if (!lengthStr) return 0;
  
  const match = lengthStr.match(/^(\d+):([0-5]\d)$/);
  if (match) {
    const minutes = parseInt(match[1]);
    const seconds = parseInt(match[2]);
    return minutes * 60 + seconds;
  }
  
  return 0;
};

// ファイル名からSeratoファイルタイプを判定
export const detectSeratoFileType = (fileName: string): 'history' | 'crates' | 'unknown' => {
  const lowerName = fileName.toLowerCase();
  
  if (lowerName.includes('history') || lowerName.includes('_session')) {
    return 'history';
  } else if (lowerName.includes('crate') || lowerName.endsWith('.crate')) {
    return 'crates';
  }
  
  return 'unknown';
};
