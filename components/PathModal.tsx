'use client';

import React, { useState, useEffect, useRef } from 'react';
import ModalCanvasShell from './ModalCanvasShell';
import { pathData, PathMilestone } from '../data/pathMilestones';

interface PathModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function PathModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  triggerRef: externalTriggerRef,
}: PathModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const internalTriggerRef = useRef<HTMLElement | null>(null);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const activeTriggerRef = externalTriggerRef || internalTriggerRef;

  // Handle deep link /#path and browser back/forward buttons
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#path') {
        if (!isControlled) {
          if (document.activeElement instanceof HTMLElement) {
            internalTriggerRef.current = document.activeElement;
          }
          setInternalIsOpen(true);
        }
      } else {
        if (!isControlled && internalIsOpen) {
          setInternalIsOpen(false);
        }
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('popstate', checkHash);
    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('popstate', checkHash);
    };
  }, [isControlled, internalIsOpen]);

  const handleClose = () => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }

    // Clean up hash if it was #path
    if (typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#path') {
      window.history.pushState(
        null,
        '',
        window.location.pathname + window.location.search
      );
    }
  };

  const handleCloseAndScrollToProjects = () => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const regularMilestones = pathData.milestones.filter((m) => !m.isWhereThisGoes);
  const whereThisGoesMilestone = pathData.milestones.find((m) => m.isWhereThisGoes);

  return (
    <ModalCanvasShell
      isOpen={isOpen}
      onClose={handleClose}
      triggerRef={activeTriggerRef}
      titleId="path-canvas-title"
      descId="path-canvas-desc"
      title={pathData.title}
      subtitle={pathData.subtitle}
      showDesktopSubtitleInHeader={true}
      sections={[]}
      showSidebar={false}
      progressBarColor="from-pink-500 via-purple-400 to-white"
    >
      {() => (
        <div className="max-w-4xl mx-auto py-2 sm:py-4">
          {/* Hero Block (Intro paragraph shown once) */}
          <div className="max-w-2xl mx-auto mb-12 sm:mb-16 text-center space-y-3 pb-8 border-b border-white/[0.05]">
            <div className="font-mono text-xs uppercase tracking-widest text-fuchsia-400 font-medium">
              Technical Evolution
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              The Path
            </h2>
            <p className="text-[15px] sm:text-base text-zinc-300 leading-relaxed max-w-xl mx-auto">
              {pathData.intro}
            </p>
          </div>

          {/* Timeline Tree */}
          <div className="relative max-w-3xl mx-auto">
            {/* Continuous Connector Line: down left on mobile (< md), down center on desktop (md+) */}
            <div
              className="absolute top-4 bottom-28 left-[18px] md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-pink-500 via-purple-500/70 to-white/10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Semantic Ordered List for Accessibility */}
            <ol className="relative space-y-8 sm:space-y-12 list-none p-0 m-0">
              {regularMilestones.map((milestone, idx) => (
                <TimelineNodeItem
                  key={milestone.id}
                  milestone={milestone}
                  index={idx}
                />
              ))}
            </ol>

            {/* Final Node: 'Where this goes' full-width callout card */}
            {whereThisGoesMilestone && (
              <div className="mt-12 sm:mt-16 relative">
                {/* Connector termination dot */}
                <div
                  className="flex justify-center mb-6"
                  aria-hidden="true"
                >
                  <div className="w-4 h-4 rounded-full border-2 border-fuchsia-400/80 bg-gradient-to-r from-pink-500 to-purple-600 shadow-[0_0_16px_rgba(237,30,121,0.5)]" />
                </div>

                <div className="w-full rounded-2xl bg-gradient-to-b from-[#14141b] to-[#0c0c10] border border-fuchsia-500/20 p-6 sm:p-8 space-y-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fuchsia-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                    <span>{whereThisGoesMilestone.year}</span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                    {whereThisGoesMilestone.title}
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {whereThisGoesMilestone.description}
                  </p>
                </div>
              </div>
            )}

            {/* Closing CTA Button: Closes canvas and scrolls to Projects */}
            <div className="pt-10 sm:pt-14 pb-4 flex justify-center">
              <button
                type="button"
                onClick={handleCloseAndScrollToProjects}
                className="proggy group px-6 py-3 rounded-xl border border-white/[0.15] bg-white text-zinc-950 font-medium hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2.5 text-sm cursor-pointer shadow-lg active:scale-[0.98]"
              >
                <span>{pathData.closingCta.label}</span>
                <span className="font-bold transition-transform duration-300 group-hover:translate-y-0.5">
                  &darr;
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalCanvasShell>
  );
}

/* ─────────────────────────────────────────────────────────────
   Individual Milestone Node with scroll animation
───────────────────────────────────────────────────────────── */

function TimelineNodeItem({
  milestone,
  index,
}: {
  milestone: PathMilestone;
  index: number;
}) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion: appear immediately
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setHasAppeared(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAppeared(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;
  const isNow = milestone.isNow;

  return (
    <li
      ref={itemRef}
      className={`relative flex flex-col md:flex-row items-start transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
        hasAppeared ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{
        transitionDelay: `${index * 60}ms`,
      }}
    >
      {/* Node Dot Marker */}
      {/* Mobile: locked at left-[18px]; Desktop: locked at center md:left-1/2 */}
      <div
        className="absolute left-[18px] md:left-1/2 -translate-x-1/2 top-4 md:top-5 z-20 flex items-center justify-center select-none pointer-events-none"
        aria-hidden="true"
      >
        {isNow ? (
          <div className="relative flex items-center justify-center">
            {/* Pulsing halo */}
            <span className="w-5 h-5 rounded-full bg-pink-500/40 animate-ping motion-reduce:hidden" />
            <span className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_12px_rgba(237,30,121,0.8)]" />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        ) : (
          <div className="w-3.5 h-3.5 rounded-full border-2 border-white/50 bg-[#0A0A0C] shadow-sm" />
        )}
      </div>

      {/* Milestone Card */}
      {/* On mobile: full width on right of line (pl-12). On desktop: alternating left/right (pr-10 / pl-10) */}
      <div
        className={`w-full pl-12 md:pl-0 ${
          isEven
            ? 'md:w-1/2 md:pr-10 md:mr-auto'
            : 'md:w-1/2 md:pl-10 md:ml-auto'
        }`}
      >
        <div
          className={`rounded-xl p-4 min-[390px]:p-5 transition-colors ${
            isNow
              ? 'border border-pink-500/40 bg-pink-500/[0.04] shadow-[0_0_24px_rgba(237,30,121,0.08)]'
              : 'border border-white/[0.06] bg-[#111116] hover:border-white/[0.12]'
          }`}
        >
          {/* Label / Year */}
          <span
            className={`font-mono text-xs uppercase tracking-wider block mb-1 font-medium ${
              isNow ? 'text-pink-400 font-semibold' : 'text-zinc-500'
            }`}
          >
            {milestone.year}
          </span>

          {/* Milestone Title */}
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2">
            {milestone.title}
          </h2>

          {/* Milestone Description */}
          <p className="text-sm sm:text-[15px] text-zinc-300 leading-[1.6]">
            {milestone.description}
          </p>
        </div>
      </div>
    </li>
  );
}
