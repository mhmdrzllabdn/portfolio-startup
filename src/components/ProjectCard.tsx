"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Relative -0.5 to +0.5 from center
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;

    // 3D tilt angles (max ~8 degrees for subtle luxury)
    const rotateY = xPct * 10;
    const rotateX = -yPct * 10;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -6px, 12px)`
    );

    // CSS variables for mouse spotlight
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smooth reset
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)");
  };

  return (
    <article
      ref={cardRef}
      data-cursor="view"
      onClick={() => onSelect(project)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? "transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease"
          : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      className="group cursor-pointer flex flex-col bg-white hover:bg-neutral-50/80 border border-neutral-200 hover:border-black p-4 sm:p-5 text-left relative overflow-hidden preserve-3d shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Specular Radial Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 0, 0, 0.04), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Thumbnail Frame */}
      <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden border border-neutral-200 mb-5">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />

        {/* Hover corner crosshairs with smooth scaling */}
        <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-black/0 group-hover:border-black/70 group-hover:scale-110 transition-all duration-300" />
        <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-black/0 group-hover:border-black/70 group-hover:scale-110 transition-all duration-300" />
        <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-black/0 group-hover:border-black/70 group-hover:scale-110 transition-all duration-300" />
        <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-black/0 group-hover:border-black/70 group-hover:scale-110 transition-all duration-300" />

        {/* Category Pill floating tag on image */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono tracking-wider text-neutral-800 border border-neutral-200 uppercase font-semibold">
          {project.category.split(" ")[0]}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 justify-between space-y-3 relative z-10">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-1">
            <span className="truncate pr-2 uppercase font-medium">{project.category}</span>
            <span>{project.startDate?.split("-")[0] || project.endDate?.split("-")[0] || "2024"}</span>
          </div>

          <h3 className="font-heading font-extrabold text-lg sm:text-xl tracking-wider text-neutral-900 uppercase group-hover:text-black transition-colors flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black opacity-60 group-hover:opacity-100 transition-all duration-300" />
          </h3>

          <p className="text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* View Project Action Strip */}
        <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-semibold tracking-wider text-neutral-700 group-hover:text-black transition-colors">
          <span>EXPLORE ARCHITECTURE</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </div>
    </article>
  );
}
