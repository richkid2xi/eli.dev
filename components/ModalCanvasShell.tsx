'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface ModalSectionItem {
  id: string;
  title: string;
  shortTitle?: string;
}

export interface ModalCanvasShellProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
  titleId: string;
  descId?: string;

  // Header content
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  headerBadge?: React.ReactNode;
  showDesktopSubtitleInHeader?: boolean;

  // Navigation
  sections: ModalSectionItem[];
  activeSectionId?: string;
  onActiveSectionChange?: (id: string) => void;
  customSidebarNav?: (activeSection: string, scrollToSection: (id: string) => void) => React.ReactNode;
  customMobileNav?: (activeSection: string, scrollToSection: (id: string) => void) => React.ReactNode;

  // Sidebar customizations
  sidebarHeader?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  showSidebar?: boolean;

  // Progress Bar styling
  progressBarColor?: string;

  // Main scroll content
  children: (helpers: {
    activeSection: string;
    isExpanded: boolean;
    scrollToSection: (id: string) => void;
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  }) => React.ReactNode;
}

type ModalState =
  | 'closed'
  | 'opening'
  | 'open'
  | 'expanding'
  | 'expanded'
  | 'collapsing'
  | 'closing';

export default function ModalCanvasShell({
  isOpen,
  onClose,
  triggerRef,
  titleId,
  descId,
  title,
  subtitle,
  headerBadge,
  showDesktopSubtitleInHeader = true,
  sections,
  activeSectionId,
  onActiveSectionChange,
  customSidebarNav,
  customMobileNav,
  sidebarHeader,
  sidebarFooter,
  showSidebar = true,
  progressBarColor = 'from-zinc-500 via-zinc-300 to-white',
  children,
}: ModalCanvasShellProps) {
  const [mounted, setMounted] = useState(false);
  const [modalState, setModalState] = useState<ModalState>(isOpen ? 'open' : 'closed');
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentFading, setContentFading] = useState(false);
  const [internalActiveSection, setInternalActiveSection] = useState<string>(
    sections[0]?.id || ''
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const prevIsOpenRef = useRef(isOpen);

  const modalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRafId = useRef<number | null>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const desktopSidebarRef = useRef<HTMLElement>(null);

  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const contentSwapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const savedScrollTopRef = useRef<number>(0);

  // Click-lock flag & timeout to synchronize programmatic clicks and avoid IntersectionObserver conflicts
  const isScrollingToSection = useRef(false);
  const scrollLockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // iOS-safe body scroll lock management
  const scrollYRef = useRef(0);
  const isLockedRef = useRef(false);

  const activeSection = activeSectionId !== undefined ? activeSectionId : internalActiveSection;

  const setActive = useCallback(
    (id: string) => {
      setInternalActiveSection(id);
      if (onActiveSectionChange) {
        onActiveSectionChange(id);
      }
    },
    [onActiveSectionChange]
  );

  // Detect reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Mount check for SSR Portal safety
  useEffect(() => {
    setMounted(true);
  }, []);

  const lockBodyScroll = useCallback(() => {
    if (isLockedRef.current || typeof window === 'undefined') return;
    scrollYRef.current = window.scrollY;
    isLockedRef.current = true;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('data-modal-open', 'true');
  }, []);

  const unlockBodyScroll = useCallback(() => {
    if (!isLockedRef.current || typeof window === 'undefined') return;
    isLockedRef.current = false;

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    document.body.removeAttribute('data-modal-open');
    window.scrollTo(0, scrollYRef.current);
  }, []);

  // Update default active section when sections change or modal opens
  useEffect(() => {
    if (isOpen && sections.length > 0 && !activeSectionId) {
      setInternalActiveSection(sections[0].id);
    }
  }, [isOpen, sections, activeSectionId]);

  // Synchronize state machine with isOpen prop
  useEffect(() => {
    // Modal transitions from closed to open
    if (isOpen && !prevIsOpenRef.current) {
      prevIsOpenRef.current = true;
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);

      lockBodyScroll();

      // Reset scroll position on initial open
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }

      setModalState('opening');

      const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 640;
      const openDuration = reducedMotion ? 120 : isMobileScreen ? 320 : 280;

      animationTimerRef.current = setTimeout(() => {
        setModalState('open');
      }, openDuration);
    }
    // Modal transitions from open to closed
    else if (!isOpen && prevIsOpenRef.current) {
      prevIsOpenRef.current = false;
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      if (contentSwapTimerRef.current) clearTimeout(contentSwapTimerRef.current);

      setModalState('closing');

      const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 640;
      const closeDuration = reducedMotion ? 120 : isMobileScreen ? 240 : 200;

      animationTimerRef.current = setTimeout(() => {
        setModalState('closed');
        setIsExpanded(false);
        setContentFading(false);
        unlockBodyScroll();
        if (triggerRef?.current) {
          triggerRef.current.focus({ preventScroll: true });
        }
      }, closeDuration);
    }
  }, [isOpen, lockBodyScroll, unlockBodyScroll, reducedMotion, triggerRef]);

  // Trigger internal close animation
  const handleClose = useCallback(() => {
    if (modalState === 'closed' || modalState === 'closing') return;
    onClose();
  }, [modalState, onClose]);

  // Expand / Collapse smooth transition with content cross-fade
  const handleToggleExpand = useCallback(() => {
    if (
      modalState === 'opening' ||
      modalState === 'closing' ||
      modalState === 'closed'
    ) {
      return;
    }

    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    if (contentSwapTimerRef.current) clearTimeout(contentSwapTimerRef.current);

    const targetTransition = isExpanded ? 'collapsing' : 'expanding';
    setModalState(targetTransition);

    // Save scroll position to preserve across expand/collapse
    if (scrollContainerRef.current) {
      savedScrollTopRef.current = scrollContainerRef.current.scrollTop;
    }

    if (reducedMotion) {
      setIsExpanded((prev) => !prev);
      setModalState(targetTransition === 'expanding' ? 'expanded' : 'open');
      return;
    }

    // Cross-fade content: 100ms fade out, swap layout, restore scrollTop, 180ms fade in
    setContentFading(true);

    contentSwapTimerRef.current = setTimeout(() => {
      setIsExpanded((prev) => !prev);
      // Immediately restore scrollTop
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = savedScrollTopRef.current;
        }
        setContentFading(false);
      });
    }, 100);

    animationTimerRef.current = setTimeout(() => {
      setModalState(targetTransition === 'expanding' ? 'expanded' : 'open');
    }, 320);
  }, [modalState, isExpanded, reducedMotion]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      if (contentSwapTimerRef.current) clearTimeout(contentSwapTimerRef.current);
      if (scrollLockTimeoutRef.current) clearTimeout(scrollLockTimeoutRef.current);
      if (scrollRafId.current !== null) cancelAnimationFrame(scrollRafId.current);
      unlockBodyScroll();
    };
  }, [unlockBodyScroll]);

  // Focus trap and Escape key listener
  useEffect(() => {
    if (modalState === 'closed') return;

    const focusTimeout = setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === 'Tab') {
        const modal = modalRef.current;
        if (!modal) return;

        const focusables = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus({ preventScroll: true });
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus({ preventScroll: true });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(focusTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalState, handleClose]);

  // Real-time deterministic scroll tracking (eliminates race condition & blinking)
  const updateActiveSectionOnScroll = useCallback(
    (container: HTMLElement) => {
      if (isScrollingToSection.current || sections.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      const readingLine = containerRect.top + Math.min(130, containerRect.height * 0.25);

      let foundSectionId = sections[0].id;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const elRect = el.getBoundingClientRect();
          if (elRect.top <= readingLine) {
            foundSectionId = sections[i].id;
          } else {
            break;
          }
        }
      }

      // Check if user scrolled to bottom of content -> lock to last section
      const atBottom =
        container.scrollHeight - container.scrollTop <= container.clientHeight + 40;
      if (atBottom && sections.length > 0) {
        foundSectionId = sections[sections.length - 1].id;
      }

      setActive(foundSectionId);
    },
    [sections, setActive]
  );

  // Auto-scroll active section tab into view on mobile
  useEffect(() => {
    if (!mobileNavRef.current || !activeSection) return;
    const activeTabEl = mobileNavRef.current.querySelector<HTMLElement>(
      `[data-section-id="${activeSection}"]`
    );
    if (activeTabEl) {
      activeTabEl.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeSection, reducedMotion]);

  // Auto-scroll active section item into view on desktop sidebar
  useEffect(() => {
    if (!desktopSidebarRef.current || !activeSection) return;
    const activeItemEl = desktopSidebarRef.current.querySelector<HTMLElement>(
      `[data-section-id="${activeSection}"]`
    );
    if (activeItemEl) {
      activeItemEl.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'nearest',
      });
    }
  }, [activeSection, reducedMotion]);

  // Scroll Progress and active section listener throttled with requestAnimationFrame
  const handleContainerScroll = useCallback(
    (e: React.UIEvent<HTMLElement>) => {
      const container = e.currentTarget;
      if (scrollRafId.current !== null) return;

      scrollRafId.current = window.requestAnimationFrame(() => {
        scrollRafId.current = null;
        if (!container) return;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;
        const progress =
          scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
        setScrollProgress(progress);

        updateActiveSectionOnScroll(container);
      });
    },
    [updateActiveSectionOnScroll]
  );

  // Smooth scroll within active container to target section
  const scrollToSection = (id: string) => {
    const container = scrollContainerRef.current;
    const target = document.getElementById(id);
    if (!container || !target) return;

    isScrollingToSection.current = true;
    if (scrollLockTimeoutRef.current) {
      clearTimeout(scrollLockTimeoutRef.current);
    }

    setActive(id);

    const containerTop = container.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    const currentScrollTop = container.scrollTop;
    const relativeOffset = targetTop - containerTop + currentScrollTop;
    const topOffset = isExpanded ? 115 : 24;

    container.scrollTo({
      top: Math.max(0, relativeOffset - topOffset),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });

    scrollLockTimeoutRef.current = setTimeout(() => {
      isScrollingToSection.current = false;
    }, 750);
  };

  // Backdrop click closes when in modal mode (never in expanded mode)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isExpanded && e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!mounted || modalState === 'closed') return null;

  const isClosing = modalState === 'closing';
  const isOpening = modalState === 'opening';

  const actionButtonClass =
    'w-10 h-10 min-w-10 min-h-10 max-w-10 max-h-10 relative flex items-center justify-center rounded-lg border border-white/[0.08] hover:border-white/[0.2] bg-white/[0.02] hover:bg-white/[0.05] active:bg-white/[0.08] text-[#9BA1A6] hover:text-zinc-100 transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none shrink-0 after:absolute after:-inset-[2px] after:content-[\'\'] cursor-pointer';

  // Render unified sticky top block
  const renderStickyTopBar = () => (
    <div className="sticky top-0 z-40 shrink-0 bg-[#0E0E12] border-b border-white/[0.05]">
      {/* Header */}
      <header className="px-4 py-3 sm:px-6 md:px-8 sm:py-4 flex items-start justify-between gap-3 min-w-0 pt-[max(12px,env(safe-area-inset-top,0px))] pl-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))]">
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <h2
              id={titleId}
              className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-zinc-100 line-clamp-2 sm:line-clamp-1"
            >
              {title}
            </h2>
            {headerBadge}
          </div>
          {subtitle && (
            <p
              id={descId}
              className={
                showDesktopSubtitleInHeader
                  ? 'hidden sm:block text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-1 max-w-2xl font-normal'
                  : 'sr-only'
              }
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleToggleExpand}
            aria-label={isExpanded ? 'Collapse canvas to modal' : 'Expand modal to full canvas'}
            title={isExpanded ? 'Collapse to modal' : 'Expand canvas'}
            className={actionButtonClass}
          >
            {isExpanded ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            )}
          </button>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            title="Close (Esc)"
            className={actionButtonClass}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Progress Line */}
      <div
        className="w-full h-[2.5px] bg-white/[0.04] overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className={`h-full bg-gradient-to-r ${progressBarColor} transition-[width] duration-75 ease-out`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Horizontal Stepper */}
      {sections.length > 0 &&
        (customMobileNav ? (
          customMobileNav(activeSection, scrollToSection)
        ) : (
          <div className="relative md:hidden border-t border-white/[0.05] bg-[#0E0E12]">
            <div
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-[#0E0E12] to-transparent z-10"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-[#0E0E12] to-transparent z-10"
              aria-hidden="true"
            />
            <nav
              ref={mobileNavRef}
              aria-label="Section shortcuts mobile"
              className="flex items-center overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 py-2 gap-1.5 scroll-smooth"
            >
              {sections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    data-section-id={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`shrink-0 h-9 px-3 rounded-full text-xs font-mono transition-colors flex items-center justify-center cursor-pointer ${
                      isActive
                        ? 'bg-white/[0.08] text-white font-medium border border-white/[0.12]'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                    }`}
                  >
                    <span>{sec.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
    </div>
  );

  // Shell Layout Container
  const shellContent = (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 ${
        isExpanded ? 'sm:p-0' : 'sm:p-4 md:p-6'
      } transition-[padding] duration-300 ease-in-out`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={subtitle && descId ? descId : undefined}
      onClick={handleBackdropClick}
    >
      {/* Dimmed Backdrop: Solid rgba on mobile (no blur), blurred on desktop */}
      <div
        className={`absolute inset-0 bg-[#070709]/85 sm:backdrop-blur-md transition-opacity ${
          reducedMotion
            ? 'duration-120'
            : isClosing
            ? 'duration-200 ease-in'
            : 'duration-200 ease-out'
        } ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      />

      {/* Main Animated Modal/Canvas Shell: Translucent background lets astral dots show through */}
      <div
        ref={modalRef}
        style={{
          willChange:
            isOpening || isClosing
              ? 'transform, opacity'
              : modalState === 'expanding' || modalState === 'collapsing'
              ? 'clip-path'
              : 'auto',
          transitionTimingFunction:
            modalState === 'expanding' || modalState === 'collapsing'
              ? 'var(--ease-in-out)'
              : 'var(--ease-out)',
        }}
        className={`relative z-10 flex flex-col bg-[#0A0A0C]/92 sm:backdrop-blur-sm text-[#9BA1A6] overflow-hidden ${
          isExpanded
            ? 'w-full h-[100svh] rounded-none border-0 shadow-none'
            : 'w-full max-w-5xl h-[92svh] max-h-[92svh] rounded-t-2xl sm:rounded-2xl border border-white/[0.06] shadow-[0_24px_72px_rgba(0,0,0,0.9)]'
        } ${
          reducedMotion
            ? 'transition-opacity duration-120'
            : isClosing
            ? 'max-sm:translate-y-full max-sm:transition-transform max-sm:duration-[240ms] max-sm:ease-in sm:opacity-0 sm:translate-y-4 sm:scale-[0.98] sm:transition-[opacity,transform] sm:duration-200 sm:ease-in'
            : isOpening
            ? 'max-sm:animate-[sheetIn_320ms_var(--ease-out)] sm:animate-[panelIn_280ms_var(--ease-out)]'
            : 'transition-[clip-path,border-radius,box-shadow] duration-[320ms]'
        }`}
      >
        {renderStickyTopBar()}

        {/* Content Layout with cross-fade transition */}
        <div
          className={`flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden relative transition-opacity ${
            reducedMotion ? 'duration-75' : 'duration-100'
          } ${contentFading ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* Desktop Sidebar Navigation */}
          {showSidebar && sections.length > 0 && (
            <aside
              ref={desktopSidebarRef}
              aria-label="Section shortcuts"
              className="hidden md:flex flex-col w-60 lg:w-64 shrink-0 border-r border-white/[0.05] bg-[#0A0A0C]/80 p-6 lg:p-7 justify-between overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {customSidebarNav ? (
                customSidebarNav(activeSection, scrollToSection)
              ) : (
                <div className="space-y-6">
                  {sidebarHeader || (
                    <div>
                      <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest mb-1">
                        Navigation
                      </div>
                      <div className="text-sm font-medium text-zinc-200">Sections</div>
                    </div>
                  )}

                  <nav className="space-y-1" aria-label="Section links">
                    {sections.map((sec, idx) => {
                      const isActive = activeSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          data-section-id={sec.id}
                          onClick={() => scrollToSection(sec.id)}
                          className={`w-full group text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center gap-2.5 font-mono cursor-pointer ${
                            isActive
                              ? 'bg-white/[0.06] text-white font-medium'
                              : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'
                          }`}
                        >
                          <span
                            className={`text-[10px] w-4 ${
                              isActive ? 'text-zinc-200' : 'text-zinc-600 group-hover:text-zinc-400'
                            }`}
                          >
                            0{idx + 1}
                          </span>
                          <span className="truncate">{sec.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              )}

              {sidebarFooter && (
                <div className="pt-6 border-t border-white/[0.05]">{sidebarFooter}</div>
              )}
            </aside>
          )}

          {/* Single Content Container */}
          <main
            ref={scrollContainerRef}
            onScroll={handleContainerScroll}
            tabIndex={0}
            className="flex-1 overflow-y-auto overscroll-contain [overscroll-behavior:contain] [touch-action:pan-y] [-webkit-overflow-scrolling:touch] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 px-4 min-[390px]:px-5 sm:px-8 md:px-10 py-6 sm:py-8 space-y-10 [contain:layout_paint] no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0 pb-[max(32px,calc(env(safe-area-inset-bottom,0px)+32px))]"
          >
            {children({
              activeSection,
              isExpanded,
              scrollToSection,
              scrollContainerRef,
            })}
          </main>
        </div>
      </div>
    </div>
  );

  return createPortal(shellContent, document.body);
}
