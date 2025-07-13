'use client';

import { ReactNode, HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  container?: boolean;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  bgColor?: 'default' | 'primary' | 'secondary' | 'accent' | 'muted';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    children, 
    container = true, 
    spacing = 'lg',
    bgColor = 'default',
    ...props 
  }, ref) => {
    // スペーシングのクラス
    const spacingClasses = {
      none: '',
      sm: 'py-4 md:py-6',
      md: 'py-8 md:py-12',
      lg: 'py-12 md:py-16',
      xl: 'py-16 md:py-24',
    };

    // 背景色のクラス
    const bgClasses = {
      default: 'bg-background',
      primary: 'bg-primary/5',
      secondary: 'bg-secondary/5',
      accent: 'bg-accent/5',
      muted: 'bg-muted',
    };

    return (
      <section
        ref={ref}
        className={cn(
          spacingClasses[spacing],
          bgClasses[bgColor],
          className
        )}
        {...props}
      >
        {container ? (
          <div className="container mx-auto px-4">{children}</div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';

// セクションタイトルコンポーネント
interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  centered?: boolean;
  decorative?: boolean;
}

const SectionTitle = forwardRef<HTMLDivElement, SectionTitleProps>(
  ({ className, title, subtitle, centered = false, decorative = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mb-8 md:mb-12',
          centered && 'text-center',
          className
        )}
        {...props}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading">
          {title}
        </h2>
        
        {decorative && (
          <div className={cn(
            'mt-2 mb-4 h-1 w-16 bg-accent',
            centered && 'mx-auto'
          )} />
        )}
        
        {subtitle && (
          <p className="mt-3 text-lg text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionTitle.displayName = 'SectionTitle';

export { Section, SectionTitle };
