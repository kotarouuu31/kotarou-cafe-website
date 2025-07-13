'use client';

import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ボタンのバリエーションを定義
const buttonVariants = cva(
  // 共通のスタイル
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      // バリアント（見た目のスタイル）
      variant: {
        default: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-secondary text-white hover:bg-secondary-dark',
        accent: 'bg-accent text-white hover:bg-accent-dark',
        outline: 'border border-primary text-primary hover:bg-primary/10',
        ghost: 'hover:bg-primary/10 text-primary',
        link: 'text-primary underline-offset-4 hover:underline',
        danger: 'bg-destructive text-white hover:bg-destructive/90',
      },
      // サイズ
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10 p-2',
      },
      // 幅いっぱいに広げるかどうか
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  href?: string;
  fullWidth?: boolean;
  isExternal?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, children, href, isExternal, ...props }, ref) => {
    // hrefが指定されている場合はLinkコンポーネントを使用
    if (href) {
      const linkProps = isExternal
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {};

      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          {...linkProps}
        >
          {children}
        </Link>
      );
    }

    // 通常のボタン
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
