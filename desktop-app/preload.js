/**
 * preload.js - レンダラープロセスとメインプロセス間の通信を設定
 */
const { contextBridge, ipcRenderer } = require('electron');

// APIをウィンドウオブジェクトに安全に公開
contextBridge.exposeInMainWorld('electronAPI', {
  // 非同期メッセージ（リクエスト/レスポンス）
  invoke: (channel, data) => {
    const validChannels = ['send-track-info', 'get-environment', 'get-track-history', 'set-hotkey'];
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data);
    }
    return Promise.reject(new Error(`Invalid channel: ${channel}`));
  },
  
  // 一方向のメッセージ（イベント）
  on: (channel, func) => {
    const validChannels = ['show-history', 'request-send-track', 'settings', 'settings-saved', 'settings-error', 'hotkey-recorded'];
    if (validChannels.includes(channel)) {
      // イベントリスナーのラッパーを削除できるように元のリスナーを保持
      const subscription = (_event, ...args) => func(...args);
      ipcRenderer.on(channel, subscription);
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    }
    return null;
  },
  
  // 設定関連
  getSettings: () => ipcRenderer.send('get-settings'),
  saveSettings: (settings) => ipcRenderer.send('save-settings', settings),
  resetSettings: () => ipcRenderer.send('reset-settings'),
  startHotkeyRecording: () => ipcRenderer.send('start-hotkey-recording'),
  cancelHotkeyRecording: () => ipcRenderer.send('cancel-hotkey-recording')
});
