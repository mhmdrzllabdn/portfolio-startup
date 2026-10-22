"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How long does it take to develop a website?",
    answer:
      "Project turnaround depends on requirements, scope, page volume, and technical complexity. A transparent timeline is provided once project specifications are clarified.",
  },
  {
    question: "Are you available for freelance projects?",
    answer:
      "Yes, I am actively open to discussing website and web system projects aligned with my skillset and development scope.",
  },
  {
    question: "Will the developed website be fully responsive?",
    answer:
      "Yes. Every website is built mobile-first and tested rigorously to adapt smoothly across smartphones, tablets, laptops, and ultra-wide desktops.",
  },
  {
    question: "Can you help improve or maintain an existing website?",
    answer:
      "Yes, I can assist with UI improvements, refactoring, feature enhancements, and maintenance depending on your current stack and requirements.",
  },
  {
    question: "What happens if issues arise after project delivery?",
    answer:
      "I provide post-launch support and troubleshooting sessions to ensure your website continues running smoothly and reliably.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#FAFAFA] text-black border-b border-neutral-200 relative overflow-hidden py-16 sm:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex relative">
        {/* Left Vertical Editorial Gutter */}
        <div className="hidden md:flex flex-col justify-between items-center pr-6 lg:pr-8 py-8 border-r border-neutral-200 select-none flex-shrink-0 w-14 lg:w-16">
          <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
            06
          </div>
          <div className="vertical-lr text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-medium hover:text-black transition-colors whitespace-nowrap">
            FAQ
          </div>
          <div className="text-[11px] font-mono text-neutral-400 font-semibold tracking-wider">
            FAQ
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 pl-0 sm:pl-6 md:pl-10 lg:pl-12">
          <RevealOnScroll>
            <div className="pb-6 sm:pb-8 border-b border-neutral-200 mb-8 sm:mb-12">
              <p className="text-xs font-mono text-neutral-500 tracking-widest uppercase mb-2 sm:mb-3">
                Frequently Asked Questions
              </p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold text-black tracking-tight leading-tight">
                Questions &amp; Answers
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 max-w-xl mt-3 leading-relaxed font-sans">
                Answers to common inquiries regarding project workflows, scopes, and website customizations.
              </p>
            </div>
          </RevealOnScroll>

          {/* Accordion FAQ */}
          <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200 bg-white shadow-xs">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <RevealOnScroll key={faq.question} delayMs={idx * 40}>
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className={`w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-neutral-50 active:bg-neutral-100 transition-colors cursor-pointer group min-h-[52px] ${
                        isOpen ? "bg-neutral-50/70" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-6 pr-3">
                        <span className="text-xs font-mono text-neutral-400 tabular-nums w-5 sm:w-6 flex-shrink-0">
                          [{String(idx + 1).padStart(2, "0")}]
                        </span>
                        <h3 className="text-sm sm:text-lg font-heading font-bold text-black group-hover:text-black transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-black" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="pb-5 sm:pb-6 pl-10 sm:pl-18 pr-4 sm:pr-10 animate-accordionDown">
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* Additional note */}
          <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-black flex-shrink-0" />
              <span>HAVE A QUESTION NOT LISTED HERE?</span>
            </div>
            <a
              href="#contact"
              className="font-bold text-black hover:underline active:scale-[0.98] transition-all"
            >
              CONTACT ME DIRECTLY →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
