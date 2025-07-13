import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

interface CardImageProps {
  children: ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardImage({ children, className = '' }: CardImageProps) {
  return (
    <div className={`relative h-48 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`font-heading text-xl font-bold text-primary mb-2 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-foreground/80 text-sm ${className}`}>
      {children}
    </p>
  );
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-6 py-4 bg-muted/50 ${className}`}>
      {children}
    </div>
  );
}
