const Store = require('electron-store');
const path = require('path');
const { app } = require('electron');

// デフォルト設定
const defaultSettings = {
  apiUrl: 'http://localhost:3000/api/now-playing',
  apiKey: '',
  startWithSystem: false,
  minimizeToTray: true,
  showWindowHotkey: 'CommandOrControl+Shift+P',
  sendTrackHotkey: 'CommandOrControl+Shift+S',
  theme: 'system',
  windowBounds: {
    width: 800,
    height: 600,
    x: undefined,
    y: undefined
  }
};

// 設定ストアの作成
const store = new Store({
  name: 'settings',
  defaults: defaultSettings
});

// 設定の取得
function getSettings() {
  return {
    apiUrl: store.get('apiUrl'),
    apiKey: store.get('apiKey'),
    startWithSystem: store.get('startWithSystem'),
    minimizeToTray: store.get('minimizeToTray'),
    showWindowHotkey: store.get('showWindowHotkey'),
    sendTrackHotkey: store.get('sendTrackHotkey'),
    theme: store.get('theme'),
    windowBounds: store.get('windowBounds')
  };
}

// 設定の保存
function saveSettings(settings) {
  for (const [key, value] of Object.entries(settings)) {
    store.set(key, value);
  }
}

// 設定のリセット
function resetSettings() {
  store.clear();
  store.set(defaultSettings);
}

// ウィンドウの位置とサイズを保存
function saveWindowBounds(bounds) {
  store.set('windowBounds', bounds);
}

// ウィンドウの位置とサイズを取得
function getWindowBounds() {
  return store.get('windowBounds');
}

module.exports = {
  getSettings,
  saveSettings,
  resetSettings,
  saveWindowBounds,
  getWindowBounds,
  defaultSettings
};
