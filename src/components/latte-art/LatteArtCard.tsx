"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import { LatteArtWork } from '@/types/latte-art';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Eye } from 'lucide-react';

// アニメーション設定を定数として分離
const CARD_VARIANTS: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: {
    y: -4,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
  }
};

const CARD_TRANSITION = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20
};

// スタイル定数
const STYLES = {
  card: "group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
  imageContainer: "relative aspect-[3/4] overflow-hidden",
  image: "object-cover transition-transform duration-500 group-hover:scale-105",
  overlay: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  viewIcon: "absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  iconButton: "bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm",
  content: "p-3 space-y-2",
  title: "font-bold text-gray-900 text-sm line-clamp-1",
  date: "text-xs text-gray-500",
  comment: "text-xs text-gray-600 line-clamp-2"
} as const;

// Props型定義
interface LatteArtCardProps {
  work: LatteArtWork;
  index?: number;
  priority?: boolean;
}

// 画像コンポーネントの分離
const LatteArtImage = memo(({ work, priority = false }: { work: LatteArtWork; priority?: boolean }) => (
  <div className={STYLES.imageContainer}>
    <Image
      src={work.imageUrl}
      alt={`${work.title}のラテアート作品`}
      fill
      className={STYLES.image}
      sizes="(max-width: 400px) 50vw, (max-width: 768px) 33vw, 200px"
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
    />
    
    {/* ホバーオーバーレイ */}
    <div className={STYLES.overlay} aria-hidden="true" />
    
    {/* 表示アイコン */}
    <div className={STYLES.viewIcon} aria-hidden="true">
      <div className={STYLES.iconButton}>
        <Eye className="w-4 h-4 text-gray-700" aria-hidden="true" />
      </div>
    </div>
  </div>
));

LatteArtImage.displayName = 'LatteArtImage';

// 作品情報コンポーネントの分離
const LatteArtInfo = memo(({ work }: { work: LatteArtWork }) => (
  <div className={STYLES.content}>
    <h3 className={STYLES.title} title={work.title}>
      {work.title}
    </h3>
    
    <time className={STYLES.date} dateTime={work.createdAt}>
      {work.createdAt}
    </time>
    
    {work.comment && (
      <p className={STYLES.comment} title={work.comment}>
        {work.comment}
      </p>
    )}
  </div>
));

LatteArtInfo.displayName = 'LatteArtInfo';

// メインコンポーネント
export const LatteArtCard = memo<LatteArtCardProps>(({ work, index = 0, priority = false }) => {
  const cardId = `latte-art-card-${work.id}`;
  const linkHref = `/latte-art/${work.id}`;
  
  return (
    <motion.article
      id={cardId}
      className={STYLES.card}
      variants={CARD_VARIANTS}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{
        ...CARD_TRANSITION,
        delay: index * 0.1 // ステージングアニメーション
      }}
      role="article"
      aria-labelledby={`${cardId}-title`}
    >
      <Link 
        href={linkHref} 
        className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
        aria-describedby={work.comment ? `${cardId}-comment` : undefined}
      >
        <LatteArtImage work={work} priority={priority} />
        
        <div className={STYLES.content}>
          <h3 id={`${cardId}-title`} className={STYLES.title} title={work.title}>
            {work.title}
          </h3>
          
          <time className={STYLES.date} dateTime={work.createdAt}>
            {work.createdAt}
          </time>
          
          {work.comment && (
            <p id={`${cardId}-comment`} className={STYLES.comment} title={work.comment}>
              {work.comment}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
});

LatteArtCard.displayName = 'LatteArtCard';

export default LatteArtCard;
