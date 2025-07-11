"use client";

import React from 'react';
import { BusinessHours, SpecialBusinessHours } from '../types/events';
import { getBusinessHoursForDate, formatDate } from '../utils/eventUtils';

type BusinessHoursDisplayProps = {
  regularHours: BusinessHours[];
  specialHours: SpecialBusinessHours[];
};

const BusinessHoursDisplay: React.FC<BusinessHoursDisplayProps> = ({
  regularHours,
  specialHours,
}) => {
  const today = new Date();
  const todayHours = getBusinessHoursForDate(today, regularHours, specialHours);
  
  // 今後30日間の特別営業時間
  const upcomingSpecialHours = specialHours
    .filter(sh => {
      const date = new Date(sh.date);
      const thirtyDaysLater = new Date();
      thirtyDaysLater.setDate(today.getDate() + 30);
      return date >= today && date <= thirtyDaysLater;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h3 className="font-heading text-2xl mb-4">営業時間</h3>
      
      {/* 今日の営業時間 */}
      <div className="mb-6 p-4 bg-primary-light/10 rounded-lg">
        <h4 className="font-medium text-lg mb-2">本日の営業時間（{formatDate(today, 'MM月dd日(E)')}）</h4>
        {todayHours.isClosed ? (
          <p className="text-red-600 font-medium">休業日</p>
        ) : (
          <p className="text-xl font-medium">
            {todayHours.open} - {todayHours.close}
          </p>
        )}
        {todayHours.isSpecial && todayHours.reason && (
          <p className="text-sm text-primary mt-1">{todayHours.reason}</p>
        )}
      </div>
      
      {/* 通常営業時間 */}
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3">通常営業時間</h4>
        <div className="grid grid-cols-2 gap-2">
          {regularHours.map((hour) => (
            <div 
              key={hour.dayOfWeek} 
              className={`p-3 rounded-md ${
                hour.dayOfWeek === today.getDay() ? 'bg-primary-light/20' : 'bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{weekdays[hour.dayOfWeek]}曜日</span>
                {hour.isClosed ? (
                  <span className="text-red-600">休業</span>
                ) : (
                  <span>{hour.open} - {hour.close}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 特別営業時間 */}
      {upcomingSpecialHours.length > 0 && (
        <div>
          <h4 className="font-medium text-lg mb-3">今後の特別営業時間</h4>
          <ul className="space-y-2">
            {upcomingSpecialHours.map((special, index) => (
              <li 
                key={index} 
                className="p-3 border-l-4 border-accent rounded-r-md bg-accent-light/10"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{formatDate(new Date(special.date), 'MM月dd日(E)')}</span>
                  {special.isClosed ? (
                    <span className="text-red-600">休業</span>
                  ) : (
                    <span>{special.open} - {special.close}</span>
                  )}
                </div>
                {special.reason && (
                  <p className="text-sm text-gray-600 mt-1">{special.reason}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BusinessHoursDisplay;
