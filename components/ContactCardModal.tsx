'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export interface ContactCardModalProps {
  isOpen?: boolean;
  onClose?: () => void;
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

export default function ContactCardModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: ContactCardModalProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    }
    setInternalIsOpen(false);
    if (typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#contact') {
      window.history.pushState(
        null,
        '',
        window.location.pathname + window.location.search
      );
    }
  };

  // Global listeners for open-contact-card event and #contact hash
  useEffect(() => {
    const handleOpen = () => {
      setInternalIsOpen(true);
    };

    const handleHash = () => {
      if (typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#contact') {
        setInternalIsOpen(true);
      }
    };

    handleHash();
    window.addEventListener('open-contact-card', handleOpen);
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('open-contact-card', handleOpen);
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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

  const handleItemClick = (item: ContactItem) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(item.copyValue).catch(() => {});
      setCopiedId(item.id);
      setTimeout(() => setCopiedId((curr) => (curr === item.id ? null : curr)), 1800);
    }
  };

  const contactItems: ContactItem[] = [
    {
      id: 'email',
      label: 'Email',
      displayValue: 'richardelikem31@gmail.com',
      copyValue: 'richardelikem31@gmail.com',
      actionUrl: 'mailto:richardelikem31@gmail.com',
      actionLabel: 'Send email to Richard Elikem Amenorpe',
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
      actionLabel: 'View Richard Elikem Amenorpe on LinkedIn',
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
      actionLabel: 'Chat with Richard on WhatsApp',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
      isExternal: true,
    },
    {
      id: 'phone',
      label: 'Call',
      displayValue: '+233 20 350 4957',
      copyValue: '+233203504957',
      actionUrl: 'tel:+233203504957',
      actionLabel: 'Call Richard Elikem Amenorpe',
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

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-card-name"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6"
        >
          {/* Blurred Background with Website Visible Behind (Lightweight on mobile, blurred on desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 sm:bg-black/60 sm:backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Landscape Complimentary Card (Snappy 120ms instant entrance, lightweight for mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="relative w-full max-w-[700px] bg-[#07070B] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(237,30,121,0.1)] overflow-hidden z-10 my-auto"
          >
            {/* Top Sleek Accent Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#ED1E79] via-[#A855F7] to-[#38BDF8]" />

            {/* Astral Stars & Celestial Constellations Background Canvas SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none select-none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="astral-pink" cx="85%" cy="15%" r="60%">
                  <stop offset="0%" stopColor="#ED1E79" stopOpacity="0.20" />
                  <stop offset="100%" stopColor="#ED1E79" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="astral-blue" cx="15%" cy="85%" r="60%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Nebular Ambient Washes */}
              <rect width="100%" height="100%" fill="url(#astral-pink)" />
              <rect width="100%" height="100%" fill="url(#astral-blue)" />

              {/* Delicate Constellation Connecting Lines */}
              <g stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" strokeDasharray="3 3">
                <line x1="80" y1="65" x2="160" y2="45" />
                <line x1="160" y1="45" x2="230" y2="95" />
                <line x1="230" y1="95" x2="290" y2="60" />
                <line x1="520" y1="75" x2="590" y2="55" />
                <line x1="590" y1="55" x2="640" y2="120" />
                <line x1="640" y1="120" x2="610" y2="190" />
                <line x1="60" y1="280" x2="130" y2="330" />
                <line x1="130" y1="330" x2="220" y2="310" />
                <line x1="430" y1="310" x2="510" y2="350" />
                <line x1="510" y1="350" x2="600" y2="320" />
              </g>

              {/* Astral Constellation Nodes & Glowing Star Points */}
              {/* Star cluster 1 */}
              <circle cx="80" cy="65" r="1.5" fill="#FFFFFF" opacity="0.85" />
              <circle cx="160" cy="45" r="2" fill="#38BDF8" opacity="0.9" />
              <circle cx="230" cy="95" r="1.8" fill="#FFFFFF" opacity="0.8" />
              <circle cx="290" cy="60" r="2.2" fill="#ED1E79" opacity="0.9" />

              {/* Star cluster 2 (Right top) */}
              <circle cx="520" cy="75" r="1.5" fill="#FFFFFF" opacity="0.75" />
              <circle cx="590" cy="55" r="2.2" fill="#38BDF8" opacity="0.95" />
              <circle cx="640" cy="120" r="1.6" fill="#FFFFFF" opacity="0.8" />
              <circle cx="610" cy="190" r="2" fill="#ED1E79" opacity="0.85" />

              {/* Star cluster 3 (Bottom left) */}
              <circle cx="60" cy="280" r="2" fill="#FFFFFF" opacity="0.8" />
              <circle cx="130" cy="330" r="1.5" fill="#38BDF8" opacity="0.85" />
              <circle cx="220" cy="310" r="2.4" fill="#ED1E79" opacity="0.9" />

              {/* Star cluster 4 (Bottom right) */}
              <circle cx="430" cy="310" r="1.5" fill="#FFFFFF" opacity="0.75" />
              <circle cx="510" cy="350" r="2" fill="#38BDF8" opacity="0.85" />
              <circle cx="600" cy="320" r="1.8" fill="#FFFFFF" opacity="0.8" />

              {/* Astral 4-Point Sparkle Stars */}
              <g fill="#FFFFFF" opacity="0.85">
                {/* Sparkle 1 */}
                <path d="M 160 41 Q 160 45 164 45 Q 160 45 160 49 Q 160 45 156 45 Q 160 45 160 41 Z" />
                {/* Sparkle 2 */}
                <path d="M 590 51 Q 590 55 594 55 Q 590 55 590 59 Q 590 55 586 55 Q 590 55 590 51 Z" />
                {/* Sparkle 3 */}
                <path d="M 220 306 Q 220 310 224 310 Q 220 310 220 314 Q 220 310 216 310 Q 220 310 220 306 Z" />
                {/* Sparkle 4 */}
                <path d="M 470 170 Q 470 173 473 173 Q 470 173 470 176 Q 470 173 467 173 Q 470 173 470 170 Z" fill="#38BDF8" />
              </g>

              {/* Scattered Micro Celestial Star Dust */}
              <circle cx="45" cy="130" r="0.9" fill="#FFF" opacity="0.5" />
              <circle cx="110" cy="180" r="0.8" fill="#38BDF8" opacity="0.6" />
              <circle cx="195" cy="140" r="1.1" fill="#FFF" opacity="0.45" />
              <circle cx="260" cy="220" r="0.8" fill="#FFF" opacity="0.5" />
              <circle cx="340" cy="80" r="1.2" fill="#ED1E79" opacity="0.4" />
              <circle cx="390" cy="40" r="0.9" fill="#FFF" opacity="0.55" />
              <circle cx="420" cy="120" r="0.8" fill="#38BDF8" opacity="0.5" />
              <circle cx="480" cy="85" r="1.0" fill="#FFF" opacity="0.6" />
              <circle cx="530" cy="220" r="0.9" fill="#FFF" opacity="0.5" />
              <circle cx="560" cy="270" r="1.2" fill="#ED1E79" opacity="0.45" />
              <circle cx="650" cy="260" r="0.8" fill="#38BDF8" opacity="0.6" />
              <circle cx="670" cy="70" r="0.9" fill="#FFF" opacity="0.4" />
              <circle cx="360" cy="330" r="1.0" fill="#FFF" opacity="0.45" />
              <circle cx="280" cy="360" r="0.8" fill="#38BDF8" opacity="0.5" />
              <circle cx="170" cy="260" r="1.0" fill="#FFF" opacity="0.4" />
              <circle cx="30" cy="350" r="0.9" fill="#FFF" opacity="0.45" />
            </svg>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              aria-label="Close complimentary card"
              className="absolute top-3.5 right-3.5 z-20 w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Landscape Real-Life Size Card Body */}
            <div className="relative z-10 p-5 sm:p-7 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-7 items-center">
                {/* Left Section: Identity & Branding */}
                <div className="sm:col-span-5 flex flex-col justify-between sm:border-r sm:border-white/[0.08] sm:pr-6 space-y-4">
                  {/* Avatar & Availability */}
                  <div className="flex items-center gap-3.5">
                    <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-fuchsia-500/70 shadow-[0_0_16px_rgba(237,30,121,0.3)] bg-neutral-900">
                      <img
                        src="/Profile.png"
                        alt="Richard Elikem Amenorpe"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Available Worldwide</span>
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono">
                        Accra, Ghana
                      </div>
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="space-y-1">
                    <h3
                      id="contact-card-name"
                      className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight"
                    >
                      Richard{' '}
                      <span className="bg-gradient-to-r from-[#ED1E79] via-[#A855F7] to-[#38BDF8] bg-clip-text text-transparent">
                        Elikem
                      </span>{' '}
                      Amenorpe
                    </h3>
                    <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                      Technical Project Manager &amp; Software Engineer
                    </p>
                    <p className="text-[11px] text-zinc-500 leading-normal pt-0.5">
                      Turning ideas into structured architecture and shipped software.
                    </p>
                  </div>

                  {/* Card Brand Tag */}
                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-zinc-500 border-t border-white/[0.06]">
                    <span className="text-zinc-400 font-semibold tracking-wider">
                      ELI<span className="text-[#ED1E79]">.DEV</span>
                    </span>
                    <span className="text-[10px] tracking-widest uppercase text-zinc-500">
                      Complimentary Card
                    </span>
                  </div>
                </div>

                {/* Right Section: Clean Socials & Contacts (No copy pills, no directional arrows) */}
                <div className="sm:col-span-7 flex flex-col justify-center space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 pb-1">
                    Direct Contacts
                  </div>

                  <div className="space-y-1.5">
                    {contactItems.map((item) => {
                      const isCopied = copiedId === item.id;
                      return (
                        <a
                          key={item.id}
                          href={item.actionUrl}
                          target={item.isExternal ? '_blank' : undefined}
                          rel={item.isExternal ? 'noopener noreferrer' : undefined}
                          onClick={() => handleItemClick(item)}
                          title={item.actionLabel}
                          aria-label={item.actionLabel}
                          className="group relative flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.15] transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 cursor-pointer"
                        >
                          {/* Minimal Icon */}
                          <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-400 group-hover:text-white group-hover:border-fuchsia-400/40 group-hover:bg-fuchsia-400/10 flex items-center justify-center shrink-0 transition-colors">
                            {item.icon}
                          </div>

                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                              {item.label}
                            </div>
                            <div className="text-xs sm:text-[13px] font-medium text-zinc-200 group-hover:text-white truncate transition-colors">
                              {item.displayValue}
                            </div>
                          </div>

                          {/* Subtle momentary copied feedback without heavy buttons */}
                          {isCopied && (
                            <span className="text-[10px] font-mono text-emerald-400 tracking-wider shrink-0 animate-fade-in">
                              copied
                            </span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
