export type EventType = 'live' | 'dj' | 'workshop' | 'special' | 'closed';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  type: EventType;
  price?: number; // Optional price in yen
  image?: string; // Optional image URL
  isRecurring?: boolean;
  recurrencePattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    dayOfWeek?: number; // 0-6, where 0 is Sunday
    dayOfMonth?: number; // 1-31
    interval?: number; // every X days/weeks/months
    endDate?: string; // ISO date string for when recurrence ends
  };
}

export interface BusinessHours {
  dayOfWeek: number; // 0-6, where 0 is Sunday
  open: string; // 24-hour format, e.g., "09:00"
  close: string; // 24-hour format, e.g., "21:00"
  isClosed: boolean;
}

export interface SpecialBusinessHours {
  date: string; // ISO date string
  open: string; // 24-hour format, e.g., "09:00"
  close: string; // 24-hour format, e.g., "21:00"
  isClosed: boolean;
  reason?: string; // e.g., "Holiday", "Special Event"
}
