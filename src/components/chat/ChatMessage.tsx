"use client";

import React from 'react';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import Image from 'next/image';

interface ChatMessageProps {
  message: ChatMessageType;
  onRetry?: (message: string, userMessageIndex: number) => void;
  onClearHistory?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onRetry, onClearHistory }) => {
  const isUser = message.role === 'user';
  const isError = message.isError;
  const isRetrying = message.isRetrying;
  const isThinking = message.isThinking;
  const needsClearHistory = message.needsClearHistory;
  
  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* DJニャンアバター */}
      {!isUser && (
        <div className="mr-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image 
              src="/images/dj-nyan.png" 
              alt="DJニャン" 
              width={32} 
              height={32} 
            />
          </div>
        </div>
      )}
      
      {/* メッセージ内容 */}
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${isUser 
          ? 'bg-blue-500 text-white rounded-tr-none' 
          : isError 
            ? 'bg-red-50 text-gray-800 rounded-tl-none border border-red-200'
            : isRetrying
            ? 'bg-yellow-50 text-gray-800 rounded-tl-none border border-yellow-200'
            : isThinking
            ? 'bg-purple-50 text-gray-800 rounded-tl-none border border-purple-200 animate-pulse'
            : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        
        {/* リトライボタン */}
        {!isUser && message.retryMessage && message.retryUserMessageIndex !== undefined && onRetry && (
          <div className="mt-3">
            <button 
              onClick={() => onRetry(message.retryMessage!, message.retryUserMessageIndex!)}
              className="bg-pink-500 hover:bg-pink-600 text-white py-1 px-3 rounded-full text-sm flex items-center transition-colors"
            >
              <span className="mr-1">もう一度試すニャン</span>
              <span className="text-lg">🐱</span>
            </button>
          </div>
        )}
        
        {/* 履歴クリアボタン */}
        {!isUser && needsClearHistory && onClearHistory && (
          <div className="mt-3">
            <button 
              onClick={onClearHistory}
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-full text-sm flex items-center transition-colors"
            >
              <span className="mr-1">履歴をクリア</span>
              <span className="text-lg">🔄</span>
            </button>
          </div>
        )}
        
        {/* タイムスタンプ */}
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : isError ? 'text-red-400' : isRetrying ? 'text-yellow-500' : isThinking ? 'text-purple-500' : 'text-gray-500'}`}>
          {message.timestamp?.toLocaleTimeString() || ''}
          {isRetrying && ' (自動リトライ中...)'}
          {isThinking && ' (考え中...)'}
        </div>
      </div>
      
      {/* ユーザーアバター */}
      {isUser && (
        <div className="ml-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <span className="text-sm">U</span>
          </div>
        </div>
      )}
    </div>
  );
};
