import { useState, useEffect } from 'react';

/**
 * ローカルストレージを使用して状態を永続化するカスタムフック
 * @param key ローカルストレージのキー
 * @param initialValue 初期値
 * @returns [値, 値を設定する関数, 値をリセットする関数]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // 初期値を取得する関数
  const getStoredValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // 状態を初期化
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  
  // マウント時にローカルストレージから値を読み込む
  useEffect(() => {
    setStoredValue(getStoredValue());
  }, []);

  // 値を設定する関数
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 関数として渡された場合は、前の状態を引数として実行
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // 状態を更新
      setStoredValue(valueToStore);
      
      // ローカルストレージに保存
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };
  
  // 値をリセットする関数
  const resetValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error resetting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, resetValue];
}
