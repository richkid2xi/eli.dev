'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import ScrollProgress from '../../components/ScrollProgress';

const nodes = [
  {
    label: '2023',
    title: 'Enrolled at GCTU',
    body: 'Started a Software Engineering degree because I wanted to build things, not just use them.',
    isFinal: false,
  },
  {
    label: '2024–2025',
    title: 'Built and shipped, alone',
    body: 'Founded EliTech CreaTives. Took products from a blank page to paying customers, owning every architecture decision, every deploy, every 1am bug, by myself.',
    isFinal: false,
  },
  {
    label: '2026',
    title: 'Noticed the pattern',
    body: "Across every project, the thing I kept gravitating toward wasn't the code. It was scoping the right problem, sequencing the work, and keeping a build from quietly dying halfway through.",
    isFinal: false,
  },
  {
    label: 'NOW',
    title: 'Pivoting on purpose',
    body: 'Pursuing Technical Project Management, alongside Agile and Scrum certifications. Not leaving engineering behind. Using it as leverage.',
    isFinal: false,
  },
  {
    label: 'WHERE THIS GOES',
    title: 'Running the process, not just the build',
    body: 'I want to run the process that turns ambitious ideas into shipped, sustainable products. Long term, across a portfolio of my own ventures, not just one job.',
    isFinal: true,
  },
];

/* ─── Confetti ─────────────────────────────────────────────── */
function launchConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#ED1E79', '#662D8C', '#f472b6', '#c084fc', '#ffffff', '#fbbf24'];
  const pieces: {
    x: number; y: number; vx: number; vy: number;
    r: number; color: string; angle: number; spin: number; alpha: number;
  }[] = [];

  for (let i = 0; i < 180; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5 - canvas.height * 0.3,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 3 + 2,
      r: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.2,
      alpha: 1,
    });
  }

  let frame: number;
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of pieces) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // gravity
      p.angle += p.spin;
      p.alpha -= 0.008;
      if (p.alpha > 0) alive = true;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.5);
      ctx.restore();
    }
    if (alive) frame = requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  frame = requestAnimationFrame(tick);
  // Auto-clean after 4s
  setTimeout(() => {
    cancelAnimationFrame(frame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 4000);
}

/* ─── Single timeline node ─────────────────────────────────── */
function TimelineNode({
  node,
  index,
  onVisible,
}: {
  node: (typeof nodes)[0];
  index: number;
  onVisible?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          onVisible?.();
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -20px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <div
      ref={ref}
      className="relative flex items-start"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: `opacity 0.4s ease ${index * 80}ms, transform 0.4s ease ${index * 80}ms`,
      }}
    >
      {/* Dot marker */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 0, top: 4, transform: 'translateX(-50%)' }}
      >
        {node.isFinal ? (
          <div
            className="rounded-full"
            style={{
              width: 16,
              height: 16,
              background: 'linear-gradient(135deg, #ED1E79, #662D8C)',
              boxShadow: '0 0 14px 5px rgba(237,30,121,0.55)',
            }}
          />
        ) : (
          <div
            className="rounded-full"
            style={{
              width: 10,
              height: 10,
              background: 'linear-gradient(135deg, #ED1E79, #662D8C)',
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pl-12">
        <p
          className="proggy mb-2"
          style={{ fontSize: 13, letterSpacing: '0.12em', color: '#c084a0' }}
        >
          {node.label}
        </p>
        <h3
          className="font-bold text-white mb-3"
          style={{ fontSize: node.isFinal ? 22 : 20, lineHeight: 1.3 }}
        >
          {node.title}
        </h3>
        <p style={{ color: '#d1d5db', fontSize: 16, lineHeight: 1.7, maxWidth: 540 }}>
          {node.body}
        </p>
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function PathPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiFired = useRef(false);
  const [fillPct, setFillPct] = useState(0);

  // Progressive line fill — measured from top of first dot to bottom of last dot
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.scrollHeight;
      const viewportH = window.innerHeight;
      // The fill should track the user's view (e.g., reaching 70% down the screen)
      const fillPixels = (viewportH * 0.7) - rect.top;
      const pct = Math.max(0, Math.min(100, (fillPixels / totalHeight) * 100));
      setFillPct(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFinalVisible = useCallback(() => {
    if (confettiFired.current) return;
    confettiFired.current = true;
    if (canvasRef.current) launchConfetti(canvasRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Full-screen confetti canvas — fixed, pointer-events-none */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
      />

      <ScrollProgress />

      {/* Back nav */}
      <div className="w-full max-w-[901px] mx-auto px-5 sm:px-8 lg:px-0 pt-8">
        <Link
          href="/"
          className="proggy text-shade hover:text-white transition-colors text-sm flex items-center gap-2 w-fit"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>
      </div>

      {/* Page header */}
      <div className="w-full max-w-[901px] mx-auto px-5 sm:px-8 lg:px-0 pt-12">
        <h1 className="text-[32px] md:text-[40px] font-bold text-white tracking-wide mb-4">
          The Path
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[640px] mb-8">
          I didn't start out trying to become a project manager. I started out trying to build
          things that work, and building things solo taught me something I didn't expect: the
          part I'm actually best at was never the code itself.
        </p>
        <div className="w-full h-px bg-white/10 border-b border-white/10 border-dashed mb-16" />
      </div>

      {/* Timeline */}
      <div className="w-full max-w-[901px] mx-auto px-5 sm:px-8 lg:px-0 pb-48">
        <div ref={containerRef} className="relative">
          {/* Static track */}
          <div
            className="absolute top-0 bottom-0 w-px bg-white/10"
            style={{ left: 0 }}
          />
          {/* Gradient fill */}
          <div
            className="absolute top-0 w-px"
            style={{
              left: 0,
              height: `${fillPct}%`,
              background: 'linear-gradient(180deg, #ED1E79, #662D8C)',
              transition: 'height 0.12s linear',
            }}
          />

          {/* Nodes */}
          <div className="flex flex-col" style={{ gap: 80 }}>
            {nodes.map((node, i) => (
              <TimelineNode
                key={i}
                node={node}
                index={i}
                onVisible={node.isFinal ? handleFinalVisible : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
