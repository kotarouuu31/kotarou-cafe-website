"use client";

import React from 'react';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Event } from '../types/events';
import { getEventTypeName, getEventTypeClass } from '../utils/eventUtils';

type EventDetailProps = {
  event: Event;
  onClose?: () => void;
};

const EventDetail: React.FC<EventDetailProps> = ({ event, onClose }) => {
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);
  
  // 繰り返しパターンのテキスト表示
  const getRecurrenceText = () => {
    if (!event.isRecurring || !event.recurrencePattern) return '';
    
    const { frequency, dayOfWeek, dayOfMonth, interval = 1, endDate } = event.recurrencePattern;
    const endDateObj = endDate ? parseISO(endDate) : null;
    
    const weekdays = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    
    let text = '';
    
    if (frequency === 'weekly' && dayOfWeek !== undefined) {
      text = interval === 1 
        ? `毎週${weekdays[dayOfWeek]}` 
        : `${interval}週間ごとの${weekdays[dayOfWeek]}`;
    } else if (frequency === 'monthly' && dayOfMonth !== undefined) {
      text = interval === 1 
        ? `毎月${dayOfMonth}日` 
        : `${interval}ヶ月ごとの${dayOfMonth}日`;
    } else if (frequency === 'daily') {
      text = interval === 1 
        ? '毎日' 
        : `${interval}日ごと`;
    }
    
    if (endDateObj) {
      text += `（${format(endDateObj, 'yyyy年MM月dd日', { locale: ja })}まで）`;
    }
    
    return text;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="relative bg-primary text-white p-4">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="font-heading text-2xl">{event.title}</h3>
        <div className="flex items-center mt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeClass(event.type)}`}>
            {getEventTypeName(event.type)}
          </span>
        </div>
      </div>
      
      {/* イベント画像 */}
      {event.image && (
        <div className="relative w-full h-48 md:h-64">
          <Image 
            src={event.image} 
            alt={event.title} 
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      
      {/* イベント詳細 */}
      <div className="p-4">
        <div className="mb-4">
          <h4 className="font-medium text-lg mb-2">日時</h4>
          <p>
            {format(startDate, 'yyyy年MM月dd日(E)', { locale: ja })} {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
          </p>
          {event.isRecurring && (
            <p className="text-sm text-primary mt-1">
              <span className="inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {getRecurrenceText()}
              </span>
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-lg mb-2">詳細</h4>
          <p>{event.description}</p>
        </div>
        
        {event.price !== undefined && (
          <div className="mb-4">
            <h4 className="font-medium text-lg mb-2">料金</h4>
            <p className="text-xl font-bold text-primary">{event.price.toLocaleString()}円</p>
          </div>
        )}
        
        <div className="mt-6">
          <button 
            className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
          >
            予約する
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
