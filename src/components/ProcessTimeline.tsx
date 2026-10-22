"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

interface Phase {
  step: string;
  phaseName: string;
  headline: string;
  objective: string;
  deliverables: string[];
  tooling: string[];
  qualityGate: string;
}

const phases: Phase[] = [
  {
    step: "01",
    phaseName: "Discovery & Planning",
    headline: "Clarifying goals, audience, and project scope",
    objective:
      "Discussing website objectives, target audience, and core functionality so the project scope is clearly defined and aligned from day one.",
    deliverables: [
      "Project Scope & Requirements Summary",
      "Agreed Functional Feature Matrix",
      "Timeline & Milestone Roadmap",
    ],
    tooling: ["Google Meet", "WhatsApp", "Project Workspace"],
    qualityGate: "Full mutual alignment and sign-off on project scope and deliverables.",
  },
  {
    step: "02",
    phaseName: "UI/UX & Wireframing",
    headline: "Architecting layouts, interaction flows, and visual systems",
    objective:
      "Crafting wireframes and visual UI mockups to ensure information architecture is structured, intuitive, and accessible for end-users.",
    deliverables: [
      "High-Fidelity Page Wireframes",
      "Visual Design System & Components",
      "Information Hierarchy & Navigation Flows",
    ],
    tooling: ["Figma", "Design System Specs"],
    qualityGate: "Design blueprint approved prior to frontend engineering implementation.",
  },
  {
    step: "03",
    phaseName: "Web Engineering",
    headline: "Developing responsive interfaces and clean modular logic",
    objective:
      "Implementing production-ready pages, interactive components, and backend endpoints using structured, maintainable, and type-safe code.",
    deliverables: [
      "Production-Ready Web Application",
      "Responsive Mobile & Desktop Viewports",
      "Form Validation & Database Integrations",
    ],
    tooling: ["HTML5", "CSS3 / Tailwind", "TypeScript / React", "VS Code"],
    qualityGate: "Clean codebase adhering to modern web standards with all core features fully operational.",
  },
  {
    step: "04",
    phaseName: "Testing & Polish",
    headline: "Cross-device validation, QA testing, and performance tuning",
    objective:
      "Rigorous quality assurance across mobile smartphones, tablets, and desktop viewports, resolving edge-case bugs and polishing UI states.",
    deliverables: [
      "Cross-Browser & Multi-Viewport QA Audit",
      "Form Input & Navigation Flow Validation",
      "UI Polish & Bug Fix Resolves",
    ],
    tooling: ["Chrome DevTools", "Multi-Device Testing"],
    qualityGate: "Flawless cross-device rendering with zero broken interactions or unhandled exceptions.",
  },
  {
    step: "05",
    phaseName: "Review & Handover",
    headline: "Final stakeholder review, deployment, and asset transfer",
    objective:
      "Conducting a comprehensive final walkthrough, applying minor adjustments, deploying to production hosting, and delivering source assets.",
    deliverables: [
      "Final Project Walkthrough Session",
      "Complete Source Code & Deployment Handover",
      "User Guide & Operational Documentation",
    ],
    tooling: ["Cloudflare / Vercel", "GitHub"],
    qualityGate: "System live in production with clear ownership and access documentation.",
  },
];

