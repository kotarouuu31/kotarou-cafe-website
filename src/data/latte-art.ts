import { LatteArtWork } from '../types/latte-art';
import { fallbackLatteArtWorks } from '../lib/notion';

// サーバーサイドAPIからラテアート作品データを取得
export async function getLatteArtWorksData(): Promise<LatteArtWork[]> {
  try {
    const response = await fetch('/api/latte-art', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success && result.data && result.data.length > 0) {
      // Notion APIからデータが取得できた場合
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result.data.map((work: any) => ({
        ...work,
        comment: work.description || work.comment || '',
        createdAt: formatDate(work.createdAt)
      }));
    }
    
    // データが取得できない場合はフォールバックデータを使用
    return fallbackLatteArtWorks.map(work => ({
      ...work,
      comment: work.description || work.comment || '',
      createdAt: formatDate(work.createdAt)
    }));
  } catch (err) {
    console.error('Error loading latte art works from API:', err);
    // エラー時はフォールバックデータを使用
    return fallbackLatteArtWorks.map(work => ({
      ...work,
      comment: work.description || work.comment || '',
      createdAt: formatDate(work.createdAt)
    }));
  }
}

// 日付フォーマット関数（"2025/07/10"形式に統一）
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  } catch {
    return dateString; // フォーマットに失敗した場合は元の文字列を返す
  }
}

// 後方互換性のため、静的データも保持（フォールバック用）
export const latteArtWorks: LatteArtWork[] = [
  {
    id: '1',
    title: 'ハートラテ',
    comment: '完璧なハート形に仕上がりました！練習の成果が出ています。',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=533&fit=crop',
    createdAt: '2025/07/20'
  },
  {
    id: '2',
    title: '猫ラテ',
    comment: '可愛い猫の顔が描けました。耳の部分が特にお気に入りです。',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=533&fit=crop',
    createdAt: '2025/07/18'
  },
  {
    id: '3',
    title: 'リーフデザイン',
    comment: '葉っぱの模様が美しく描けました。自然の美しさを表現できて嬉しいです。',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=533&fit=crop',
    createdAt: '2025/07/15'
  },
  {
    id: '4',
    title: 'ロゼッタ',
    comment: '複雑なロゼッタパターンに挑戦しました。手首のスナップがポイントでした。',
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=533&fit=crop',
    createdAt: '2025/07/12'
  },
  {
    id: '5',
    title: 'スワンラテ',
    comment: '優雅な白鳥を表現できました。首の曲線が美しく仕上がっています。',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=533&fit=crop',
    createdAt: '2025/07/10'
  },
  {
    id: '6',
    title: 'フラワーアート',
    comment: '花びらの繊細な表現に挑戦。春らしい作品に仕上がりました。',
    imageUrl: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=533&fit=crop',
    createdAt: '2025/07/08'
  }
];
