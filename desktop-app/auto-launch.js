const AutoLaunch = require('auto-launch');
const { app } = require('electron');
const log = require('electron-log');

// アプリケーション名を取得
const appName = app.getName();

// AutoLaunchインスタンスの作成
const autoLauncher = new AutoLaunch({
  name: appName,
  path: process.execPath,
  isHidden: false
});

/**
 * 自動起動の状態を取得
 * @returns {Promise<boolean>} 自動起動が有効かどうか
 */
async function isAutoLaunchEnabled() {
  try {
    return await autoLauncher.isEnabled();
  } catch (error) {
    log.error('自動起動の状態確認中にエラーが発生しました:', error);
    return false;
  }
}

/**
 * 自動起動を有効化
 * @returns {Promise<void>}
 */
async function enableAutoLaunch() {
  try {
    const isEnabled = await autoLauncher.isEnabled();
    if (!isEnabled) {
      await autoLauncher.enable();
      log.info('自動起動を有効化しました');
    }
  } catch (error) {
    log.error('自動起動の有効化中にエラーが発生しました:', error);
    throw error;
  }
}

/**
 * 自動起動を無効化
 * @returns {Promise<void>}
 */
async function disableAutoLaunch() {
  try {
    const isEnabled = await autoLauncher.isEnabled();
    if (isEnabled) {
      await autoLauncher.disable();
      log.info('自動起動を無効化しました');
    }
  } catch (error) {
    log.error('自動起動の無効化中にエラーが発生しました:', error);
    throw error;
  }
}

/**
 * 自動起動の設定を更新
 * @param {boolean} enable 有効にするかどうか
 * @returns {Promise<void>}
 */
async function updateAutoLaunch(enable) {
  if (enable) {
    return enableAutoLaunch();
  } else {
    return disableAutoLaunch();
  }
}

module.exports = {
  isAutoLaunchEnabled,
  enableAutoLaunch,
  disableAutoLaunch,
  updateAutoLaunch
};
