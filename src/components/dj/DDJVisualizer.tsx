"use client";

import { DDJState } from './MIDIController';

interface DDJVisualizerProps {
  ddjState: DDJState;
  className?: string;
}

export const DDJVisualizer = ({ ddjState, className = "" }: DDJVisualizerProps) => {
  const {
    crossfader,
    channelFaderLeft,
    channelFaderRight,
    highLeft,
    midLeft,
    lowLeft,
    highRight,
    midRight,
    lowRight,
    playLeft,
    playRight,
    cueLeft,
    cueRight,
    isConnected
  } = ddjState;

  return (
    <div className={`bg-gray-900 rounded-lg p-4 border ${isConnected ? 'border-green-500' : 'border-gray-600'} ${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-white font-bold mb-2">DDJ-FLX4 Controller</h3>
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
          isConnected ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'
        }`}>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-white animate-pulse' : 'bg-gray-400'}`}></div>
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Left Channel */}
        <div className="space-y-3">
          <h4 className="text-gray-300 text-sm font-medium text-center">Channel A</h4>
          
          {/* EQ */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">HIGH</span>
              <div className="w-16 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-150"
                  style={{ width: `${(highLeft / 127) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">MID</span>
              <div className="w-16 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-150"
                  style={{ width: `${(midLeft / 127) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">LOW</span>
              <div className="w-16 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-150"
                  style={{ width: `${(lowLeft / 127) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Channel Fader */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 bg-gray-700 rounded-full h-20 relative">
              <div 
                className="w-4 h-4 bg-white rounded-full absolute left-1 transition-all duration-150 shadow-lg"
                style={{ bottom: `${(channelFaderLeft / 127) * 72}px` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400">VOLUME</span>
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            <button 
              className={`w-full py-2 px-3 rounded text-xs font-medium transition-colors ${
                playLeft ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              PLAY
            </button>
            <button 
              className={`w-full py-2 px-3 rounded text-xs font-medium transition-colors ${
                cueLeft ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              CUE
            </button>
          </div>
        </div>

        {/* Center (Crossfader) */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <h4 className="text-gray-300 text-sm font-medium">Crossfader</h4>
          <div className="w-32 bg-gray-700 rounded-full h-4 relative">
            <div 
              className="w-6 h-6 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 transition-all duration-150 shadow-lg"
              style={{ left: `${(crossfader / 127) * (128 - 24)}px` }}
            ></div>
          </div>
          <div className="flex justify-between w-32 text-xs text-gray-400">
            <span>A</span>
            <span>B</span>
          </div>
        </div>

        {/* Right Channel */}
        <div className="space-y-3">
          <h4 className="text-gray-300 text-sm font-medium text-center">Channel B</h4>
          
          {/* EQ */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">HIGH</span>
              <div className="w-16 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-150"
                  style={{ width: `${(highRight / 127) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">MID</span>
              <div className="w-16 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-150"
                  style={{ width: `${(midRight / 127) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">LOW</span>
              <div className="w-16 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-150"
                  style={{ width: `${(lowRight / 127) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Channel Fader */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 bg-gray-700 rounded-full h-20 relative">
              <div 
                className="w-4 h-4 bg-white rounded-full absolute left-1 transition-all duration-150 shadow-lg"
                style={{ bottom: `${(channelFaderRight / 127) * 72}px` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400">VOLUME</span>
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            <button 
              className={`w-full py-2 px-3 rounded text-xs font-medium transition-colors ${
                playRight ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              PLAY
            </button>
            <button 
              className={`w-full py-2 px-3 rounded text-xs font-medium transition-colors ${
                cueRight ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              CUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
