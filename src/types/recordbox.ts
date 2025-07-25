export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  playedAt: Date;
  genre?: string;
  bpm?: number;
  dj?: string;
  albumArt?: string;
}

export interface NowPlaying {
  track: TrackInfo | null;
  startedAt: Date | null;
}

export interface HistoryData {
  tracks: TrackInfo[];
  nowPlaying: NowPlaying;
}
