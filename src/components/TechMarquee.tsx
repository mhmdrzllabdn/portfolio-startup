"use client";

import React from "react";

const marqueeItems = [
  "HTML5",
  "CSS3",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "REACT.JS",
  "TAILWIND CSS",
  "BOOTSTRAP",
  "PHP",
  "NODE.JS",
  "REST API",
  "MYSQL",
  "POSTGRESQL",
  "GIT",
  "GITHUB",
  "VS CODE",
];

export default function TechMarquee() {
  return (
    <div className="w-full overflow-hidden border-y border-neutral-200 bg-neutral-100/50 py-2.5 sm:py-3.5 my-2 sm:my-4 relative select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-6 sm:gap-12 whitespace-nowrap text-[11px] sm:text-xs font-mono font-bold tracking-widest text-neutral-600">
        {marqueeItems.concat(marqueeItems).map((item, index) => (
          <div key={index} className="flex items-center gap-6 sm:gap-12">
            <span className="hover:text-black transition-colors">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
