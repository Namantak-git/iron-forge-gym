import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, className = '', hoverable = true }: CardProps) {
  return (
    <div
      className={`glass-card rounded-xl p-6 transition-all duration-300 ${
        hoverable ? 'glass-card-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
