const { app, BrowserWindow, globalShortcut, ipcMain, Notification, Menu, Tray, dialog, shell } = require('electron');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const os = require('os');
const config = require('./config');
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');
const { getSettings, saveSettings, resetSettings, saveWindowBounds, getWindowBounds } = require('./store');
const { updateAutoLaunch, isAutoLaunchEnabled } = require('./auto-launch');

// ログ設定
log.transports.file.level = 'info';
log.transports.console.level = 'debug';
log.info('アプリケーション起動 - ' + new Date().toLocaleString());

// アプリケーションのグローバル参照
let mainWindow = null;
let settingsWindow = null;
let tray = null;
let isQuitting = false;
let registeredHotkey = null;
let trackHistory = [];
let isRecordingHotkey = false;
const MAX_HISTORY_SIZE = 50;

// データ保存用のパス
const USER_DATA_PATH = app.getPath('userData');
const HISTORY_FILE_PATH = path.join(USER_DATA_PATH, 'track-history.json');
const LOG_FILE_PATH = path.join(USER_DATA_PATH, 'logs');

// 設定を取得
let settings = getSettings();

// 現在の環境設定を取得
const environment = config.currentEnvironment;
const apiConfig = config.api[environment];
// 設定からAPIURLを取得するか、デフォルト値を使用
const apiUrl = settings.apiUrl || `${apiConfig.baseUrl}${apiConfig.nowPlayingEndpoint}`;

/**
 * メインウィンドウを作成
 */
function createWindow() {
  // 保存されたウィンドウの位置とサイズを取得
  const windowBounds = getWindowBounds();
  
  // ブラウザウィンドウを作成
  mainWindow = new BrowserWindow({
    width: windowBounds.width || config.app.window.width,
    height: windowBounds.height || config.app.window.height,
    x: windowBounds.x,
    y: windowBounds.y,
    minWidth: config.app.window.minWidth,
    minHeight: config.app.window.minHeight,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    show: false, // 初期状態では非表示
    title: 'コタロウカフェ曲情報管理',
    autoHideMenuBar: true, // メニューバーを自動的に隠す
    skipTaskbar: false, // タスクバーに表示する
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
      showNotification('バックグラウンド実行中', 'アプリはトレイで実行中です');
      return false;
    }
    return true;
  });
  
  // ウィンドウが最小化されたときの処理
  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    mainWindow.hide();
    return false;
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
  updateTrayMenu();
  
  tray.setToolTip('コタロウカフェ曲情報管理');
  
  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });
}

/**
 * トレイメニューを更新
 */
function updateTrayMenu(currentTrack = null) {
  if (!tray) return;
  
  const trackInfo = currentTrack ? 
    `${currentTrack.title} - ${currentTrack.artist}` : 
    '再生中の曲はありません';
  
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: '曲情報入力ウィンドウを表示', 
      click: () => {
        mainWindow.show();
        mainWindow.focus();
      } 
    },
    { type: 'separator' },
    { 
      label: '再生履歴を表示', 
      click: () => {
        mainWindow.webContents.send('show-history');
        mainWindow.show();
        mainWindow.focus();
      } 
    },
    { 
      label: '管理ページを開く', 
      click: () => {
        shell.openExternal(settings.apiUrl ? settings.apiUrl.replace('/api/now-playing', '/admin/music') : 'http://localhost:3000/admin/music');
      } 
    },
    { 
      label: '設定', 
      click: () => {
        createSettingsWindow();
      } 
    },
    { type: 'separator' },
    { 
      label: '環境情報', 
      click: () => {
        dialog.showMessageBox({
          type: 'info',
          title: '環境情報',
          message: `DDJ-FLX4 Integration System`,
          detail: `バージョン: ${app.getVersion()}\nElectron: ${process.versions.electron}\nChrome: ${process.versions.chrome}\nNode.js: ${process.versions.node}\nV8: ${process.versions.v8}\nOS: ${os.type()} ${os.release()} ${os.arch()}\nユーザーデータ: ${app.getPath('userData')}`
        });
      } 
    },
    { 
      label: 'ログフォルダを開く', 
      click: () => {
        shell.openPath(path.dirname(log.transports.file.getFile().path));
      } 
    },
    { 
      label: 'ホットキー設定', 
      click: () => {
        showHotkeyDialog();
      } 
    },
    { 
      label: '自動起動を設定', 
      type: 'checkbox',
      checked: autoLaunchEnabled,
      click: (menuItem) => {
        toggleAutoLaunch(menuItem.checked);
      } 
    },
    { type: 'separator' },
    { 
      label: '終了', 
      click: () => {
        app.quit();
      } 
    }
  ]);
  
  tray.setContextMenu(contextMenu);
}

