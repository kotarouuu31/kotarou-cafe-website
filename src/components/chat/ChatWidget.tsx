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

// 最大メッセージ履歴数（これを超えると古いメッセージが削除される）
const MAX_MESSAGES = 20;

// 連続リクエスト間の最小待機時間（ミリ秒）
const MIN_REQUEST_INTERVAL = 1500;

interface ChatWidgetProps {
  onChatOpen?: () => void;
  onMessageSent?: (messageLength: number) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onChatOpen, onMessageSent }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // ローカルストレージからチャット履歴を読み込む
  const [savedMessages, setSavedMessages, resetSavedMessages] = useLocalStorage<ChatMessageType[]>(
    'dj-nyan-chat-history',
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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatState.messages]);

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
    // メッセージ数がMAX_MESSAGESを超える場合、古いメッセージを削除
    // ただし、最初のダミーメッセージと初期挨拶は常に保持
    if (messages.length > MAX_MESSAGES) {
      const excessCount = messages.length - MAX_MESSAGES;
      // 最初の2つのメッセージ（ダミーと初期挨拶）を保持し、その後の古いメッセージを削除
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
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* チャットウィンドウ */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 md:w-[450px] h-[500px] flex flex-col overflow-hidden border border-primary/20 animate-fade-in mb-4">
          {/* ヘッダー */}
          <div className="bg-primary text-white p-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white p-1 mr-2">
                <Image 
                  src="/images/dj-nyan.png" 
                  alt="DJニャン" 
                  width={32}
                  height={32}
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-bold">DJニャン</h3>
                <p className="text-xs opacity-80">Kotarou Cafe Assistant</p>
              </div>
            </div>
            <div className="text-xs bg-white/20 px-2 py-1 rounded-full">オンライン</div>
          </div>
          
          {/* メッセージエリア */}
          <div className="flex-1 overflow-y-auto p-4" ref={messagesEndRef}>
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
          </div>
          
          {/* 入力エリア */}
          <div className="border-t border-gray-200 p-3">
            <ChatInput onSendMessage={handleSendMessage} isLoading={chatState.isLoading} />
          </div>
        </div>
      )}
      
      {/* チャットボタン */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          // チャットを開いたときのみアナリティクスイベントを送信
          if (!isOpen && onChatOpen) {
            onChatOpen();
          }
        }}
        className={`${isOpen ? 'bg-gray-600' : 'bg-primary'} text-white rounded-full p-3 shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center w-14 h-14`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
            <span className="absolute -top-1 -right-1 text-xs">🎵</span>
          </div>
        )}
      </button>
    </div>
  );
};
