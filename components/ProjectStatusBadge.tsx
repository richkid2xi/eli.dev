'use client';

import React from 'react';

export type ProjectStatus = 'coming-soon' | 'live';

export interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export default function ProjectStatusBadge({
  status,
  label,
  className = '',
  size = 'sm',
}: ProjectStatusBadgeProps) {
  const isComingSoon = status === 'coming-soon';

  const defaultLabel = isComingSoon ? 'In development · Coming soon' : 'Live';
  const displayLabel = label || defaultLabel;

  const accessibleLabel = isComingSoon
    ? 'Status: In development, coming soon'
    : 'Status: Live';

  const colorStyles = isComingSoon
    ? {
        container:
          'border-amber-500/30 bg-amber-500/10 text-amber-300/90 shadow-[0_0_12px_rgba(245,158,11,0.08)]',
        pingDot: 'bg-amber-400',
        solidDot: 'bg-amber-400',
      }
    : {
        container:
          'border-emerald-500/30 bg-emerald-500/10 text-emerald-300/90 shadow-[0_0_12px_rgba(16,185,129,0.08)]',
        pingDot: 'bg-emerald-400',
        solidDot: 'bg-emerald-400',
      };

  const sizeStyles =
    size === 'md'
      ? 'px-3 py-1 text-xs gap-2'
      : 'px-2.5 py-0.5 text-[11px] sm:text-xs gap-1.5';

  return (
    <span
      role="status"
      aria-label={accessibleLabel}
      tabIndex={0}
      className={`inline-flex items-center rounded-full border font-mono tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${colorStyles.container} ${sizeStyles} ${className}`}
    >
      <span className="relative flex h-2 w-2 shrink-0 items-center justify-center" aria-hidden="true">
        {/* Pulsing ring respects prefers-reduced-motion: hidden when reduced motion is requested */}
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping motion-reduce:hidden ${colorStyles.pingDot}`}
        />
        {/* Static solid dot always visible */}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${colorStyles.solidDot}`}
        />
      </span>
      <span className="select-none font-medium truncate">{displayLabel}</span>
    </span>
  );
}
