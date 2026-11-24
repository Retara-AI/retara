"use client";

import { type FC, type ComponentType } from "react";
import { motion } from "framer-motion";
import { EyeOff, MapPin, Unlink } from "lucide-react";
import { PROBLEM_SECTION } from "@/lib/site";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  "eye-off": EyeOff,
  "map-pin": MapPin,
  unlink: Unlink,
};

export const Problem: FC = () => {
  return (
    <section
      id="problem"
      className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-[var(--bg-soft)] relative border-t border-[var(--line)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-[var(--accent)] bg-orange-50 border border-orange-100 mb-4">
            {PROBLEM_SECTION.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--ink)] leading-tight">
            {PROBLEM_SECTION.title}
          </h2>
          <p className="mt-4 text-lg text-[var(--ink-muted)] leading-relaxed font-normal">
            {PROBLEM_SECTION.subtitle}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROBLEM_SECTION.cards.map((card, i) => {
            const Icon = ICON_MAP[card.icon];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 border border-[var(--line)] shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-orange-50/80 border border-orange-100 flex items-center justify-center">
                      {Icon && <Icon className="w-5 h-5 text-[var(--accent)]" />}
                    </div>
                    <span className="text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                      Factor 0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--ink)] tracking-tight leading-snug">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[var(--line)] flex items-center gap-2 text-xs font-medium text-[var(--ink-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span>Primary screening barrier</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Problem;
