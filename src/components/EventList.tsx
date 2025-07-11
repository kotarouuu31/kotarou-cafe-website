"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { format, parseISO, isFuture } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Event } from '../types/events';
import { getEventTypeName, getEventTypeClass } from '../utils/eventUtils';
import EventDetail from './EventDetail';

type EventListProps = {
  events: Event[];
  title?: string;
  showPast?: boolean;
};

const EventList: React.FC<EventListProps> = ({ 
  events, 
  title = "イベント情報", 
  showPast = false 
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  // イベントをフィルタリング
  const filteredEvents = events
    .filter(event => {
      // 過去のイベントを表示するかどうか
      if (!showPast && !isFuture(parseISO(event.startDate))) {
        return false;
      }
      
      // タイプでフィルタリング
      if (filter !== 'all' && event.type !== filter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h3 className="font-heading text-2xl mb-3 md:mb-0">{title}</h3>
        
        {/* フィルターボタン */}
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
            onClick={() => setFilter('all')}
          >
            すべて
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              filter === 'live' ? 'bg-blue-500 text-white' : 'bg-blue-100'
            }`}
            onClick={() => setFilter('live')}
          >
            ライブ
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              filter === 'dj' ? 'bg-purple-500 text-white' : 'bg-purple-100'
            }`}
            onClick={() => setFilter('dj')}
          >
            DJ
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              filter === 'workshop' ? 'bg-green-500 text-white' : 'bg-green-100'
            }`}
            onClick={() => setFilter('workshop')}
          >
            ワークショップ
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              filter === 'special' ? 'bg-amber-500 text-white' : 'bg-amber-100'
            }`}
            onClick={() => setFilter('special')}
          >
            特別イベント
          </button>
        </div>
      </div>
      
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map(event => (
            <div 
              key={event.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              {/* イベント画像 */}
              {event.image && (
                <div className="relative w-full h-40">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              
              {/* イベント情報 */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-lg line-clamp-1">{event.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeClass(event.type)}`}>
                    {getEventTypeName(event.type)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {format(parseISO(event.startDate), 'yyyy年MM月dd日(E)', { locale: ja })}
                  <br />
                  {format(parseISO(event.startDate), 'HH:mm')} - {format(parseISO(event.endDate), 'HH:mm')}
                </p>
                
                <p className="text-sm line-clamp-2 mb-3">{event.description}</p>
                
                {event.price !== undefined && (
                  <p className="text-sm font-medium">料金: {event.price.toLocaleString()}円</p>
                )}
                
                {event.isRecurring && (
                  <div className="mt-2 flex items-center text-xs text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    定期イベント
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">該当するイベントはありません</p>
      )}
      
      {/* イベント詳細モーダル */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <EventDetail 
              event={selectedEvent} 
              onClose={() => setSelectedEvent(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
