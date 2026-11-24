"use client";

import { type FC, type ComponentType } from "react";
import { motion } from "framer-motion";
import { Eye, ShieldCheck, Layers, MessageCircle, Search, Pill, Clock } from "lucide-react";
import { FEATURES_SECTION } from "@/lib/site";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  eye: Eye,
  "shield-check": ShieldCheck,
  layers: Layers,
  "message-circle": MessageCircle,
  search: Search,
  pill: Pill,
  clock: Clock,
};

export const Features: FC = () => {
  return (
    <section id="features" className="py-24 sm:py-32 bg-[var(--bg-soft)] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-[var(--primary)] bg-blue-50 border border-blue-100 mb-4">
            {FEATURES_SECTION.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--ink)] leading-tight">
            {FEATURES_SECTION.title}
          </h2>
          <p className="mt-4 text-lg text-[var(--ink-muted)] leading-relaxed font-normal">
            {FEATURES_SECTION.subtitle}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_SECTION.features.map((feat, index) => {
            const Icon = ICON_MAP[feat.icon];
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-white rounded-2xl p-7 border border-[var(--line)] shadow-xs hover:shadow-md hover:border-[var(--primary)]/30 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      {Icon && <Icon className="w-5 h-5 text-[var(--primary)]" />}
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase text-[var(--primary)]">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-[var(--ink)] leading-snug">
                    {feat.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[var(--ink-muted)] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
                  <span>Core Module</span>
                  <span className="text-[var(--primary)] font-semibold group-hover:translate-x-0.5 transition-transform">
                    Learn more →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Features;
