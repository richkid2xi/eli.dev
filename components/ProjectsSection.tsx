'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ProjectStatusBadge from './ProjectStatusBadge';
import CaseStudyModal from './CaseStudyModal';
import { caseStudies, CaseStudy } from '../data/caseStudies';

export default function ProjectsSection() {
  const [activeStudySlug, setActiveStudySlug] = useState<string | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openCaseStudy = (slug: string, trigger?: HTMLElement | null) => {
    if (trigger) {
      lastTriggerRef.current = trigger;
    } else if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      lastTriggerRef.current = document.activeElement;
    }
    setActiveStudySlug(slug);
    if (typeof window !== 'undefined' && window.location.hash !== `#case-study-${slug}`) {
      window.history.pushState(null, '', `#case-study-${slug}`);
    }
  };

  const closeCaseStudy = () => {
    setActiveStudySlug(null);
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#case-study-')) {
      window.history.pushState(
        null,
        '',
        window.location.pathname + window.location.search
      );
    }
  };

  // Deep linking and browser Back button support (hashchange & popstate)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#case-study-([a-z0-9-]+)$/i);
      if (match) {
        const slug = match[1].toLowerCase();
        if (caseStudies[slug]) {
          if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
            lastTriggerRef.current = document.activeElement;
          }
          setActiveStudySlug(slug);
          return;
        }
      }
      setActiveStudySlug((current) => (current ? null : current));
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  const activeStudy: CaseStudy | null =
    activeStudySlug && caseStudies[activeStudySlug]
      ? caseStudies[activeStudySlug]
      : null;

  const beamData = caseStudies.beam;
  const rikelmData = caseStudies.rikelm;

  return (
    <>
      <div className="pt-6 mt-16 md:mt-24" id="projects">
        <div className="mb-10 md:mb-14 border-b pb-6 border-gray-700 border-dotted">
          <h2 className="text-2xl md:text-4xl font-bold leading-relaxed">Projects</h2>
        </div>

        {/* 1. Klavora Project */}
        <div id="case-study-klavora" className="relative grid grid-cols-1 mb-16 md:mb-20 lg:grid-cols-2 gap-8 place-items-center border border-gray-600 border-dotted rounded px-4 py-16 md:p-8 scroll-mt-24">
          <div className="order-first w-full max-w-[550px]">
            <div className="rounded-xl border border-gray-700 bg-black overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-3 border-b border-gray-800 bg-[#111111]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="mx-auto proggy text-gray-500 text-sm">klavora.store</div>
              </div>
              <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden">
                <img src="/klavora.png" alt="Klavora pharmacy inventory management dashboard mockup" loading="lazy" width={550} height={310} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg md:text-2xl font-bold my-3">
                <Link href="https://klavora.store/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-bright animate-gradient group-hover:opacity-80 transition">Klavora</span>
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-shade group-hover:text-bright transition" height="0.8em" width="0.8em" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </Link>
              </h3>
              <p className="proggy flex items-center shrink-0"><span className="relative flex h-3 w-3 mr-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-blue-400"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span></span>active</p>
            </div>
            <p className="text-shade my-4">A pharmacy inventory management SaaS built for Ghanaian pharmacies — offline-first, batch/expiry tracking, POS, and WhatsApp alerts, built from concept to working software.</p>
            <p className="flex proggy text-lg text-gray-300"><span>React • TypeScript • Supabase • Prisma • PostgreSQL • Paystack</span></p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
              <button
                ref={(el) => {
                  triggerRefs.current['klavora'] = el;
                }}
                type="button"
                onClick={() => openCaseStudy('klavora')}
                aria-haspopup="dialog"
                className="proggy group px-5 py-2.5 rounded border border-shade/40 hover:border-bright/70 text-gray-300 hover:text-bright hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <span>View Case Study</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gray-400 group-hover:text-bright">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </button>
              <div className="flex text-xl space-x-3 text-shade">
                <p className="hover:scale-125 transition ease-in-out duration-300 cursor-pointer"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></p>
                <p className="hover:scale-125 transition ease-in-out duration-300 cursor-pointer"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z"></path></svg></p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Verdis Project */}
        <div id="case-study-verdis" className="relative grid grid-cols-1 mb-16 md:mb-20 lg:grid-cols-2 gap-8 place-items-center border border-gray-600 border-dotted rounded px-4 py-16 md:p-8 scroll-mt-24">
          <div className="order-first lg:order-last w-full max-w-[550px]">
            <div className="rounded-xl border border-gray-700 bg-black overflow-hidden shadow-2xl">
              <div className="flex items-center px-4 py-3 border-b border-gray-800 bg-[#111111]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="mx-auto proggy text-gray-500 text-sm">verdis-farm.vercel.app</div>
              </div>
              <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden">
                <img src="/verdis.png" alt="Verdis agricultural intelligence and climate advisory platform mockup" loading="lazy" width={550} height={310} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg md:text-2xl font-bold my-3">
                <Link href="https://verdis-farm.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-bright animate-gradient group-hover:opacity-80 transition">Verdis</span>
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-shade group-hover:text-bright transition" height="0.8em" width="0.8em" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </Link>
              </h3>
              <p className="proggy flex items-center text-shade shrink-0">completed</p>
            </div>
            <p className="text-shade my-4">A climate-intelligent farming platform for Ghanaian smallholder farmers, combining weather forecasting, crop disease diagnosis, and geolocation-based guidance into one tool.</p>
            <p className="flex proggy text-lg text-gray-300"><span>Python • Gemini RAG • Open-Meteo • BeautifulSoup</span></p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
              <button
                ref={(el) => {
                  triggerRefs.current['verdis'] = el;
                }}
                type="button"
                onClick={() => openCaseStudy('verdis')}
                aria-haspopup="dialog"
                className="proggy group px-5 py-2.5 rounded border border-shade/40 hover:border-bright/70 text-gray-300 hover:text-bright hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <span>View Case Study</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gray-400 group-hover:text-bright">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </button>
              <div className="flex text-xl space-x-2 text-shade">
                <p className="hover:scale-125 transition ease-in-out duration-300 cursor-pointer"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. NameCheckGH Project */}
        <div id="case-study-namecheckgh" className="relative grid grid-cols-1 mb-16 md:mb-20 lg:grid-cols-2 gap-8 place-items-center border border-gray-600 border-dotted rounded px-4 py-16 md:p-8 scroll-mt-24">
          <div className="order-first w-full max-w-[550px]">
            <div className="rounded-xl border border-gray-700 bg-black overflow-hidden shadow-2xl">
              <div className="flex items-center px-4 py-3 border-b border-gray-800 bg-[#111111]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="mx-auto proggy text-gray-500 text-sm">namecheckgh.vercel.app</div>
              </div>
              <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden">
                <img src="/namecheck.png" alt="NameCheckGH business registration availability verification portal mockup" loading="lazy" width={550} height={310} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg md:text-2xl font-bold my-3">
                <Link href="https://namecheckgh.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-bright animate-gradient group-hover:opacity-80 transition">NameCheckGH</span>
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-shade group-hover:text-bright transition" height="0.8em" width="0.8em" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </Link>
              </h3>
              <p className="proggy flex items-center text-shade shrink-0">completed</p>
            </div>
            <p className="text-shade my-4">A business name verification tool that lets Ghanaian entrepreneurs check name availability before registering, instead of filling out registry paperwork and finding out later someone beat them to it.</p>
            <p className="flex proggy text-lg text-gray-300"><span>React • Node.js • PostgreSQL</span></p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
              <button
                ref={(el) => {
                  triggerRefs.current['namecheckgh'] = el;
                }}
                type="button"
                onClick={() => openCaseStudy('namecheckgh')}
                aria-haspopup="dialog"
                className="proggy group px-5 py-2.5 rounded border border-shade/40 hover:border-bright/70 text-gray-300 hover:text-bright hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <span>View Case Study</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gray-400 group-hover:text-bright">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </button>
              <div className="flex text-xl space-x-2 text-shade">
                <p className="hover:scale-125 transition ease-in-out duration-300 cursor-pointer"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Beam Project */}
        <div id="case-study-beam" className="relative grid grid-cols-1 mb-16 md:mb-20 lg:grid-cols-2 gap-8 place-items-center border border-gray-600 border-dotted rounded px-4 py-16 md:p-8 scroll-mt-24">
          <div className="order-first lg:order-last w-full max-w-[550px]">
            <div className="rounded-xl border border-gray-700 bg-black overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-3 border-b border-gray-800 bg-[#111111]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="mx-auto proggy text-gray-500 text-sm">{beamData.terminalUrl || 'beam.local'}</div>
              </div>
              <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden">
                <img src="/beam.png" alt="Beam local Wi-Fi screen streaming app dashboard mockup" loading="lazy" width={550} height={310} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg md:text-2xl font-bold my-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-bright animate-gradient">
                  {beamData.name}
                </span>
              </h3>
              <ProjectStatusBadge status={beamData.status || 'coming-soon'} label={beamData.statusLabel} />
            </div>
            <p className="text-shade my-4">{beamData.oneLiner}</p>
            <p className="flex flex-wrap proggy text-lg text-gray-300">
              <span>{beamData.tags?.join(' • ')}</span>
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-6">
              <button
                ref={(el) => {
                  triggerRefs.current['beam'] = el;
                }}
                type="button"
                onClick={() => openCaseStudy('beam')}
                aria-haspopup="dialog"
                className="proggy group px-5 py-2.5 rounded border border-shade/40 hover:border-bright/70 text-gray-300 hover:text-bright hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <span>View Case Study</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gray-400 group-hover:text-bright">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 5. Rikelm Project */}
        <div id="case-study-rikelm" className="relative grid grid-cols-1 mb-16 md:mb-20 lg:grid-cols-2 gap-8 place-items-center border border-gray-600 border-dotted rounded px-4 py-16 md:p-8 scroll-mt-24">
          <div className="order-first w-full max-w-[550px]">
            <div className="rounded-xl border border-gray-700 bg-black overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-3 border-b border-gray-800 bg-[#111111]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="mx-auto proggy text-gray-500 text-sm">{rikelmData.terminalUrl || 'rikelm.com'}</div>
              </div>
              <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden">
                <img src="/rikelm.png" alt="Rikelm headless mobile commerce storefront mockup" loading="lazy" width={550} height={310} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg md:text-2xl font-bold my-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-bright animate-gradient">
                  {rikelmData.name}
                </span>
              </h3>
              <p className="proggy flex items-center text-shade shrink-0">completed</p>
            </div>
            <p className="text-shade my-4">{rikelmData.oneLiner}</p>
            <p className="flex flex-wrap proggy text-lg text-gray-300">
              <span>{rikelmData.tags?.join(' • ')}</span>
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-6">
              <button
                ref={(el) => {
                  triggerRefs.current['rikelm'] = el;
                }}
                type="button"
                onClick={() => openCaseStudy('rikelm')}
                aria-haspopup="dialog"
                className="proggy group px-5 py-2.5 rounded border border-shade/40 hover:border-bright/70 text-gray-300 hover:text-bright hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <span>View Case Study</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gray-400 group-hover:text-bright">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="relative before:absolute md:before:h-[270px] md:before:w-[300px] before:h-[200px] before:w-[250px]  before:right-0 after:right-0 md:before:-right-48 md:after:-right-48 before:rounded-full before:bg-gradient-radial before:from-secondary before:to-primary before:blur-2xl before:content-[''] after:absolute after:-z-20 md:after:h-[270px] md:after:w-[250px] after:h-[150px] after:w-[150px] after:bg-gradient-conic after:from-secondary after:via-fuchsia-700 after:blur-2xl after:content-[''] z-[-1] animate-bg-gradient"></div>
        </div>

      </div>

      <div id="other-projects" className="hidden pt-6">
        <div className="text-center">
          <div className="mb-10 md:mb-14 border-b pb-6 border-gray-700 border-dotted">
            <h2 className="text-2xl md:text-4xl font-bold leading-relaxed">Some Other Standout Projects</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-16">
          {/* Card 1 */}
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-gradient overflow-hidden">
            <div className="card-wrapper w-full h-full rounded-lg bg-black">
              <div className="card-content p-6">
                <div className="flex justify-between items-center text-shade">
                  <p className="text-5xl">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g id="Folder_On"><path d="M19.435,19.94H4.565a2.5,2.5,0,0,1-2.5-2.5V6.56a2.5,2.5,0,0,1,2.5-2.5h5.27A2.5,2.5,0,0,1,12.292,6.1l.042.222a.5.5,0,0,0,.491.408h6.61a2.5,2.5,0,0,1,2.5,2.5v8.21A2.5,2.5,0,0,1,19.435,19.94ZM4.565,5.06a1.5,1.5,0,0,0-1.5,1.5V17.44a1.5,1.5,0,0,0,1.5,1.5h14.87a1.5,1.5,0,0,0,1.5-1.5V9.23a1.5,1.5,0,0,0-1.5-1.5h-6.61a1.5,1.5,0,0,1-1.474-1.225l-.042-.221A1.5,1.5,0,0,0,9.835,5.06Z"></path></g></svg>
                  </p>
                  <div className="flex text-xl space-x-2">
                    <a target="_blank" href="https://github.com/ruachost/third-party-domain-template" rel="noopener noreferrer"><p className="hover:scale-125 transition ease-in-out duration-300"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></p></a>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 pt-3">
                  <h3 className="text-lg md:text-xl font-bold">Find It Ghana</h3>
                  <p className="text-shade text-sm leading-relaxed">WhatsApp-based discovery platform connecting customers to verified Ghanaian businesses through search, not e-commerce.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-gradient overflow-hidden">
            <div className="card-wrapper w-full h-full rounded-lg bg-black">
              <div className="card-content p-6">
                <div className="flex justify-between items-center text-shade">
                  <p className="text-5xl">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g id="Folder_On"><path d="M19.435,19.94H4.565a2.5,2.5,0,0,1-2.5-2.5V6.56a2.5,2.5,0,0,1,2.5-2.5h5.27A2.5,2.5,0,0,1,12.292,6.1l.042.222a.5.5,0,0,0,.491.408h6.61a2.5,2.5,0,0,1,2.5,2.5v8.21A2.5,2.5,0,0,1,19.435,19.94ZM4.565,5.06a1.5,1.5,0,0,0-1.5,1.5V17.44a1.5,1.5,0,0,0,1.5,1.5h14.87a1.5,1.5,0,0,0,1.5-1.5V9.23a1.5,1.5,0,0,0-1.5-1.5h-6.61a1.5,1.5,0,0,1-1.474-1.225l-.042-.221A1.5,1.5,0,0,0,9.835,5.06Z"></path></g></svg>
                  </p>
                </div>
                <div className="flex flex-col space-y-2 pt-3">
                  <h3 className="text-lg md:text-xl font-bold">Domaic</h3>
                  <p className="text-shade text-sm leading-relaxed">AI sell-side marketing agent helping domain investors turn idle inventory into active buyer leads.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-gradient overflow-hidden">
            <div className="card-wrapper w-full h-full rounded-lg bg-black">
              <div className="card-content p-6">
                <div className="flex justify-between items-center text-shade">
                  <p className="text-5xl">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g id="Folder_On"><path d="M19.435,19.94H4.565a2.5,2.5,0,0,1-2.5-2.5V6.56a2.5,2.5,0,0,1,2.5-2.5h5.27A2.5,2.5,0,0,1,12.292,6.1l.042.222a.5.5,0,0,0,.491.408h6.61a2.5,2.5,0,0,1,2.5,2.5v8.21A2.5,2.5,0,0,1,19.435,19.94ZM4.565,5.06a1.5,1.5,0,0,0-1.5,1.5V17.44a1.5,1.5,0,0,0,1.5,1.5h14.87a1.5,1.5,0,0,0,1.5-1.5V9.23a1.5,1.5,0,0,0-1.5-1.5h-6.61a1.5,1.5,0,0,1-1.474-1.225l-.042-.221A1.5,1.5,0,0,0,9.835,5.06Z"></path></g></svg>
                  </p>
                </div>
                <div className="flex flex-col space-y-2 pt-3">
                  <h3 className="text-lg md:text-xl font-bold">Vesper</h3>
                  <p className="text-shade text-sm leading-relaxed">An IoT bedside coffee brewer concept that syncs brewing with your alarm, so coffee's ready the moment you wake.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Reusable Case Study Modal */}
      {activeStudy && (
        <CaseStudyModal
          study={activeStudy}
          isOpen={true}
          onClose={closeCaseStudy}
          triggerRef={{
            current:
              lastTriggerRef.current || triggerRefs.current[activeStudy.slug] || null,
          }}
        />
      )}
    </>
  );
}
