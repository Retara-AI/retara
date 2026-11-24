import { type FC } from "react";
import {
  SITE_METADATA,
  NAV_LINKS,
  CONTACT_EMAIL,
  GITHUB_URL,
  FIGMA_URL,
  APP_URL,
} from "@/lib/site";

export const Footer: FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-slate-800">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white mb-4">
              <span className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center font-extrabold text-sm">
                R
              </span>
              <span>{SITE_METADATA.name}</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              {SITE_METADATA.tagline}. Intelligent eye screening that connects
              patients to real clinical care.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-sm"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              {GITHUB_URL && (
                <li>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-sm"
                  >
                    <span>GitHub</span>
                    <span className="text-xs text-slate-500">↗</span>
                  </a>
                </li>
              )}
              {FIGMA_URL && (
                <li>
                  <a
                    href={FIGMA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-sm"
                  >
                    <span>Design Files</span>
                    <span className="text-xs text-slate-500">↗</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Get Started
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Start screening your patients with AI-powered analysis.
            </p>
            <a
              href={APP_URL}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[var(--primary)] text-white font-medium text-xs shadow-xs hover:brightness-110 active:scale-95 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Open the App
            </a>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-slate-500">
          <p className="max-w-2xl leading-relaxed">
            <span className="font-semibold text-slate-400">Disclaimer:</span>{" "}
            {SITE_METADATA.disclaimer}
          </p>
          <p className="shrink-0">© 2026 Retara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
