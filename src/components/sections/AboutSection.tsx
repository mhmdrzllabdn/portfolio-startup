"use client";

import React from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#FAFAFA] text-black py-16 sm:py-24 md:py-28 border-b border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex">
        {/* Left Gutter */}
        <div className="hidden md:flex flex-col justify-between items-center pr-6 lg:pr-8 py-8 border-r border-neutral-200 select-none flex-shrink-0 w-14 lg:w-16">
          <span className="text-[11px] font-mono tracking-widest text-neutral-400 font-semibold">03</span>
          <span className="vertical-lr text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-medium hover:text-black transition-colors whitespace-nowrap">
            About Me
          </span>
          <span className="text-[11px] font-mono text-neutral-400">Bio</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pl-0 sm:pl-6 md:pl-10 lg:pl-12">
          <RevealOnScroll>
            <div className="mb-10 sm:mb-16">
              <p className="text-xs font-mono text-neutral-500 tracking-widest uppercase mb-2 sm:mb-3">About Me</p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-black tracking-tight leading-tight">
                Who I Am
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Bio Text */}
            <RevealOnScroll delayMs={60}>
              <div className="space-y-4 sm:space-y-5 text-neutral-700 text-sm sm:text-base leading-relaxed font-sans">
                <p>
                  I am <strong className="text-black font-semibold">Muhammad Rizal Abidin</strong>, a web developer with an interest in building websites and web-based information systems.
                </p>
                <p>
                  One of my projects is a digital archive platform for internship (PKL) records. Through this work, I gained experience translating requirements into practical features, organizing application data, and developing solutions around user needs.
                </p>
                <p>
                  I continue to improve my technical skills and explore better approaches to web development. My goal is to build applications that are functional, accessible, reliable, and straightforward to maintain.
                </p>
              </div>
            </RevealOnScroll>

            {/* Info Table */}
            <RevealOnScroll delayMs={120}>
              <div className="space-y-4 sm:space-y-5">
                <h3 className="text-xs font-mono text-neutral-500 tracking-widest uppercase">Quick Overview</h3>
                <div className="border border-neutral-200 divide-y divide-neutral-200 bg-white shadow-xs">
                  {[
                    { label: "Name", value: "Muhammad Rizal Abidin" },
                    { label: "Location", value: "Gresik, Indonesia" },
                    { label: "Focus", value: "Web Development" },
                    { label: "Featured Project", value: "PKL Digital Archive Platform" },
                    { label: "Languages", value: "English, Indonesian" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between px-3.5 sm:px-4 py-3 hover:bg-neutral-50 transition-colors gap-3"
                    >
                      <span className="text-[11px] sm:text-xs font-mono text-neutral-500 uppercase tracking-wider flex-shrink-0">
                        {row.label}
                      </span>
                      <span className="text-xs sm:text-sm text-black font-medium text-right font-sans">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Principles */}
          <RevealOnScroll delayMs={160}>
            <div className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-neutral-200">
              <h3 className="text-xs font-mono text-neutral-500 tracking-widest uppercase mb-6 sm:mb-8">
                My Working Principles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                {[
                  {
                    num: "01",
                    title: "Quality & Cleanliness",
                    desc: "I prioritize readable, well-organized code that is easier to understand, maintain, and extend as project requirements evolve.",
                  },
                  {
                    num: "02",
                    title: "Clear Communication",
                    desc: "I value clear communication throughout the development process, from discussing requirements and setting expectations to reviewing progress and final deliverables.",
                  },
                  {
                    num: "03",
                    title: "Continuous Learning",
                    desc: "I continuously develop my technical knowledge and explore relevant web technologies to improve the quality and effectiveness of my work.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="editorial-card space-y-3 p-5 sm:p-6 bg-white border border-neutral-200 hover:border-black shadow-xs"
                  >
                    <span className="text-[10px] font-mono text-neutral-400 block font-bold">
                      [{item.num}]
                    </span>
                    <h4 className="text-base font-heading font-bold text-black">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
