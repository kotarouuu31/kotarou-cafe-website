"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { ChatMessage as ChatMessageType, ChatState } from '@/types/chat';
import Image from 'next/image';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// 初期メッセージ
const INITIAL_GREETING: ChatMessageType = {
  role: 'assistant',
  content: 'こんにちは！DJニャンだニャン！🐱🎧 Kotarou Cafeについて何か知りたいことがあれば、お気軽に聞いてほしいニャ〜♪',
  timestamp: new Date()
};

// Gemini APIのためのダミーユーザーメッセージ
const DUMMY_USER_MESSAGE: ChatMessageType = {
  role: 'user',
  content: 'こんにちは',
  timestamp: new Date(new Date().getTime() - 1000) // 初期メッセージより1秒前
};

// 最大メッセージ履歴数
const MAX_MESSAGES = 20;

// 連続リクエスト間の最小待機時間（ミリ秒）
const MIN_REQUEST_INTERVAL = 1500;

interface InlineChatWidgetProps {
  onMessageSent?: (messageLength: number) => void;
}

export const InlineChatWidget: React.FC<InlineChatWidgetProps> = ({ onMessageSent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // ローカルストレージからチャット履歴を読み込む
  const [savedMessages, setSavedMessages, resetSavedMessages] = useLocalStorage<ChatMessageType[]>(
    'dj-nyan-inline-chat-history',
    [DUMMY_USER_MESSAGE, INITIAL_GREETING]
  );
  
  const [chatState, setChatState] = useState<ChatState>({
    messages: savedMessages,
    isLoading: false
  });
  
  // 最後のリクエスト時間を追跡
  const lastRequestTimeRef = useRef<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // チャット履歴をローカルストレージに保存
  useEffect(() => {
    if (chatState.messages.length > 0) {
      setSavedMessages(chatState.messages);
    }
  }, [chatState.messages, setSavedMessages]);

  // メッセージが追加されたときに自動スクロール
  useEffect(() => {
    if (messagesEndRef.current && isExpanded) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatState.messages, isExpanded]);

  // チャット履歴をクリアする関数
  const clearChatHistory = () => {
    const confirmClear = window.confirm('チャット履歴をクリアしますか？');
    if (confirmClear) {
      setChatState({
        messages: [DUMMY_USER_MESSAGE, INITIAL_GREETING],
        isLoading: false
      });
      resetSavedMessages();
    }
  };

  // メッセージ履歴を適切なサイズに保つ関数
  const trimMessageHistory = (messages: ChatMessageType[]): ChatMessageType[] => {
    if (messages.length > MAX_MESSAGES) {
      const excessCount = messages.length - MAX_MESSAGES;
      return [...messages.slice(0, 2), ...messages.slice(2 + excessCount)];
    }
    return messages;
  };

  // 「考え中」メッセージを表示する関数
  const showThinkingMessage = () => {
    const thinkingMessages = [
      'ちょっと考え中ニャ〜🤔',
      'にゃんにゃん...考えてるニャ🐱',
      'もう少し待ってほしいニャン✨',
      'ふにゃ〜、難しい質問だニャ🎵',
      'DJ魂で答えを探してるニャ〜🎧'
    ];
    
    const randomMessage = thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
    
    const thinkingMsg: ChatMessageType = {
      role: 'assistant',
      content: randomMessage,
      timestamp: new Date(),
      isThinking: true
    };
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, thinkingMsg]
    }));
    
    return thinkingMsg;
  };

  const handleSendMessage = async (message: string, retryCount = 0, originalMessageIndex?: number) => {
    if (!message.trim()) return;
    
    // 新規メッセージの場合のみアナリティクスイベントを送信
    if (retryCount === 0 && onMessageSent) {
      onMessageSent(message.length);
    }

    // 新規メッセージか再試行かを判断
    const isRetry = retryCount > 0;
    
    // 連続リクエストの制限（リトライの場合は適用しない）
    if (!isRetry) {
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTimeRef.current;
      
      if (timeSinceLastRequest < MIN_REQUEST_INTERVAL && lastRequestTimeRef.current !== 0) {
        // 待機時間を計算
        const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
        console.log(`Rate limiting: Waiting ${waitTime}ms before sending next request`);
        
        // 「考え中」メッセージを表示
        const thinkingMsg = showThinkingMessage();
        
        // 待機後にリクエストを送信
        await new Promise(resolve => setTimeout(resolve, waitTime));
        
        // 「考え中」メッセージを削除する準備
        setChatState(prev => ({
          ...prev,
          messages: prev.messages.filter(msg => msg !== thinkingMsg)
        }));
      }
      
      // 最後のリクエスト時間を更新
      lastRequestTimeRef.current = Date.now();
      
      // ユーザーメッセージを追加
      const userMessage: ChatMessageType = {
        role: 'user',
        content: message,
        timestamp: new Date()
      };

      setChatState(prev => {
        // メッセージ履歴を適切なサイズに保つ
        const trimmedMessages = trimMessageHistory([...prev.messages, userMessage]);
        
        return {
          ...prev,
          messages: trimmedMessages,
          isLoading: true
        };
      });
    } else {
      // リトライの場合はローディング状態のみ更新
      setChatState(prev => ({
        ...prev,
        isLoading: true
      }));
      
      console.log(`Retrying message (attempt ${retryCount}/3)...`);
    }

    try {
      // 送信するメッセージ配列を準備
      const messagesToSend = isRetry && originalMessageIndex !== undefined
        ? chatState.messages.slice(0, originalMessageIndex + 1) // リトライの場合は元のメッセージまで
        : chatState.messages.concat({
            role: 'user',
            content: message,
            timestamp: new Date()
          });
      
      // APIリクエストの詳細をログ出力
      console.log('Sending request to API with messages:', messagesToSend);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messagesToSend
        }),
      });

      // レスポンスの詳細をログ出力
      console.log('API Response status:', response.status);
      const data = await response.json();
      console.log('API Response data:', data);

      // 503エラーの場合は自動リトライ
      if (response.status === 503 && retryCount < 3) {
        console.log(`Server busy (503). Will retry in 3 seconds... (${retryCount + 1}/3)`);
        
        // リトライ中のメッセージを表示（最初のリトライの場合のみ）
        if (retryCount === 0) {
          const retryingMessage: ChatMessageType = {
            role: 'assistant',
            content: `サーバーが混雑してるニャ〜、少し待ってから試すニャ！🐱 (${retryCount + 1}/3)`,
            timestamp: new Date(),
            isRetrying: true
          };
          
          setChatState(prev => ({
            ...prev,
            messages: [...prev.messages, retryingMessage],
            isLoading: true
          }));
        }
        
        // 3秒後に自動リトライ
        setTimeout(() => {
          const userMessageIndex = isRetry && originalMessageIndex !== undefined
            ? originalMessageIndex
            : chatState.messages.length - 1;
            
          handleSendMessage(message, retryCount + 1, userMessageIndex);
        }, 3000);
        return;
      }

      // その他のエラー
      if (!response.ok) {
        throw new Error(`API error: ${data.error || response.statusText}`);
      }

      // アシスタントの返答を追加
      const assistantMessage: ChatMessageType = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date()
      };

      setChatState(prev => {
        // リトライ中や考え中のメッセージがあれば削除
        const filteredMessages = prev.messages.filter(
          msg => !('isRetrying' in msg) && !('isThinking' in msg)
        );
        
        // メッセージ履歴を適切なサイズに保つ
        const trimmedMessages = trimMessageHistory([...filteredMessages, assistantMessage]);
        
        return {
          ...prev,
          messages: trimmedMessages,
          isLoading: false
        };
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      // エラーメッセージを表示
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const is503 = errorMessage.includes('503') || errorMessage.toLowerCase().includes('service unavailable');
      const isGenerationError = errorMessage.includes('Failed to generate response');
      
      let errorContent = '';
      if (is503) {
        errorContent = `サーバーが混雑してるニャ〜、少し待ってから試すニャ！🐱\n\n「もう一度試すニャン」ボタンを押してみてニャ！`;
      } else if (isGenerationError) {
        errorContent = `ごめんニャさい！考えがまとまらなかったニャ〜🙀\n\n会話が長くなってきたから、もう一度最初から話してほしいニャ。\n\n「履歴をクリア」ボタンを押してみるニャ！`;
      } else {
        errorContent = `申し訳ありませんが、エラーが発生しましたニャン。もう一度試してみてくださいニャ。\n\n(デバッグ情報: ${errorMessage})`;
      }
      
      const assistantErrorMessage: ChatMessageType = {
        role: 'assistant',
        content: errorContent,
        timestamp: new Date(),
        isError: true,
        retryMessage: is503 ? message : undefined,
        retryUserMessageIndex: isRetry && originalMessageIndex !== undefined
          ? originalMessageIndex
          : chatState.messages.length - 1,
        needsClearHistory: isGenerationError
      };

      setChatState(prev => {
        // リトライ中や考え中のメッセージがあれば削除
        const filteredMessages = prev.messages.filter(
          msg => !('isRetrying' in msg) && !('isThinking' in msg)
        );
        
        return {
          ...prev,
          messages: [...filteredMessages, assistantErrorMessage],
          isLoading: false
        };
      });
    }
  };

  // リトライボタンのハンドラー
  const handleRetry = (message: string, userMessageIndex: number) => {
    handleSendMessage(message, 0, userMessageIndex);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* DJ Nyanko AIセクション */}
      <div className="bg-gradient-to-br from-accent/20 to-primary/20 p-6 rounded-xl text-center">
        {/* ヘッダー */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-white p-2 mr-3 shadow-md">
            <Image 
              src="/images/dj-nyan.png" 
              alt="DJニャン" 
              width={48}
              height={48}
              className="object-cover rounded-full"
            />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-heading font-bold">DJ Nyanko AI</h2>
            <p className="text-xs text-foreground/70">Kotarou Cafe Assistant</p>
          </div>
        </div>
        
        <p className="text-sm text-foreground/80 mb-4">
          音楽のことならなんでも知っている、Kotarou Cafeの看板猫DJ。
          好きな音楽や気分を伝えれば、ぴったりの一曲をおすすめしてくれます。
        </p>
        
        {/* チャット展開ボタン */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center mx-auto space-x-2"
        >
          <span>{isExpanded ? 'チャットを閉じる' : 'Chat with DJ Nyanko'}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
      
      {/* チャットエリア */}
      {isExpanded && (
        <div className="mt-4 bg-white rounded-xl shadow-lg border border-primary/20 overflow-hidden animate-fade-in">
          {/* メッセージエリア */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50/50">
            {chatState.messages.map((msg, index) => {
              // ダミーメッセージは表示しない
              if (index === 0 && msg === DUMMY_USER_MESSAGE) return null;
              
              return (
                <ChatMessage 
                  key={index} 
                  message={msg} 
                  onRetry={handleRetry}
                  onClearHistory={clearChatHistory}
                />
              );
            })}
            
            {/* ローディングインジケーター */}
            {chatState.isLoading && !chatState.messages.some(msg => msg.isRetrying || msg.isThinking) && (
              <div className="flex justify-start mb-4">
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
                <div className="bg-gray-100 text-gray-500 rounded-lg p-3 max-w-[80%] rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* 入力エリア */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <ChatInput onSendMessage={handleSendMessage} isLoading={chatState.isLoading} />
          </div>
        </div>
      )}
    </div>
  );
};
