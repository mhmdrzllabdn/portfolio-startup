"use client";

import React, { useEffect } from "react";
import { X, Check, Code2, Server, Award, ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-about-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl max-h-[96vh] sm:max-h-[90vh] overflow-y-auto bg-white border-t sm:border border-neutral-200 shadow-2xl z-10 text-black flex flex-col rounded-t-xl sm:rounded-none">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-white/95 backdrop-blur-md border-b border-neutral-200">
          <span className="eyebrow-text text-neutral-500 font-semibold">FULL PROFILE & BACKGROUND</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close about modal"
            className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          <div>
            <h2 id="modal-about-title" className="editorial-title text-3xl sm:text-4xl font-extrabold text-black mb-4">
              ABOUT REZA
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              I am a Full-Stack Developer & Software Architect with a deep passion for designing end-to-end digital experiences. Rather than treating frontend and backend as separate silos, I bridge intuitive human interfaces with robust, fault-tolerant distributed infrastructure.
            </p>
          </div>

          {/* Core Competencies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 border border-neutral-200">
              <Code2 className="w-5 h-5 text-black mb-2" />
              <h3 className="font-bold text-sm tracking-wide mb-1 text-black">FRONTEND ARCHITECTURE</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Specialized in React, Next.js App Router, TypeScript, and modern CSS architectures with strict Core Web Vitals optimization.
              </p>
            </div>
            <div className="p-4 bg-neutral-50 border border-neutral-200">
              <Server className="w-5 h-5 text-black mb-2" />
              <h3 className="font-bold text-sm tracking-wide mb-1 text-black">SYSTEMS & DATA</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Proficient in Node.js server frameworks, PostgreSQL relational schema modeling, Redis caching, and Docker containerization.
              </p>
            </div>
          </div>

          {/* Engineering Approach */}
          <div className="space-y-3">
            <h3 className="eyebrow-text text-neutral-500 font-semibold">CORE ENGINEERING PRACTICES</h3>
            <div className="space-y-2 text-sm text-neutral-700">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-black mt-0.5" />
                <span>Writing clean, declarative code with self-documenting naming and minimal magic abstractions.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-black mt-0.5" />
                <span>Designing relational databases with explicit constraints, foreign keys, and indexes for fast queries.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-black mt-0.5" />
                <span>Defensive error handling, rigorous input validation (Zod), and OWASP security standards.</span>
              </div>
            </div>
          </div>

          {/* Education & Values */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-500">
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-black" />
              <span className="text-neutral-700 font-medium">Computer Science &amp; Software Engineering Background</span>
            </div>
            <a
              href="https://github.com/mhmdrzllabdn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-black hover:opacity-75 transition-colors font-mono"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub: mhmdrzllabdn</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <a
            href="https://github.com/mhmdrzllabdn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-neutral-300 hover:border-black px-4 py-2 text-xs font-semibold tracking-wider text-black hover:bg-neutral-100 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>VIEW GITHUB</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-black text-white text-xs font-semibold tracking-wider hover:bg-neutral-800 transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
