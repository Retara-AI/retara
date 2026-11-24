"use client";

import { type FC, type ComponentType } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, FileCheck2, Lock, ScrollText } from "lucide-react";
import { SAFETY_SECTION, SITE_METADATA } from "@/lib/site";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  "shield-alert": ShieldAlert,
  "file-check-2": FileCheck2,
  lock: Lock,
  "scroll-text": ScrollText,
};

export const Safety: FC = () => {
  return (
    <section id="safety" className="py-24 sm:py-32 bg-[var(--bg-soft)] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-[var(--primary)] bg-blue-50 border border-blue-100 mb-4">
            {SAFETY_SECTION.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--ink)] leading-tight">
            {SAFETY_SECTION.title}
          </h2>
          <p className="mt-4 text-lg text-[var(--ink-muted)] leading-relaxed font-normal">
            {SAFETY_SECTION.subtitle}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAFETY_SECTION.points.map((point, index) => {
            const Icon = ICON_MAP[point.icon];
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-[var(--line)] shadow-xs"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5">
                  {Icon && <Icon className="w-5 h-5 text-[var(--primary)]" />}
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-[var(--ink)]">
                  {point.title}
                </h3>
                <p className="mt-3 text-base text-[var(--ink-muted)] leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-6 sm:p-8 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          <div className="p-3 rounded-xl bg-amber-100 text-amber-900 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-amber-950">
              Important Disclaimer
            </h4>
            <p className="mt-1 text-sm text-amber-900/90 leading-relaxed">
              {SITE_METADATA.disclaimer}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Safety;
