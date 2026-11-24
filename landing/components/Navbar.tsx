"use client";

import { useState, useEffect, useRef, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { APP_URL, NAV_LINKS, SITE_METADATA } from "@/lib/site";

export const Navbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trap focus and handle escape key for mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 h-20 flex items-center ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded-lg"
        >
          <span className="w-9 h-9 rounded-xl bg-[#1040d0] text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
            R
          </span>
          <span className="font-semibold text-slate-900">{SITE_METADATA.name}</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-slate-950 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={APP_URL}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-medium text-sm shadow-sm hover:brightness-110 active:scale-95 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            style={{ backgroundColor: "#1040d0", color: "#ffffff" }}
          >
            Open the app
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 lg:hidden"
            />

            {/* Slide-out Drawer */}
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl p-6 flex flex-col justify-between lg:hidden border-l border-slate-200"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation drawer"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-2.5 text-lg font-bold text-slate-900">
                    <span className="w-8 h-8 rounded-lg bg-[#1040d0] text-white flex items-center justify-center text-xs font-bold">
                      R
                    </span>
                    <span>{SITE_METADATA.name}</span>
                  </div>
                  <button
                    ref={closeButtonRef}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    aria-label="Close navigation menu"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="flex flex-col gap-3 mt-6">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-medium text-slate-800 hover:text-blue-600 py-2.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded-md"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-col gap-3">
                <a
                  href={APP_URL}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full font-medium text-sm shadow-md hover:brightness-110 active:scale-95 transition-all text-center"
                  style={{ backgroundColor: "#1040d0", color: "#ffffff" }}
                >
                  Open the app
                </a>
                <p className="text-xs text-center text-slate-400">
                  Preliminary screening only · Not a diagnosis
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
