"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FolderGit2, Database, Layout, ArrowUpRight, Sparkles } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import SolutionDetailModal, { SolutionDetail } from "./SolutionDetailModal";

const solutions: SolutionDetail[] = [
  {
    id: "digitalisasi-arsip",
    number: "01",
    title: "Archive Digitization",
    subtitle: "Archive & Document Systems",
    description:
      "I develop web-based archive solutions that help organize internship (PKL) records, simplify document management, and make information easier to access.",
    coverImage: "/images/arsip-beranda.png",
    concept:
      "Physical paper archives for internship activities are vulnerable to loss, damage, and time-consuming manual retrieval. A dedicated web system organizes documents within a single digital database.",
    approach:
      "Architected end-to-end archive management workflows from document classification, registration codes, and timestamps to instantaneous search.",
    features: [
      "Systematic classification of internship document categories",
      "Instant full-text search by registration ID and archive title",
      "Verification timestamp recording and document approval statuses",
      "Intuitive, clean interface designed for administrators and supervisors",
    ],
    systemHighlights: [
      { label: "Category", value: "Information Systems" },
      { label: "Database", value: "Relational (MySQL)" },
      { label: "Features", value: "Search & Filter" },
      { label: "Status", value: "Completed & Verified" },
    ],
  },
  {
    id: "pengelolaan-informasi",
    number: "02",
    title: "Information Architecture",
    subtitle: "Data Structure & User Flow",
    description:
      "I organize website structures, information, and user flows to help people navigate interfaces more easily and complete tasks efficiently.",
    coverImage: "/images/arsip-unggah.png",
    concept:
      "Unstructured information leads to data discrepancies and user confusion. Clean navigation hierarchy and consistent data models are the foundations of reliable systems.",
    approach:
      "Designed clean schemas and user flows enabling users to effortlessly scan summary metrics, validate entries, and navigate across modules.",
    features: [
      "Clean, responsive tabular data recaps and summaries",
      "Strict client-side and server-side input validation",
      "Intuitive navigation hierarchy and accessible interaction states",
      "Real-time document status lifecycles (Verified, Approved, Archived)",
    ],
    systemHighlights: [
      { label: "Focus", value: "Information Structure" },
      { label: "Interface", value: "Tables & Forms" },
      { label: "Workflow", value: "Input → Validation" },
      { label: "Integrity", value: "Strict Consistency" },
    ],
  },
  {
    id: "pengembangan-website",
    number: "03",
    title: "Web Engineering",
    subtitle: "Full-Stack Architecture & Project Structure",
    description:
      "I develop web applications by connecting frontend interfaces, backend services, and databases into a cohesive system. My work includes React, Express, Prisma ORM, and PostgreSQL, depending on project requirements.",
    coverImage: "/images/pkl-structure-setup.png",
    concept:
      "Institutional-grade web applications demand clean modularity: server-side decoupling, role-based route guards (RBAC), and bulletproof relational data integrity.",
    approach:
      "Engineered a decoupled Client-Server architecture, enforced JWT security and audit trail middleware on Express, and constructed 8 protected React interface pages.",
    features: [
      "Backend Architecture: Controllers, Routers, RBAC Middleware & Audit Logger",
      "Frontend Architecture: 8 Protected PKL Pages & Route Guards",
      "Database Management: 8-Entity Prisma Schema & Seed Scripts",
      "File Security: Sandboxed Multer PDF Storage & Anti-Hotlinking",
    ],
    systemHighlights: [
      { label: "Backend", value: "Node.js / Express" },
      { label: "Database", value: "PostgreSQL & Prisma" },
      { label: "Frontend", value: "React + Vite (RBAC)" },
      { label: "Security", value: "JWT, Bcrypt & Audit" },
    ],
  },
];

export default function FeaturedProjects() {
  const [selectedSolution, setSelectedSolution] = useState<SolutionDetail | null>(null);

  return (
    <section id="work" className="bg-[#FAFAFA] text-black py-16 sm:py-24 md:py-28 border-b border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex">
        {/* Left Gutter */}
        <div className="hidden md:flex flex-col justify-between items-center pr-6 lg:pr-8 py-8 border-r border-neutral-200 select-none flex-shrink-0 w-14 lg:w-16">
          <span className="text-[11px] font-mono tracking-widest text-neutral-400 font-semibold">02</span>
          <span className="vertical-lr text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-medium hover:text-black transition-colors whitespace-nowrap">
            Digital Solutions
          </span>
          <span className="text-[11px] font-mono text-neutral-400">3 Solutions</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pl-0 sm:pl-6 md:pl-10 lg:pl-12">
          {/* Section Header */}
          <RevealOnScroll>
            <div className="mb-10 sm:mb-16">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-3">
                <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
                  Solutions I Offer
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-neutral-200/80 text-neutral-800 px-2 py-0.5">
                  <Sparkles className="w-3 h-3 text-black" />
                  CLICK CARD FOR INTERACTIVE SIMULATION
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-black tracking-tight leading-tight">
                Digital Solutions for Real-World Needs
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-neutral-600 mt-3 sm:mt-4 max-w-3xl leading-relaxed font-sans">
                I develop websites and digital systems that help organize information, simplify everyday processes, and support practical needs. My experience developing a digital archive platform for internship (PKL) records has strengthened my interest in creating reliable and well-organized web solutions.
              </p>
            </div>
          </RevealOnScroll>

          {/* 3 Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {solutions.map((item, idx) => (
              <RevealOnScroll key={item.id} delayMs={idx * 80}>
                <div
                  onClick={() => setSelectedSolution(item)}
                  className="editorial-card bg-white border border-neutral-200 hover:border-black flex flex-col justify-between h-full group shadow-xs cursor-pointer active:scale-[0.99] relative overflow-hidden"
                >
                  {/* Image Frame with Zoom Effect */}
                  <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden border-b border-neutral-200">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-mono text-black font-bold border border-neutral-200 shadow-xs">
                      {item.number}
                    </div>

                    <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 text-[10px] font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-md">
                      <span>OPEN SIMULATION</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <span className="uppercase tracking-wider">{item.subtitle}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-black tracking-tight group-hover:underline decoration-neutral-300 underline-offset-4">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans pt-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 sm:pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                      <span className="text-neutral-400">STRUCTURED &amp; FUNCTIONAL</span>
                      <span className="font-bold text-black group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 text-[10px] sm:text-[11px]">
                        EXPLORE SOLUTION DETAILS →
                      </span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Detail & Simulation Modal */}
      <SolutionDetailModal
        solution={selectedSolution}
        onClose={() => setSelectedSolution(null)}
      />
    </section>
  );
}