/**
 * 通知を表示
 */
function showNotification(title, body) {
  try {
    new Notification({
      title,
      body,
      icon: path.join(__dirname, 'assets/icon.png'),
      silent: false
    }).show();
    log.info(`通知: ${title} - ${body}`);
  } catch (error) {
    log.error('通知表示エラー:', error);
  }
}

/**
 * 設定画面を作成
 */
function createSettingsWindow() {
  // 既に開いている場合はフォーカスするだけ
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }
  
  // 設定ウィンドウを作成
  settingsWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    title: '設定 - コタロウカフェ曲情報管理',
    autoHideMenuBar: true,
    parent: mainWindow,
    modal: false
  });
  
  // 設定ページを読み込む
  settingsWindow.loadFile('settings.html');
  
  // デバッグ用に開発者ツールを開く
  if (process.env.NODE_ENV === 'development') {
    settingsWindow.webContents.openDevTools();
  }
  
  // ウィンドウが閉じられたときの処理
  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
}

/**
 * ホットキーダイアログを表示
 */
function showHotkeyDialog() {
  if (!mainWindow) return;
  
  mainWindow.show();
  mainWindow.focus();
  
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'ホットキー設定',
    message: '新しいホットキーを設定します',
    detail: '現在のホットキー: ' + (registeredHotkey || settings.showWindowHotkey || config.app.hotkey) + '\n\n新しいホットキーを入力してください。\n例: Ctrl+Shift+P, Command+Option+P',
    buttons: ['設定', 'キャンセル'],
    defaultId: 0
  }).then(result => {
    if (result.response === 0) {
      mainWindow.webContents.send('request-hotkey');
    }
  });
}

/**
 * ホットキーを登録
 */
function registerHotkey(hotkey) {
  try {
    // 既存のホットキーを解除
    if (registeredHotkey) {
      globalShortcut.unregister(registeredHotkey);
    }
    
    // 新しいホットキーを登録
    const success = globalShortcut.register(hotkey, () => {
      if (mainWindow) {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
      }
    });
    
    if (success) {
      // 設定に保存
      settings.showWindowHotkey = hotkey;
      saveSettings({ showWindowHotkey: hotkey });
      registeredHotkey = hotkey;
      log.info(`ホットキー登録成功: ${hotkey}`);
      showNotification('ホットキー設定完了', `新しいホットキー: ${hotkey}`);
      return true;
    } else {
      log.warn(`ホットキー登録失敗: ${hotkey}`);
      showNotification('ホットキー設定失敗', 'このキーの組み合わせは使用できません');
      // 失敗した場合は前のホットキーを再登録
      if (registeredHotkey) {
        globalShortcut.register(registeredHotkey, () => {
          if (mainWindow) {
            mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
          }
        });
      }
      return false;
    }
  } catch (error) {
    log.error('ホットキー登録エラー:', error);
    return false;
  }
}

/**
 * 自動起動の設定を切り替え
 */
function toggleAutoLaunch() {
  try {
    const AutoLaunch = require('auto-launch');
    
    const appAutoLauncher = new AutoLaunch({
      name: 'コタロウカフェ曲情報管理',
      path: app.getPath('exe'),
    });
    
    appAutoLauncher.isEnabled().then((isEnabled) => {
      if (isEnabled) {
        appAutoLauncher.disable();
        showNotification('自動起動を無効化', 'システム起動時に自動的に起動しなくなりました');
      } else {
        appAutoLauncher.enable();
        showNotification('自動起動を有効化', 'システム起動時に自動的に起動するようになりました');
      }
    });
  } catch (error) {
    log.error('自動起動設定エラー:', error);
    showNotification('エラー', '自動起動の設定に失敗しました');
  }
}

