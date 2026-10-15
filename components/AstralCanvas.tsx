'use client';

import React, { useEffect, useRef } from 'react';

/**
 * TUNABLE CONSTANTS FOR ASTRAL DOTS NETWORK
 * You can tweak any of these values to customize appearance and physics.
 */
export const ASTRAL_CONFIG = {
  // Density and counts
  densityAreaPerDot: 12000, // 1 dot per 12,000 px²
  maxDotsDesktop: 90,
  maxDotsMobile: 40,
  minDotsFloor: 20,

  // Dot dimensions and speeds
  dotMinRadius: 0.8,
  dotMaxRadius: 2.0,
  speedMin: 0.1, // px / frame
  speedMax: 0.35,

  // Connections
  connectionDistanceDesktop: 130, // px
  connectionDistanceMobile: 100, // px
  maxLineAlpha: 0.18,

  // Alpha ranges
  dotMinAlpha: 0.35,
  dotMaxAlpha: 0.6,

  // Pointer interaction
  pointerRadius: 160, // px
  pointerPushStrength: 0.6, // gentle easing push away from cursor
  pointerConnectionMaxAlpha: 0.22,

  // Colors: soft white/gray base with theme accents (Pink #ED1E79, Purple #662D8C, Fuchsia, Cyan)
  colors: {
    baseDot: 'rgba(255, 255, 255, 0.75)',
    baseLine: '255, 255, 255',
    accents: [
      'rgba(237, 30, 121, 0.85)', // Pink #ED1E79
      'rgba(168, 85, 247, 0.85)', // Purple / Fuchsia #A855F7
      'rgba(102, 45, 140, 0.85)', // Deep Purple #662D8C
      'rgba(56, 189, 248, 0.85)', // Sky / Blue #38BDF8
    ],
  },
  accentDotRatio: 0.22, // ~22% of dots are accent colored
};

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export default function AstralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animFrameId: number | null = null;
    let isPaused = false;
    let isModalOpen = false;
    let lastTime = performance.now();
    let width = window.innerWidth;
    let height = window.innerHeight;
    let isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let dpr = Math.min(window.devicePixelRatio || 1, isTouch ? 1.5 : 2);

    // Reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionQuery.matches;

    // Pointer state
    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
      isTouchActive: false,
    };

    // Dots storage
    let dots: Dot[] = [];
    let targetCount = calculateTargetCount();

    function calculateTargetCount() {
      const isMobileScreen = width < 768;
      const maxCap = isMobileScreen ? ASTRAL_CONFIG.maxDotsMobile : ASTRAL_CONFIG.maxDotsDesktop;
      const countByArea = Math.floor((width * height) / ASTRAL_CONFIG.densityAreaPerDot);
      return Math.min(maxCap, Math.max(ASTRAL_CONFIG.minDotsFloor, countByArea));
    }

    function createDot(): Dot {
      const isAccent = Math.random() < ASTRAL_CONFIG.accentDotRatio;
      const accentColors = ASTRAL_CONFIG.colors.accents;
      const color = isAccent
        ? accentColors[Math.floor(Math.random() * accentColors.length)]
        : ASTRAL_CONFIG.colors.baseDot;

      const angle = Math.random() * Math.PI * 2;
      const speed =
        ASTRAL_CONFIG.speedMin +
        Math.random() * (ASTRAL_CONFIG.speedMax - ASTRAL_CONFIG.speedMin);

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius:
          ASTRAL_CONFIG.dotMinRadius +
          Math.random() * (ASTRAL_CONFIG.dotMaxRadius - ASTRAL_CONFIG.dotMinRadius),
        alpha:
          ASTRAL_CONFIG.dotMinAlpha +
          Math.random() * (ASTRAL_CONFIG.dotMaxAlpha - ASTRAL_CONFIG.dotMinAlpha),
        color,
      };
    }

    function initDots() {
      targetCount = calculateTargetCount();
      dots = [];
      for (let i = 0; i < targetCount; i++) {
        dots.push(createDot());
      }
    }

    function resizeCanvas(isRescaleOnly = false) {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, isTouch ? 1.5 : 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      if (isRescaleOnly) {
        // Wrap any out-of-bounds dots softly without reseeding
        for (const dot of dots) {
          if (dot.x > width) dot.x = width - Math.random() * 20;
          if (dot.y > height) dot.y = height - Math.random() * 20;
        }
      } else {
        initDots();
      }

      if (prefersReducedMotion || isModalOpen) {
        drawFrame();
      }
    }

    // Adaptive performance monitor
    let frameTimes: number[] = [];
    let lastPerformanceCheck = performance.now();

    function updatePhysics(dt: number) {
      const isMobileScreen = width < 768;
      const connectionDist = isMobileScreen
        ? ASTRAL_CONFIG.connectionDistanceMobile
        : ASTRAL_CONFIG.connectionDistanceDesktop;
      const pointerRadius = ASTRAL_CONFIG.pointerRadius;

      // Update positions & gentle pointer interaction
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        dot.x += dot.vx * dt;
        dot.y += dot.vy * dt;

        // Wrap around boundaries smoothly
        if (dot.x < -10) dot.x = width + 10;
        else if (dot.x > width + 10) dot.x = -10;
        if (dot.y < -10) dot.y = height + 10;
        else if (dot.y > height + 10) dot.y = -10;

        // Pointer repulsion / interaction
        if (pointer.active) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const dist = Math.hypot(dx, dy);

          if (dist < pointerRadius && dist > 1) {
            const force = (1 - dist / pointerRadius) * ASTRAL_CONFIG.pointerPushStrength;
            dot.x += (dx / dist) * force * dt;
            dot.y += (dy / dist) * force * dt;
          }
        }
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);

      const isMobileScreen = width < 768;
      const connectionDist = isMobileScreen
        ? ASTRAL_CONFIG.connectionDistanceMobile
        : ASTRAL_CONFIG.connectionDistanceDesktop;

      // Draw connections between dots
      ctx.lineWidth = 0.75;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const d1 = dots[i];
          const d2 = dots[j];
          const dx = d1.x - d2.x;
          const dy = d1.y - d2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * ASTRAL_CONFIG.maxLineAlpha;
            ctx.strokeStyle = `rgba(${ASTRAL_CONFIG.colors.baseLine}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(d1.x, d1.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.stroke();
          }
        }
      }

      // Draw connections from pointer to nearby dots
      if (pointer.active) {
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const dist = Math.hypot(dx, dy);

          if (dist < ASTRAL_CONFIG.pointerRadius) {
            const alpha =
              (1 - dist / ASTRAL_CONFIG.pointerRadius) *
              ASTRAL_CONFIG.pointerConnectionMaxAlpha;
            ctx.strokeStyle = `rgba(${ASTRAL_CONFIG.colors.baseLine}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(dot.x, dot.y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop(now: number) {
      if (isPaused || isModalOpen || prefersReducedMotion) {
        return;
      }

      const elapsed = now - lastTime;
      lastTime = now;
      // Cap delta time to prevent large physics jumps on tab blur
      const dt = Math.min(elapsed / 16.67, 2.5);

      updatePhysics(dt);
      drawFrame();

      // Adaptive quality monitor (1 second window)
      frameTimes.push(elapsed);
      if (now - lastPerformanceCheck > 1000) {
        const avgFrameTime =
          frameTimes.reduce((a, b) => a + b, 0) / (frameTimes.length || 1);
        const fps = 1000 / avgFrameTime;

        if (fps < 45 && dots.length > ASTRAL_CONFIG.minDotsFloor) {
          const newCount = Math.max(
            ASTRAL_CONFIG.minDotsFloor,
            Math.floor(dots.length * 0.75)
          );
          dots = dots.slice(0, newCount);
        }

        frameTimes = [];
        lastPerformanceCheck = now;
      }

      animFrameId = requestAnimationFrame(loop);
    }

    function startLoop() {
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
      lastTime = performance.now();
      animFrameId = requestAnimationFrame(loop);
    }

    function stopLoop() {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    }

    // Modal check & pause: check data-modal-open and [role="dialog"]
    function checkModalState() {
      const dialog = document.querySelector('[role="dialog"]');
      const hasModalAttr = document.body.getAttribute('data-modal-open') === 'true';
      const open = Boolean(dialog || hasModalAttr);

      if (open !== isModalOpen) {
        isModalOpen = open;
        if (isModalOpen) {
          stopLoop();
          // Render one static frame so dots remain visible behind/in the canvas shell
          drawFrame();
        } else {
          startLoop();
        }
      }
    }

    // Observers and event listeners
    const modalMutationObserver = new MutationObserver(() => {
      checkModalState();
    });
    modalMutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-modal-open'],
    });

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (isPaused) {
        stopLoop();
      } else if (!isModalOpen && !prefersReducedMotion) {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Pointer events (passive, never blocks scrolling)
    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const handlePointerDown = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      pointer.isTouchActive = true;
    };

    const handlePointerUp = () => {
      pointer.isTouchActive = false;
      if (isTouch) {
        pointer.active = false;
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Resize handling: ignore height-only resizes < 150px on touch devices
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    let resizeTimer: NodeJS.Timeout | null = null;

    const handleResize = () => {
      const curWidth = window.innerWidth;
      const curHeight = window.innerHeight;

      if (curWidth === lastWidth && isTouch && Math.abs(curHeight - lastHeight) < 150) {
        // Mobile URL bar collapse/expand only: rescale without reseeding dots
        resizeCanvas(true);
        lastHeight = curHeight;
        return;
      }

      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        lastWidth = window.innerWidth;
        lastHeight = window.innerHeight;
        resizeCanvas(false);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Reduced motion listener
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        stopLoop();
        drawFrame();
      } else if (!isModalOpen) {
        startLoop();
      }
    };
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    // Initial setup
    resizeCanvas(false);
    checkModalState();
    if (!prefersReducedMotion && !isModalOpen) {
      startLoop();
    } else {
      drawFrame();
    }

    return () => {
      stopLoop();
      if (resizeTimer) clearTimeout(resizeTimer);
      modalMutationObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        contain: 'strict',
      }}
    />
  );
}
