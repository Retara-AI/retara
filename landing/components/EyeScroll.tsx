"use client";

import { useRef, useState, useEffect, useCallback, type FC } from "react";
import {
  useScroll,
  useTransform,
  useReducedMotion,
  motion,
} from "framer-motion";
import { APP_URL } from "@/lib/site";

/* ═══════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════ */

const TOTAL_FRAMES = 89;
const CONCURRENCY = 8;

/* ═══════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════ */

function padIndex(n: number): string {
  return String(n).padStart(3, "0");
}

function frameSrc(index: number, mobile: boolean): string {
  return `/${mobile ? "frames-sm" : "frames"}/frame_${padIndex(index)}.webp`;
}

/* ═══════════════════════════════════════════════════════
   Loading Spinner
   ═══════════════════════════════════════════════════════ */

function Loader({ percent }: { percent: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-white pointer-events-none transition-opacity duration-300">
      <div className="relative flex items-center justify-center">
        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          className="-rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="35"
            cy="35"
            r={r}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="4"
          />
          <circle
            cx="35"
            cy="35"
            r={r}
            fill="none"
            stroke="#1040d0"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - percent / 100)}
            style={{ transition: "stroke-dashoffset 0.15s ease" }}
          />
        </svg>
        <span className="absolute text-sm font-bold tracking-tight text-slate-800">
          {percent}%
        </span>
      </div>
      <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
        Loading 3D Eye Experience
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Reduced-Motion Static Fallback
   ═══════════════════════════════════════════════════════ */

