"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { num: "01", label: "About", href: "#about" },
    { num: "02", label: "Solutions", href: "#work" },
    { num: "03", label: "Services", href: "#capabilities" },
    { num: "04", label: "Workflow", href: "#process" },
    { num: "05", label: "Tech Stack", href: "#stack" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAFAFA]/95 backdrop-blur-md border-b border-neutral-200 py-3 shadow-xs"
          : "bg-[#FAFAFA] border-b border-neutral-200/80 py-4"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
        {/* Brand Text */}
        <Link
          href="/"
          className="flex flex-col group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
        >
          <span className="font-heading font-extrabold text-sm sm:text-base tracking-wider text-black leading-tight group-hover:opacity-75 transition-opacity uppercase">
            MUHAMMAD RIZAL ABIDIN
          </span>
          <span className="text-[10px] tracking-wider text-neutral-500 font-semibold uppercase leading-tight mt-0.5">
            Web Developer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold tracking-wider text-neutral-600 hover:text-black transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://github.com/mhmdrzllabdn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile of Muhammad Rizal Abidin"
            className="p-2 border border-neutral-300 hover:border-black text-neutral-700 hover:text-black transition-all hover:-translate-y-0.5"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-black bg-black text-white hover:bg-neutral-800 px-4 py-2 text-xs font-semibold tracking-wider transition-all hover:shadow-xs active:scale-[0.98] group"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-800 hover:text-black focus:outline-none active:scale-95 transition-transform"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 animate-fadeIn" /> : <Menu className="w-6 h-6 animate-fadeIn" />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 top-[57px] bg-black/25 backdrop-blur-xs z-40 animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Menu Panel */}
          <div className="lg:hidden fixed inset-x-0 top-[57px] bg-[#FAFAFA] border-b border-neutral-300 px-5 sm:px-8 py-6 shadow-xl z-50 animate-drawerSlideDown max-h-[calc(100vh-60px)] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-semibold">
              <span>NAVIGATION</span>
              <span>PORTFOLIO 2026</span>
            </div>

            <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-none text-sm font-semibold tracking-wide text-neutral-800 hover:text-black hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200 active:scale-[0.99]"
                >
                  <span className="font-heading">{link.label}</span>
                  <span className="text-[11px] font-mono text-neutral-400">[{link.num}]</span>
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-neutral-200 flex flex-col gap-2.5">
                <a
                  href="https://github.com/mhmdrzllabdn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full border border-neutral-300 bg-white text-xs font-semibold tracking-wider py-3 text-neutral-800 hover:text-black hover:border-black active:scale-[0.98] transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View GitHub</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full bg-black text-white text-xs font-semibold tracking-wider py-3.5 hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-xs"
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
