const { app, BrowserWindow, globalShortcut, ipcMain, Notification, Menu, Tray } = require('electron');
const path = require('path');
const axios = require('axios');
const config = require('./config');

// アプリケーションのグローバル参照
let mainWindow = null;
let tray = null;
let isQuitting = false;

// 現在の環境設定を取得
const environment = config.currentEnvironment;
const apiConfig = config.api[environment];
const apiUrl = `${apiConfig.baseUrl}${apiConfig.nowPlayingEndpoint}`;

/**
 * メインウィンドウを作成
 */
function createWindow() {
  // ブラウザウィンドウを作成
  mainWindow = new BrowserWindow({
    width: config.app.window.width,
    height: config.app.window.height,
    minWidth: config.app.window.minWidth,
    minHeight: config.app.window.minHeight,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    show: false, // 初期状態では非表示
    title: 'コタロウカフェ曲情報管理'
  });

  // レンダラーファイルをロード
  mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));

  // 開発者ツールを開く（開発環境のみ）
  if (environment === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // ウィンドウが閉じられたときの処理
  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
      return false;
    }
    return true;
  });

  // 準備ができたら表示
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
}

/**
 * トレイアイコンを作成
 */
function createTray() {
  tray = new Tray(path.join(__dirname, 'assets/tray-icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: '曲情報を入力', 
      click: () => {
        if (mainWindow) {
          mainWindow.show();
        }
      } 
    },
    { 
      label: `環境: ${environment}`, 
      enabled: false 
    },
    { type: 'separator' },
    { 
      label: '終了', 
      click: () => {
        isQuitting = true;
        app.quit();
      } 
    }
  ]);
  
  tray.setToolTip('コタロウカフェ曲情報管理');
  tray.setContextMenu(contextMenu);
  
  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });
}

/**
 * 通知を表示
 */
function showNotification(title, body) {
  new Notification({
    title,
    body,
    icon: path.join(__dirname, 'assets/icon.png')
  }).show();
}

/**
 * 曲情報をAPIに送信
 */
async function sendTrackInfo(trackInfo) {
  try {
    const response = await axios.post(apiUrl, trackInfo);
    
    if (response.status === 200) {
      showNotification('送信成功', `${trackInfo.title} - ${trackInfo.artist} の情報を送信しました`);
      return { success: true, data: response.data };
    } else {
      throw new Error(`API Error: ${response.status}`);
    }
  } catch (error) {
    console.error('API送信エラー:', error);
    showNotification('送信失敗', `曲情報の送信に失敗しました: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// アプリケーションの準備ができたら実行
app.whenReady().then(() => {
  createWindow();
  createTray();
  
  // グローバルショートカットの登録
  const hotkey = config.app.hotkey;
  globalShortcut.register(hotkey, () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });
  
  // macOSでのドックアイコンクリック時の処理
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      mainWindow.show();
    }
  });
  
  // IPC通信の設定
  ipcMain.handle('send-track-info', async (event, trackInfo) => {
    return await sendTrackInfo(trackInfo);
  });
  
  ipcMain.handle('get-environment', () => {
    return {
      current: environment,
      apiUrl: apiUrl
    };
  });
});

// 全てのウィンドウが閉じられたら終了
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// アプリケーション終了時の処理
app.on('will-quit', () => {
  // グローバルショートカットの登録解除
  globalShortcut.unregisterAll();
});
