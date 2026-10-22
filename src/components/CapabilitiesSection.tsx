"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

interface Service {
  title: string;
  desc: string;
  details: string[];
}

const services: Service[] = [
  {
    title: "Website Development",
    desc: "Tailored web development aligned with your business goals.",
    details: [
      "Company profile websites and informative landing pages",
      "Structured, clean page hierarchy for seamless user navigation",
      "Clear interactive touchpoints and user action flows",
      "Modular codebase engineered for effortless maintenance and scaling",
    ],
  },
  {
    title: "Web Information Systems",
    desc: "Purpose-built web systems to organize documents, records, and digital assets.",
    details: [
      "Web-based records archiving and catalog management",
      "Structured data tables with instant filtering and search",
      "Intuitive data entry forms with client-side validation",
      "Solutions tailored to real-world operational workflows like PKL archive management",
    ],
  },
  {
    title: "Responsive Web Design",
    desc: "Fluid interfaces that adapt seamlessly across all screen viewports.",
    details: [
      "Mobile-first responsive layouts tailored for smartphones",
      "Optimized viewing experience on tablets and iPads",
      "Expansive typography and high readability on laptops and ultra-wide desktops",
      "Touch-optimized navigation and accessible interaction states",
    ],
  },
  {
    title: "Website Maintenance & Enhancements",
    desc: "Refining, updating, and optimizing existing websites to meet evolving needs.",
    details: [
      "Content layout adjustments and typographic polish",
      "UI bug fixes and cross-browser consistency updates",
      "Modernizing legacy components and dependencies",
      "Consultation on straightforward feature implementations",
    ],
  },
];

export default function CapabilitiesSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="capabilities" className="bg-[#FAFAFA] text-black py-16 sm:py-24 md:py-28 border-b border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex">
        {/* Left Gutter */}
        <div className="hidden md:flex flex-col justify-between items-center pr-6 lg:pr-8 py-8 border-r border-neutral-200 select-none flex-shrink-0 w-14 lg:w-16">
          <span className="text-[11px] font-mono tracking-widest text-neutral-400 font-semibold">04</span>
          <span className="vertical-lr text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-medium hover:text-black transition-colors whitespace-nowrap">
            Services
          </span>
          <span className="text-[11px] font-mono text-neutral-400">4 Services</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pl-0 sm:pl-6 md:pl-10 lg:pl-12">
          <RevealOnScroll>
            <div className="mb-10 sm:mb-16">
              <p className="text-xs font-mono text-neutral-500 tracking-widest uppercase mb-2 sm:mb-3">Services</p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-black tracking-tight leading-tight">
                How I Can Help
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-3 max-w-xl font-sans">
                Specialized services tailored to build modern websites and streamline your web-based information systems.
              </p>
            </div>
          </RevealOnScroll>

          {/* Services Accordion */}
          <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200 bg-white shadow-xs">
            {services.map((svc, idx) => {
              const isOpen = openIdx === idx;
              return (
                <RevealOnScroll key={svc.title} delayMs={idx * 50}>
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className={`w-full flex items-center justify-between p-4 sm:p-6 text-left group hover:bg-neutral-50 active:bg-neutral-100 transition-colors cursor-pointer min-h-[56px] ${
                        isOpen ? "bg-neutral-50/70" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-6 pr-3">
                        <span className="text-xs font-mono text-neutral-400 tabular-nums w-5 sm:w-6 flex-shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="text-sm sm:text-lg font-heading font-bold text-black group-hover:text-black transition-colors">
                            {svc.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-0.5 line-clamp-2 sm:line-clamp-none">
                            {svc.desc}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-black" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="pb-5 sm:pb-6 pl-11 sm:pl-18 pr-4 sm:pr-8 animate-accordionDown">
                        <ul className="space-y-2 pt-3 border-t border-neutral-100">
                          {svc.details.map((d) => (
                            <li key={d} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 font-sans">
                              <span className="text-neutral-400 mt-0.5">—</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
