"use client";

import { type FC } from "react";
import { motion } from "framer-motion";
import { HOW_IT_WORKS_SECTION } from "@/lib/site";

const STEP_MEDIA = [
  {
    image: "/images/fundus-retina.webp",
    alt: "High-resolution retinal fundus photography",
    tag: "Fundus & OCT",
    badge: "Quality: Auto-verified",
  },
  {
    image: "/images/gradcam-heatmap.webp",
    alt: "Grad-CAM explainable AI attention heatmap on retinal scan",
    tag: "AI Analysis",
    badge: "Grad-CAM: Active",
  },
  {
    image: "/images/clinical-care.webp",
    alt: "Clinical referral handoff and care network",
    tag: "Care Handoff",
    badge: "Referral: Linked",
  },
];

export const HowItWorks: FC = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-[var(--primary)] bg-blue-50 border border-blue-100 mb-4">
            {HOW_IT_WORKS_SECTION.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--ink)] leading-tight">
            {HOW_IT_WORKS_SECTION.title}
          </h2>
          <p className="mt-4 text-lg text-[var(--ink-muted)] leading-relaxed font-normal">
            {HOW_IT_WORKS_SECTION.subtitle}
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {HOW_IT_WORKS_SECTION.steps.map((item, index) => {
            const media = STEP_MEDIA[index] || STEP_MEDIA[0];
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative bg-[var(--bg-soft)] rounded-2xl p-6 sm:p-7 border border-[var(--line)] flex flex-col justify-between hover:border-[var(--primary)]/40 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-[var(--line)]">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-[var(--primary)]">
                      {item.step}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white text-xs font-semibold text-[var(--ink-muted)] border border-[var(--line)] shadow-2xs">
                      Step {index + 1}
                    </span>
                  </div>

                  <div className="mt-5 relative aspect-16/10 rounded-xl overflow-hidden bg-slate-950 border border-slate-200/80 shadow-xs">
                    <img
                      src={media.image}
                      alt={media.alt}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-xs text-[10px] font-bold tracking-wider uppercase text-slate-200 border border-slate-700/60 shadow-xs">
                        {media.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/85 backdrop-blur-xs text-[10px] font-semibold text-emerald-300 border border-emerald-800/60 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {media.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-6 text-xl sm:text-2xl font-semibold tracking-tight text-[var(--ink)] leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line)]">
                  <p className="text-xs font-medium text-[var(--primary)] bg-blue-50/80 p-3 rounded-xl border border-blue-100 flex items-center gap-2">
                    <span className="shrink-0 w-2 h-2 rounded-full bg-[var(--primary)]" />
                    <span>{item.detail}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;
