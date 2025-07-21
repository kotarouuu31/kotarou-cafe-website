"use client";

import Link from "next/link";
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // フォームバリデーション
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = '件名を入力してください';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'メッセージを入力してください';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // 実際の実装では、ここでAPIにデータを送信
    try {
      // シミュレーション用の遅延
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('送信エラー:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 入力値変更処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // エラーをクリア
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      {/* ヘッダーセクション */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 pt-8 pb-6 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4 text-primary">
          お気軽にお問い合わせください。
        </h1>
        <p className="text-sm text-foreground/80 mb-6 leading-relaxed">
          ご質問、ご予約、ラテアートのリクエストなど、<br />
          どんなことでもお気軽にご連絡ください。
        </p>
      </ScrollAnimation>

      {/* お問い合わせフォーム */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 mb-8" delay={75}>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-heading text-lg font-bold mb-4 text-primary text-center">
            お問い合わせフォーム
          </h2>
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">送信完了！</h3>
              <p className="text-sm text-foreground/80 mb-4">
                お問い合わせありがとうございます。<br />
                2-3営業日以内にご返信いたします。
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                size="sm"
              >
                新しいお問い合わせ
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* お名前 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="山田 太郎"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* メールアドレス */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="example@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* 件名 */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                  件名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                    errors.subject ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="お問い合わせ内容について"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              {/* メッセージ */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                  メッセージ <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none ${
                    errors.message ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="お問い合わせ内容をご記入ください..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* 送信ボタン */}
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={isSubmitting}
              >
                {isSubmitting ? '送信中...' : '送信する'}
              </button>
            </form>
          )}
        </div>
      </ScrollAnimation>

      {/* 店舗情報 */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 mb-8" delay={150}>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-heading text-lg font-bold mb-4 text-primary text-center">
            店舗情報
          </h2>
          <div className="space-y-4">
            {/* 住所 */}
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-primary mt-0.5">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">住所</p>
                <p className="text-sm text-foreground/80">〒150-0001<br />東京都渋谷区猫町1-2-3 ネコビル 1F</p>
              </div>
            </div>

            {/* 電話番号 */}
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-primary mt-0.5">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">電話番号</p>
                <a 
                  href="tel:03-1234-5678" 
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  03-1234-5678
                </a>
              </div>
            </div>

            {/* メールアドレス */}
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-primary mt-0.5">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">メール</p>
                <a 
                  href="mailto:info@kotarou-cafe.com" 
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  info@kotarou-cafe.com
                </a>
              </div>
            </div>

            {/* 営業時間 */}
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-primary mt-0.5">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">営業時間</p>
                <p className="text-sm text-foreground/80">月-日 9:00-20:00</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* アクセス案内 */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 mb-8" delay={225}>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-heading text-lg font-bold mb-4 text-primary text-center">
            アクセス案内
          </h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-primary mt-0.5">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">最寄り駅</p>
                <p className="text-sm text-foreground/80">JR山手線「渋谷駅」東口より徒歩5分<br />東京メトロ「表参道駅」B2出口より徒歩8分</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-primary mt-0.5">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">道案内</p>
                <p className="text-sm text-foreground/80">渋谷駅東口を出て、明治通りを表参道方面へ直進。猫町交差点を右折し、1つ目のビルの1階です。</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* お気軽にメッセージ */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 mb-8" delay={300}>
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 text-center">
          <h2 className="font-heading text-lg font-bold mb-3 text-primary">
            お気軽にお立ち寄りください
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Kotarou Cafeは、コーヒーと音楽を愛するすべての人を歓迎します。<br />
            美味しいコーヒーと心地よい音楽で、素敵な時間をお過ごしください。<br />
            スタッフ一同、心よりお待ちしております。
          </p>
        </div>
      </ScrollAnimation>

      {/* ホームに戻るボタン */}
      <ScrollAnimation className="w-full max-w-[400px] px-4 pb-8" delay={375}>
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
