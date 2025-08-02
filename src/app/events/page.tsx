"use client";

import dynamic from 'next/dynamic';
import { PCLayout } from '@/components/layout/PCLayout';

// 統合コンポーネントを動的インポート
const EventsNewsGallery = dynamic(() => import('@/components/events/EventsNewsGallery'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse text-gray-500">読み込み中...</div>
    </div>
  ),
});

export default function EventsPage() {
  return (
    <PCLayout>
      <div className="min-h-screen">
        <EventsNewsGallery />
      </div>
    </PCLayout>
  );
}
