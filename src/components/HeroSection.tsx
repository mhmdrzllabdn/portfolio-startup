"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Clock, MapPin, Sparkles } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [timeString, setTimeString] = useState("");

  // Live WIB Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString("id-ID", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setTimeString(`${formatted} WIB`);
      } catch {
        setTimeString("WIB");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: xPct * 10, y: yPct * 10 });

    // Interactive spotlight coordinates
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    heroRef.current.style.setProperty("--mouse-x", `${mouseX}%`);
    heroRef.current.style.setProperty("--mouse-y", `${mouseY}%`);
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#FAFAFA] text-black pt-20 sm:pt-28 md:pt-32 border-b border-neutral-200 relative overflow-hidden group/hero"
    >
      {/* Interactive Soft Ambient Spotlight */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 group-hover/hero:opacity-100 transition-opacity duration-700 hidden md:block"
        style={{
          background: `radial-gradient(circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 0, 0, 0.025), transparent 70%)`,
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex relative">
        {/* Left Vertical Editorial Gutter */}
        <div className="hidden md:flex flex-col justify-between items-center pr-6 lg:pr-8 py-8 border-r border-neutral-200 select-none flex-shrink-0 w-14 lg:w-16">
          <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
            01
          </div>
          <div className="vertical-lr text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-medium hover:text-black transition-colors whitespace-nowrap">
            Web Developer
          </div>
          <div className="text-[11px] font-mono text-neutral-400 font-semibold tracking-wider">
            2026
          </div>
        </div>

        {/* Main Hero Body */}
        <div className="flex-1 min-w-0 pl-0 sm:pl-6 md:pl-10 lg:pl-12 pt-3 sm:pt-8 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col justify-between self-stretch pb-8 sm:pb-16 pt-2">
              <div>
                {/* Top Status Bar (Mobile & Desktop) */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-2 sm:gap-3 text-[11px] font-mono text-neutral-600 mb-6 pb-3 border-b border-neutral-200">
                  <span className="font-semibold text-neutral-700 tracking-wider uppercase">
                    WEB DEVELOPER // PORTFOLIO
                  </span>

                  <div className="flex items-center gap-3 text-neutral-500">
                    {timeString && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        <span>{timeString}</span>
                      </span>
                    )}
                    <span className="text-neutral-300">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      <span>GRESIK, INDONESIA</span>
                    </span>
                  </div>
                </div>

                {/* Big Headline */}
                <RevealOnScroll delayMs={60}>
                  <div className="mb-4 sm:mb-8">
                    <h1 className="hero-giant-title text-5xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[145px] font-normal text-neutral-950 tracking-[-0.04em] leading-[0.88] select-none">
                      Hello
                    </h1>
                  </div>
                </RevealOnScroll>

                {/* Subtitle / Description */}
                <RevealOnScroll delayMs={140}>
                  <div className="space-y-3 max-w-2xl mb-8 sm:mb-12 font-sans">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-700 font-normal leading-relaxed">
                      I am <strong className="font-semibold text-black">Muhammad Rizal Abidin</strong>, a web developer focused on building functional, well-structured, and user-friendly websites and digital systems.
                    </p>
                    <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-normal leading-relaxed">
                      I aim to create practical digital solutions that meet real needs, provide a clear user experience, and remain easy to maintain.
                    </p>
                  </div>
                </RevealOnScroll>

                {/* Mobile Quick Action Buttons */}
                <div className="flex sm:hidden flex-col gap-2.5 mb-8">
                  <a
                    href="#work"
                    className="inline-flex items-center justify-center gap-2 w-full bg-black text-white text-xs font-semibold py-3 px-4 transition-all active:scale-[0.98] shadow-xs"
                  >
                    <span>View Solutions</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 w-full bg-white border border-neutral-300 text-black text-xs font-semibold py-3 px-4 transition-all active:scale-[0.98]"
                  >
                    <span>Get In Touch</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Bottom CTA Desktop/Tablet Indicator */}
              <RevealOnScroll delayMs={200}>
                <div className="hidden sm:flex items-center justify-between pt-6 sm:pt-8 border-t border-neutral-200/80">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-800 hover:text-black tracking-wide group transition-colors"
                  >
                    <span>Scroll Down</span>
                    <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
                  </a>

                  <div className="flex items-center gap-4">
                    <a
                      href="#work"
                      className="text-xs font-medium text-neutral-600 hover:text-black transition-colors underline underline-offset-4 decoration-neutral-300 hover:decoration-black flex items-center gap-1"
                    >
                      <span>View Solutions</span>
                      <Sparkles className="w-3 h-3 text-neutral-400" />
                    </a>
                    <span className="text-neutral-300">•</span>
                    <a
                      href="#contact"
                      className="text-xs font-medium text-neutral-600 hover:text-black transition-colors underline underline-offset-4 decoration-neutral-300 hover:decoration-black"
                    >
                      Get In Touch
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right: Portrait Image */}
            <div className="lg:col-span-5 relative flex items-end justify-center self-end w-full">
              <RevealOnScroll delayMs={100} className="w-full">
                <div
                  style={{
                    transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                    transition: "transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)",
                  }}
                  className="relative w-full max-w-[280px] sm:max-w-[400px] lg:max-w-none mx-auto aspect-[3/4] flex items-end justify-center overflow-hidden group"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-neutral-200/40 via-transparent to-transparent pointer-events-none z-10"
                  />
                  <Image
                    src="/images/reza-portrait-editorial.jpg"
                    alt="Muhammad Rizal Abidin — Web Developer"
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 40vw"
                    className="object-contain object-bottom mix-blend-multiply filter contrast-105 group-hover:scale-[1.02] transition-all duration-700 ease-out select-none pointer-events-none"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-6 sm:h-10 bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none z-20" />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
