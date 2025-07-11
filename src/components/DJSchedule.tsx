"use client";

import React from 'react';
import { DJSchedule as DJScheduleType } from '../types/music';
import { isDJTimeNow, getTodayDJSchedule } from '../data/music';

type DJScheduleProps = {
  schedules: DJScheduleType[];
};

const DJSchedule: React.FC<DJScheduleProps> = ({ schedules }) => {
  const todaySchedule = getTodayDJSchedule();
  const isDJTime = isDJTimeNow();
  const weekdays = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
  
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-4">
      <h3 className="font-heading text-xl font-bold mb-4 text-white flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        DJスケジュール
      </h3>
      
      {/* 今日のDJ情報 */}
      <div className="mb-4">
        {isDJTime && todaySchedule ? (
          <div className="bg-gradient-to-r from-accent to-accent/70 text-white p-3 rounded-md animate-pulse-slow">
            <div className="flex items-center">
              <div className="mr-3 bg-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <div>
                <p className="font-bold">DJ TIME NOW!</p>
                <p className="text-sm">{todaySchedule.djName} ({todaySchedule.genre})</p>
              </div>
            </div>
          </div>
        ) : todaySchedule ? (
          <div className="bg-primary/30 text-white p-3 rounded-md">
            <p className="font-medium">今日のDJタイム: {todaySchedule.startTime} - {todaySchedule.endTime}</p>
            <p className="text-sm">{todaySchedule.djName} ({todaySchedule.genre})</p>
          </div>
        ) : (
          <div className="bg-gray-700/50 text-white p-3 rounded-md">
            <p>今日のDJタイムはありません</p>
          </div>
        )}
      </div>
      
      {/* 週間スケジュール */}
      <div className="space-y-2">
        {schedules.map((schedule, index) => {
          const isToday = new Date().getDay() === schedule.dayOfWeek;
          
          return (
            <div 
              key={index} 
              className={`p-2 rounded-md ${
                isToday ? 'bg-primary/40 border-l-4 border-accent' : 'bg-white/5'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full ${isToday ? 'bg-accent' : 'bg-gray-400'} mr-2`}></span>
                  <span className="font-medium">{weekdays[schedule.dayOfWeek]}</span>
                </div>
                <span>{schedule.startTime} - {schedule.endTime}</span>
              </div>
              <p className="text-sm text-white/70 pl-4">{schedule.djName} ({schedule.genre})</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DJSchedule;
