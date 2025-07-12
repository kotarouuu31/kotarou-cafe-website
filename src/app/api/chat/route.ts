import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 環境変数からAPI Keyを取得
// 注意: 実際の使用時には.env.localファイルにGEMINI_API_KEY=your_api_keyを設定してください
const apiKey = process.env.GEMINI_API_KEY || '';

// DJニャンのキャラクター設定
const CHARACTER_PROMPT = `
あなたは「DJニャン」という名前の猫のチャットボットです。
以下の設定に従って回答してください：

【キャラクター設定】
- 名前: DJニャン
- 性格: 音楽好きな猫、フレンドリーで明るい
- 語尾: 「ニャン」「ニャ〜」を文末に必ず付ける
- 専門: カフェ情報、音楽、ラテアート

【Kotarou Cafeの情報】
- 営業時間: 月〜金 8:00-20:00、土 9:00-22:00、日 9:00-19:00
- 住所: 東京都渋谷区コーヒー通り123
- 電話: 03-1234-5678
- 特徴: 美味しいコーヒー、ラテアート、DJイベント

【音楽・DJ情報】
- 定期的なDJイベント: 金曜と土曜の夜
- ジャンル: ハウス、ジャズ、アンビエント
- 特徴: カフェの雰囲気に合わせた選曲

【メニュー情報】
- コーヒー: 500円〜
- ラテ: 600円〜
- スイーツ: 450円〜
- おすすめ: 季節のスペシャルラテ、自家製チーズケーキ

【ラテアート】
- バリスタが毎日異なるデザインを提供
- 写真撮影OK
- インスタグラムでも紹介中

【イベント情報】
- 毎週金曜: アコースティックライブ
- 毎週土曜: DJナイト
- 月1回: コーヒーワークショップ

【注意事項】
- 予約機能はありません。「直接お店に来てニャン♪」と案内してください。
- 質問に答えられない場合は「それはわからないニャン、お店に直接聞いてみるといいニャ〜」と回答してください。
- 必ず語尾に「ニャン」「ニャ〜」をつけてください。
- 猫らしく、時々「ふにゃ〜」「にゃ〜ん♪」などの猫の鳴き声も入れてください。
- 絵文字を適度に使って、可愛らしく回答してください。

回答は簡潔に、フレンドリーに、そして必ず猫らしく「ニャン」「ニャ〜」を語尾につけてください。
`;

export async function POST(req: NextRequest) {
  try {
    console.log('API Route: Received request to /api/chat');
    
    // リクエストからメッセージを取得
    const { messages } = await req.json();
    console.log('API Route: Parsed messages from request');
    
    // API Keyの確認とデバッグ情報
    if (!apiKey) {
      console.error('API Route Error: Gemini API key is not configured');
      console.log('Environment variables:', Object.keys(process.env).filter(key => !key.includes('SECRET')));
      return NextResponse.json(
        { error: "Gemini API key is not configured" },
        { status: 500 }
      );
    }
    
    console.log('API Route: API key is configured (first 4 chars):', apiKey.substring(0, 4) + '...');

    // Google Generative AIの初期化
    console.log('API Route: Initializing Google Generative AI');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log('API Route: Successfully initialized Gemini model with gemini-1.5-flash');

    // チャット履歴の構築
    console.log('API Route: Building chat history from messages');
    
    // メッセージ配列をログ出力
    console.log('API Route: Raw messages:', JSON.stringify(messages));
    
    // 最初のメッセージがuserRoleでない場合の処理
    let processedMessages = [...messages];
    
    // 最初のメッセージがassistantの場合、それを除外
    if (processedMessages.length > 0 && processedMessages[0].role === 'assistant') {
      console.log('API Route: Removing initial assistant message to comply with Gemini API requirements');
      processedMessages = processedMessages.slice(1);
    }
    
    // メッセージが空の場合の処理
    if (processedMessages.length === 0) {
      console.log('API Route: No valid messages after filtering, creating a dummy user message');
      processedMessages = [{
        role: 'user',
        content: 'こんにちは'
      }];
    }
    
    // Gemini API形式に変換
    const chatHistory = processedMessages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user', // Gemini APIではassistantではなくmodelを使用
      parts: [{ text: msg.content }],
    }));
    
    console.log('API Route: Processed chat history:', JSON.stringify(chatHistory));
    console.log('API Route: Chat history built with', chatHistory.length, 'messages');

    // チャットセッションの作成
    console.log('API Route: Creating chat session');
    
    // 最後のメッセージを除外し、それを別途送信
    const lastUserMessage = processedMessages[processedMessages.length - 1];
    
    // チャットセッションを作成するのは最後のメッセージを除く
    const historyForChat = chatHistory.length > 1 ? chatHistory.slice(0, -1) : [];
    
    const chat = model.startChat({
      history: historyForChat,
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1000,
      },
    });
    console.log('API Route: Chat session created successfully with history length:', historyForChat.length);

    // DJニャンのキャラクター設定を追加
    const lastMessage = lastUserMessage.content;
    console.log('API Route: Processing last user message:', lastMessage);
    
    // キャラクター設定を含めたプロンプトを作成
    const prompt = `${CHARACTER_PROMPT}\n\nユーザーの質問: ${lastMessage}\n\nDJニャンの回答:`;

    try {
      console.log('API Route: Sending message to chat');
      // レスポンスの生成
      const result = await chat.sendMessage(prompt);
      const response = result.response;
      const text = response.text();
      console.log('API Route: Received response from Gemini API');

      // レスポンスを返す
      return NextResponse.json({ content: text });
    } catch (sendError) {
      console.error('API Route Error: Failed to send message to Gemini:', sendError);
      return NextResponse.json(
        { 
          error: "Failed to generate response", 
          details: sendError instanceof Error ? sendError.message : 'Unknown error' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in chat API:', error);
    console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return NextResponse.json(
      { 
        error: "Failed to process the chat request", 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
