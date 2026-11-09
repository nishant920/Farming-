import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'dark', className = '' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#1C2E24]';

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D6A4F] rounded-md ${className}`}
      aria-label="Shobhit Agro Farm Hub Home"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <rect width="36" height="36" rx="8" fill="#E8F1EC" />
        <rect x="1" y="1" width="34" height="34" rx="7" stroke="#2D6A4F" strokeOpacity="0.25" />
        <path
          d="M8 27C12.5 23.5 18 22 28 22"
          stroke="#2D6A4F"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M11 30.5C15.5 27.8 20.5 26.5 28 26.5"
          stroke="#52796F"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M18 23V11.5M18 13.5C18 10 21.8 7.5 25.5 8C25.5 11.8 22.8 14.5 18 14.5ZM18 16.5C18 13 14.2 10.5 10.5 11C10.5 14.8 13.2 17.5 18 17.5Z"
          stroke="#2D6A4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`font-display text-lg font-bold tracking-tight ${textColor}`}>
        Shobhit Agro Farm Hub
      </span>
    </Link>
  );
};
