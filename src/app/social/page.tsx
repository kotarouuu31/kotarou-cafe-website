"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function SocialPage() {
  const [copiedHashtag, setCopiedHashtag] = useState<string | null>(null);

  // ハッシュタグをコピーする関数
  const copyHashtag = async (hashtag: string) => {
    try {
      await navigator.clipboard.writeText(hashtag);
      setCopiedHashtag(hashtag);
      setTimeout(() => setCopiedHashtag(null), 2000);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      {/* ヘッダーセクション */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 pt-8 pb-6 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4 text-primary">
          つながろう、Kotarou Cafeで。
        </h1>
        <p className="text-sm text-foreground/80 mb-6 leading-relaxed">
          SNSでKotarou Cafeの日常をシェア。<br />
          あなたの投稿が、誰かの心に響くかもしれません。
        </p>
      </ScrollAnimation>

      {/* SNSリンクセクション */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 mb-8" delay={75}>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="font-heading text-lg font-bold mb-4 text-primary text-center">
            公式SNSをフォロー
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Instagram */}
            <a 
              href="https://instagram.com/kotaroucafe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 rounded-lg border border-gray-100 hover:border-pink-200 hover:bg-pink-50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-pink-600 transition-colors">
                Instagram
              </span>
            </a>

            {/* Twitter */}
            <a 
              href="https://twitter.com/kotaroucafe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                Twitter
              </span>
            </a>

            {/* LINE */}
            <a 
              href="https://line.me/R/ti/p/@kotaroucafe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                LINE
              </span>
            </a>

            {/* YouTube */}
            <a 
              href="https://youtube.com/@kotaroucafe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 rounded-lg border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                YouTube
              </span>
            </a>
          </div>
        </div>
      </ScrollAnimation>

      {/* QRコードセクション */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 mb-8" delay={150}>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-heading text-lg font-bold mb-4 text-primary text-center">
            LINE友達追加
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Image
                src="https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=https://line.me/R/ti/p/@kotaroucafe"
                alt="LINE QRコード"
                width={128}
                height={128}
                className="rounded-lg"
              />
            </div>
            <p className="text-sm text-center text-foreground/80 mb-4">
              QRコードを読み取って<br />LINE公式アカウントを友達追加
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://line.me/R/ti/p/@kotaroucafe', '_blank')}
            >
              LINEで友達追加
            </Button>
          </div>
        </div>
      </ScrollAnimation>

      {/* カフェの投稿ギャラリー */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 mb-8" delay={225}>
        <div className="mb-6">
          <h2 className="font-heading text-lg font-bold mb-4 text-primary text-center">
            カフェの日常
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* 投稿1 */}
            <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative" style={{ aspectRatio: '1/1' }}>
                <Image 
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772" 
                  alt="ラテアート" 
                  fill 
                  style={{objectFit: 'cover'}} 
                  className=""
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-foreground/80 mb-1">今日のラテアート ☕️</p>
                <div className="flex items-center text-xs text-foreground/60">
                  <span className="mr-2">❤️ 24</span>
                  <span>💬 3</span>
                </div>
              </div>
            </div>

            {/* 投稿2 */}
            <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative" style={{ aspectRatio: '1/1' }}>
                <Image 
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819" 
                  alt="DJブース" 
                  fill 
                  style={{objectFit: 'cover'}} 
                  className=""
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-foreground/80 mb-1">今夜のDJセット 🎵</p>
                <div className="flex items-center text-xs text-foreground/60">
                  <span className="mr-2">❤️ 18</span>
                  <span>💬 5</span>
                </div>
              </div>
            </div>

            {/* 投稿3 */}
            <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative" style={{ aspectRatio: '1/1' }}>
                <Image 
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" 
                  alt="店内の様子" 
                  fill 
                  style={{objectFit: 'cover'}} 
                  className=""
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-foreground/80 mb-1">穏やかな午後のひととき ✨</p>
                <div className="flex items-center text-xs text-foreground/60">
                  <span className="mr-2">❤️ 31</span>
                  <span>💬 7</span>
                </div>
              </div>
            </div>

            {/* 投稿4 */}
            <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative" style={{ aspectRatio: '1/1' }}>
                <Image 
                  src="https://images.unsplash.com/photo-1580933073521-dc51f22c5c31" 
                  alt="コーヒー豆" 
                  fill 
                  style={{objectFit: 'cover'}} 
                  className=""
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-foreground/80 mb-1">新しい豆が入荷しました 🌱</p>
                <div className="flex items-center text-xs text-foreground/60">
                  <span className="mr-2">❤️ 15</span>
                  <span>💬 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* お客様の投稿紹介 */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 mb-8" delay={300}>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-heading text-lg font-bold mb-4 text-primary text-center">
            お客様の投稿
          </h2>
          <div className="space-y-4">
            {/* 投稿1 */}
            <div className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <div>
                  <p className="text-sm font-medium">@mika_coffee</p>
                  <p className="text-xs text-foreground/60">2時間前</p>
                </div>
              </div>
              <p className="text-sm mb-2">今日のラテアート、本当に美しかった！飲むのがもったいない... ☕️✨</p>
              <p className="text-xs text-primary">#kotaroucafe #latteart</p>
            </div>

            {/* 投稿2 */}
            <div className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <div>
                  <p className="text-sm font-medium">@takeshi_music</p>
                  <p className="text-xs text-foreground/60">5時間前</p>
                </div>
              </div>
              <p className="text-sm mb-2">昨夜のDJセット最高でした！音楽とコーヒーの組み合わせが絶妙 🎵</p>
              <p className="text-xs text-primary">#kotaroucafe #djnight</p>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* ハッシュタグセクション */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 mb-8" delay={375}>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-heading text-lg font-bold mb-4 text-primary text-center">
            推奨ハッシュタグ
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-primary">#kotaroucafe</span>
              <button
                onClick={() => copyHashtag('#kotaroucafe')}
                className="text-xs px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
              >
                {copiedHashtag === '#kotaroucafe' ? 'コピー済み!' : 'コピー'}
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-primary">#latteart</span>
              <button
                onClick={() => copyHashtag('#latteart')}
                className="text-xs px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
              >
                {copiedHashtag === '#latteart' ? 'コピー済み!' : 'コピー'}
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-primary">#cafevibes</span>
              <button
                onClick={() => copyHashtag('#cafevibes')}
                className="text-xs px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
              >
                {copiedHashtag === '#cafevibes' ? 'コピー済み!' : 'コピー'}
              </button>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* SNS投稿の呼びかけ */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 mb-8" delay={450}>
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 text-center">
          <h2 className="font-heading text-lg font-bold mb-3 text-primary">
            あなたの体験をシェアしませんか？
          </h2>
          <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
            Kotarou Cafeでの素敵な時間を、ぜひSNSでシェアしてください。<br />
            あなたの投稿が、新しいお客様との出会いを生むかもしれません。
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-xs px-2 py-1 bg-white rounded-full text-primary">#kotaroucafe</span>
            <span className="text-xs px-2 py-1 bg-white rounded-full text-primary">#latteart</span>
            <span className="text-xs px-2 py-1 bg-white rounded-full text-primary">#cafevibes</span>
          </div>
        </div>
      </ScrollAnimation>

      {/* ホームに戻るボタン */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 pb-8" delay={525}>
        <div className="text-center">
          <Link href="/">
            <Button variant="outline" className="w-full">
              ホームに戻る
            </Button>
          </Link>
        </div>
      </ScrollAnimation>
    </div>
  );
}
