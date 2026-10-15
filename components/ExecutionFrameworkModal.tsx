'use client';

import React from 'react';
import ModalCanvasShell from './ModalCanvasShell';
import { executionFramework, FrameworkPhase } from '../data/executionFramework';

interface ExecutionFrameworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function ExecutionFrameworkModal({
  isOpen,
  onClose,
  triggerRef,
}: ExecutionFrameworkModalProps) {
  const sections = [
    ...executionFramework.phases.map((p) => ({
      id: p.id,
      title: p.title,
      shortTitle: p.shortTitle,
    })),
    {
      id: 'principles',
      title: 'Core Principles',
      shortTitle: 'Principles',
    },
  ];

  // Close canvas & smooth scroll to page target (Projects or Contact card)
  const handleClosingCta = (target: 'projects' | 'contact') => {
    onClose();

    if (target === 'projects') {
      const scrollToProjects = () => {
        const el =
          document.getElementById('case-study-klavora') ||
          document.getElementById('projects');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (typeof window !== 'undefined' && window.location.hash !== '#projects') {
          window.history.pushState(null, '', '#projects');
        }
      };

      // Wait until ModalCanvasShell close animation and unlockBodyScroll (up to 240ms) complete
      setTimeout(scrollToProjects, 280);
      setTimeout(scrollToProjects, 420);
    } else if (target === 'contact') {
      const openContactCard = () => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('open-contact-card'));
          if (window.location.hash !== '#contact') {
            window.history.pushState(null, '', '#contact');
          }
          window.dispatchEvent(new HashChangeEvent('hashchange'));
        }
      };

      openContactCard();
      setTimeout(openContactCard, 60);
      setTimeout(openContactCard, 200);
    }
  };

  return (
    <ModalCanvasShell
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      titleId="execution-framework-title"
      descId="execution-framework-desc"
      title={executionFramework.title}
      subtitle={executionFramework.subtitle}
      sections={sections}
      progressBarColor="from-zinc-500 via-zinc-300 to-white"
      customSidebarNav={(activeSection, scrollToSection) => (
        <div className="space-y-6">
          <div>
            <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest mb-1">
              Architecture
            </div>
            <div className="text-sm font-medium text-zinc-200">Execution Pipeline</div>
          </div>

          <div className="space-y-2">
            {executionFramework.phases.map((phase) => {
              const isActive = activeSection === phase.id;
              return (
                <button
                  key={phase.id}
                  type="button"
                  data-section-id={phase.id}
                  onClick={() => scrollToSection(phase.id)}
                  className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-start gap-3 group ${
                    isActive
                      ? 'bg-white/[0.06] text-white'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]'
                  }`}
                >
                  <span
                    className={`font-mono text-xs mt-0.5 shrink-0 ${
                      isActive ? 'text-zinc-200 font-semibold' : 'text-zinc-500 group-hover:text-zinc-400'
                    }`}
                  >
                    {phase.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-medium tracking-tight truncate ${
                        isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                      }`}
                    >
                      {phase.title}
                    </p>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5 font-normal">
                      {phase.goal}
                    </p>
                  </div>
                </button>
              );
            })}

            <button
              type="button"
              data-section-id="principles"
              onClick={() => scrollToSection('principles')}
              className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-start gap-3 group ${
                activeSection === 'principles'
                  ? 'bg-white/[0.06] text-white'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]'
              }`}
            >
              <span
                className={`font-mono text-xs mt-0.5 shrink-0 ${
                  activeSection === 'principles'
                    ? 'text-zinc-200 font-semibold'
                    : 'text-zinc-500 group-hover:text-zinc-400'
                }`}
              >
                04
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-xs font-medium tracking-tight truncate ${
                    activeSection === 'principles' ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                  }`}
                >
                  Core Principles
                </p>
                <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5 font-normal">
                  4 non-negotiable operating rules
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
      sidebarFooter={
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleClosingCta('projects')}
            className="w-full font-mono text-xs py-2 px-3 rounded-lg border border-white/[0.08] text-zinc-200 bg-white/[0.02] hover:bg-white/[0.06] transition-colors flex items-center justify-between"
          >
            <span>View Case Studies</span>
            <span className="text-zinc-400">&darr;</span>
          </button>
          <button
            type="button"
            onClick={() => handleClosingCta('contact')}
            className="w-full font-mono text-xs py-2 px-3 rounded-lg border border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02] transition-colors flex items-center justify-between"
          >
            <span>Contact Me</span>
            <span>&rarr;</span>
          </button>
        </div>
      }
    >
      {() => (
        <>
          {/* Pipeline Phases */}
          <div className="space-y-12 sm:space-y-16 max-w-full">
            {executionFramework.phases.map((phase, index) => (
              <PhaseCard
                key={phase.id}
                phase={phase}
                isLast={index === executionFramework.phases.length - 1}
              />
            ))}
          </div>

          {/* Principles Section */}
          <section
            id="principles"
            className="pt-8 sm:pt-10 border-t border-white/[0.05] space-y-6 min-w-0 scroll-mt-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-1">
                  Operating Values
                </div>
                <h3 className="text-lg sm:text-2xl font-semibold text-zinc-100 tracking-tight">
                  Principles
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-sm">
                Four non-negotiable rules guiding scoping, technical decisions, and architecture.
              </p>
            </div>

            {/* 4 Principles Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 min-w-0">
              {executionFramework.principles.map((principle, idx) => (
                <div
                  key={principle.id}
                  className="p-4 sm:p-5 rounded-xl bg-[#121215] border border-white/[0.03] hover:border-white/[0.08] transition-colors flex items-start gap-3.5 min-w-0"
                >
                  <span className="font-mono text-xs text-zinc-500 shrink-0 pt-0.5">
                    0{idx + 1}
                  </span>
                  <p className="text-sm font-medium text-zinc-200 leading-snug break-words">
                    {principle.statement}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Closing Call to Action */}
          <section className="pt-8 sm:pt-10 border-t border-white/[0.05] min-w-0">
            <div className="rounded-xl sm:rounded-2xl bg-[#121215] border border-white/[0.04] p-6 sm:p-10 text-center flex flex-col items-center justify-center space-y-5 min-w-0">
              <div className="space-y-1.5 max-w-md">
                <h4 className="text-lg sm:text-2xl font-semibold text-zinc-100 tracking-tight">
                  {executionFramework.closingCta.heading}
                </h4>
                <p className="text-xs sm:text-sm text-[#9BA1A6] leading-relaxed">
                  Review live production systems built using this operating framework, or get in
                  touch to discuss technical leadership.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
                <button
                  type="button"
                  onClick={() => handleClosingCta('projects')}
                  className="w-full sm:w-auto font-mono px-5 py-2.5 rounded-lg bg-white text-zinc-950 font-medium hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm shadow-sm cursor-pointer"
                >
                  <span>{executionFramework.closingCta.projectsLabel}</span>
                  <span className="font-bold">&darr;</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleClosingCta('contact')}
                  className="w-full sm:w-auto font-mono px-5 py-2.5 rounded-lg border border-white/[0.08] hover:border-white/[0.2] text-zinc-200 hover:bg-white/[0.04] transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                >
                  <span>{executionFramework.closingCta.contactLabel}</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </ModalCanvasShell>
  );
}

