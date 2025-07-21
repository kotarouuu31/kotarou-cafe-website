"use client";

import dynamic from 'next/dynamic';

// コンポーネントを動的インポート
const EventGallery = dynamic(() => import('@/components/events/EventGallery'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse text-gray-500">読み込み中...</div>
    </div>
  ),
});

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <EventGallery />
    </div>
  );
}
