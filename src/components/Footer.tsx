"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAFAFA] text-black border-t border-neutral-200 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex relative">
        {/* Left Vertical Editorial Gutter */}
        <div className="hidden md:flex flex-col justify-between items-center pr-6 lg:pr-8 py-10 border-r border-neutral-200 select-none flex-shrink-0 w-14 lg:w-16">
          <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
            09
          </div>
          <div className="vertical-lr text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-medium hover:text-black transition-colors whitespace-nowrap">
            Footer
          </div>
          <div className="text-[11px] font-mono text-neutral-400 font-semibold tracking-wider">
            2026
          </div>
        </div>

        {/* Main Footer Canvas */}
        <div className="flex-1 min-w-0 pl-0 sm:pl-6 md:pl-10 lg:pl-12 py-8 sm:py-10">
          {/* Wordmark */}
          <div className="pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-neutral-200">
            <span className="font-heading font-extrabold text-xl sm:text-3xl md:text-4xl text-neutral-950 tracking-[-0.02em] uppercase block">
              MUHAMMAD RIZAL ABIDIN
            </span>
            <span className="text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-wider block mt-1">
              WEB DEVELOPER
            </span>
            <p className="text-xs sm:text-sm font-sans text-neutral-600 mt-2 max-w-xl">
              Developing websites, mastering technologies, and crafting purposeful digital solutions.
            </p>
          </div>

          {/* Colophon Metadata Strip */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 text-xs font-mono text-neutral-600">
            {/* Left: Copyright */}
            <div>
              <span className="font-medium text-black">© 2026 Muhammad Rizal Abidin.</span>
              <span className="text-neutral-400 ml-2">All Rights Reserved.</span>
            </div>

            {/* Center: Location */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-neutral-500 text-[11px]">
              <span>GRESIK, INDONESIA</span>
            </div>

            {/* Right: Social & Back to Top */}
            <div className="flex items-center gap-5 sm:gap-6 pt-2 lg:pt-0">
              <a
                href="https://github.com/mhmdrzllabdn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black active:scale-95 transition-all"
              >
                GITHUB
              </a>
              <a
                href="https://linkedin.com/in/reza-fullstack"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black active:scale-95 transition-all"
              >
                LINKEDIN
              </a>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="inline-flex items-center gap-1.5 font-bold text-black hover:text-neutral-600 active:scale-95 transition-all cursor-pointer group"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
