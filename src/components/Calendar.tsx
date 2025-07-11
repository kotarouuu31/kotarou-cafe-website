"use client";

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Event } from '../types/events';
import { getEventsForDate, formatDate, getEventTypeClass } from '../utils/eventUtils';

// カレンダーのCSSをインポート
import 'react-calendar/dist/Calendar.css';

type CalendarProps = {
  events: Event[];
  onDateClick?: (date: Date) => void;
};

const EventCalendar: React.FC<CalendarProps> = ({ events, onDateClick }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // 指定した日付のイベントを取得
  const eventsForSelectedDate = getEventsForDate(events, selectedDate);

  // 日付をクリックしたときの処理
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (onDateClick) {
      onDateClick(date);
    }
  };

  // カレンダーのタイルにイベントマーカーを表示
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const eventsForDate = getEventsForDate(events, date);
      
      if (eventsForDate.length > 0) {
        return (
          <div className="flex flex-wrap justify-center mt-1">
            {eventsForDate.slice(0, 3).map((event, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full mx-0.5 ${
                  event.type === 'live' ? 'bg-blue-500' :
                  event.type === 'dj' ? 'bg-purple-500' :
                  event.type === 'workshop' ? 'bg-green-500' :
                  event.type === 'special' ? 'bg-amber-500' :
                  'bg-red-500'
                }`}
              />
            ))}
            {eventsForDate.length > 3 && (
              <span className="text-xs ml-1">+{eventsForDate.length - 3}</span>
            )}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-heading text-2xl">イベントカレンダー</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-md ${
              viewMode === 'calendar' ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
            onClick={() => setViewMode('calendar')}
          >
            カレンダー
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
            onClick={() => setViewMode('list')}
          >
            リスト
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div className="calendar-container">
          <Calendar
            locale="ja-JP"
            value={selectedDate}
            onChange={handleDateClick as any}
            tileContent={tileContent}
            className="rounded-lg border-none shadow-sm"
            formatDay={(locale, date) => format(date, 'd')}
            formatMonthYear={(locale, date) => format(date, 'yyyy年MM月', { locale: ja })}
            next2Label={null}
            prev2Label={null}
            nextLabel="▶"
            prevLabel="◀"
          />
          <style jsx global>{`
            .react-calendar {
              width: 100%;
              border: none;
              font-family: var(--font-poppins);
            }
            .react-calendar__tile--active {
              background: var(--primary);
              color: white;
            }
            .react-calendar__tile--now {
              background: var(--accent-light);
            }
            .react-calendar__navigation button:enabled:hover,
            .react-calendar__navigation button:enabled:focus,
            .react-calendar__tile:enabled:hover,
            .react-calendar__tile:enabled:focus {
              background-color: var(--primary-light);
            }
            .react-calendar__tile--active:enabled:hover,
            .react-calendar__tile--active:enabled:focus {
              background: var(--primary);
            }
          `}</style>
        </div>
      ) : (
        <div className="event-list">
          <h4 className="font-heading text-xl mb-3">
            {formatDate(selectedDate)}のイベント
          </h4>
          {eventsForSelectedDate.length > 0 ? (
            <ul className="space-y-3">
              {eventsForSelectedDate.map((event) => (
                <li
                  key={event.id}
                  className="border-l-4 pl-3 py-2 rounded-r-md shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderLeftColor: event.type === 'live' ? '#3b82f6' : 
                                          event.type === 'dj' ? '#8b5cf6' : 
                                          event.type === 'workshop' ? '#10b981' : 
                                          event.type === 'special' ? '#f59e0b' : '#ef4444' }}
                >
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium text-lg">{event.title}</h5>
                    <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeClass(event.type)}`}>
                      {event.type === 'live' ? 'ライブ' : 
                       event.type === 'dj' ? 'DJ' : 
                       event.type === 'workshop' ? 'ワークショップ' : 
                       event.type === 'special' ? '特別イベント' : '休業'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {format(parseISO(event.startDate), 'HH:mm')} - {format(parseISO(event.endDate), 'HH:mm')}
                  </p>
                  <p className="text-sm mt-1">{event.description}</p>
                  {event.price && (
                    <p className="text-sm font-medium mt-1">料金: {event.price.toLocaleString()}円</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">イベントはありません</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
