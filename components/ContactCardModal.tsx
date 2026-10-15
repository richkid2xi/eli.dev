'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ContactCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactItem {
  id: string;
  label: string;
  displayValue: string;
  copyValue: string;
  actionUrl: string;
  actionLabel: string;
  icon: React.ReactNode;
  isExternal?: boolean;
}

export default function ContactCardModal({ isOpen, onClose }: ContactCardModalProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [redirectingId, setRedirectingId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleCopy = useCallback(async (item: ContactItem, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(item.copyValue);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId((curr) => (curr === item.id ? null : curr)), 2200);
      }
    } catch {
      // Fallback if clipboard API is restricted
      setCopiedId(item.id);
      setTimeout(() => setCopiedId((curr) => (curr === item.id ? null : curr)), 2200);
    }
  }, []);

  const handleRedirect = (item: ContactItem) => {
    setRedirectingId(item.id);
    setTimeout(() => {
      setRedirectingId(null);
    }, 1200);
  };

  const contactItems: ContactItem[] = [
    {
      id: 'email',
      label: 'Email',
      displayValue: 'richardelikem31@gmail.com',
      copyValue: 'richardelikem31@gmail.com',
      actionUrl: 'mailto:richardelikem31@gmail.com',
      actionLabel: 'Send email',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      isExternal: false,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      displayValue: 'Richard Elikem Amenorpe',
      copyValue: 'https://www.linkedin.com/in/richard-amenorpe-292107309/',
      actionUrl: 'https://www.linkedin.com/in/richard-amenorpe-292107309/',
      actionLabel: 'Connect on LinkedIn',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      isExternal: true,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      displayValue: '+233 53 274 9330',
      copyValue: '+233532749330',
      actionUrl: 'https://wa.me/233532749330',
      actionLabel: 'Chat on WhatsApp',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
      isExternal: true,
    },
    {
      id: 'phone',
      label: 'Call Directly',
      displayValue: '+233 20 350 4957',
      copyValue: '+233203504957',
      actionUrl: 'tel:+233203504957',
      actionLabel: 'Call phone',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      isExternal: false,
    },
    {
      id: 'github',
      label: 'GitHub',
      displayValue: 'github.com/richkid2xi',
      copyValue: 'https://github.com/richkid2xi',
      actionUrl: 'https://github.com/richkid2xi',
      actionLabel: 'View GitHub profile',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
      isExternal: true,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Richard Elikem Amenorpe Complimentary Contact Card"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Complimentary Card Shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340, mass: 0.9 }}
            className="relative w-full max-w-lg bg-[#070709] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden z-10 my-auto"
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#ED1E79] via-[#A855F7] to-[#38BDF8]" />

            {/* Ambient Background Glows */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-40 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(237, 30, 121, 0.45) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-28 -left-28 w-80 h-80 rounded-full pointer-events-none opacity-30 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(102, 45, 140, 0.5) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            {/* Subtle Corner Node Network SVG */}
            <svg
              width="240"
              height="180"
              viewBox="0 0 240 180"
              className="absolute top-2 right-2 pointer-events-none opacity-20 hidden sm:block"
              aria-hidden="true"
            >
              <line x1="40" y1="30" x2="110" y2="50" stroke="white" strokeWidth="1" />
              <line x1="110" y1="50" x2="190" y2="25" stroke="white" strokeWidth="1" />
              <line x1="110" y1="50" x2="140" y2="120" stroke="#ED1E79" strokeWidth="1" />
              <line x1="190" y1="25" x2="220" y2="90" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="40" cy="30" r="2.5" fill="#38BDF8" />
              <circle cx="110" cy="50" r="3" fill="white" />
              <circle cx="190" cy="25" r="2.5" fill="#ED1E79" />
              <circle cx="220" cy="90" r="3" fill="white" />
              <circle cx="140" cy="120" r="3.5" fill="#A855F7" />
            </svg>

            {/* Close Button (X) */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close contact card"
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Inner Content Container */}
            <div className="p-5 sm:p-7 relative z-10 space-y-6">
              {/* Header: Tag Pill, Location, and Avatar */}
              <div className="flex items-start justify-between gap-4 pr-8 sm:pr-10">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] sm:text-xs font-mono font-medium uppercase tracking-wider text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                    <span>Technical Project Manager · SWE</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-400 font-medium">
                    <span className="text-pink-500 mr-1.5">📍</span>
                    <span>Accra, Ghana · Available Worldwide</span>
                  </div>
                </div>

                {/* Profile Avatar */}
                <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#ED1E79]/60 shadow-[0_0_24px_rgba(237,30,121,0.35)] bg-neutral-900">
                  <img
                    src="/Profile.png"
                    alt="Richard Elikem Amenorpe"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Name & Tagline */}
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Richard{' '}
                  <span className="bg-gradient-to-r from-[#ED1E79] via-[#A855F7] to-[#38BDF8] bg-clip-text text-transparent">
                    Elikem
                  </span>{' '}
                  Amenorpe
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md">
                  Turning ideas into structured plans, and plans into real progress.
                </p>
              </div>

              {/* Divider */}
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              {/* Socials / Direct Contacts List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400 uppercase tracking-wider px-1">
                  <span>Connect & Socials</span>
                  <span className="text-[11px] text-zinc-500 lowercase">tap copy or open</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {contactItems.map((item) => {
                    const isCopied = copiedId === item.id;
                    const isRedirecting = redirectingId === item.id;

                    return (
                      <div
                        key={item.id}
                        className="group relative flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 transition-all duration-200"
                      >
                        {/* Left: Icon & Label/Value */}
                        <a
                          href={item.actionUrl}
                          target={item.isExternal ? '_blank' : undefined}
                          rel={item.isExternal ? 'noopener noreferrer' : undefined}
                          onClick={() => handleRedirect(item)}
                          className="flex items-center gap-3 min-w-0 flex-1 pr-2 text-left focus-visible:outline-none group/link"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-zinc-300 group-hover:text-white group-hover:border-fuchsia-500/40 group-hover:bg-fuchsia-500/10 flex items-center justify-center shrink-0 transition-colors">
                            {item.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                              {item.label}
                            </div>
                            <div className="text-sm font-medium text-white group-hover/link:text-fuchsia-300 truncate transition-colors flex items-center gap-1.5">
                              <span>{item.displayValue}</span>
                              {item.isExternal && (
                                <svg
                                  className="w-3 h-3 text-zinc-500 group-hover/link:text-fuchsia-400 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </a>

                        {/* Right: Copy & Direct Action Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Copy Button */}
                          <button
                            type="button"
                            onClick={(e) => handleCopy(item, e)}
                            title={`Copy ${item.label}`}
                            aria-label={`Copy ${item.label} to clipboard`}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                              isCopied
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                                : 'bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/10'
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                </svg>
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          {/* Direct Launch Button */}
                          <a
                            href={item.actionUrl}
                            target={item.isExternal ? '_blank' : undefined}
                            rel={item.isExternal ? 'noopener noreferrer' : undefined}
                            onClick={() => handleRedirect(item)}
                            title={item.actionLabel}
                            aria-label={item.actionLabel}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-fuchsia-500/20 text-zinc-400 hover:text-fuchsia-300 border border-white/10 hover:border-fuchsia-500/40 transition-all duration-200 cursor-pointer active:scale-95"
                          >
                            <motion.div
                              animate={isRedirecting ? { scale: [1, 1.3, 1], rotate: [0, 15, 0] } : {}}
                              transition={{ duration: 0.4 }}
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </motion.div>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer: Brand & Quick Action Note */}
              <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 border-t border-white/[0.06]">
                <div className="font-mono text-zinc-400 font-semibold tracking-wider">
                  ELI<span className="text-[#ED1E79]">.DEV</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="font-mono text-[11px] text-zinc-400 hover:text-white uppercase tracking-wider py-1 px-2.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Close [Esc]
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
