import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 hover:scale-105 active:scale-95';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-secondary hover:bg-secondary-dark text-white shadow-lg hover:shadow-xl',
    accent: 'bg-accent hover:bg-accent-dark text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
