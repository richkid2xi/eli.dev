'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
        if (isScrolled) {
          if (window.innerWidth >= 768) {
            // Trigger the falling and catching animation on desktop
            controls.start({
              y: [0, 60, -10, 0],
              transition: { duration: 0.7, times: [0, 0.4, 0.7, 1], ease: "easeInOut" }
            });
          } else {
            // No drop animation on mobile
            controls.start({ y: 0, transition: { duration: 0.3 } });
          }
        } else {
          // Reset position when at the top
          controls.start({ y: 0, transition: { duration: 0.3 } });
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, controls]);

  const handleNav = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollTo(id), 100);
  };

  return (
    <nav className={`sticky top-2 md:top-4 z-[60] transition-all duration-300 ease-in-out ${scrolled ? 'py-0' : 'md:pt-[26px] md:pb-4 pt-2 pb-2'}`}>
      <motion.div animate={controls} className="relative mx-auto w-full">
        <div className={`relative transition-all duration-300 ease-in-out border ${scrolled ? 'bg-black/50 backdrop-blur-lg border-white/10 rounded-2xl md:rounded-full px-4 md:px-6 py-2 md:py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-transparent border-transparent px-4 md:px-0 py-2 md:py-0'}`}>
        
        {/* Left Hanging Wire */}
        <div className={`absolute left-12 bottom-[calc(100%-4px)] hidden md:flex flex-col items-center transition-opacity duration-500 delay-300 pointer-events-none ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-[2px] h-[100vh] bg-gradient-to-b from-transparent via-white/10 to-white/40" />
          <div className="w-2 h-2 rounded-full border-[1.5px] border-white/50 -mt-[1px] z-10" />
        </div>

        {/* Right Hanging Wire */}
        <div className={`absolute right-12 bottom-[calc(100%-4px)] hidden md:flex flex-col items-center transition-opacity duration-500 delay-300 pointer-events-none ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-[2px] h-[100vh] bg-gradient-to-b from-transparent via-white/10 to-white/40" />
          <div className="w-2 h-2 rounded-full border-[1.5px] border-white/50 -mt-[1px] z-10" />
        </div>

        {/* Desktop nav */}
      <div className="proggy text-lg hidden md:block">
        <ul className="flex justify-between">
          <li className="menu-link">
            <Link className="hover:opacity-80 py-2 px-1 inline-block" href="/path">The Path</Link>
          </li>
          <li className="menu-link">
            <button className="hover:opacity-80 py-2 px-1" onClick={() => handleNav('experience')}>Experience</button>
          </li>
          <li className="menu-link">
            <button className="hover:opacity-80 py-2 px-1" onClick={() => handleNav('projects')}>Projects</button>
          </li>
          <li className="menu-link">
            <button className="hover:opacity-80 py-2 px-1" onClick={() => handleNav('contact')}>Contact</button>
          </li>
        </ul>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex items-center justify-between">
        <span className="font-bold text-xl tracking-tight">
          <span className="text-white">eli</span><span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">.</span><span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-fuchsia-400 to-secondary">dev</span>
        </span>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="text-white p-2 focus:outline-none"
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-black/95 backdrop-blur-md border border-gray-800 rounded-xl mt-2 z-50 overflow-hidden">
          <ul className="proggy flex flex-col divide-y divide-gray-800">
            <li>
              <Link href="/path" onClick={() => setOpen(false)} className="block px-6 py-4 text-lg hover:bg-gray-900 transition">The Path</Link>
            </li>
            <li>
              <button onClick={() => handleNav('experience')} className="w-full text-left px-6 py-4 text-lg hover:bg-gray-900 transition">Experience</button>
            </li>
            <li>
              <button onClick={() => handleNav('projects')} className="w-full text-left px-6 py-4 text-lg hover:bg-gray-900 transition">Projects</button>
            </li>
            <li>
              <button onClick={() => handleNav('contact')} className="w-full text-left px-6 py-4 text-lg hover:bg-gray-900 transition">Contact</button>
            </li>
          </ul>
        </div>
      )}
        </div>
      </motion.div>
    </nav>
  );
}
