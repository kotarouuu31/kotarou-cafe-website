export type Track = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverImage?: string;
  duration?: number; // 秒単位
  playedAt?: Date;
};

export type DJSchedule = {
  dayOfWeek: number; // 0-6 (日-土)
  startTime: string; // 'HH:MM' 形式
  endTime: string; // 'HH:MM' 形式
  djName: string;
  genre?: string;
};

export type MusicState = {
  isPlaying: boolean;
  currentTrack: Track | null;
  recentTracks: Track[];
  djSchedules: DJSchedule[];
};