/**
 * 曲の再生履歴を保存
 */
function saveTrackHistory() {
  try {
    fs.writeFileSync(HISTORY_FILE_PATH, JSON.stringify(trackHistory), 'utf-8');
    log.info(`再生履歴を保存しました (${trackHistory.length}曲)`);
  } catch (error) {
    log.error('再生履歴保存エラー:', error);
  }
}

/**
 * 曲の再生履歴を読み込み
 */
function loadTrackHistory() {
  try {
    if (fs.existsSync(HISTORY_FILE_PATH)) {
      const data = fs.readFileSync(HISTORY_FILE_PATH, 'utf-8');
      trackHistory = JSON.parse(data);
      log.info(`再生履歴を読み込みました (${trackHistory.length}曲)`);
    }
  } catch (error) {
    log.error('再生履歴読み込みエラー:', error);
    trackHistory = [];
  }
}

/**
 * 曲情報をAPIに送信
 */
async function sendTrackInfo(trackInfo) {
  try {
    log.info(`曲情報送信: ${trackInfo.title} - ${trackInfo.artist}`);
    
    const response = await axios.post(apiUrl, trackInfo);
    
    if (response.status === 200) {
      // 履歴に追加
      const historyItem = {
        ...trackInfo,
        timestamp: new Date().toISOString(),
        success: true
      };
      
      trackHistory.unshift(historyItem);
      
      // 履歴サイズを制限
      if (trackHistory.length > MAX_HISTORY_SIZE) {
        trackHistory = trackHistory.slice(0, MAX_HISTORY_SIZE);
      }
      
      // 履歴を保存
      saveTrackHistory();
      
      // トレイメニューを更新
      updateTrayMenu(trackInfo);
      
      showNotification('送信成功', `${trackInfo.title} - ${trackInfo.artist} の情報を送信しました`);
      return { success: true, data: response.data };
    } else {
      throw new Error(`API Error: ${response.status}`);
    }
  } catch (error) {
    log.error('API送信エラー:', error);
    
    // エラー情報も履歴に追加
    const historyItem = {
      ...trackInfo,
      timestamp: new Date().toISOString(),
      success: false,
      error: error.message
    };
    
    trackHistory.unshift(historyItem);
    saveTrackHistory();
    
    showNotification('送信失敗', `曲情報の送信に失敗しました: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// アプリケーションの準備ができたら実行
app.whenReady().then(async () => {
  // 再生履歴を読み込み
  loadTrackHistory();
  
  // 自動起動設定を適用
  try {
    await updateAutoLaunch(settings.startWithSystem);
    log.info(`自動起動設定: ${settings.startWithSystem ? '有効' : '無効'}`);
  } catch (error) {
    log.error('自動起動設定エラー:', error);
  }
  
  // メインウィンドウを作成
  createWindow();
  
  // トレイアイコンを作成
  createTray();
  
  // グローバルショートカットを登録
  registerHotkey(settings.showWindowHotkey || config.app.hotkey);
  
  // 曲情報送信用のホットキーを登録
  if (settings.sendTrackHotkey) {
    try {
      globalShortcut.register(settings.sendTrackHotkey, () => {
        if (mainWindow) {
          mainWindow.webContents.send('request-send-track');
        }
      });
      log.info(`送信ホットキー登録成功: ${settings.sendTrackHotkey}`);
    } catch (error) {
      log.error('送信ホットキー登録エラー:', error);
    }
  }
  
  // macOSの場合、アプリケーションがアクティブになったときにウィンドウを再作成
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      mainWindow.show();
    }
  });
  
  // ウィンドウの位置とサイズを保存
  mainWindow.on('close', () => {
    if (!isQuitting && settings.minimizeToTray) {
      mainWindow.hide();
      return false;
    }
    
    // ウィンドウの位置とサイズを保存
    saveWindowBounds(mainWindow.getBounds());
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
  
  ipcMain.handle('get-track-history', () => {
    return trackHistory;
  });
  
  ipcMain.handle('set-hotkey', (event, hotkey) => {
    return registerHotkey(hotkey);
  });
  
  // 設定関連のIPC通信
  ipcMain.on('get-settings', (event) => {
    event.sender.send('settings', settings);
  });
  
  ipcMain.on('save-settings', async (event, newSettings) => {
    try {
      // 自動起動設定が変更された場合
      if (newSettings.startWithSystem !== settings.startWithSystem) {
        await updateAutoLaunch(newSettings.startWithSystem);
      }
      
      // ホットキーが変更された場合
      if (newSettings.showWindowHotkey !== settings.showWindowHotkey) {
        registerHotkey(newSettings.showWindowHotkey);
      }
      
      // 送信ホットキーが変更された場合
      if (newSettings.sendTrackHotkey !== settings.sendTrackHotkey) {
        if (settings.sendTrackHotkey) {
          globalShortcut.unregister(settings.sendTrackHotkey);
        }
        
        if (newSettings.sendTrackHotkey) {
          globalShortcut.register(newSettings.sendTrackHotkey, () => {
            if (mainWindow) {
              mainWindow.webContents.send('request-send-track');
            }
          });
        }
      }
      
      // 設定を保存
      saveSettings(newSettings);
      settings = { ...settings, ...newSettings };
      
      // API URLが変更された場合は反映
      if (newSettings.apiUrl) {
        apiUrl = newSettings.apiUrl;
      }
      
      event.sender.send('settings-saved');
    } catch (error) {
      log.error('設定保存エラー:', error);
      event.sender.send('settings-error', error.message);
    }
  });
  
  ipcMain.on('reset-settings', (event) => {
    try {
      resetSettings();
      settings = getSettings();
      event.sender.send('settings', settings);
      event.sender.send('settings-saved');
    } catch (error) {
      log.error('設定リセットエラー:', error);
      event.sender.send('settings-error', error.message);
    }
  });
  
  ipcMain.on('start-hotkey-recording', (event) => {
    isRecordingHotkey = true;
    
    // キーボードイベントを監視
    const recordKeyboardEvent = (e) => {
      if (!isRecordingHotkey) return;
      
      // キーの組み合わせを作成
      const modifiers = [];
      if (e.ctrlKey) modifiers.push('Control');
      if (e.metaKey) modifiers.push('Command');
      if (e.altKey) modifiers.push('Alt');
      if (e.shiftKey) modifiers.push('Shift');
      
      // キーコードを取得
      const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      
      // アクセラレーターを作成
      const accelerator = [...modifiers, key].join('+');
      
      // イベントを送信
      event.sender.send('hotkey-recorded', accelerator);
      
      // 記録終了
      isRecordingHotkey = false;
      
      // イベントを防止
      e.preventDefault();
    };
    
    // イベントリスナーを追加
    if (settingsWindow) {
      settingsWindow.webContents.once('before-input-event', recordKeyboardEvent);
    }
  });
  
  ipcMain.on('cancel-hotkey-recording', () => {
    isRecordingHotkey = false;
  });
  
  // 自動アップデートの設定
  autoUpdater.checkForUpdatesAndNotify();
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
  
  // 再生履歴を保存
  saveTrackHistory();
  
  log.info('アプリケーション終了 - ' + new Date().toLocaleString());
});

// 自動アップデートイベント
autoUpdater.on('update-available', () => {
  log.info('アップデートが利用可能です');
  showNotification('アップデート', '新しいバージョンがダウンロードされます');
});

autoUpdater.on('update-downloaded', () => {
  log.info('アップデートがダウンロードされました');
  showNotification('アップデート準備完了', '次回起動時に適用されます');
});

autoUpdater.on('error', (err) => {
  log.error('アップデートエラー:', err);
});
