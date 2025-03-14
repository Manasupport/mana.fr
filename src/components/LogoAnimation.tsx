
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoAnimationProps {
  className?: string;
}

const LogoAnimation: React.FC<LogoAnimationProps> = ({ className }) => {
  return (
    <div className={cn('relative select-none', className)}>
      <div className="animate-float">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-pulse-soft"
        >
          <path
            d="M40 5C20.67 5 5 20.67 5 40C5 59.33 20.67 75 40 75C59.33 75 75 59.33 75 40C75 20.67 59.33 5 40 5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="text-white/20"
          />
          <path
            d="M20 30L40 20L60 30"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-mana-green"
          />
          <path
            d="M20 50L40 60L60 50"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-mana-light-blue"
          />
          <path
            d="M20 30V50M40 20V60M60 30V50"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          />
          <path
            d="M29 35H32M48 35H51M29 45H32M48 45H51"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/80"
          />
        </svg>
      </div>
      {/* Removed the MANA text that was here */}
    </div>
  );
};

export default LogoAnimation;
