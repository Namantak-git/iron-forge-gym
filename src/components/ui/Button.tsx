'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-[#c2141a] shadow-lg shadow-primary/20',
    secondary: 'bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700',
    outline: 'bg-transparent text-white border border-neutral-700 hover:bg-neutral-900 hover:border-neutral-500',
    glass: 'glass-card text-white hover:bg-white/10 border border-white/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
