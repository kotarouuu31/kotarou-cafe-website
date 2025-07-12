'use client';

import { useCallback } from 'react';
import { sendGAEvent } from '@/components/analytics/GoogleAnalytics';

// イベントカテゴリ
export enum EventCategory {
  Chat = 'chat',
  Navigation = 'navigation',
  Menu = 'menu',
  Social = 'social',
  Contact = 'contact',
  Music = 'music',
}

// アナリティクスフック
export const useAnalytics = () => {
  // チャットイベント
  const trackChatOpen = useCallback(() => {
    sendGAEvent('chat_open', { event_category: EventCategory.Chat });
  }, []);

  const trackChatMessageSent = useCallback((messageLength: number) => {
    sendGAEvent('chat_message_sent', { 
      event_category: EventCategory.Chat,
      message_length: messageLength 
    });
  }, []);

  // ナビゲーションイベント
  const trackPageView = useCallback((pagePath: string, pageTitle: string) => {
    sendGAEvent('page_view', { 
      event_category: EventCategory.Navigation,
      page_path: pagePath,
      page_title: pageTitle
    });
  }, []);

  // メニューイベント
  const trackMenuItemView = useCallback((itemName: string, itemCategory: string) => {
    sendGAEvent('menu_item_view', { 
      event_category: EventCategory.Menu,
      item_name: itemName,
      item_category: itemCategory
    });
  }, []);

  // SNSイベント
  const trackSocialShare = useCallback((platform: string) => {
    sendGAEvent('social_share', { 
      event_category: EventCategory.Social,
      platform: platform
    });
  }, []);

  // お問い合わせイベント
  const trackContactFormSubmit = useCallback(() => {
    sendGAEvent('contact_form_submit', { 
      event_category: EventCategory.Contact 
    });
  }, []);

  // 音楽関連イベント
  const trackMusicPlay = useCallback((trackName: string, artist: string) => {
    sendGAEvent('music_play', { 
      event_category: EventCategory.Music,
      track_name: trackName,
      artist: artist
    });
  }, []);

  return {
    trackChatOpen,
    trackChatMessageSent,
    trackPageView,
    trackMenuItemView,
    trackSocialShare,
    trackContactFormSubmit,
    trackMusicPlay
  };
};
