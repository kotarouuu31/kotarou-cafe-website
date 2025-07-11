import { Event, BusinessHours, SpecialBusinessHours } from '../types/events';

export const events: Event[] = [
  {
    id: '1',
    title: 'ジャズライブナイト',
    description: '地元ミュージシャンによる心地よいジャズの夕べ。美味しいコーヒーと共にお楽しみください。',
    startDate: '2025-07-12T19:00:00+09:00',
    endDate: '2025-07-12T21:00:00+09:00',
    type: 'live',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    isRecurring: true,
    recurrencePattern: {
      frequency: 'weekly',
      dayOfWeek: 6, // Saturday
      interval: 2, // Every 2 weeks
      endDate: '2025-09-30T00:00:00+09:00'
    }
  },
  {
    id: '2',
    title: 'DJ Night - アンビエントミュージック',
    description: '静かな夜に癒しのアンビエント音楽をお届けします。特別なカクテルメニューもご用意。',
    startDate: '2025-07-18T20:00:00+09:00',
    endDate: '2025-07-18T23:00:00+09:00',
    type: 'dj',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1571266028243-e4b4521c1d1d',
    isRecurring: true,
    recurrencePattern: {
      frequency: 'weekly',
      dayOfWeek: 5, // Friday
      interval: 1, // Every week
      endDate: '2025-09-30T00:00:00+09:00'
    }
  },
  {
    id: '3',
    title: 'コーヒー淹れ方ワークショップ',
    description: 'バリスタから学ぶ、自宅でできる本格コーヒーの淹れ方。参加者には特製ブレンド豆のお土産付き。',
    startDate: '2025-07-20T14:00:00+09:00',
    endDate: '2025-07-20T16:00:00+09:00',
    type: 'workshop',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'
  },
  {
    id: '4',
    title: '朝活読書会',
    description: '静かな朝の時間に、好きな本を持ち寄って読書を楽しみましょう。モーニングセット付き。',
    startDate: '2025-07-13T08:00:00+09:00',
    endDate: '2025-07-13T10:00:00+09:00',
    type: 'special',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0',
    isRecurring: true,
    recurrencePattern: {
      frequency: 'weekly',
      dayOfWeek: 0, // Sunday
      interval: 1, // Every week
      endDate: '2025-09-30T00:00:00+09:00'
    }
  },
  {
    id: '5',
    title: '夏季特別営業時間',
    description: '夏季休業のため、通常より短い営業時間となります。',
    startDate: '2025-08-10T00:00:00+09:00',
    endDate: '2025-08-15T00:00:00+09:00',
    type: 'closed'
  }
];

export const regularBusinessHours: BusinessHours[] = [
  { dayOfWeek: 0, open: '10:00', close: '20:00', isClosed: false }, // Sunday
  { dayOfWeek: 1, open: '08:00', close: '22:00', isClosed: false }, // Monday
  { dayOfWeek: 2, open: '08:00', close: '22:00', isClosed: false }, // Tuesday
  { dayOfWeek: 3, open: '08:00', close: '22:00', isClosed: false }, // Wednesday
  { dayOfWeek: 4, open: '08:00', close: '22:00', isClosed: false }, // Thursday
  { dayOfWeek: 5, open: '08:00', close: '23:00', isClosed: false }, // Friday
  { dayOfWeek: 6, open: '10:00', close: '23:00', isClosed: false }  // Saturday
];

export const specialBusinessHours: SpecialBusinessHours[] = [
  {
    date: '2025-07-15T00:00:00+09:00', // 海の日
    open: '10:00',
    close: '18:00',
    isClosed: false,
    reason: '海の日 - 特別営業時間'
  },
  {
    date: '2025-08-11T00:00:00+09:00', // 山の日
    open: '00:00',
    close: '00:00',
    isClosed: true,
    reason: '山の日 - 休業'
  },
  {
    date: '2025-09-23T00:00:00+09:00', // 秋分の日
    open: '10:00',
    close: '18:00',
    isClosed: false,
    reason: '秋分の日 - 特別営業時間'
  }
];
