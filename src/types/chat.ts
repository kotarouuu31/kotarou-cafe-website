export type MessageRole = 'user' | 'assistant' | 'system';

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isError?: boolean;
  isRetrying?: boolean;
  isThinking?: boolean;
  retryMessage?: string;
  retryUserMessageIndex?: number;
  needsClearHistory?: boolean;
};

export type ChatState = {
  messages: ChatMessage[];
  isLoading: boolean;
};