/* ─────────────────────────────────────────────────────────────
   Phase Card Component (Clean, Tonal Architecture)
───────────────────────────────────────────────────────────── */
function PhaseCard({
  phase,
  isLast,
}: {
  phase: FrameworkPhase;
  isLast: boolean;
}) {
  return (
    <article
      id={phase.id}
      aria-labelledby={`${phase.id}-title`}
      className="relative w-full max-w-full min-w-0 scroll-mt-6"
    >
      {/* Main Tonal Surface Container */}
      <div className="rounded-xl sm:rounded-2xl bg-[#121215] border border-white/[0.03] p-4 sm:p-6 md:p-8 space-y-6 transition-colors hover:border-white/[0.06] w-full max-w-full min-w-0 overflow-hidden">
        {/* Phase Header */}
        <div className="flex items-center gap-3 border-b border-white/[0.04] pb-4 min-w-0">
          <span className="font-mono text-xs text-zinc-500 tracking-wider font-medium shrink-0">
            PHASE {phase.number}
          </span>
          <span className="text-zinc-700 font-mono text-xs shrink-0">/</span>
          <h3
            id={`${phase.id}-title`}
            className="text-base sm:text-xl md:text-2xl font-semibold text-zinc-100 tracking-tight truncate"
          >
            {phase.title}
          </h3>
        </div>

        {/* Goal Section */}
        <div className="min-w-0">
          <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 mb-2">
            Goal
          </div>
          <p className="text-sm sm:text-base text-zinc-200 font-medium leading-[1.7] mb-6 break-words">
            {phase.goal}
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-4 pt-1 min-w-0">
          <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Execution Steps
          </div>
          <ul className="space-y-3.5">
            {phase.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm leading-[1.7] min-w-0">
                <span className="font-mono text-[11px] text-zinc-500 mt-1 shrink-0 select-none">
                  0{idx + 1}
                </span>
                <p className="flex-1 min-w-0 break-words">
                  <strong className="font-medium text-zinc-200">{step.title}: </strong>
                  <span className="text-[#9BA1A6] font-normal">{step.detail}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Row (Phase 2) */}
        {phase.stack && phase.stack.length > 0 && (
          <div className="space-y-2.5 pt-3 border-t border-white/[0.04] min-w-0">
            <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Production Stack
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 max-w-full">
              {phase.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-2.5 py-1 rounded bg-[#16161A] border border-white/[0.04] text-zinc-300 break-words"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Outputs Row */}
        <div className="space-y-2.5 pt-3 border-t border-white/[0.04] min-w-0">
          <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Defined Outputs
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 max-w-full">
            {phase.outputs.map((output) => (
              <span
                key={output}
                className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#16161A] border border-white/[0.04] text-zinc-200 flex items-center gap-2 break-words"
              >
                <span className="w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                <span>{output}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Exit Criteria Box */}
        <div className="rounded-xl bg-[#151518] border-l-2 border-emerald-500/70 p-3.5 sm:p-4 space-y-1 min-w-0">
          <div className="font-mono text-[11px] uppercase tracking-wider text-emerald-400/90 font-medium flex items-center gap-1.5">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Exit Criteria</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-200 font-normal leading-relaxed pl-4 break-words">
            {phase.exitCriteria}
          </p>
        </div>

        {/* Proof Row (where applicable) */}
        {phase.proof && phase.proof.length > 0 && (
          <div className="rounded-xl bg-[#151518] p-3.5 sm:p-4 space-y-2 border border-white/[0.03] min-w-0">
            <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Documented Proof
            </div>
            <ul className="space-y-1.5">
              {phase.proof.map((item, idx) => (
                <li
                  key={idx}
                  className="text-xs sm:text-sm text-[#9BA1A6] leading-relaxed flex items-start gap-2.5 min-w-0"
                >
                  <span className="text-zinc-500 font-mono select-none shrink-0">&mdash;</span>
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
