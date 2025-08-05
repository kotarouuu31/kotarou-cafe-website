export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  length?: string;
  bpm?: number;
  key?: string;
  playedAt: Date;
  rating?: number;
  comment?: string;
  artwork?: string;
}

export interface NowPlaying {
  track: TrackInfo | null;
  startedAt: Date | null;
  deck?: 'A' | 'B';
  isPlaying?: boolean;
}

export interface DJSession {
  id: string;
  startedAt: Date;
  endedAt?: Date;
  tracksPlayed: TrackInfo[];
  totalDuration: number;
}

export interface RecordBoxData {
  tracks: TrackInfo[];
  nowPlaying: NowPlaying;
  session?: DJSession;
}
