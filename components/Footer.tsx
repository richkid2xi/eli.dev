'use client';

import React, { useState, useEffect } from 'react';
import ContactCardModal from './ContactCardModal';

export default function Footer() {
  const [isCardOpen, setIsCardOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#contact') {
        setIsCardOpen(true);
      }
    };

    const handleOpenContactCard = () => {
      setIsCardOpen(true);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('open-contact-card', handleOpenContactCard);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('open-contact-card', handleOpenContactCard);
    };
  }, []);

  const handleCloseCard = () => {
    setIsCardOpen(false);
    if (typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#contact') {
      window.history.pushState(
        null,
        '',
        window.location.pathname + window.location.search
      );
    }
  };

  return (
    <>
      <div id="contact" className="flex-col justify-center items-center text-center mt-16 md:mt-[92px] relative">
        <div className="z-10 relative">
          <div className="border-b pb-6 border-gray-700 border-dotted mb-12 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold leading-relaxed">
              And That's a Wrap –{' '}
              <span className="text-xl md:text-2xl font-normal">see you around :)</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center space-y-8 px-4 md:px-16 lg:px-32 text-shade text-center text-sm md:text-base mb-12">
            <p className="max-w-2xl mx-auto leading-relaxed">
              Thanks for exploring my digital playground! If you've got a project or collaboration in mind, I'm always eager to explore new ideas and technologies.
            </p>
            <p className="max-w-2xl mx-auto leading-relaxed">
              Ready to make things fun and functional? Shoot me a message, and Let's create something amazing together.
            </p>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsCardOpen(true)}
              aria-haspopup="dialog"
              className="proggy group text-bright rounded-full border border-bright/80 hover:border-fuchsia-400 bg-white/[0.03] hover:bg-white/[0.08] shadow-[0_4px_24px_rgba(237,30,121,0.15)] hover:shadow-[0_4px_30px_rgba(237,30,121,0.35)] duration-300 transition-all ease-in-out px-8 py-3 flex items-center justify-center space-x-3 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 active:scale-[0.98]"
            >
              <span>Say Hello</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-fuchsia-400">
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </span>
            </button>
          </div>

          {/* Complimentary Contact Card Modal */}
          <ContactCardModal isOpen={isCardOpen} onClose={handleCloseCard} />
        </div>
        <div className="hidden md:flex justify-start absolute left-0 -ml-48 md:-ml-72 -mt-60 md:-mt-44 pointer-events-none">
          <div className="relative before:absolute before:w-[520px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-secondary before:to-primary before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[200px] after:w-[260px] after:translate-x-1/3 after:bg-gradient-conic after:from-secondary after:via-fuchsia-700 after:blur-2xl after:content-[''] before:h-[360px] z-[-1] animate-bg-gradient"></div>
        </div>
      </div>
      <div className="flex proggy justify-center pb-8 z-50 relative mt-16 md:mt-[144px]">
        <p className="text-shade">
          &copy; {new Date().getFullYear()} Richard Elikem Amenorpe
        </p>
      </div>

      <div className="hidden md:block relative -mt-8 sm:max-w-[1158px] mx-auto w-full -z-10 h-[140px] overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 text-center text-[255px] font-bold leading-none text-transparent tracking-tighter animate-text-glow" style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)' }}>
          Elikem
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3" aria-hidden="true">
          <div className="h-56 w-56 rounded-full border-[20px] border-fuchsia-400/20 blur-[80px] will-change-[filter]"></div>
        </div>
      </div>
    </>
  );
}
