"use client";

import { ScrollAnimation } from '@/components/ui/ScrollAnimation';

export default function TestAnimation() {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl font-bold mb-8">アニメーションテスト</h1>
      
      <ScrollAnimation className="w-full max-w-[400px] p-4 mb-8 bg-primary/10 rounded-lg">
        <h2 className="text-xl font-bold mb-4">セクション1</h2>
        <p className="mb-4">このセクションはスクロールすると表示されます。</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="stagger-item bg-primary/20 p-4 rounded">アイテム1</div>
          <div className="stagger-item delay-100 bg-primary/20 p-4 rounded">アイテム2</div>
          <div className="stagger-item delay-200 bg-primary/20 p-4 rounded">アイテム3</div>
          <div className="stagger-item delay-300 bg-primary/20 p-4 rounded">アイテム4</div>
        </div>
      </ScrollAnimation>
      
      <div className="h-[500px]">スクロール用スペース</div>
      
      <ScrollAnimation className="w-full max-w-[400px] p-4 mb-8 bg-accent/10 rounded-lg" delay={200}>
        <h2 className="text-xl font-bold mb-4">セクション2</h2>
        <p className="mb-4">このセクションは少し遅れて表示されます。</p>
      </ScrollAnimation>
    </div>
  );
}
