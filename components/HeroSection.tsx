'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiReact, SiVite, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiPrisma, SiPostgresql, SiSupabase, SiNextdotjs, SiNestjs } from 'react-icons/si';

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

  useEffect(() => {
    setTimeOfDay(getTimeOfDay());
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
            <h1 className="text-4xl md:text-6xl font-extrabold my-3 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-fuchsia-400 to-secondary animate-text-gradient bg-[length:200%_auto]">
                Richard Elikem.
              </span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-shade">a builder.</h2>
          </div>
          <h6 className="max-w-[901px] leading-relaxed text-gray-400">
            Software Engineering student and founder building for African markets with global scaling potential. I care about shipping fast, solving actual problems, and getting from idea to working product without losing momentum along the way. What I've realized building solo is that I'm drawn less to the code itself and more to the process behind it, scoping the right thing, sequencing the work, keeping a build on track from first idea to launch. Founder instincts, project-manager brain.
          </h6>
          <div className="pt-4">
            <Link href="/path">
              <button className="proggy group text-bright rounded border border-bright hover:bg-gray-500 hover:bg-opacity-25 duration-500 transition ease-in-out px-10 py-2 flex items-center">
                View The Path{' '}
                <span className="inline-block text-xl ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z"></path>
                  </svg>
                </span>
              </button>
            </Link>
          </div>
          <div className="proggy pt-8 overflow-hidden relative w-full h-16 flex items-center">
             <div className="flex animate-[scroll_40s_linear_infinite] w-max">
               <div className="flex items-center gap-6 text-shade text-sm md:text-base whitespace-nowrap pr-6">
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiReact /> React</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiVite /> Vite</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiTypescript /> TypeScript</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiTailwindcss /> Tailwind</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiNodedotjs /> Node.js</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiExpress /> Express</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiPrisma /> Prisma</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiPostgresql /> PostgreSQL</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiSupabase /> Supabase</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiNextdotjs /> Next.js</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiNestjs /> NestJS</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2">Paystack</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2">MoMo</span>
               </div>
               <div className="flex items-center gap-6 text-shade text-sm md:text-base whitespace-nowrap pr-6">
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiReact /> React</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiVite /> Vite</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiTypescript /> TypeScript</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiTailwindcss /> Tailwind</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiNodedotjs /> Node.js</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiExpress /> Express</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiPrisma /> Prisma</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiPostgresql /> PostgreSQL</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiSupabase /> Supabase</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiNextdotjs /> Next.js</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2"><SiNestjs /> NestJS</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2">Paystack</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center gap-2">MoMo</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
