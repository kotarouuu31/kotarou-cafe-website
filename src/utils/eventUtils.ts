import { Event, BusinessHours, SpecialBusinessHours } from '../types/events';
import { format, parseISO, isWithinInterval, isSameDay, addDays, addWeeks, addMonths, getDay, getDate } from 'date-fns';
import { ja } from 'date-fns/locale';

// 指定した日付のイベントを取得する
export function getEventsForDate(events: Event[], date: Date): Event[] {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  return events.filter(event => {
    const eventStart = parseISO(event.startDate);
    const eventEnd = parseISO(event.endDate);
    
    // 単発イベントの場合
    if (!event.isRecurring) {
      return isWithinInterval(targetDate, { start: eventStart, end: eventEnd }) || 
             isSameDay(targetDate, eventStart) || 
             isSameDay(targetDate, eventEnd);
    }
    
    // 繰り返しイベントの場合
    if (event.recurrencePattern) {
      const { frequency, dayOfWeek, dayOfMonth, interval = 1, endDate } = event.recurrencePattern;
      const recurrenceEndDate = endDate ? parseISO(endDate) : new Date(2099, 11, 31);
      
      // 繰り返しの終了日を過ぎている場合
      if (targetDate > recurrenceEndDate) {
        return false;
      }
      
      // 開始日より前の場合
      if (targetDate < eventStart) {
        return false;
      }
      
      // 曜日ベースの繰り返し
      if (frequency === 'weekly' && dayOfWeek !== undefined) {
        return getDay(targetDate) === dayOfWeek && 
               (Math.floor((targetDate.getTime() - eventStart.getTime()) / (7 * 24 * 60 * 60 * 1000)) % interval === 0);
      }
      
      // 日付ベースの繰り返し
      if (frequency === 'monthly' && dayOfMonth !== undefined) {
        return getDate(targetDate) === dayOfMonth;
      }
      
      // 毎日の繰り返し
      if (frequency === 'daily') {
        const daysDiff = Math.floor((targetDate.getTime() - eventStart.getTime()) / (24 * 60 * 60 * 1000));
        return daysDiff % interval === 0;
      }
    }
    
    return false;
  });
}

// 指定した月のイベントを取得する
export function getEventsForMonth(events: Event[], year: number, month: number): Event[] {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  
  return events.filter(event => {
    const eventStart = parseISO(event.startDate);
    const eventEnd = parseISO(event.endDate);
    
    // 単発イベント
    if (!event.isRecurring) {
      return (eventStart <= endDate && eventEnd >= startDate);
    }
    
    // 繰り返しイベント
    if (event.recurrencePattern) {
      const { endDate: recurrenceEndDateStr } = event.recurrencePattern;
      const recurrenceEndDate = recurrenceEndDateStr ? parseISO(recurrenceEndDateStr) : new Date(2099, 11, 31);
      
      // 繰り返しの終了日が月の開始日より前の場合
      if (recurrenceEndDate < startDate) {
        return false;
      }
      
      // イベントの開始日が月の終了日より後の場合
      if (eventStart > endDate) {
        return false;
      }
      
      return true;
    }
    
    return false;
  });
}

// 特定の日の営業時間を取得する
export function getBusinessHoursForDate(
  date: Date,
  regularHours: BusinessHours[],
  specialHours: SpecialBusinessHours[]
): { open: string; close: string; isClosed: boolean; isSpecial: boolean; reason?: string } {
  // まず特別営業時間をチェック
  const specialHour = specialHours.find(sh => isSameDay(parseISO(sh.date), date));
  
  if (specialHour) {
    return {
      open: specialHour.open,
      close: specialHour.close,
      isClosed: specialHour.isClosed,
      isSpecial: true,
      reason: specialHour.reason
    };
  }
  
  // 通常営業時間を返す
  const dayOfWeek = getDay(date);
  const regularHour = regularHours.find(rh => rh.dayOfWeek === dayOfWeek);
  
  if (regularHour) {
    return {
      open: regularHour.open,
      close: regularHour.close,
      isClosed: regularHour.isClosed,
      isSpecial: false
    };
  }
  
  // デフォルト値（通常はここには到達しない）
  return {
    open: '09:00',
    close: '18:00',
    isClosed: false,
    isSpecial: false
  };
}

// 日付をフォーマットする
export function formatDate(date: Date, formatStr: string = 'yyyy年MM月dd日(E)'): string {
  return format(date, formatStr, { locale: ja });
}

// 時間をフォーマットする
export function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(':');
  return `${hours}:${minutes}`;
}

// イベントタイプに応じたスタイルクラスを取得する
export function getEventTypeClass(type: string): string {
  switch (type) {
    case 'live':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'dj':
      return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'workshop':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'special':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'closed':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}

// イベントタイプの日本語名を取得する
export function getEventTypeName(type: string): string {
  switch (type) {
    case 'live':
      return 'ライブ';
    case 'dj':
      return 'DJ';
    case 'workshop':
      return 'ワークショップ';
    case 'special':
      return '特別イベント';
    case 'closed':
      return '休業';
    default:
      return 'その他';
  }
}
