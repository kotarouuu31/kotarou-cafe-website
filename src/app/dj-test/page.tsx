'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { HistoryData, NowPlaying, TrackInfo } from '@/types/serato';
import { generateMockHistoryData, getTrackHistory } from '@/lib/serato';
import NowPlayingComponent from '@/components/NowPlaying';
import TrackHistory from '@/components/TrackHistory';
import Link from 'next/link';

// 接続状態の型定義
type ConnectionStatus = {
  seratoRunning: boolean;
  ddjConnected: boolean;
  historyFileFound: boolean;
  lastUpdated: Date | null;
};

// ファイル選択結果の型定義
type FileParseResult = {
  success: boolean;
  message: string;
  data?: HistoryData | null;
  error?: string;
};

export default function DJTestPage() {
  // 状態管理
  const [historyData, setHistoryData] = useState<HistoryData | null>(null);
  const [useMockData, setUseMockData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    seratoRunning: false,
    ddjConnected: false,
    historyFileFound: false,
    lastUpdated: null
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parseResult, setParseResult] = useState<FileParseResult | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // ログ追加関数
  const addLog = useCallback((message: string) => {
    setLogs(prev => [
      `[${new Date().toLocaleTimeString()}] ${message}`,
      ...prev.slice(0, 49) // 最大50件まで保持
    ]);
  }, []);

  // データ読み込み関数
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 実際のデータ取得かモックデータ生成
      const data = useMockData 
        ? generateMockHistoryData(15)
        : generateMockHistoryData(15); // 将来的にはAPIエンドポイントからデータを取得
      
      setHistoryData(data);
      addLog(useMockData ? "モックデータを生成しました" : "実データを取得しました");
      
      // 接続状態の更新（モック）
      if (!useMockData) {
        setConnectionStatus(prev => ({
          ...prev,
          lastUpdated: new Date()
        }));
      }
    } catch (error) {
      console.error('Failed to load DJ data:', error);
      addLog(`データ読み込みエラー: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  }, [useMockData, addLog]);

  // 初期データ読み込み
  useEffect(() => {
    loadData();
    
    // 30秒ごとにデータを更新
    const intervalId = setInterval(() => {
      if (!selectedFile) { // ファイル選択モードでない場合のみ自動更新
        loadData();
      }
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [loadData, selectedFile]);

  // モックデータ/実データ切り替え
  const toggleDataSource = () => {
    setUseMockData(!useMockData);
    addLog(`データソースを${!useMockData ? 'モック' : '実'}データに切り替えました`);
  };

  // 接続状態チェック（モック実装）
  const checkConnectionStatus = useCallback(() => {
    setIsLoading(true);
    addLog("接続状態をチェック中...");
    
    // モック実装: ランダムな接続状態を生成
    setTimeout(() => {
      const mockStatus: ConnectionStatus = {
        seratoRunning: Math.random() > 0.3,
        ddjConnected: Math.random() > 0.4,
        historyFileFound: Math.random() > 0.5,
        lastUpdated: new Date()
      };
      
      setConnectionStatus(mockStatus);
      addLog(`接続状態: Serato ${mockStatus.seratoRunning ? '起動中' : '未起動'}, DDJ ${mockStatus.ddjConnected ? '接続済' : '未接続'}, 履歴ファイル ${mockStatus.historyFileFound ? '検出' : '未検出'}`);
      setIsLoading(false);
    }, 1500);
  }, [addLog]);

  // ファイル選択ハンドラ
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      addLog(`ファイル選択: ${files[0].name} (${(files[0].size / 1024).toFixed(2)} KB)`);
    }
  };

  // ファイル解析関数
  const parseSelectedFile = async () => {
    if (!selectedFile) {
      addLog("ファイルが選択されていません");
      return;
    }

    setIsLoading(true);
    addLog(`ファイル解析開始: ${selectedFile.name}`);

    try {
      // ファイル読み込み
      const text = await selectedFile.text();
      
      // CSVかどうかの簡易チェック
      const isCSV = selectedFile.name.toLowerCase().endsWith('.csv') || 
                   text.includes(',') && text.split('\n').length > 1;
      
      if (isCSV) {
        // CSVパース処理（簡易実装）
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',');
        
        // 必要なヘッダーが存在するか確認
        const hasRequiredHeaders = 
          headers.some(h => h.includes('Title')) && 
          headers.some(h => h.includes('Artist'));
        
        if (!hasRequiredHeaders) {
          throw new Error("必要なヘッダーが見つかりません。Serato履歴ファイルではない可能性があります。");
        }
        
        // データ行の解析
        const tracks: TrackInfo[] = [];
        for (let i = 1; i < Math.min(lines.length, 16); i++) {
          const values = lines[i].split(',');
          if (values.length >= headers.length) {
            const titleIndex = headers.findIndex(h => h.includes('Title'));
            const artistIndex = headers.findIndex(h => h.includes('Artist'));
            const bpmIndex = headers.findIndex(h => h.includes('BPM'));
            const keyIndex = headers.findIndex(h => h.includes('Key'));
            
            tracks.push({
              id: `parsed-${i}`,
              title: values[titleIndex]?.replace(/"/g, '') || 'Unknown',
              artist: values[artistIndex]?.replace(/"/g, '') || 'Unknown Artist',
              bpm: values[bpmIndex] ? parseFloat(values[bpmIndex]) : undefined,
              key: values[keyIndex] || undefined,
              length: '3:30', // ダミー値
              playedAt: new Date(Date.now() - (i * 60000)) // 1分ごとに過去の時間を設定
            });
          }
        }
        
        // 最新の曲を現在再生中として設定
        const nowPlaying: NowPlaying = {
          track: tracks.length > 0 ? {
            ...tracks[0],
            id: 'current',
            playedAt: new Date()
          } : null,
          startedAt: new Date()
        };
        
        const parsedData: HistoryData = {
          nowPlaying,
          tracks
        };
        
        setHistoryData(parsedData);
        setParseResult({
          success: true,
          message: `${tracks.length}曲の履歴データを読み込みました`,
          data: parsedData
        });
        
        // 自動的に実データモードに切り替え
        setUseMockData(false);
        
      } else {
        // 非CSVファイルの場合
        throw new Error("サポートされていないファイル形式です。CSVファイルを選択してください。");
      }
    } catch (error) {
      console.error('File parsing error:', error);
      setParseResult({
        success: false,
        message: "ファイル解析に失敗しました",
        error: error instanceof Error ? error.message : String(error)
      });
      addLog(`ファイル解析エラー: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 接続ステータスに基づくクラス
  const getStatusClass = (isActive: boolean) => 
    isActive ? "bg-green-100 text-green-800 border-green-300" : "bg-red-100 text-red-800 border-red-300";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/music" className="text-primary hover:text-primary-dark">
          ← 音楽ページに戻る
        </Link>
      </div>
      
      <h1 className="text-3xl font-heading font-bold text-primary mb-6">DDJ-FLX4 テストページ</h1>
      
      {/* 接続ステータス */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4 text-primary">接続ステータス</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className={`border rounded-md p-4 ${getStatusClass(connectionStatus.seratoRunning)}`}>
            <h3 className="font-medium">Serato DJ Lite</h3>
            <p>{connectionStatus.seratoRunning ? "起動中" : "未起動"}</p>
          </div>
          
          <div className={`border rounded-md p-4 ${getStatusClass(connectionStatus.ddjConnected)}`}>
            <h3 className="font-medium">DDJ-FLX4</h3>
            <p>{connectionStatus.ddjConnected ? "接続済み" : "未接続"}</p>
          </div>
          
          <div className={`border rounded-md p-4 ${getStatusClass(connectionStatus.historyFileFound)}`}>
            <h3 className="font-medium">履歴ファイル</h3>
            <p>{connectionStatus.historyFileFound ? "検出" : "未検出"}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {connectionStatus.lastUpdated 
              ? `最終更新: ${connectionStatus.lastUpdated.toLocaleTimeString()}` 
              : "未確認"}
          </p>
          
          <button 
            onClick={checkConnectionStatus}
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? "確認中..." : "接続状態を確認"}
          </button>
        </div>
      </div>
      
      {/* ファイル選択 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4 text-primary">Seratoファイルテスト</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">履歴ファイルを選択</label>
          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileChange}
            className="block w-full text-gray-700 border border-gray-300 rounded-md py-2 px-3"
          />
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-500">
              選択ファイル: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={parseSelectedFile}
            disabled={!selectedFile || isLoading}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? "解析中..." : "ファイルを解析"}
          </button>
        </div>
        
        {parseResult && (
          <div className={`mt-4 p-4 border rounded-md ${parseResult.success ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
            <h3 className={`font-medium ${parseResult.success ? 'text-green-800' : 'text-red-800'}`}>
              {parseResult.success ? '解析成功' : '解析失敗'}
            </h3>
            <p className="mt-1">{parseResult.message}</p>
            {parseResult.error && <p className="text-red-600 text-sm mt-1">{parseResult.error}</p>}
          </div>
        )}
      </div>
      
      {/* データ表示 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-heading font-semibold text-primary">Now Playing</h2>
              
              <button 
                onClick={toggleDataSource}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  useMockData 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {useMockData ? 'モックデータ' : '実データ'}
              </button>
            </div>
            
            {isLoading ? (
              <div className="py-10 text-center">
                <p className="text-gray-500">読み込み中...</p>
              </div>
            ) : historyData ? (
              <NowPlayingComponent nowPlaying={historyData.nowPlaying} />
            ) : (
              <div className="py-10 text-center">
                <p className="text-gray-500">データがありません</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-heading font-semibold mb-4 text-primary">最近の再生履歴</h2>
            
            {isLoading ? (
              <div className="py-10 text-center">
                <p className="text-gray-500">読み込み中...</p>
              </div>
            ) : historyData ? (
              <TrackHistory tracks={getTrackHistory(historyData)} />
            ) : (
              <div className="py-10 text-center">
                <p className="text-gray-500">データがありません</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* デバッグログ */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4 text-white">デバッグログ</h2>
        
        <div className="bg-gray-800 rounded-md p-4 h-64 overflow-y-auto font-mono text-sm">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div key={index} className="text-gray-300 mb-1">{log}</div>
            ))
          ) : (
            <p className="text-gray-500">ログはありません</p>
          )}
        </div>
      </div>
      
      {/* テストチェックリスト */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4 text-primary">テストチェックリスト</h2>
        
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="font-medium text-lg">1. 基本接続テスト</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>DDJ-FLX4をUSBで接続</li>
              <li>Serato DJ Liteを起動</li>
              <li>「接続状態を確認」ボタンでステータスチェック</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="font-medium text-lg">2. 履歴ファイルテスト</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Serato DJ Liteで数曲再生</li>
              <li>履歴ファイルをエクスポート（CSVフォーマット）</li>
              <li>ファイル選択欄からアップロード</li>
              <li>「ファイルを解析」ボタンで内容確認</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="font-medium text-lg">3. リアルタイム更新テスト</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>実データモードに切り替え</li>
              <li>Serato DJ Liteで曲を再生</li>
              <li>Now Playingと再生履歴の自動更新を確認</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="font-medium text-lg">4. エラー復旧テスト</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>DDJ-FLX4を一時的に取り外し</li>
              <li>Serato DJ Liteを終了</li>
              <li>再接続時の挙動を確認</li>
              <li>モックデータへのフォールバックを確認</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* トラブルシューティング */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-heading font-semibold mb-4 text-primary">トラブルシューティング</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-lg">DDJ-FLX4が認識されない場合</h3>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-700">
              <li>USBケーブルの接続を確認</li>
              <li>別のUSBポートに接続を試す</li>
              <li>コンピュータを再起動</li>
              <li>最新のドライバーがインストールされているか確認</li>
            </ol>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-lg">Serato DJ Liteが起動しない場合</h3>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-700">
              <li>最新バージョンにアップデート</li>
              <li>アプリケーションを再インストール</li>
              <li>DDJ-FLX4を接続してから起動</li>
            </ol>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-lg">履歴ファイルが見つからない場合</h3>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-700">
              <li>Serato DJ Liteの設定で履歴記録が有効になっているか確認</li>
              <li>デフォルトの保存場所を確認: [ユーザーフォルダ]/Music/Serato/History</li>
              <li>少なくとも1曲以上再生してから履歴を確認</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
