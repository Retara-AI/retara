"use client";

import { type FC, type ComponentType } from "react";
import { motion } from "framer-motion";
import { HeartPulse, Stethoscope, Building2, Pill } from "lucide-react";
import { ROLES_SECTION } from "@/lib/site";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  "heart-pulse": HeartPulse,
  stethoscope: Stethoscope,
  "building-2": Building2,
  pill: Pill,
};

export const Roles: FC = () => {
  return (
    <section id="roles" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-[var(--primary)] bg-blue-50 border border-blue-100 mb-4">
            {ROLES_SECTION.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--ink)] leading-tight">
            {ROLES_SECTION.title}
          </h2>
          <p className="mt-4 text-lg text-[var(--ink-muted)] leading-relaxed font-normal">
            {ROLES_SECTION.subtitle}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROLES_SECTION.roles.map((item, index) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[var(--bg-soft)] rounded-2xl p-8 border border-[var(--line)] flex flex-col hover:border-[var(--primary)]/40 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    {Icon && <Icon className="w-6 h-6 text-[var(--primary)]" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-[var(--ink)]">
                      {item.role}
                    </h3>
                    <p className="text-sm text-[var(--primary)] font-medium mt-0.5">
                      {item.headline}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mt-2">
                  {item.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 text-sm text-[var(--ink-muted)] leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Roles;
