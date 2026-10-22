"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ExternalLink, CheckCircle2, Layers } from "lucide-react";
import { GithubIcon } from "./Icons";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm transition-all"
    >
      {/* Backdrop click area */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-4xl max-h-[96vh] sm:max-h-[90vh] overflow-y-auto bg-white border-t sm:border border-neutral-200 shadow-2xl z-10 text-black flex flex-col rounded-t-xl sm:rounded-none">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-white/95 backdrop-blur-md border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600">
              {project.category}
            </span>
            <span className="text-neutral-400 font-bold">·</span>
            <span className="text-xs font-mono text-neutral-500 font-bold">
              {project.year || project.startDate?.split("-")[0] || "2026"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project modal"
            className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          {/* Cover Image Frame */}
          <div className="relative w-full aspect-video sm:aspect-[21/9] bg-neutral-100 border border-neutral-200 overflow-hidden">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 850px"
            />
          </div>

          {/* Title and Meta */}
          <div className="space-y-3">
            <h2
              id="modal-project-title"
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-black tracking-tight"
            >
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-sans">
              {project.description || project.summary}
            </p>
          </div>

          {/* Technologies Badges */}
          <div>
            <h3 className="text-xs font-mono text-neutral-500 mb-3 flex items-center gap-2 font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4 text-black" />
              <span>TECH STACK</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
            <div className="bg-neutral-50 p-5 border border-neutral-200">
              <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-500 uppercase mb-2">
                01 THE CHALLENGE
              </h4>
              <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>

            <div className="bg-neutral-50 p-5 border border-neutral-200">
              <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-500 uppercase mb-2">
                02 THE APPROACH
              </h4>
              <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Role */}
          {project.role && (
            <div className="p-4 bg-white border border-neutral-200">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                MY ROLE
              </span>
              <p className="text-sm text-neutral-800 font-sans leading-relaxed">
                {project.role}
              </p>
            </div>
          )}

          {/* Implementation & Key Features */}
          {project.architectureDetails && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                IMPLEMENTATION &amp; KEY FEATURES
              </h3>
              <ul className="space-y-2">
                {project.architectureDetails.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-700 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outcome */}
          {project.keyAchievements && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                OUTCOME
              </h3>
              <ul className="space-y-2">
                {project.keyAchievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-700 font-sans">
                    <span className="font-mono text-black font-bold text-xs">[{idx + 1}]</span>
                    <span className="text-neutral-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer / Actions */}
        <div className="sticky bottom-0 px-4 sm:px-6 py-3.5 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-neutral-300 hover:border-black px-4 py-2.5 text-xs font-semibold tracking-wider text-black hover:bg-neutral-100 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>VIEW SOURCE CODE</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white hover:bg-neutral-800 px-4 py-2.5 text-xs font-semibold tracking-wider transition-colors"
              >
                <span>LIVE DEMO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-neutral-700 hover:text-black transition-colors"
          >
            <span>FULL CASE STUDY</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
