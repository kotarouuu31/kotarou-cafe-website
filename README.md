# 🏪 Kotarou Cafe - Next.js × Notion API 連携カフェサイト

[![Live Demo](https://img.shields.io/badge/Live%20Demo-kotarou--cafe--website.vercel.app-blue?style=for-the-badge)](https://kotarou-cafe-website.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Notion API](https://img.shields.io/badge/Notion-API-black?style=for-the-badge&logo=notion)](https://developers.notion.com/)

## 📖 プロジェクト概要

**実店舗運営に直結する実用的なWebアプリケーション**として開発したモダンカフェサイト。Notion APIを活用したヘッドレスCMS、PWA対応によるネイティブアプリ体験、プロ仕様DJ機器連携など、最新技術を実際のビジネス環境で活用した技術実証プロジェクトです。

### 🎯 開発目標
- **実用性重視**: 実店舗で本当に使えるシステムの構築
- **最新技術活用**: Next.js 15、TypeScript、Notion APIの実践的応用
- **UX最適化**: モバイルファーストデザインによる最適なユーザー体験
- **運用効率化**: Notionを使った非エンジニアでも扱えるコンテンツ管理

## 🛠️ 技術スタック

### フロントエンド
- **Next.js 15**: App Routerを活用した最新のReactフレームワーク
- **TypeScript**: 型安全な開発環境の構築
- **Tailwind CSS**: 効率的なUIデザインの実装
- **Framer Motion**: 滑らかなアニメーションとインタラクション
- **PWA**: Service Worker、マニフェスト、オフライン対応
- **React Hook Form**: フォームのバリデーションと状態管理

### バックエンド・API連携
- **Notion API**: リアルタイムコンテンツ管理システム
- **Next.js API Routes**: サーバーサイド機能の実装
- **RecordBox × DDJ-FLX4**: プロ仕様DJ機器連携
- **画像プロキシ**: Notion画像の最適化とキャッシュ

### 開発手法
- **AI活用開発（Windsurf）**: コード生成・実装支援
- **プロジェクト管理・技術支援（Claude）**: 開発戦略立案と実装サポート
- **Vibe Coding**: 感性と技術を融合した開発アプローチ

## 🏗️ アーキテクチャ設計

### システム構成
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   フロントエンド   │    │   Next.js API    │    │   Notion API     │
│   (Next.js)      │◄──►│   Routes         │◄──►│   (ヘッドレスCMS) │
│                 │    │                 │    │                 │
│ • PWA対応       │    │ • データ取得     │    │ • ラテアート     │
│ • レスポンシブ    │    │ • 画像プロキシ    │    │ • メニュー       │
│ • アニメーション  │    │ • キャッシュ     │    │ • イベント       │
└─────────────────┘    └─────────────────┘    │ • ニュース       │
                                              └─────────────────┘
```

### 技術的特徴
- **ヘッドレスCMS**: Notion APIを活用したコンテンツ管理
- **SSR/ISR**: Next.js App Routerによる最適化されたレンダリング
- **型安全性**: TypeScriptによる堅牢な開発環境
- **パフォーマンス**: 画像最適化、キャッシュ戦略、PWA対応

## ✨ 主な機能

### 🗃️ Notion API連携コンテンツ管理
- **ラテアート作品**: リアルタイム作品表示・技法別フィルタリング
- **メニュー管理**: カテゴリ別表示・在庫状況連動
- **イベント情報**: 開催予定・詳細情報・参加受付
- **ニュース配信**: 最新情報・お知らせ・キャンペーン
- **画像最適化**: 自動キャッシュ・高速表示

### 📱 PWA（Progressive Web App）対応
- **ホーム画面追加**: スマホアプリライクな体験
- **オフライン対応**: ネット接続なしでも基本機能利用可能
- **自動更新**: 新バージョンの自動検出・更新
- **高速キャッシュ**: Service Workerによる高速表示
- **プッシュ通知**: 重要な更新の通知（準備中）

### 🎵 RecordBox × DDJ-FLX4連携
- **リアルタイム楽曲表示**: 現在再生中の楽曲情報
- **プロ仕様UI**: 波形ビジュアライザー・BPM・Key表示
- **DJ統計**: 10,000時間チャレンジ進捗表示
- **デッキ情報**: DDJ-FLX4接続状態・操作状況

### 🖥️ PC版レイアウト
- **左側固定エリア**: フルスクリーン背景・ブランド体験
- **右側モバイルプレビュー**: スマホフレーム内表示
- **統合ナビゲーション**: PC表示時の専用メニュー
- **レスポンシブ切り替え**: 1024px境界での自動切り替え

### 📱 モバイルファーストデザイン
- **最大幅400px**: スマホ最適化レイアウト
- **スクロール連動ヘッダー**: 上下スクロールで表示切り替え
- **タッチ最適化**: タップしやすいボタンサイズ
- **アニメーション**: Framer Motionによる滑らかな動作

### 📝 お問い合わせ・店舗情報
- **完全なフォーム**: バリデーション・送信完了画面
- **店舗詳細**: 住所・電話・営業時間・アクセス
- **タップ機能**: 電話発信・メール起動
- **親しみやすいメッセージ**: カフェらしい温かい文章

## 🎯 特徴

### リアルタイムコンテンツ管理
Notion APIとの完全連携により、店舗スタッフが簡単にコンテンツを更新可能。メニュー変更、新作ラテアート、イベント情報などがリアルタイムでWebサイトに反映されます。

### ネイティブアプリ体験
PWA対応により、スマートフォンのホーム画面に追加してアプリのように利用可能。オフライン対応で、ネット接続が不安定な環境でも基本機能を利用できます。

### プロ仕様DJ機能
RecordBox × DDJ-FLX4との連携により、本格的なDJ機材の情報をWebで表示。リアルタイム楽曲情報、波形ビジュアライザー、BPM表示など、プロレベルの音楽体験を提供します。

### モバイルファースト設計
参考サイト（https://ansauna.the-panese.jp/）をベースに、最大幅400pxのスマホ最適化デザインを実装。PC表示時も美しい左右分割レイアウトで、全デバイスで最適な体験を提供します。

### AI協働開発手法
Windsurf + Claudeによる最新のAI協働開発を実践。コード生成から設計提案まで、効率的かつ高品質な開発プロセスを実現しています。

## 💡 開発の背景・課題解決

### 解決した課題
1. **コンテンツ更新の煩雑さ**
   - 従来: HTMLファイル直接編集 → エンジニア依存
   - 解決策: Notion API連携 → 非エンジニアでも簡単更新

2. **モバイル体験の不足**
   - 従来: レスポンシブ対応不十分
   - 解決策: PWA + モバイルファースト設計

3. **リアルタイム性の欠如**
   - 従来: 静的サイト、更新反映に時間
   - 解決策: API連携によるリアルタイム更新

### 技術的チャレンジ
- **Notion API**: 複雑なデータ構造の正規化と最適化
- **PWA実装**: Service Worker、キャッシュ戦略の設計
- **パフォーマンス**: 画像最適化、遅延読み込みの実装
- **UX設計**: アニメーション、インタラクションの最適化

## 🌐 デモサイト

**🔗 Live Demo**: [kotarou-cafe-website.vercel.app](https://kotarou-cafe-website.vercel.app)

### 主要機能デモ
- **ホームページ**: Notion APIからのリアルタイムデータ表示
- **メニューページ**: カテゴリ別フィルタリング機能
- **ラテアートギャラリー**: 作品の自動スクロール表示
- **イベント・ニュース**: 最新情報の動的更新
- **PWA機能**: ホーム画面追加、オフライン対応

### レスポンシブデザイン
- **モバイル**: 400px幅最適化、タッチフレンドリーUI
- **PC**: 左右分割レイアウト、フルスクリーン体験

## 📦 インストール・起動方法

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/kotarou-cafe.git
cd kotarou-cafe

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.local.example .env.local
# .env.localファイルを編集してNotion APIキーとデータベースIDを設定

# 開発サーバーの起動（ポート3005）
npm run dev
```

ブラウザで [http://localhost:3005](http://localhost:3005) を開いてアプリケーションを確認できます。

### 環境変数設定

`.env.local`ファイルに以下の環境変数を設定してください：

```env
# Notion API設定
NOTION_API_KEY=your_notion_api_key
NOTION_LATTE_ART_DATABASE_ID=your_latte_art_database_id
NOTION_MENU_DATABASE_ID=your_menu_database_id
NOTION_EVENTS_DATABASE_ID=your_events_database_id
NOTION_NEWS_DATABASE_ID=your_news_database_id
```

## 📊 開発成果・学習内容

### 技術的成果
- ✅ **Notion API完全連携**: 4つのコンテンツタイプの動的管理
- ✅ **PWA対応**: Service Worker、マニフェスト、オフライン機能
- ✅ **TypeScript活用**: 型安全な大規模アプリケーション開発
- ✅ **パフォーマンス最適化**: 画像プロキシ、キャッシュ戦略
- ✅ **レスポンシブ設計**: モバイルファースト + PC最適化

### 学習・習得スキル
1. **API設計・連携**
   - RESTful API設計原則
   - エラーハンドリング・リトライ機構
   - データ正規化・最適化手法

2. **フロントエンド設計**
   - コンポーネント設計パターン
   - 状態管理（React Hooks）
   - アニメーション実装（Framer Motion）

3. **パフォーマンス最適化**
   - 画像最適化・遅延読み込み
   - キャッシュ戦略・PWA実装
   - バンドルサイズ最適化

### 開発プロセス
- **アジャイル開発**: 小さなイテレーションでの継続的改善
- **Git管理**: 機能別ブランチ、意味のあるコミットメッセージ
- **デプロイ自動化**: Vercel連携による継続的デプロイ

## 🚀 今後の拡張予定

### Phase 1: 機能拡張
- 🔄 **リアルタイムDJ機器連携**: RecordBox × DDJ-FLX4完全統合
- 📱 **プッシュ通知**: PWA通知機能の実装
- 🔍 **検索機能**: メニュー・作品の横断検索

### Phase 2: ビジネス機能
- 📅 **予約システム**: Notion連携による予約管理
- 💳 **決済機能**: オンライン注文・決済システム
- 📊 **分析ダッシュボード**: 利用統計・売上分析

### Phase 3: スケーラビリティ
- 🏪 **多店舗対応**: マルチテナント機能
- 🤖 **AI機能**: チャットボット・レコメンド機能
- 📱 **ネイティブアプリ**: React Native版の開発

## 👨‍💻 開発者情報

**Kotarou** - フルスタック開発者

### 技術スキル
- **フロントエンド**: Next.js, React, TypeScript, Tailwind CSS
- **バックエンド**: Node.js, API設計, データベース設計
- **インフラ**: Vercel, PWA, パフォーマンス最適化
- **開発手法**: アジャイル開発, Git管理, CI/CD

## 📞 お問い合わせ

本プロジェクトに関するご質問、技術的な相談、採用に関するお問い合わせは以下まで：

- **Email**: [お問い合わせ用メールアドレス]
- **GitHub**: [GitHubプロフィールURL]
- **Portfolio**: [ポートフォリオサイトURL]

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルをご確認ください。

---

<p align="center">
  <strong>🏪 実用的なWebアプリケーション開発の技術実証プロジェクト</strong><br>
  <i>Developed with ☕ Next.js × Notion API × Modern Web Technologies</i>
</p>