function StaticFallback({ mobile }: { mobile: boolean }) {
  return (
    <section className="relative bg-white min-h-screen">
      <div className="flex flex-col items-center px-6 py-20 md:px-12 lg:px-24 gap-20 max-w-4xl mx-auto">
        <img
          src={frameSrc(1, mobile)}
          alt="Retara eye screening device"
          className="w-full max-w-md mix-blend-multiply"
        />

        <div className="flex flex-col gap-16 w-full">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1040d0]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-900">Autonomous Ophthalmic AI</span>
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-slate-950">
              Retara
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-xl mx-auto">
              AI-powered eye screening, linked to real clinical care.
            </p>
          </div>

          <div className="max-w-md text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 mb-3 shadow-xs">
              <span className="text-xs font-bold tracking-wider uppercase text-blue-900">01 · Acquisition</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Upload. Validate.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Instant automated image quality and anatomical alignment verification in real time.
            </p>
          </div>

          <div className="max-w-md text-right ml-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 mb-3 shadow-xs">
              <span className="text-xs font-bold tracking-wider uppercase text-indigo-900">02 · Analysis</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Screen. Explain.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Dual neural network consensus with interpretable biomarker heatmaps and confidence scoring.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-900">03 · Care Handoff</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-950">
              Connect to care.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href={APP_URL}
                className="inline-flex items-center justify-center min-w-[190px] h-13 px-8 rounded-full font-semibold text-base shadow-lg"
                style={{ backgroundColor: "#1040d0", color: "#ffffff" }}
              >
                Open the app
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center min-w-[190px] h-13 px-8 rounded-full bg-white border-2 border-slate-200 text-slate-800 font-semibold text-base shadow-xs"
              >
                See how it works
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════ */

const EyeScroll: FC = () => {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: TOTAL_FRAMES + 1 }, () => null)
  );
  const currentFrameRef = useRef(1);
  const lastDrawnFrameRef = useRef(-1);
  const animationFrameId = useRef<number>(0);

  const cssWRef = useRef(0);
  const cssHRef = useRef(0);

  const [loadPercent, setLoadPercent] = useState(0);
  const [ready, setReady] = useState(false);
  const loadedPctRef = useRef(0);

  const mobileRef = useRef(false);
  useEffect(() => {
    mobileRef.current = window.matchMedia("(max-width: 767px)").matches;
  }, []);

  /* ─── Draw Frame onto Canvas (Returns true if successfully painted) ─── */
  const drawFrame = useCallback((frameIdx: number): boolean => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    let img = imagesRef.current[frameIdx];
    // If target frame is not ready, pick nearest loaded frame to prevent blank canvas
    if (!img || !img.complete || img.naturalHeight === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        if (frameIdx - offset >= 1 && imagesRef.current[frameIdx - offset]?.complete) {
          img = imagesRef.current[frameIdx - offset];
          break;
        }
        if (frameIdx + offset <= TOTAL_FRAMES && imagesRef.current[frameIdx + offset]?.complete) {
          img = imagesRef.current[frameIdx + offset];
          break;
        }
      }
    }
    if (!img || !img.complete || img.naturalHeight === 0) return false;

    const rect = canvas.getBoundingClientRect();
    const cssW = cssWRef.current || rect.width || window.innerWidth;
    const cssH = cssHRef.current || rect.height || window.innerHeight;
    if (cssW === 0 || cssH === 0) return false;

    // Clear canvas
    ctx.clearRect(0, 0, cssW, cssH);

    // Controlled scale: 0.50 desktop / 0.62 mobile leaves clean safe margins around exploded model
    const scale =
      Math.min(cssW / img.naturalWidth, cssH / img.naturalHeight) *
      (cssW < 768 ? 0.62 : 0.50);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const x = (cssW - dw) / 2;
    const y = (cssH - dh) / 2;

    ctx.drawImage(img, x, y, dw, dh);
    return true;
  }, []);

  /* ─── Continuous rAF Render Loop (Guarantees Frame 1 Paints on Load) ─── */
  useEffect(() => {
    if (reducedMotion) return;

    const render = () => {
      if (currentFrameRef.current !== lastDrawnFrameRef.current) {
        const drawn = drawFrame(currentFrameRef.current);
        // Only mark as drawn if an image was actually ready and painted
        if (drawn) {
          lastDrawnFrameRef.current = currentFrameRef.current;
        }
      }
      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [reducedMotion, drawFrame]);

  /* ─── Resize Handler with DPR Cap (1.5) ─── */
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cssW = rect.width || window.innerWidth;
    const cssH = rect.height || window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cssWRef.current = cssW;
    cssHRef.current = cssH;

    // Force redraw on next tick
    lastDrawnFrameRef.current = -1;
  }, []);

  /* ─── Preload All 89 Frames (Frame 1 Prioritized & Drawn Instantly) ─── */
  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let ro: ResizeObserver | undefined;

    if (stickyRef.current) {
      ro = new ResizeObserver(() => {
        if (!cancelled) resize();
      });
      ro.observe(stickyRef.current);
    }

    const onResize = () => {
      if (!cancelled) resize();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    resize();

    const mobile = mobileRef.current;

    async function loadFrame(frameNum: number): Promise<void> {
      if (cancelled || imagesRef.current[frameNum]) return;
      try {
        const img = new Image();
        img.src = frameSrc(frameNum, mobile);
        
        // Immediate paint as soon as frame 1 arrives
        img.onload = () => {
          if (cancelled) return;
          imagesRef.current[frameNum] = img;
          if (frameNum === 1) {
            lastDrawnFrameRef.current = -1;
            drawFrame(1);
          }
        };

        await img.decode();
        if (cancelled) return;

        imagesRef.current[frameNum] = img;

        if (frameNum === 1) {
          lastDrawnFrameRef.current = -1;
          drawFrame(1);
        }
      } catch {
        /* skip broken frame */
      }
    }

    function reportProgress(loaded: number) {
      const pct = Math.min(100, Math.round((loaded / TOTAL_FRAMES) * 100));
      if (pct > loadedPctRef.current) {
        loadedPctRef.current = pct;
        setLoadPercent(pct);
      }
      if (loaded >= TOTAL_FRAMES) {
        setReady(true);
      }
    }

    async function preloadAll() {
      let loaded = 0;

      // 1. Frame 1 loaded & decoded immediately
      await loadFrame(1);
      if (cancelled) return;
      loaded++;
      reportProgress(loaded);

      // 2. Load remaining frames with 8 concurrent workers
      let cursor = 2;
      async function worker() {
        while (cursor <= TOTAL_FRAMES) {
          const idx = cursor++;
          await loadFrame(idx);
          if (cancelled) return;
          loaded++;
          reportProgress(loaded);
        }
      }

      const workers: Promise<void>[] = [];
      for (let w = 0; w < CONCURRENCY; w++) {
        workers.push(worker());
      }
      await Promise.all(workers);
      if (!cancelled) {
        setReady(true);
      }
    }

    preloadAll();

    return () => {
      cancelled = true;
      ro?.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [reducedMotion, resize, drawFrame]);

  /* ─── Direct Zero-Lag Native Scroll Listener ─── */
  useEffect(() => {
    if (reducedMotion) return;

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / maxScroll));
      const t = progress <= 0.6 ? progress / 0.6 : 1 - (progress - 0.6) / 0.4;
      const frame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, 1 + Math.round(t * (TOTAL_FRAMES - 1)))
      );
      currentFrameRef.current = frame;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  /* ─── Framer Motion Scroll Progress for Overlays ─── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.16], [0, -20]);

  const opacity2 = useTransform(
    scrollYProgress,
    [0.18, 0.26, 0.36, 0.44],
    [0, 1, 1, 0]
  );
  const y2 = useTransform(scrollYProgress, [0.18, 0.26, 0.44], [20, 0, -20]);

  const opacity3 = useTransform(
    scrollYProgress,
    [0.48, 0.56, 0.66, 0.74],
    [0, 1, 1, 0]
  );
  const y3 = useTransform(scrollYProgress, [0.48, 0.56, 0.74], [20, 0, -20]);

  // Smoothly fade out overlay 4 before hero container ends so it never collides with next section
  const opacity4 = useTransform(scrollYProgress, [0.76, 0.84, 0.94, 0.99], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.76, 0.84, 0.99], [20, 0, -15]);
  const pointerEvents4 = useTransform(opacity4, (v) =>
    v > 0.5 ? "auto" : "none"
  );

  if (mounted && reducedMotion) {
    return <StaticFallback mobile={false} />;
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[320vh] md:h-[400vh] bg-white"
      aria-busy={!ready}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden bg-white"
      >
        {/* Canvas container */}
        <div className="absolute inset-0 bg-transparent">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Interactive 3D model of an exploded anatomical eye"
            className="h-full w-full mix-blend-multiply bg-transparent pointer-events-none"
          />
        </div>

        {/* ─── Overlay 1 (0% - Retara): Center bottom ─── */}
        <motion.div
          className="absolute bottom-14 md:bottom-20 inset-x-0 z-10 flex flex-col items-center text-center px-6 pointer-events-none select-none"
          style={{ opacity: opacity1, y: y1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#1040d0]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-900">Autonomous Ophthalmic AI</span>
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-slate-950">
            Retara
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-600 font-normal max-w-xl leading-relaxed">
            AI-powered eye screening, linked to real clinical care.
          </p>
          <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Scroll to explore</span>
            <svg className="w-4 h-4 animate-bounce text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>

        {/* ─── Overlay 2 (30% - Upload. Validate.): Top-Left Corner ─── */}
        <motion.div
          className="absolute top-24 md:top-28 left-8 md:left-20 z-10 max-w-sm md:max-w-md text-left pointer-events-none select-none"
          style={{ opacity: opacity2, y: y2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 mb-3 shadow-xs">
            <span className="text-xs font-bold tracking-wider uppercase text-blue-900">01 · Acquisition</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-950 leading-tight">
            Upload. Validate.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Instant automated image quality and anatomical alignment verification in real time.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-5">
            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 shadow-xs">Fundus & OCT</span>
            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 shadow-xs">Sub-second validation</span>
          </div>
        </motion.div>

        {/* ─── Overlay 3 (60% - Screen. Explain.): Top-Right Corner ─── */}
        <motion.div
          className="absolute top-24 md:top-28 right-8 md:right-20 z-10 max-w-sm md:max-w-md text-right flex flex-col items-end pointer-events-none select-none"
          style={{ opacity: opacity3, y: y3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 mb-3 shadow-xs">
            <span className="text-xs font-bold tracking-wider uppercase text-indigo-900">02 · Analysis</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-950 leading-tight">
            Screen. Explain.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Dual neural network consensus with interpretable biomarker heatmaps and confidence scoring.
          </p>
          <div className="flex flex-wrap justify-end gap-2.5 mt-5">
            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 shadow-xs">Ensemble AI</span>
            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 shadow-xs">Grad-CAM Heatmaps</span>
          </div>
        </motion.div>

        {/* ─── Overlay 4 (90% - Connect to care.): Center bottom ─── */}
        <motion.div
          className="absolute bottom-16 md:bottom-20 inset-x-0 z-10 flex flex-col items-center text-center px-6 pointer-events-auto select-none"
          style={{ opacity: opacity4, y: y4, pointerEvents: pointerEvents4 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-900">03 · Care Handoff</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-950">
            Connect to care.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal max-w-lg leading-relaxed">
            Seamless referral routing directly into verified ophthalmic care networks.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 pointer-events-auto">
            <a
              href={APP_URL}
              className="inline-flex items-center justify-center min-w-[190px] h-13 px-8 rounded-full font-semibold text-base shadow-lg hover:brightness-110 active:scale-95 transition-all duration-150"
              style={{ backgroundColor: "#1040d0", color: "#ffffff" }}
            >
              Open the app
              <svg className="w-4 h-4 ml-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center min-w-[190px] h-13 px-8 rounded-full bg-white border-2 border-slate-200 text-slate-800 font-semibold text-base shadow-xs hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all duration-150"
              style={{ backgroundColor: "#ffffff", color: "#1e293b", borderColor: "#e2e8f0" }}
            >
              See how it works
            </a>
          </div>
        </motion.div>

        {/* Loader */}
        {!ready && <Loader percent={loadPercent} />}
      </div>
    </section>
  );
};

export default EyeScroll;
