export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  album?: string;
  length?: string;
  bpm?: number;
  key?: string;
  playedAt: Date;
  filePath?: string;
}

export interface NowPlaying {
  track: TrackInfo | null;
  startedAt: Date | null;
}

export interface HistoryData {
  tracks: TrackInfo[];
  nowPlaying: NowPlaying;
}
