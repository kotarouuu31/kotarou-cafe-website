"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Event } from '@/types/events';
import { Calendar, Clock, DollarSign } from 'lucide-react';

interface EventCardProps {
  event: Event;
  index: number;
}

export const EventCard = ({ event, index }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventTypeLabel = (type: string) => {
    const labels = {
      live: '🎵 ライブ',
      dj: '🎧 DJ',
      workshop: '☕ ワークショップ',
      special: '✨ 特別イベント',
      closed: '🚫 休業'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* イベント画像 */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={event.image || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb'}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 400px) 100vw, 400px"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
            {getEventTypeLabel(event.type)}
          </span>
        </div>
      </div>

      {/* イベント情報 */}
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-gray-900 text-lg line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-3">
          {event.description}
        </p>

        {/* 日時・料金情報 */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-700">
            <Calendar size={16} className="mr-2 text-primary" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <Clock size={16} className="mr-2 text-primary" />
            <span>
              {formatTime(event.startDate)} - {formatTime(event.endDate)}
            </span>
          </div>
          
          {event.price && (
            <div className="flex items-center text-sm text-gray-700">
              <DollarSign size={16} className="mr-2 text-primary" />
              <span>{event.price.toLocaleString()}円</span>
            </div>
          )}
        </div>

        {/* 詳細ボタン */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          詳細を見る
        </motion.button>
      </div>
    </motion.div>
  );
};
