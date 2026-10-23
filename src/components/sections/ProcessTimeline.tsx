"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

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
    headline: "Defining goals, requirements, and project scope.",
    objective:
      "I discuss the project’s objectives, target audience, required features, and expected outcomes to establish a clear direction before development begins.",
    deliverables: [
      "Project Scope & Requirements Summary",
      "Agreed Functional Feature List",
      "Project Timeline & Milestones",
    ],
    tooling: ["Google Meet", "WhatsApp", "Project Workspace"],
    qualityGate: "Project requirements, scope, priorities, and expected deliverables are clearly documented and agreed upon.",
  },
  {
    step: "02",
    phaseName: "UI/UX & Wireframing",
    headline: "Planning the interface and user experience.",
    objective:
      "I develop the page structure, navigation, and wireframes to establish a clear and consistent user experience before implementation.",
    deliverables: [
      "Page Structure & Navigation Plan",
      "Wireframes or Interface Layouts",
      "Agreed Design Direction",
    ],
    tooling: ["Design Tools", "Wireframing Tools", "Reference Materials"],
    qualityGate: "The proposed interface and user flows align with the agreed requirements and intended user needs.",
  },
  {
    step: "03",
    phaseName: "Web Engineering",
    headline: "Developing the planned solution.",
    objective:
      "I implement the agreed features, integrate the required components, and organize the application code to support reliability and maintainability.",
    deliverables: [
      "Implemented Website Features",
      "Frontend and Backend Integration, Where Required",
      "Database Integration, Where Required",
    ],
    tooling: ["Code Editor", "Git", "Development Environment"],
    qualityGate: "Core features operate as intended, and the implementation follows the agreed project scope.",
  },
  {
    step: "04",
    phaseName: "Testing & Polish",
    headline: "Verifying functionality and refining the experience.",
    objective:
      "I test the main user flows, review responsive layouts, and address issues identified during development.",
    deliverables: [
      "Functional Testing & Bug Fixes",
      "Responsive Layout Verification",
      "Final Interface Improvements",
    ],
    tooling: ["Browser DevTools", "Responsive Testing", "Issue Tracking"],
    qualityGate: "The agreed features work as expected across the devices and browsers included in the testing process.",
  },
  {
    step: "05",
    phaseName: "Review & Handover",
    headline: "Reviewing the results and preparing for delivery.",
    objective:
      "I review the completed work against the agreed requirements and prepare the relevant documentation and handover materials.",
    deliverables: [
      "Final Project Review",
      "Deployment or Handover, as Agreed",
      "Relevant Documentation & Usage Guidance",
    ],
    tooling: ["Project Review", "Documentation", "Deployment Environment"],
    qualityGate: "The agreed deliverables have been reviewed, and the next steps for deployment, usage, or maintenance are clearly communicated.",
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
                  I follow a structured development process to ensure that each project has clear objectives, defined requirements, and measurable deliverables. The workflow may be adjusted to suit the scope and complexity of the project.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="text-xs font-mono text-neutral-500 bg-white px-3.5 py-2 border border-neutral-200 self-start lg:self-auto shadow-xs">
                PHASE <span className="font-bold text-black">{activePhase.step}</span> OF 05
              </div>
            </div>
          </RevealOnScroll>

          {/* Stepper Navigation Track */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-6 sm:mb-8">
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
