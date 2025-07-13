import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  bgColor?: 'default' | 'muted' | 'primary' | 'secondary';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function Section({
  children,
  bgColor = 'default',
  spacing = 'md',
  className = '',
}: SectionProps) {
  const bgColors = {
    default: 'bg-background',
    muted: 'bg-muted',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
  };
  
  const spacings = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20',
  };
  
  return (
    <section className={`${bgColors[bgColor]} ${spacings[spacing]} ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({
  title,
  subtitle,
  centered = false,
  className = '',
}: SectionTitleProps) {
  const textAlign = centered ? 'text-center' : '';
  const marginBottom = subtitle ? 'mb-4' : 'mb-8';
  
  return (
    <div className={`${textAlign} ${marginBottom} ${className}`}>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
