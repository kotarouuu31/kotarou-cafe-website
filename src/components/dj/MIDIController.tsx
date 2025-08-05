"use client";

import { useState, useEffect, useCallback } from 'react';

export interface MIDIControlData {
  channel: number;
  control: number;
  value: number;
  timestamp: number;
}

export interface DDJState {
  // ジョグホイール
  jogWheelLeft: number;
  jogWheelRight: number;
  
  // フェーダー
  crossfader: number;
  channelFaderLeft: number;
  channelFaderRight: number;
  
  // EQ ノブ
  highLeft: number;
  midLeft: number;
  lowLeft: number;
  highRight: number;
  midRight: number;
  lowRight: number;
  
  // ボタン
  playLeft: boolean;
  playRight: boolean;
  cueLeft: boolean;
  cueRight: boolean;
  
  // BPM
  bpmLeft: number;
  bpmRight: number;
  
  // 接続状態
  isConnected: boolean;
  deviceName: string;
}

interface MIDIControllerProps {
  onStateChange?: (state: DDJState) => void;
  onMIDIMessage?: (data: MIDIControlData) => void;
}

export const MIDIController = ({ onStateChange, onMIDIMessage }: MIDIControllerProps) => {
  const [midiAccess, setMidiAccess] = useState<MIDIAccess | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  // Web MIDI API サポート確認
  useEffect(() => {
    setIsSupported('requestMIDIAccess' in navigator);
  }, []);

  // MIDI初期化
  const initializeMIDI = useCallback(async () => {
    if (!isSupported) return;

    try {
      const access = await navigator.requestMIDIAccess();
      setMidiAccess(access);
      
      access.addEventListener('statechange', handleStateChange);
      scanForDDJ(access);
      
    } catch (error) {
      console.error('MIDI Access Error:', error);
    }
  }, [isSupported]);

  // デバイス状態変更ハンドラ
  const handleStateChange = useCallback((event: MIDIConnectionEvent) => {
    console.log('MIDI State Change:', event);
    if (midiAccess) {
      scanForDDJ(midiAccess);
    }
  }, [midiAccess]); // eslint-disable-line react-hooks/exhaustive-deps

  // DDJ-FLX4検索
  const scanForDDJ = useCallback((access: MIDIAccess) => {
    let ddjFound = false;
    let deviceName = '';

    access.inputs.forEach((input) => {
      console.log('MIDI Input detected:', input.name, input.manufacturer);
      
      // DDJ-FLX4を検出
      if (input.name?.includes('DDJ-FLX4') || 
          input.name?.includes('FLX4') || 
          input.manufacturer?.includes('Pioneer')) {
        
        console.log('DDJ-FLX4 detected:', input.name);
        ddjFound = true;
        deviceName = input.name || 'DDJ-FLX4';
        
        input.addEventListener('midimessage', handleMIDIMessage);
      }
    });

    if (onStateChange) {
      onStateChange({
        jogWheelLeft: 0,
        jogWheelRight: 0,
        crossfader: 64,
        channelFaderLeft: 0,
        channelFaderRight: 0,
        highLeft: 64,
        midLeft: 64,
        lowLeft: 64,
        highRight: 64,
        midRight: 64,
        lowRight: 64,
        playLeft: false,
        playRight: false,
        cueLeft: false,
        cueRight: false,
        bpmLeft: 120,
        bpmRight: 120,
        isConnected: ddjFound,
        deviceName
      });
    }

    if (ddjFound) {
      console.log('✅ DDJ-FLX4 connected successfully');
    } else {
      console.log('❌ DDJ-FLX4 not found');
    }
  }, []);

  // MIDIメッセージハンドラ
  const handleMIDIMessage = useCallback((event: MIDIMessageEvent) => {
    if (!event.data) return;
    const [status, control, value] = Array.from(event.data);
    const channel = status & 0x0F;
    
    const controlData: MIDIControlData = {
      channel,
      control,
      value,
      timestamp: event.timeStamp
    };

    console.log('MIDI Message:', controlData);
    onMIDIMessage?.(controlData);

    // DDJ-FLX4 MIDI mapping (基本的なコントロール)
    // 基本状態を作成
    const baseState: DDJState = {
      jogWheelLeft: 0,
      jogWheelRight: 0,
      crossfader: 64,
      channelFaderLeft: 0,
      channelFaderRight: 0,
      highLeft: 64,
      midLeft: 64,
      lowLeft: 64,
      highRight: 64,
      midRight: 64,
      lowRight: 64,
      playLeft: false,
      playRight: false,
      cueLeft: false,
      cueRight: false,
      bpmLeft: 120,
      bpmRight: 120,
      isConnected: true,
      deviceName: 'DDJ-FLX4'
    };

    // MIDIコントロールに基づいて状態を更新
    switch (control) {
      // チャンネルフェーダー
      case 0x0D: // Channel 1 fader
        baseState.channelFaderLeft = value;
        break;
      case 0x0E: // Channel 2 fader
        baseState.channelFaderRight = value;
        break;
      
      // クロスフェーダー
      case 0x1F:
        baseState.crossfader = value;
        break;

      // EQ (Channel 1)
      case 0x07: // High
        baseState.highLeft = value;
        break;
      case 0x08: // Mid
        baseState.midLeft = value;
        break;
      case 0x09: // Low
        baseState.lowLeft = value;
        break;

      // EQ (Channel 2)
      case 0x0A: // High
        baseState.highRight = value;
        break;
      case 0x0B: // Mid
        baseState.midRight = value;
        break;
      case 0x0C: // Low
        baseState.lowRight = value;
        break;

      // Play buttons (Note On/Off messages)
      case 0x0B: // Channel 1 Play
        if (status === 0x90) baseState.playLeft = value > 0;
        break;
      case 0x0C: // Channel 2 Play
        if (status === 0x90) baseState.playRight = value > 0;
        break;

      // Cue buttons
      case 0x0D: // Channel 1 Cue
        if (status === 0x90) baseState.cueLeft = value > 0;
        break;
      case 0x0E: // Channel 2 Cue
        if (status === 0x90) baseState.cueRight = value > 0;
        break;

      default:
        // ジョグホイールや他のコントロール
        if (control >= 0x20 && control <= 0x25) {
          // ジョグホイール (大まかなマッピング)
          if (channel === 0) {
            baseState.jogWheelLeft = value;
          } else if (channel === 1) {
            baseState.jogWheelRight = value;
          }
        }
        break;
    }

    // 親コンポーネントに状態変更を通知
    onStateChange?.(baseState);
  }, [onStateChange, onMIDIMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  // 初期化実行
  useEffect(() => {
    initializeMIDI();
  }, [initializeMIDI]);

  // コンポーネントは表示なし（バックグラウンドで動作）
  return null;
};
