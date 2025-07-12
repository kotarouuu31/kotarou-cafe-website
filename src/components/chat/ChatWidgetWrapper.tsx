"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useAnalytics } from '@/hooks/useAnalytics';

// ChatWidgetを動的にインポート（クライアントサイドのみでレンダリング）
const ChatWidget = dynamic(() => import('./ChatWidget').then(mod => ({ default: mod.ChatWidget })), {
  ssr: false,
});

export const ChatWidgetWrapper: React.FC = () => {
  const analytics = useAnalytics();
  
  // ChatWidgetにアナリティクス関数を渡す
  return <ChatWidget 
    onChatOpen={analytics.trackChatOpen}
    onMessageSent={analytics.trackChatMessageSent}
  />;
};
