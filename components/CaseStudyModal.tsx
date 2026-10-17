'use client';

import React, { useMemo } from 'react';
import ModalCanvasShell, { ModalSectionItem } from './ModalCanvasShell';
import {
  CaseStudy,
  CaseStudySection,
  ParagraphSection,
  BulletListSection,
  KeyValueSection,
  TagRowSection,
  MetricsRowSection,
  CalloutSection,
  MetricItem,
  getVisibleSections,
} from '../data/caseStudies';
import ProjectStatusBadge from './ProjectStatusBadge';

interface CaseStudyModalProps {
  study: CaseStudy;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function CaseStudyModal({
  study,
  isOpen,
  onClose,
  triggerRef,
}: CaseStudyModalProps) {
  // Filter sections using the shared case study visible section rules
  const visibleSections = useMemo(() => {
    return getVisibleSections(study.sections);
  }, [study.sections]);

  // Generate modal sections for navigation with full section titles
  const navSections: ModalSectionItem[] = useMemo(() => {
    return visibleSections.map((sec) => ({
      id: `cs-${sec.id}`,
      title: sec.title,
    }));
  }, [visibleSections]);

  const progressBarColor =
    study.status === 'coming-soon'
      ? 'from-amber-500 via-amber-300 to-white'
      : 'from-blue-500 via-purple-400 to-white';

  return (
    <ModalCanvasShell
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      titleId="case-study-title"
      descId="case-study-desc"
      title={study.name}
      subtitle={study.oneLiner}
      showDesktopSubtitleInHeader={false}
      headerBadge={
        study.status ? (
          <ProjectStatusBadge status={study.status} label={study.statusLabel} />
        ) : undefined
      }
      sections={navSections}
      progressBarColor={progressBarColor}
      sidebarHeader={
        <div>
          <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest mb-1">
            Case Study
          </div>
          <div className="text-sm font-medium text-zinc-200">{study.name} Overview</div>
          {study.terminalUrl && study.status === 'live' && (
            <a
              href={`https://${study.terminalUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Live Site</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      }
      sidebarFooter={
        study.tags && study.tags.length > 0 ? (
          <div>
            <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400 text-[11px] font-mono border border-white/[0.04]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : undefined
      }
    >
      {() => (
        <div className="space-y-10">
          {/* Header Hero Callout - 24px bottom spacing before first section */}
          <div className="space-y-3 pb-6 mb-6 border-b border-white/[0.05]">
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Technical Case Study
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
              {study.name}
            </h3>
            <p className="text-[15px] sm:text-base text-zinc-300 leading-[1.6] max-w-3xl">
              {study.oneLiner}
            </p>
            {study.terminalUrl && study.status === 'live' && (
              <div className="pt-2">
                <a
                  href={`https://${study.terminalUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.2] text-xs font-mono text-zinc-200 hover:text-white transition group"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{study.terminalUrl}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-zinc-400 group-hover:text-white transition-colors"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* If no sections exist, render clean 'Case study coming soon' state */}
          {visibleSections.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.06] bg-[#101014] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 my-8">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-zinc-400 mb-1">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-zinc-100">
                Case study coming soon
              </h2>
              <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
                Detailed architecture breakdown, technical decisions, and engineering tradeoffs
                for <span className="text-zinc-200 font-medium">{study.name}</span> are currently
                being compiled.
              </p>
              {study.tags && study.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-300 text-xs font-mono border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Render polymorphic sections */
            visibleSections.map((section, idx) => (
              <section
                key={section.id}
                id={`cs-${section.id}`}
                className="space-y-4 scroll-mt-6"
              >
                {/* Small mono number beside heading, no duplicated eyebrow word */}
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xs font-semibold text-zinc-500 select-none">
                    0{idx + 1}
                  </span>
                  <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                    {section.title}
                  </h2>
                </div>

                {/* Section Polymorphic Renderers */}
                {section.type === 'paragraph' && (
                  <RenderParagraph section={section} />
                )}

                {section.type === 'bulletList' && (
                  <RenderBulletList section={section} />
                )}

                {section.type === 'keyValue' && (
                  <RenderKeyValue section={section} />
                )}

                {section.type === 'tagRow' && (
                  <RenderTagRow section={section} />
                )}

                {section.type === 'metricsRow' && (
                  <RenderMetricsRow section={section} />
                )}

                {section.type === 'callout' && (
                  <RenderCallout section={section} />
                )}
              </section>
            ))
          )}
        </div>
      )}
    </ModalCanvasShell>
  );
}

/* ─────────────────────────────────────────────────────────────
   Polymorphic Section Renderers
───────────────────────────────────────────────────────────── */

function RenderParagraph({ section }: { section: ParagraphSection }) {
  return (
    <div className="rounded-xl bg-[#111116] border border-white/[0.04] p-4 min-[390px]:p-5 sm:p-6 text-[15px] sm:text-base text-zinc-300 leading-[1.6] break-words">
      {section.content}
    </div>
  );
}

function RenderBulletList({ section }: { section: BulletListSection }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {section.items.map((item, idx) => {
        // Detect bold lead-in pattern like "Lead phrase: detail content"
        const colonIndex = item.indexOf(':');
        const hasLeadIn = colonIndex > 0 && colonIndex < 40;

        const leadIn = hasLeadIn ? item.slice(0, colonIndex).trim() : null;
        const rest = hasLeadIn ? item.slice(colonIndex + 1).trim() : item;

        return (
          <div
            key={idx}
            className="rounded-xl bg-[#111116] border border-white/[0.04] p-4 min-[390px]:p-5 flex items-start gap-3.5"
          >
            <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 select-none">
              {idx + 1}
            </div>
            <p className="text-[15px] sm:text-base text-zinc-300 leading-[1.6] flex-1 break-words">
              {leadIn ? (
                <>
                  <strong className="font-semibold text-zinc-100">{leadIn}: </strong>
                  <span>{rest}</span>
                </>
              ) : (
                <span>{item}</span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function RenderKeyValue({ section }: { section: KeyValueSection }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {section.items.map((item, idx) => (
        <div
          key={idx}
          className="rounded-xl bg-[#111116] border border-white/[0.04] p-4 min-[390px]:p-5 space-y-1.5"
        >
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
            {item.key}
          </div>
          <div className="text-[15px] sm:text-base font-medium text-zinc-100 break-words leading-[1.6]">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function RenderTagRow({ section }: { section: TagRowSection }) {
  return (
    <div className="rounded-xl bg-[#111116] border border-white/[0.04] p-4 min-[390px]:p-5">
      <div className="flex flex-wrap gap-2">
        {section.tags.map((tag, idx) => (
          <span
            key={idx}
            className="font-mono text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-zinc-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function RenderMetricsRow({ section }: { section: MetricsRowSection }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 min-[390px]:gap-3 sm:gap-4">
      {section.metrics.map((metric: MetricItem, idx: number) => (
        <div
          key={idx}
          className="rounded-xl bg-[#111116] border border-white/[0.04] p-3.5 min-[390px]:p-4 sm:p-5 space-y-1 text-center sm:text-left"
        >
          <div className="text-xl min-[390px]:text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            {metric.value}
          </div>
          <div className="text-xs sm:text-sm font-medium text-zinc-300">
            {metric.label}
          </div>
          {metric.description && (
            <p className="text-[11px] sm:text-xs text-zinc-500 pt-0.5 leading-normal">
              {metric.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function RenderCallout({ section }: { section: CalloutSection }) {
  const isAmber = section.variant === 'amber';
  const isSuccess = section.variant === 'success';
  const borderClass = isAmber
    ? 'border-amber-500/25 bg-amber-500/[0.06]'
    : isSuccess
    ? 'border-emerald-500/25 bg-emerald-500/[0.06]'
    : 'border-blue-500/25 bg-blue-500/[0.06]';
  const dotClass = isAmber ? 'bg-amber-400' : isSuccess ? 'bg-emerald-400' : 'bg-blue-400';
  const textClass = isAmber ? 'text-amber-200' : isSuccess ? 'text-emerald-200' : 'text-blue-200';

  return (
    <div className={`rounded-xl border p-4 min-[390px]:p-5 sm:p-6 flex items-start gap-3.5 ${borderClass}`}>
      <div className={`w-3 h-3 rounded-full mt-1 shrink-0 animate-pulse motion-reduce:animate-none ${dotClass}`} />
      <div className="space-y-1">
        <p className={`text-[15px] sm:text-base font-medium leading-[1.6] ${textClass}`}>
          {section.text}
        </p>
      </div>
    </div>
  );
}
