"use client";

import React from "react";
import { ArrowUpRight, Terminal } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

interface Axiom {
  number: string;
  category: string;
  title: string;
  quote: string;
  thesis: string;
  rule: string;
  metric: string;
}

const axioms: Axiom[] = [
  {
    number: "01",
    category: "MAINTAINABILITY & CLARITY",
    title: "WRITE CODE FOR THE ENGINEER AT 3:00 AM",
    quote: "Simplicity is prerequisite for reliability.",
    thesis:
      "When a critical production incident occurs in the middle of the night, clever metaprogramming and deep abstraction layers become dangerous liabilities. Code must be explicit, boring, predictable, and self-documenting.",
    rule: "Avoid clever one-liners where explicit logic provides immediate clarity. Make invalid states unrepresentable through strict typing.",
    metric: "Traceability: Any engineer must be able to follow the data lifecycle from HTTP route to database row in under 60 seconds.",
  },
  {
    number: "02",
    category: "DATA INTEGRITY & TRANSACTIONS",
    title: "DATA INTEGRITY ALWAYS PRECEDES VELOCITY",
    quote: "Corrupted state is worse than an offline server.",
    thesis:
      "Shipping a feature in 48 hours that leaves orphaned database records, phantom transfers, or silent balance drift is a net failure. Relational foreign keys, serializable isolation levels, and idempotency keys are not bureaucracy—they are the bedrock of human trust.",
    rule: "Enforce schema validation at runtime (Zod), maintain foreign keys in the database layer, and use row-level locks on concurrent writes.",
    metric: "Zero drift: 100% mathematical reconciliation across 50,000 concurrent synthetic write transactions.",
  },
  {
    number: "03",
    category: "PERFORMANCE & UX",
    title: "LATENCY IS RESPECT FOR HUMAN ATTENTION",
    quote: "A slow system is a broken system.",
    thesis:
      "Users should never sit waiting for an interface to finish calculating. Sub-100ms response times, optimistic UI updates, streaming server renders, and zero layout shifts are not cosmetic luxuries—they are the hallmarks of authentic engineering craft.",
    rule: "Index database queries before writing UI transitions. Stream HTML layout immediately and defer heavy analytics to background queues.",
    metric: "Core Web Vitals: Sub-second Largest Contentful Paint (LCP) and 0.00 Cumulative Layout Shift (CLS).",
  },
];

export default function EngineeringPrinciples() {
  return (
    <section className="bg-[#FAFAFA] text-black border-b border-neutral-200 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex relative">
        {/* Left Vertical Editorial Gutter */}
        <div className="hidden md:flex flex-col justify-between items-center pr-6 lg:pr-8 py-12 lg:py-16 border-r border-neutral-200 select-none flex-shrink-0 w-14 lg:w-16">
          <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
            06
          </div>
          <div className="vertical-lr text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-medium hover:text-black transition-colors whitespace-nowrap">
            Field Notes & Axioms
          </div>
          <div className="text-[11px] font-mono text-neutral-400 font-semibold tracking-wider">
            CREDO
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 pl-2 sm:pl-6 md:pl-10 lg:pl-12 py-12 lg:py-16">
          <RevealOnScroll>
            <div className="pb-8 border-b border-neutral-200 mb-10 sm:mb-12">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-black pulse-indicator" />
                <p className="eyebrow-text text-neutral-500 font-semibold">
                  [ 06 SYSTEM AXIOMS &amp; FIELD NOTES ]
                </p>
              </div>
              <h2 className="editorial-title text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-tight">
                OPINIONS FORGED IN PRODUCTION.
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 max-w-xl mt-3 leading-relaxed">
                Non-negotiable software engineering principles learned through shipping live applications, debugging distributed outages, and maintaining high-throughput databases.
              </p>
            </div>
          </RevealOnScroll>

          {/* 3 Editorial Axiom Entries (Pure typographic discipline, no generic quote boxes) */}
          <div className="space-y-8">
            {axioms.map((axiom, idx) => (
              <RevealOnScroll key={axiom.number} delayMs={idx * 80}>
                <article className="p-6 sm:p-10 bg-white border border-neutral-200 hover:border-black transition-all duration-300 shadow-xs hover:shadow-md group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Number & Main Statement (Cols 1-5) */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                        <span className="font-bold text-black font-sans text-sm">
                          AXIOM {axiom.number} OF 03
                        </span>
                        <span className="uppercase">{axiom.category}</span>
                      </div>

                      <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-black uppercase tracking-tight group-hover:text-black transition-colors">
                        {axiom.title}
                      </h3>

                      <div className="p-3 bg-neutral-50 border-l-2 border-l-black text-xs font-mono text-neutral-700 italic">
                        &ldquo;{axiom.quote}&rdquo;
                      </div>
                    </div>

                    {/* Right: Thesis, Practical Rule & Verifiable Metric (Cols 6-12) */}
                    <div className="lg:col-span-7 lg:border-l lg:border-neutral-200 lg:pl-8 space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-semibold mb-1">
                          THE ENGINEERING THESIS
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                          {axiom.thesis}
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-semibold mb-1">
                          PRACTICAL APPLICATION
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-900 font-medium leading-relaxed font-sans">
                          {axiom.rule}
                        </p>
                      </div>

                      <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs font-mono">
                        <span className="text-[10px] text-neutral-400 uppercase block font-semibold mb-0.5">
                          VERIFIABLE QUALITY STANDARD
                        </span>
                        <span className="text-black font-semibold">
                          {axiom.metric}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>

          {/* Axioms Colophon Footer */}
          <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-black" />
              <span>TESTED IN PRODUCTION CODEBASES & DISTRIBUTED CLUSTERS</span>
            </div>
            <span>CODIFIED 2026 • REZA FULL-STACK ARCHITECT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
