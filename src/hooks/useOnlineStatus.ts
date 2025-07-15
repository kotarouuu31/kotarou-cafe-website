import { useState, useEffect } from 'react';

/**
 * オンライン状態を監視するカスタムフック
 * @returns 現在のオンライン状態（true: オンライン, false: オフライン）
 */
export function useOnlineStatus(): boolean {
  // SSRの場合はデフォルトでtrueとする
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    // ブラウザ環境でない場合は何もしない
    if (typeof window === 'undefined') return;

    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    // 初期状態を設定
    setIsOnline(navigator.onLine);

    // イベントリスナーを登録
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export default useOnlineStatus;
