/**
 * コタロウカフェデスクトップアプリ設定
 */
module.exports = {
  // API設定
  api: {
    // 本番環境URL
    production: {
      baseUrl: 'https://kotarou-cafe-website.vercel.app',
      nowPlayingEndpoint: '/api/now-playing'
    },
    // 開発環境URL
    development: {
      baseUrl: 'http://localhost:3000',
      nowPlayingEndpoint: '/api/now-playing'
    }
  },
  
  // 現在の環境設定（'production' または 'development'）
  // 開発中は 'development' に設定し、ビルド時に 'production' に変更
  currentEnvironment: 'development',
  
  // アプリケーション設定
  app: {
    // グローバルホットキー設定
    hotkey: process.platform === 'darwin' ? 'Command+Shift+N' : 'Control+Shift+N',
    
    // ウィンドウサイズ
    window: {
      width: 500,
      height: 400,
      minWidth: 400,
      minHeight: 300
    }
  }
};
