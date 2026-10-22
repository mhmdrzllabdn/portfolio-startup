"use client";

import React, { useState, useMemo } from "react";
import { Search, X, Layers, ExternalLink, List, Grid3X3 } from "lucide-react";
import { technologiesData } from "@/data/technologies";
import { Technology } from "@/types";
import TechMarquee from "./TechMarquee";
import RevealOnScroll from "./RevealOnScroll";

interface TechGroupSpec {
  index: string;
  name: string;
  purpose: string;
  category: string;
  items: Technology[];
}

export default function TechnologyStack() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"directory" | "grid">("directory");

  const categories = [
    { key: "all", label: "ALL" },
    { key: "frontend", label: "FRONTEND" },
    { key: "backend", label: "BACKEND" },
    { key: "database", label: "DATABASE" },
    { key: "tool", label: "TOOLS" },
  ];

  // 4 primary technology groups
  const groups: TechGroupSpec[] = useMemo(() => {
    const rawGroups: { name: string; purpose: string; category: string; matchCategory: string }[] = [
      {
        name: "Frontend Development",
        purpose: "Building responsive, structured, and interactive user interfaces using modern web standards.",
        category: "Frontend",
        matchCategory: "frontend",
      },
      {
        name: "Backend & Data Processing",
        purpose: "Developing server-side business logic, data validation, and REST API communication endpoints.",
        category: "Backend",
        matchCategory: "backend",
      },
      {
        name: "Relational Databases",
        purpose: "Structuring and persisting application datasets with strict relational integrity and reliability.",
        category: "Database",
        matchCategory: "database",
      },
      {
        name: "Tools & Developer Environment",
        purpose: "Managing source code revisions, team repository collaboration, and extensible code editor workflows.",
        category: "Tools",
        matchCategory: "tool",
      },
    ];

    return rawGroups.map((g, idx) => ({
      index: String(idx + 1).padStart(2, "0"),
      name: g.name,
      purpose: g.purpose,
      category: g.category,
      items: technologiesData.filter((t) => t.category === g.matchCategory),
    }));
  }, []);

  // Filtered list for search and category filter
  const filteredTechnologies = useMemo(() => {
    let list = technologiesData;

    if (selectedCategory !== "all") {
      list = list.filter((t) => t.category === selectedCategory);
    }

    const q = searchQuery.toLowerCase().trim();
    if (!q) return list;

    return list.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.group || "").toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q))
    );
  }, [searchQuery, selectedCategory]);

  return (
    <section id="stack" className="bg-[#FAFAFA] text-black border-b border-neutral-200 relative overflow-hidden py-16 sm:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex relative">
        {/* Left Vertical Editorial Gutter */}
        <div className="hidden md:flex flex-col justify-between items-center pr-6 lg:pr-8 py-8 border-r border-neutral-200 select-none flex-shrink-0 w-14 lg:w-16">
          <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
            07
          </div>
          <div className="vertical-lr text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-medium hover:text-black transition-colors whitespace-nowrap">
            Tech &amp; Tooling
          </div>
          <div className="text-[11px] font-mono text-neutral-400 font-semibold tracking-wider">
            STACK
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 pl-0 sm:pl-6 md:pl-10 lg:pl-12">
          <RevealOnScroll>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-neutral-200 mb-6 sm:mb-8">
              <div>
                <p className="text-xs font-mono text-neutral-500 tracking-widest uppercase mb-2 sm:mb-3">
                  Tech &amp; Tooling
                </p>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold text-black tracking-tight leading-tight">
                  Technologies &amp; Tools I Work With
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 max-w-xl mt-2 sm:mt-3 leading-relaxed font-sans">
                  Web technologies and engineering tools applied to architect structured, reliable, and user-centric digital experiences.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3 py-1.5 text-xs font-mono border transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                      selectedCategory === cat.key
                        ? "bg-black text-white border-black font-semibold shadow-xs"
                        : "bg-white text-neutral-600 border-neutral-200 hover:border-black"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Marquee Banner */}
          <div className="mb-6 sm:mb-8 -mx-4 sm:-mx-8 md:-mx-10 lg:-mx-12">
            <TechMarquee />
          </div>

          {/* Controls Bar: Search & View Mode Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-6 pt-1">
            {/* Search Input Bar */}
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technologies (e.g., HTML5, TypeScript, PostgreSQL, Git)..."
                className="w-full bg-white border border-neutral-200 focus:border-black pl-10 pr-9 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-[10px] font-mono text-neutral-400 uppercase hidden md:inline-block">
                VIEW:
              </span>
              <div className="flex items-center border border-neutral-200 bg-white p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("directory")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                    viewMode === "directory" && !searchQuery && selectedCategory === "all"
                      ? "bg-black text-white font-semibold"
                      : "text-neutral-600 hover:text-black"
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>DIRECTORY</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                    viewMode === "grid" || searchQuery || selectedCategory !== "all"
                      ? "bg-black text-white font-semibold"
                      : "text-neutral-600 hover:text-black"
                  }`}
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                  <span>GRID</span>
                </button>
              </div>
            </div>
          </div>

          {/* Directory View */}
          {viewMode === "directory" && !searchQuery && selectedCategory === "all" ? (
            <div className="border border-neutral-200 bg-white overflow-hidden shadow-xs">
              <div className="divide-y divide-neutral-200">
                {groups.map((g) => (
                  <div
                    key={g.index}
                    className="p-5 sm:p-6 hover:bg-neutral-50/70 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4 group"
                  >
                    {/* Index & Group Header */}
                    <div className="flex items-start sm:items-center gap-3 sm:gap-6 min-w-0 sm:min-w-[260px]">
                      <span className="font-mono text-xs text-neutral-400 font-bold flex-shrink-0">
                        [{g.index}]
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-heading font-extrabold text-sm sm:text-base text-black tracking-tight">
                            {g.name}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">
                          CATEGORY: {g.category}
                        </span>
                      </div>
                    </div>

                    {/* Technology Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 flex-1 max-w-xl">
                      {g.items.map((tech) => (
                        <a
                          key={tech.id}
                          href={tech.documentationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 hover:bg-black hover:text-white border border-neutral-200 text-xs font-mono text-neutral-800 transition-colors active:scale-95"
                        >
                          <span>{tech.name}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100" />
                        </a>
                      ))}
                    </div>

                    {/* English Description */}
                    <div className="lg:w-72 lg:text-right">
                      <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                        {g.purpose}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Searchable / Grid View */
            <div className="animate-fadeIn">
              {filteredTechnologies.length === 0 ? (
                <div className="p-8 sm:p-12 text-center border border-dashed border-neutral-300 bg-white my-4">
                  <Layers className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-black">
                    No technologies matched &ldquo;{searchQuery}&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="mt-4 px-4 py-2 bg-black text-white text-xs font-semibold tracking-wider hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer"
                  >
                    RESET SEARCH
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5">
                  {filteredTechnologies.map((tech) => (
                    <a
                      key={tech.id}
                      href={tech.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-card p-4 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-black flex flex-col justify-between group shadow-xs cursor-pointer active:scale-[0.99]"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-2">
                          <span className="uppercase font-semibold truncate pr-2">
                            {tech.group}
                          </span>
                          {tech.badge && (
                            <span className="bg-neutral-100 text-neutral-700 px-1.5 py-0.5 border border-neutral-200 text-[9px] font-mono font-bold">
                              {tech.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <h3 className="font-heading font-extrabold text-base text-black tracking-tight">
                            {tech.name}
                          </h3>
                          <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors" />
                        </div>
                      </div>

                      {tech.description && (
                        <p className="text-xs text-neutral-600 font-sans leading-relaxed mt-3 pt-3 border-t border-neutral-100">
                          {tech.description}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footnote */}
          <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-neutral-500">
            <span>FOCUSED ON FUNCTIONALITY, ARCHITECTURAL CLARITY, AND ACCESSIBILITY</span>
            <span className="text-neutral-400 text-[10px] uppercase font-semibold">
              CATEGORIES: FRONTEND · BACKEND · DATABASE · TOOLS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
