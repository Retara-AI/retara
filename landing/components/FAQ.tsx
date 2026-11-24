"use client";

import { useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_SECTION } from "@/lib/site";

export const FAQ: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-[var(--primary)] bg-blue-50 border border-blue-100 mb-4">
            {FAQ_SECTION.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--ink)] leading-tight">
            {FAQ_SECTION.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed font-normal max-w-xl mx-auto">
            {FAQ_SECTION.subtitle}
          </p>
        </motion.div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {FAQ_SECTION.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="border border-[var(--line)] rounded-2xl overflow-hidden bg-white transition-colors duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] hover:bg-[var(--bg-soft)] transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base sm:text-lg font-semibold text-[var(--ink)] tracking-tight">
                    {faq.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-[var(--line)] transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[var(--primary)] text-white border-transparent" : "text-[var(--ink-muted)] bg-white"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed border-t border-[var(--line)]/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default FAQ;
