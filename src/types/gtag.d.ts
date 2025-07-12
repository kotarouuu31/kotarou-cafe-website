// Google Analytics用の型定義
interface Window {
  gtag: (
    command: 'event' | 'config' | 'consent' | 'js',
    targetId: string,
    params?: Record<string, unknown>
  ) => void;
  dataLayer: Record<string, unknown>[];
}
