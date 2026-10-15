'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SiReact, SiVite, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiPrisma, SiPostgresql, SiSupabase, SiNextdotjs, SiNestjs } from 'react-icons/si';
import ExecutionFrameworkModal from './ExecutionFrameworkModal';

type TimeOfDay = 'morning' | 'afternoon' | 'evening';

function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  // 5pm to 5am is evening (no good night)
  return 'evening';
}

const greetings = {
  morning: [
    'Good morning, my name is',
    'Bonjour, je m\'appelle',
    'Guten Morgen, mein Name ist',
    'Buenos días, mi nombre es',
    'Buongiorno, il mio nome è',
    'Goedemorgen, mijn naam is',
    'Bom dia, meu nome é',
    'Доброе утро, меня зовут',
    'おはようございます、私の名前は',
    '좋은 아침입니다, 제 이름은',
  ],
  afternoon: [
    'Good afternoon, my name is',
    'Bonjour, je m\'appelle',
    'Guten Tag, mein Name ist',
    'Buenas tardes, mi nombre es',
    'Buon pomeriggio, il mio nome è',
    'Goedemiddag, mijn naam is',
    'Boa tarde, meu nome é',
    'Добрый день, меня зовут',
    'こんにちは、私の名前は',
    '좋은 오후입니다, 제 이름은',
  ],
  evening: [
    'Good evening, my name is',
    'Bonsoir, je m\'appelle',
    'Guten Abend, mein Name ist',
    'Buenas noches, mi nombre es',
    'Buonasera, il mio nome è',
    'Goedenavond, mijn naam is',
    'Boa noite, meu nome é',
    'Добрый вечер, меня зовут',
    'こんばんは、私の名前は',
    '좋은 저녁입니다, 제 이름은',
  ]
};

