import React from 'react';

interface SectionHeaderProps {
  kicker: string;
  title: string;
  description?: string;
  align?: 'left' | 'between';
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  description,
  align = 'between',
  action,
}) => {
  return (
    <div
      className={`flex flex-col ${
        align === 'between' ? 'lg:flex-row lg:items-end lg:justify-between' : 'items-start'
      } gap-6 mb-8`}
    >
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-wider uppercase mb-2 text-[#2D6A4F]">
          {kicker}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight headline-balance text-[#1C2E24]">
          {title}
        </h2>
        {description && (
          <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#4B5E53]">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
