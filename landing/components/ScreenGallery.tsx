"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useId,
  type FC,
} from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
} from "framer-motion";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ImageOff, X, ChevronLeft, ChevronRight } from "lucide-react";
import { screens, SCREENS_SECTION, type ScreenRole } from "@/lib/site";

/* ═══════════════════════════════════════
   Constants
   ═══════════════════════════════════════ */

const TABS: { label: string; value: ScreenRole | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Patient", value: "patient" },
  { label: "Doctor", value: "doctor" },
  { label: "Clinic", value: "clinic" },
  { label: "Pharmacy", value: "pharmacy" },
];

/* ═══════════════════════════════════════
   Placeholder (broken-image fallback)
   ═══════════════════════════════════════ */

function Placeholder({ caption }: { caption: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--bg-soft)] border border-[var(--line)] rounded-xl">
      <ImageOff className="w-8 h-8 text-[var(--ink-muted)] opacity-40" />
      <p className="text-xs text-[var(--ink-muted)] text-center px-4 leading-snug max-w-[80%]">
        {caption}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════
   ScreenGallery
   ═══════════════════════════════════════ */

export const ScreenGallery: FC = () => {
  const [activeTab, setActiveTab] = useState<ScreenRole | "all">("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(() => new Set());
  const [mounted, setMounted] = useState(false);

  const layoutId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const touchStartX = useRef(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => setMounted(true), []);

  /* ─── Filtered list ─── */
  const filtered =
    activeTab === "all"
      ? screens
      : screens.filter((s) => s.role === activeTab);

  /* ─── Error tracking ─── */
  const handleImageError = useCallback((src: string) => {
    setFailedSrcs((prev) => new Set(prev).add(src));
  }, []);

  /* ─── Lightbox open / close / navigate ─── */
  const openLightbox = useCallback(
    (idx: number, trigger: HTMLButtonElement) => {
      triggerRef.current = trigger;
      setLightboxIdx(idx);
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      setLightboxIdx((prev) => {
        if (prev === null) return null;
        return (prev + dir + filtered.length) % filtered.length;
      });
    },
    [filtered.length]
  );

  /* ─── Tab keyboard navigation ─── */
  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      let next = idx;
      if (e.key === "ArrowRight") next = (idx + 1) % TABS.length;
      else if (e.key === "ArrowLeft")
        next = (idx - 1 + TABS.length) % TABS.length;
      else return;
      e.preventDefault();
      tabRefs.current[next]?.focus();
      setActiveTab(TABS[next].value);
    },
    []
  );

  /* ─── Lightbox side-effects: scroll lock, focus trap, aria-hidden ─── */
  useEffect(() => {
    if (lightboxIdx === null) return;

    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const hiddenSiblings: Element[] = [];
    if (dialog) {
      Array.from(document.body.children).forEach((child) => {
        if (child !== dialog && !child.getAttribute("aria-hidden")) {
          child.setAttribute("aria-hidden", "true");
          hiddenSiblings.push(child);
        }
      });
    }

    requestAnimationFrame(() => closeRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          navigate(-1);
          break;
        case "ArrowRight":
          navigate(1);
          break;
        case "Tab": {
          const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
          break;
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      hiddenSiblings.forEach((el) => el.removeAttribute("aria-hidden"));
    };
  }, [lightboxIdx, closeLightbox, navigate]);

  /* ─── Preload adjacent images ─── */
  useEffect(() => {
    if (lightboxIdx === null || filtered.length <= 1) return;
    const prevSrc =
      filtered[(lightboxIdx - 1 + filtered.length) % filtered.length]?.src;
    const nextSrc = filtered[(lightboxIdx + 1) % filtered.length]?.src;
    [prevSrc, nextSrc].forEach((src) => {
      if (src && !failedSrcs.has(src)) {
        const img = new window.Image();
        img.src = src;
      }
    });
  }, [lightboxIdx, filtered, failedSrcs]);

  const current = lightboxIdx !== null ? filtered[lightboxIdx] : null;
  const captionId = `${layoutId}-lb-caption`;

  /* ═══════════════════════════════════════
     Render
     ═══════════════════════════════════════ */

  return (
    <section id="screens" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-[var(--primary)] bg-blue-50 border border-blue-100 mb-4">
            {SCREENS_SECTION.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--ink)] leading-tight">
            {SCREENS_SECTION.title}
          </h2>
          <p className="mt-4 text-lg text-[var(--ink-muted)] leading-relaxed font-normal">
            {SCREENS_SECTION.subtitle}
          </p>
        </motion.div>

        {/* ─── Tabs ─── */}
        <LayoutGroup id={layoutId}>
          <div
            role="tablist"
            aria-label="Filter screenshots by role"
            className="mt-12 flex flex-wrap justify-center gap-1.5"
          >
            {TABS.map((tab, i) => {
              const selected = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveTab(tab.value)}
                  onKeyDown={(e) => handleTabKeyDown(e, i)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                    selected
                      ? "text-white"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-slate-100"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="screen-tab-pill"
                      className="absolute inset-0 rounded-full bg-[var(--primary)]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* ─── Grid ─── */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((screen, idx) => {
                const failed = failedSrcs.has(screen.src);
                return (
                  <motion.div
                    key={screen.src}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                  >
                    <button
                      type="button"
                      onClick={(e) => openLightbox(idx, e.currentTarget)}
                      className="group block w-full text-left rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)] overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                    >
                      <div className="relative aspect-[16/10]">
                        {failed ? (
                          <Placeholder caption={screen.caption} />
                        ) : (
                          <Image
                            src={screen.src}
                            alt={screen.alt}
                            fill
                            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                            className="object-cover"
                            loading="lazy"
                            onError={() => handleImageError(screen.src)}
                          />
                        )}
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-sm text-[var(--ink)] font-medium leading-snug">
                          {screen.caption}
                        </p>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ Lightbox Portal ═══ */}
      {mounted &&
        lightboxIdx !== null &&
        current &&
        createPortal(
          <AnimatePresence>
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={captionId}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                const diff =
                  e.changedTouches[0].clientX - touchStartX.current;
                if (Math.abs(diff) > 50) navigate(diff > 0 ? -1 : 1);
              }}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
                onClick={closeLightbox}
                aria-hidden="true"
              />

              {/* Dialog content */}
              <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
                {/* Top bar */}
                <div className="w-full flex items-center justify-between mb-4">
                  <div
                    aria-live="polite"
                    className="text-sm text-white/70 font-medium tabular-nums"
                  >
                    {lightboxIdx + 1} / {filtered.length}
                  </div>
                  <button
                    ref={closeRef}
                    onClick={closeLightbox}
                    aria-label="Close lightbox"
                    className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Image + prev / next */}
                <div className="relative flex items-center gap-2 sm:gap-4 w-full">
                  <button
                    onClick={() => navigate(-1)}
                    aria-label="Previous image"
                    className="p-2.5 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current.src}
                        initial={
                          reducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.96 }
                        }
                        animate={
                          reducedMotion
                            ? { opacity: 1 }
                            : { opacity: 1, scale: 1 }
                        }
                        exit={
                          reducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.96 }
                        }
                        transition={{ duration: 0.2 }}
                        className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900"
                      >
                        {failedSrcs.has(current.src) ? (
                          <Placeholder caption={current.caption} />
                        ) : (
                          <Image
                            src={current.src}
                            alt={current.alt}
                            fill
                            className="object-contain"
                            sizes="80vw"
                            onError={() => handleImageError(current.src)}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => navigate(1)}
                    aria-label="Next image"
                    className="p-2.5 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Caption */}
                <p
                  id={captionId}
                  className="mt-4 text-sm text-white/80 text-center max-w-lg"
                >
                  {current.caption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

export default ScreenGallery;
