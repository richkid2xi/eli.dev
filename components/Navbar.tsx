'use client';

import React, { useState, useEffect, useRef } from 'react';

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  // IntersectionObserver on a 60px top sentinel to drive desktop hero merge vs scrolled floating pill
  useEffect(() => {
    const sentinel = document.createElement('div');
    sentinel.setAttribute('data-nav-sentinel', 'true');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.left = '0';
    sentinel.style.height = '60px';
    sentinel.style.width = '1px';
    sentinel.style.pointerEvents = 'none';
    sentinel.style.opacity = '0';
    sentinel.style.zIndex = '-999';
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When at top (< 60px), entry.isIntersecting is true -> scrolled is false (merges with hero)
        // When scrolled down (> 60px), entry.isIntersecting is false -> scrolled is true (floating pill banner)
        setScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Ignore resize events that only change height on touch devices (e.g. mobile URL bar collapsing)
  useEffect(() => {
    let prevWidth = window.innerWidth;
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth === prevWidth) return;
      prevWidth = newWidth;
      if (newWidth >= 1024) {
        setOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // iOS-safe body scroll lock when mobile hamburger menu is open
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalOverflow = document.body.style.overflow;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.body.style.overflow = originalOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const handleNav = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollTo(id), 100);
  };

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[60] h-[calc(56px+env(safe-area-inset-top,0px))] pt-[env(safe-area-inset-top,0px)] transition-all duration-300 lg:relative lg:h-auto lg:bg-transparent lg:border-transparent lg:sticky lg:top-2.5 lg:pt-2 lg:pb-2 ${
          scrolled
            ? 'bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/[0.08]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="relative mx-auto w-full h-full flex items-center lg:block">
          <div
            className={`relative transition-colors duration-300 border w-full h-full flex items-center lg:block ${
              scrolled
                ? 'lg:bg-black/50 lg:backdrop-blur-lg lg:border-white/10 lg:rounded-full lg:px-6 lg:py-3 lg:shadow-[0_4px_30px_rgba(0,0,0,0.1)] animate-[navbarDropAndCatch_750ms_cubic-bezier(0.22,1,0.36,1)] bg-transparent border-transparent px-4 py-0'
                : 'bg-transparent border-transparent px-4 lg:px-6 py-0 lg:py-3'
            }`}
          >
            {/* Left Hanging Wire (Calibrated tension cable with ceiling mount) */}
            <div
              className={`absolute left-4 sm:left-6 lg:left-12 bottom-[calc(100%-4px)] flex flex-col items-center pointer-events-none ${
                scrolled
                  ? 'opacity-100 animate-[cableSnapLeft_750ms_cubic-bezier(0.22,1,0.36,1)]'
                  : 'opacity-0'
              }`}
            >
              {/* Ceiling anchor bracket */}
              <div className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              {/* Tension wire */}
              <div className="w-[1.5px] h-7 lg:h-8 bg-gradient-to-b from-white/70 via-white/30 to-white/70 shadow-[0_0_6px_rgba(255,255,255,0.3)]" />
              {/* Eyelet anchor on navbar */}
              <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-white/70 bg-[#0A0A0C] -mt-[1px] z-10 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            </div>

            {/* Right Hanging Wire (Calibrated tension cable with ceiling mount) */}
            <div
              className={`absolute right-14 sm:right-16 lg:right-12 bottom-[calc(100%-4px)] flex flex-col items-center pointer-events-none ${
                scrolled
                  ? 'opacity-100 animate-[cableSnapRight_750ms_cubic-bezier(0.22,1,0.36,1)]'
                  : 'opacity-0'
              }`}
            >
              {/* Ceiling anchor bracket */}
              <div className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              {/* Tension wire */}
              <div className="w-[1.5px] h-7 lg:h-8 bg-gradient-to-b from-white/70 via-white/30 to-white/70 shadow-[0_0_6px_rgba(255,255,255,0.3)]" />
              {/* Eyelet anchor on navbar */}
              <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-white/70 bg-[#0A0A0C] -mt-[1px] z-10 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            </div>

            {/* Desktop Navigation Links (>= lg / 1024px) */}
            <div className="proggy text-lg hidden lg:block">
              <ul className="flex justify-between">
                <li className="menu-link">
                  <a
                    className="hover:opacity-80 py-2 px-1 inline-block cursor-pointer"
                    href="/#path"
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof window !== 'undefined') {
                        if (window.location.hash !== '#path') {
                          window.history.pushState(null, '', '#path');
                        }
                        window.dispatchEvent(new HashChangeEvent('hashchange'));
                      }
                    }}
                  >
                    The Path
                  </a>
                </li>
                <li className="menu-link">
                  <button
                    className="hover:opacity-80 py-2 px-1 cursor-pointer"
                    onClick={() => handleNav('experience')}
                  >
                    Experience
                  </button>
                </li>
                <li className="menu-link">
                  <button
                    className="hover:opacity-80 py-2 px-1 cursor-pointer"
                    onClick={() => handleNav('projects')}
                  >
                    Projects
                  </button>
                </li>
                <li className="menu-link">
                  <button
                    className="hover:opacity-80 py-2 px-1 cursor-pointer"
                    onClick={() => handleNav('contact')}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Mobile Header Bar (< lg / 1024px) */}
            <div className="lg:hidden flex items-center justify-between w-full h-full">
              <span className="font-bold text-xl tracking-tight">
                <span className="text-white">eli</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  .
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-fuchsia-400 to-secondary">
                  dev
                </span>
              </span>
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className="text-white p-2 focus:outline-none cursor-pointer"
              >
                {open ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Panel: Animates with transform/opacity ONLY, never moves or resizes nav */}
      <div
        className={`lg:hidden fixed left-0 right-0 top-[calc(56px+env(safe-area-inset-top,0px))] bg-[#0A0A0C] border-b border-x border-gray-800 rounded-b-xl shadow-2xl z-50 overflow-hidden transition-[transform,opacity] duration-200 ease-out ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <ul className="proggy flex flex-col divide-y divide-gray-800">
          <li>
            <a
              href="/#path"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                if (typeof window !== 'undefined') {
                  if (window.location.hash !== '#path') {
                    window.history.pushState(null, '', '#path');
                  }
                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                }
              }}
              className="block px-6 py-4 text-lg hover:bg-gray-900 transition cursor-pointer"
            >
              The Path
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleNav('experience')}
              className="w-full text-left px-6 py-4 text-lg hover:bg-gray-900 transition cursor-pointer"
            >
              Experience
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleNav('projects')}
              className="w-full text-left px-6 py-4 text-lg hover:bg-gray-900 transition cursor-pointer"
            >
              Projects
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="w-full text-left px-6 py-4 text-lg hover:bg-gray-900 transition cursor-pointer"
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
