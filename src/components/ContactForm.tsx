"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type ContactFormInputs = {
  name: string;
  email: string;
  phone?: string;
  inquiryType: 'store' | 'event' | 'latte-art' | 'other';
  message: string;
};

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<ContactFormInputs>();
  
  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // 実際のAPIエンドポイントに送信する場合はここを変更
      // 現在はモック処理として2秒待機後に成功とする
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', data);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('送信中にエラーが発生しました。後ほど再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-[#f9f5f1] to-[#f0e6d8] rounded-lg shadow-lg p-6 md:p-8">
      {submitSuccess ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-heading text-2xl font-bold text-primary mb-4">お問い合わせありがとうございます</h3>
          <p className="text-gray-600 mb-6">
            内容を確認次第、担当者よりご連絡いたします。
            通常2営業日以内にご返信いたします。
          </p>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-full transition-colors"
          >
            新しいお問い合わせをする
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary text-center mb-6">お問い合わせ</h2>
          
          {submitError && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <p className="text-red-700">{submitError}</p>
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="山田 太郎"
              {...register('name', { 
                required: 'お名前を入力してください',
                minLength: { value: 2, message: 'お名前は2文字以上で入力してください' }
              })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="example@email.com"
              {...register('email', { 
                required: 'メールアドレスを入力してください',
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                  message: '有効なメールアドレスを入力してください'
                }
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              電話番号 <span className="text-gray-400">(任意)</span>
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="090-1234-5678"
              {...register('phone', {
                pattern: { 
                  value: /^[0-9\-+()]*$/,
                  message: '有効な電話番号を入力してください'
                }
              })}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">
              お問い合わせ種類 <span className="text-red-500">*</span>
            </label>
            <select
              id="inquiryType"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.inquiryType ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('inquiryType', { required: 'お問い合わせ種類を選択してください' })}
            >
              <option value="">選択してください</option>
              <option value="store">店舗について</option>
              <option value="event">イベント予約</option>
              <option value="latte-art">ラテアートリクエスト</option>
              <option value="other">その他</option>
            </select>
            {errors.inquiryType && (
              <p className="mt-1 text-sm text-red-600">{errors.inquiryType.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              メッセージ <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="お問い合わせ内容をご記入ください"
              {...register('message', { 
                required: 'メッセージを入力してください',
                minLength: { value: 10, message: 'メッセージは10文字以上で入力してください' }
              })}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-full transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  送信中...
                </div>
              ) : (
                '送信する'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
