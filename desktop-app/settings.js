const { ipcRenderer } = require('electron');

// DOM要素
const apiUrlInput = document.getElementById('apiUrl');
const apiKeyInput = document.getElementById('apiKey');
const startWithSystemCheckbox = document.getElementById('startWithSystem');
const minimizeToTrayCheckbox = document.getElementById('minimizeToTray');
const showWindowHotkeyInput = document.getElementById('showWindowHotkey');
const sendTrackHotkeyInput = document.getElementById('sendTrackHotkey');
const themeSelect = document.getElementById('theme');
const resetButton = document.getElementById('resetButton');
const saveButton = document.getElementById('saveButton');
const statusMessage = document.getElementById('statusMessage');
const recordShowWindowHotkeyButton = document.getElementById('recordShowWindowHotkey');
const recordSendTrackHotkeyButton = document.getElementById('recordSendTrackHotkey');

// 設定の読み込み
document.addEventListener('DOMContentLoaded', () => {
  // メインプロセスから設定を取得
  ipcRenderer.send('get-settings');
  
  // 設定を受け取ったときの処理
  ipcRenderer.on('settings', (event, settings) => {
    apiUrlInput.value = settings.apiUrl || '';
    apiKeyInput.value = settings.apiKey || '';
    startWithSystemCheckbox.checked = settings.startWithSystem || false;
    minimizeToTrayCheckbox.checked = settings.minimizeToTray || false;
    showWindowHotkeyInput.value = settings.showWindowHotkey || '';
    sendTrackHotkeyInput.value = settings.sendTrackHotkey || '';
    themeSelect.value = settings.theme || 'system';
  });
});

// 保存ボタンのイベントリスナー
saveButton.addEventListener('click', () => {
  const settings = {
    apiUrl: apiUrlInput.value,
    apiKey: apiKeyInput.value,
    startWithSystem: startWithSystemCheckbox.checked,
    minimizeToTray: minimizeToTrayCheckbox.checked,
    showWindowHotkey: showWindowHotkeyInput.value,
    sendTrackHotkey: sendTrackHotkeyInput.value,
    theme: themeSelect.value
  };
  
  // メインプロセスに設定を送信
  ipcRenderer.send('save-settings', settings);
  
  // 保存完了メッセージを表示
  showStatus('設定を保存しました', 'success');
});

// リセットボタンのイベントリスナー
resetButton.addEventListener('click', () => {
  if (confirm('設定をデフォルトに戻しますか？')) {
    ipcRenderer.send('reset-settings');
    
    // リセット完了メッセージを表示
    showStatus('設定をデフォルトに戻しました', 'success');
  }
});

// ホットキー設定ボタンのイベントリスナー
recordShowWindowHotkeyButton.addEventListener('click', () => {
  recordHotkey(showWindowHotkeyInput, recordShowWindowHotkeyButton);
});

recordSendTrackHotkeyButton.addEventListener('click', () => {
  recordHotkey(sendTrackHotkeyInput, recordSendTrackHotkeyButton);
});

// ホットキーの記録
function recordHotkey(inputElement, buttonElement) {
  const originalText = buttonElement.textContent;
  buttonElement.textContent = '入力待機中...';
  buttonElement.disabled = true;
  inputElement.value = '';
  
  // メインプロセスにホットキー記録開始を通知
  ipcRenderer.send('start-hotkey-recording');
  
  // ホットキーが記録されたときの処理
  ipcRenderer.once('hotkey-recorded', (event, accelerator) => {
    inputElement.value = accelerator;
    buttonElement.textContent = originalText;
    buttonElement.disabled = false;
  });
  
  // キャンセル処理（5秒後にタイムアウト）
  setTimeout(() => {
    if (buttonElement.textContent === '入力待機中...') {
      buttonElement.textContent = originalText;
      buttonElement.disabled = false;
      ipcRenderer.send('cancel-hotkey-recording');
    }
  }, 5000);
}

// ステータスメッセージの表示
function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = 'status-message ' + type;
  statusMessage.style.display = 'block';
  
  // 3秒後にメッセージを非表示
  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 3000);
}

// メインプロセスからのメッセージ処理
ipcRenderer.on('settings-saved', () => {
  showStatus('設定を保存しました', 'success');
});

ipcRenderer.on('settings-error', (event, error) => {
  showStatus(`エラー: ${error}`, 'error');
});
