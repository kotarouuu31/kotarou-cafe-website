'use client';

import { ReactNode } from 'react';
import { Label } from './Label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id: string;
  label: string;
  children: ReactNode;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  className?: string;
}

export function FormField({
  id,
  label,
  children,
  helperText,
  error,
  errorMessage,
  required,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
      {(helperText || (error && errorMessage)) && (
        <p
          className={cn(
            'text-xs',
            error ? 'text-destructive' : 'text-muted-foreground'
          )}
        >
          {error ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
}