export default function HeroSection() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('evening');
  const [langIndex, setLangIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [isFrameworkOpen, setIsFrameworkOpen] = useState(false);
  const frameworkButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeOfDay(getTimeOfDay());

    // Check if URL specifies #framework or listen to custom events
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#framework') {
        setIsFrameworkOpen(true);
      }
      const handleOpen = () => setIsFrameworkOpen(true);
      window.addEventListener('open-execution-framework', handleOpen);
      return () => window.removeEventListener('open-execution-framework', handleOpen);
    }
  }, []);

  const phrases = greetings[timeOfDay];
  const currentPhrase = phrases[langIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIndex < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayed(currentPhrase.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayed(currentPhrase.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 40);
      } else {
        setDeleting(false);
        setLangIndex((l) => (l + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, currentPhrase, phrases.length]);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Background Gradient Blob behind the text */}
      <div className="absolute top-20 right-0 md:right-10 w-[200px] h-[200px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-radial from-secondary/40 to-primary/10 blur-[100px] opacity-70 animate-pulse-slow -z-10 pointer-events-none"></div>

      <div className="pt-12 md:pt-10 relative">
        <div className="flex flex-col space-y-6">
          <div className="transition-all ease-out duration-300">
            <div className="proggy text-xl">
              <div className="Typewriter" data-testid="typewriter-wrapper">
                {displayed}<span className="animate-pulse">|</span>
              </div>
            </div>
            <h1 aria-label="Richard Elikem Amenorpe" className="text-4xl md:text-6xl font-extrabold my-3 relative inline-block">
              <span aria-hidden="true" className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-fuchsia-400 to-secondary animate-text-gradient bg-[length:200%_auto]">
                Richard Elikem.
              </span>
              <span className="sr-only"> Amenorpe</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold text-shade tracking-tight leading-[1.25] mt-1 max-w-4xl">
              I bridge the gap between{' '}
              <span className="text-bright">product strategy</span>,{' '}
              <span className="text-bright">technical architecture</span>, and{' '}
              <span className="text-bright">rapid execution</span>.
            </h2>
          </div>
          <p className="max-w-[850px] leading-relaxed text-gray-400 text-base md:text-lg">
            Software engineer turned technical project manager. I take products from user research to production, built for African markets with global potential.
          </p>
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.04] text-zinc-300 text-xs font-mono border border-white/10">
              Open to TPM &amp; Solutions Engineering roles
            </span>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="proggy group relative px-7 py-3 rounded border border-primary/60 bg-gradient-to-r from-primary/15 via-fuchsia-500/10 to-secondary/20 hover:from-primary/25 hover:to-secondary/30 text-bright font-medium transition-all duration-300 shadow-[0_0_20px_rgba(237,30,121,0.2)] hover:shadow-[0_0_30px_rgba(237,30,121,0.4)] hover:border-primary flex items-center justify-center gap-2.5 text-sm md:text-base cursor-pointer"
            >
              <span>View Technical Case Studies</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-1 text-primary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </span>
            </a>
            <button
              type="button"
              ref={frameworkButtonRef}
              onClick={() => setIsFrameworkOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isFrameworkOpen}
              className="proggy group px-7 py-3 rounded border border-shade/40 hover:border-bright/70 text-gray-300 hover:text-bright hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-center gap-2.5 text-sm md:text-base cursor-pointer"
            >
              <span>View My Execution Framework</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-gray-400 group-hover:text-bright">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>
            </button>
          </div>
          <div className="proggy pt-8 overflow-hidden relative w-full h-16 flex items-center" aria-hidden="true">
             <div className="flex animate-[scroll_40s_linear_infinite] w-max">
               <div className="flex items-center gap-6 text-shade text-sm md:text-base whitespace-nowrap pr-6">
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiReact title="React" aria-hidden="true" aria-label="React" /> React</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiVite title="Vite" aria-hidden="true" aria-label="Vite" /> Vite</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiTypescript title="TypeScript" aria-hidden="true" aria-label="TypeScript" /> TypeScript</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiTailwindcss title="Tailwind CSS" aria-hidden="true" aria-label="Tailwind CSS" /> Tailwind</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiNodedotjs title="Node.js" aria-hidden="true" aria-label="Node.js" /> Node.js</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiExpress title="Express" aria-hidden="true" aria-label="Express" /> Express</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiPrisma title="Prisma" aria-hidden="true" aria-label="Prisma" /> Prisma</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiPostgresql title="PostgreSQL" aria-hidden="true" aria-label="PostgreSQL" /> PostgreSQL</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiSupabase title="Supabase" aria-hidden="true" aria-label="Supabase" /> Supabase</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiNextdotjs title="Next.js" aria-hidden="true" aria-label="Next.js" /> Next.js</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiNestjs title="NestJS" aria-hidden="true" aria-label="NestJS" /> NestJS</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2">Paystack</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2">MoMo</span>
               </div>
               <div className="flex items-center gap-6 text-shade text-sm md:text-base whitespace-nowrap pr-6" aria-hidden="true">
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiReact title="React" aria-hidden="true" aria-label="React" /> React</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiVite title="Vite" aria-hidden="true" aria-label="Vite" /> Vite</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiTypescript title="TypeScript" aria-hidden="true" aria-label="TypeScript" /> TypeScript</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiTailwindcss title="Tailwind CSS" aria-hidden="true" aria-label="Tailwind CSS" /> Tailwind</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiNodedotjs title="Node.js" aria-hidden="true" aria-label="Node.js" /> Node.js</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiExpress title="Express" aria-hidden="true" aria-label="Express" /> Express</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiPrisma title="Prisma" aria-hidden="true" aria-label="Prisma" /> Prisma</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiPostgresql title="PostgreSQL" aria-hidden="true" aria-label="PostgreSQL" /> PostgreSQL</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiSupabase title="Supabase" aria-hidden="true" aria-label="Supabase" /> Supabase</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiNextdotjs title="Next.js" aria-hidden="true" aria-label="Next.js" /> Next.js</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiNestjs title="NestJS" aria-hidden="true" aria-label="NestJS" /> NestJS</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2">Paystack</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2">MoMo</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      <ExecutionFrameworkModal
        isOpen={isFrameworkOpen}
        onClose={() => setIsFrameworkOpen(false)}
        triggerRef={frameworkButtonRef}
      />
    </>
  );
}
