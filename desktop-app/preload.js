/**
 * preload.js - レンダラープロセスとメインプロセス間の通信を設定
 */
window.addEventListener('DOMContentLoaded', () => {
  // レンダラープロセスでのグローバル変数設定
  window.ipcRenderer = require('electron').ipcRenderer;
});
