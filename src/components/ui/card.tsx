'use client';

import { ReactNode, HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// カードのルートコンポーネント
const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

// カードヘッダーコンポーネント
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

// カードタイトルコンポーネント
const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

// カード説明コンポーネント
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

// カードコンテンツコンポーネント
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

// カードフッターコンポーネント
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

// カード画像コンポーネント
interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, aspectRatio = 'video', children, ...props }, ref) => {
    const aspectRatioClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      wide: 'aspect-[21/9]',
      auto: 'aspect-auto',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-t-lg',
          aspectRatioClasses[aspectRatio],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardImage.displayName = 'CardImage';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
};
