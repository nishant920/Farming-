import React, { useState } from 'react';
import { Sprout } from 'lucide-react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackLabel?: string;
  containerClassName?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackLabel,
  className = '',
  containerClassName = '',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F1F6F3] text-[#1C2E24] p-6 text-center ${containerClassName} ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sprout className="w-8 h-8 text-[#2D6A4F] mb-2 opacity-80" />
        <span className="font-display text-sm font-semibold tracking-tight text-[#2D6A4F] max-w-[22ch]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  );
};