export default function ProcessTimeline() {
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number>(0);
  const activePhase = phases[selectedPhaseIndex];

  return (
    <section id="process" className="bg-[#FAFAFA] text-black border-b border-neutral-200 relative overflow-hidden py-16 sm:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex relative">
        {/* Left Vertical Editorial Gutter */}
        <div className="hidden md:flex flex-col justify-between items-center pr-6 lg:pr-8 py-8 border-r border-neutral-200 select-none flex-shrink-0 w-14 lg:w-16">
          <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
            05
          </div>
          <div className="vertical-lr text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-medium hover:text-black transition-colors whitespace-nowrap">
            Workflow
          </div>
          <div className="text-[11px] font-mono text-neutral-400 font-semibold tracking-wider">
            PROCESS
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 pl-0 sm:pl-6 md:pl-10 lg:pl-12">
          <RevealOnScroll>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-neutral-200 mb-8 sm:mb-12">
              <div>
                <p className="text-xs font-mono text-neutral-500 tracking-widest uppercase mb-2 sm:mb-3">
                  Workflow &amp; Milestones
                </p>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold text-black tracking-tight leading-tight">
                  How I Work
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 max-w-xl mt-2 sm:mt-3 leading-relaxed font-sans">
                  A 5-stage structured engineering workflow to bring your web vision to life with precision and predictability.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="text-xs font-mono text-neutral-500 bg-white px-3.5 py-2 border border-neutral-200 self-start lg:self-auto shadow-xs">
                PHASE <span className="font-bold text-black">{activePhase.step}</span> OF 05
              </div>
            </div>
          </RevealOnScroll>

          {/* Stepper Navigation Track */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-6 sm:mb-8">
            {phases.map((p, idx) => {
              const isCurrent = selectedPhaseIndex === idx;
              return (
                <button
                  key={p.step}
                  type="button"
                  onClick={() => setSelectedPhaseIndex(idx)}
                  className={`p-3 sm:p-4 text-left border transition-all cursor-pointer active:scale-[0.98] ${
                    isCurrent
                      ? "bg-black text-white border-black shadow-xs"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-black hover:text-black"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                    <span className="text-neutral-400">
                      PHASE {p.step}
                    </span>
                    {isCurrent && <span className="text-[9px] bg-white text-black px-1 font-bold">ACTIVE</span>}
                  </div>
                  <h3 className="font-heading font-bold text-xs sm:text-sm tracking-tight line-clamp-1">
                    {p.phaseName}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Active Phase Dossier Card with key for smooth fadeIn */}
          <div
            key={activePhase.step}
            className="bg-white border border-neutral-200 p-5 sm:p-8 lg:p-10 shadow-xs relative animate-fadeIn"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-6 sm:mb-8">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                  PHASE {activePhase.step} DETAILS
                </span>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl text-black tracking-tight">
                  {activePhase.phaseName}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-sans">
                  &ldquo;{activePhase.headline}&rdquo;
                </p>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  disabled={selectedPhaseIndex === 0}
                  onClick={() => setSelectedPhaseIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 border border-neutral-200 text-xs font-mono disabled:opacity-30 disabled:pointer-events-none hover:border-black active:scale-95 transition-all"
                >
                  ← PREVIOUS
                </button>
                <button
                  type="button"
                  disabled={selectedPhaseIndex === phases.length - 1}
                  onClick={() => setSelectedPhaseIndex((prev) => Math.min(phases.length - 1, prev + 1))}
                  className="px-3 py-1.5 bg-black text-white text-xs font-mono disabled:opacity-30 disabled:pointer-events-none hover:bg-neutral-800 active:scale-95 transition-all flex items-center gap-1"
                >
                  <span>NEXT</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Grid Breakdown: Objective, Deliverables, Tooling & Quality Gate */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Column */}
              <div className="lg:col-span-5 space-y-5 sm:space-y-6">
                <div>
                  <h4 className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest font-bold mb-2">
                    FOCUS &amp; OBJECTIVE
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans">
                    {activePhase.objective}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200">
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-black font-bold uppercase">
                    <ShieldCheck className="w-4 h-4 text-neutral-900 flex-shrink-0" />
                    <span>QUALITY STANDARD</span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                    {activePhase.qualityGate}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block font-bold mb-2">
                    TOOLING &amp; ENVIRONMENT
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activePhase.tooling.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono bg-neutral-100 text-neutral-800 border border-neutral-200 px-2.5 py-1 font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Tangible Deliverables Checklist */}
              <div className="lg:col-span-7 lg:border-l lg:border-neutral-200 lg:pl-8 space-y-3 sm:space-y-4">
                <h4 className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest font-bold mb-2">
                  KEY DELIVERABLES
                </h4>
                <div className="space-y-2.5 sm:space-y-3">
                  {activePhase.deliverables.map((del, i) => (
                    <div
                      key={i}
                      className="p-3 sm:p-3.5 bg-neutral-50 border border-neutral-200 flex items-start gap-3 text-xs sm:text-sm text-neutral-900"
                    >
                      <CheckCircle2 className="w-4 h-4 text-neutral-900 flex-shrink-0 mt-0.5" />
                      <span className="font-medium font-sans">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
