import { Track, DJSchedule, MusicState } from '../types/music';

// サンプルの曲データ
export const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Autumn Leaves',
    artist: 'Bill Evans',
    album: 'Portrait in Jazz',
    coverImage: 'https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0',
    duration: 379,
    playedAt: new Date(Date.now() - 1000 * 60 * 5) // 5分前
  },
  {
    id: '2',
    title: 'Take Five',
    artist: 'Dave Brubeck',
    album: 'Time Out',
    coverImage: 'https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0',
    duration: 324,
    playedAt: new Date(Date.now() - 1000 * 60 * 10) // 10分前
  },
  {
    id: '3',
    title: 'So What',
    artist: 'Miles Davis',
    album: 'Kind of Blue',
    coverImage: 'https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0',
    duration: 547,
    playedAt: new Date(Date.now() - 1000 * 60 * 15) // 15分前
  },
  {
    id: '4',
    title: 'My Favorite Things',
    artist: 'John Coltrane',
    album: 'My Favorite Things',
    coverImage: 'https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0',
    duration: 842,
    playedAt: new Date(Date.now() - 1000 * 60 * 20) // 20分前
  },
  {
    id: '5',
    title: 'Cantaloupe Island',
    artist: 'Herbie Hancock',
    album: 'Empyrean Isles',
    coverImage: 'https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0',
    duration: 324,
    playedAt: new Date(Date.now() - 1000 * 60 * 25) // 25分前
  }
];

// DJスケジュール
export const djSchedules: DJSchedule[] = [
  {
    dayOfWeek: 1, // 月曜日
    startTime: '19:00',
    endTime: '21:00',
    djName: 'DJ Mellow',
    genre: 'Ambient / Chillout'
  },
  {
    dayOfWeek: 3, // 水曜日
    startTime: '20:00',
    endTime: '22:00',
    djName: 'DJ Groove',
    genre: 'Jazz / Soul'
  },
  {
    dayOfWeek: 5, // 金曜日
    startTime: '18:00',
    endTime: '23:00',
    djName: 'DJ Rhythm',
    genre: 'House / Electronic'
  },
  {
    dayOfWeek: 6, // 土曜日
    startTime: '20:00',
    endTime: '24:00',
    djName: 'DJ Beats',
    genre: 'Hip Hop / R&B'
  }
];

// 初期の音楽状態
export const initialMusicState: MusicState = {
  isPlaying: false,
  currentTrack: null,
  recentTracks: sampleTracks,
  djSchedules
};

// 現在のDJスケジュールを取得する関数
export function getTodayDJSchedule(): DJSchedule | null {
  const today = new Date();
  const dayOfWeek = today.getDay();
  return djSchedules.find(schedule => schedule.dayOfWeek === dayOfWeek) || null;
}

// 時間を分に変換する関数
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

// 現在がDJタイム中かどうかを確認する関数
export function isDJTimeNow(): boolean {
  const todaySchedule = getTodayDJSchedule();
  if (!todaySchedule) return false;
  
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = timeToMinutes(todaySchedule.startTime);
  const endMinutes = timeToMinutes(todaySchedule.endTime);
  
  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
}

// 曲の再生時間をフォーマットする関数
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// 再生時間をフォーマットする関数
export function formatPlayedAt(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  
  if (diffMins < 1) return '今';
  if (diffMins < 60) return `${diffMins}分前`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}時間前`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}日前`;
}
