import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
}) => {
  return (
    <button 
      className={`button button--${variant} button--${size} ${className}`}
      style={{
        borderRadius: '0.5rem',
        padding: size === 'small' ? '0.375rem 0.75rem' : size === 'large' ? '0.75rem 1.5rem' : '0.5rem 1rem',
        fontWeight: 500,
        fontSize: size === 'small' ? '0.875rem' : size === 'large' ? '1.125rem' : '1rem',
        background: variant === 'primary' ? '#0066cc' : '#e5e7eb',
        color: variant === 'primary' ? 'white' : '#111827',
        transition: 'all 0.2s',
      }}
    >
      {children}
    </button>
  );
};
