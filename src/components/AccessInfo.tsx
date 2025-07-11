import React from 'react';

const AccessInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h3 className="font-heading text-2xl font-bold text-primary mb-6">アクセス・営業時間</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-heading text-lg font-semibold mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            営業時間
          </h4>
          
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>月曜日 - 金曜日:</span>
              <span className="font-medium">9:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>土曜日・日曜日・祝日:</span>
              <span className="font-medium">10:00 - 22:00</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              ※イベント開催日は営業時間が変更になる場合があります。
              詳しくはイベントページをご確認ください。
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="font-heading text-lg font-semibold mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            アクセス
          </h4>
          
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-medium">住所:</span><br />
              〒123-4567<br />
              東京都渋谷区カフェ通り1-2-3
            </p>
            
            <p>
              <span className="font-medium">最寄り駅:</span><br />
              渋谷駅から徒歩7分
            </p>
            
            <p className="text-sm text-gray-500">
              ※駐車場はございません。公共交通機関をご利用ください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessInfo;
