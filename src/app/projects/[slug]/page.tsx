import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, CheckCircle2, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projectsData } from "@/data/projects";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = projectsData.map((project) => ({
    slug: project.slug,
  }));
  // Backwards compatibility alias so /projects/aureo-studio never 404s
  slugs.push({ slug: "aureo-studio" });
  return slugs;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  // Handle alias for aureo-studio -> github
  const project = projectsData.find(
    (p) => p.slug === slug || (slug === "aureo-studio" && p.slug === "github")
  );

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-[#FAFAFA] text-black min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-600 hover:text-black transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>BACK TO SELECTED WORKS</span>
            </Link>
          </div>

          {/* Project Header */}
          <div className="pb-10 border-b border-neutral-200">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-3">
              <span className="uppercase font-bold tracking-wider text-neutral-600">{project.category}</span>
              <span className="text-neutral-400 font-bold">·</span>
              <span className="font-bold">{project.year || project.startDate?.split("-")[0] || "2026"}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-black mb-6 tracking-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed font-sans">
              {project.description || project.summary}
            </p>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-neutral-300 hover:border-black px-6 py-3 text-xs font-semibold tracking-wider text-black hover:bg-neutral-100 transition-colors"
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
                  className="inline-flex items-center gap-2 bg-black text-white hover:bg-neutral-800 px-6 py-3 text-xs font-semibold tracking-wider transition-colors"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Large Hero Cover Frame */}
          <div className="relative w-full aspect-video sm:aspect-[21/9] bg-neutral-100 border border-neutral-200 my-12 overflow-hidden shadow-sm">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </div>

          {/* Grid: Case Study Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Problem & Solution */}
              <section className="space-y-6">
                <div>
                  <h2 className="text-xs font-mono font-bold text-neutral-500 mb-3 uppercase tracking-wider">
                    01 THE CHALLENGE
                  </h2>
                  <div className="p-6 bg-white border border-neutral-200 shadow-sm">
                    <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
                      {project.problem}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xs font-mono font-bold text-neutral-500 mb-3 uppercase tracking-wider">
                    02 THE APPROACH
                  </h2>
                  <div className="p-6 bg-white border border-neutral-200 shadow-sm">
                    <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
                      {project.solution}
                    </p>
                  </div>
                </div>
              </section>

              {/* Implementation Architecture */}
              {project.architectureDetails && (
                <section>
                  <h2 className="text-xs font-mono font-bold text-neutral-500 mb-4 uppercase tracking-wider">
                    IMPLEMENTATION &amp; KEY FEATURES
                  </h2>
                  <div className="space-y-3">
                    {project.architectureDetails.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border border-neutral-200 shadow-sm flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-neutral-700 leading-relaxed font-sans">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Measured Outcomes */}
              {project.keyAchievements && (
                <section>
                  <h2 className="text-xs font-mono font-bold text-neutral-500 mb-4 uppercase tracking-wider">
                    OUTCOME
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.keyAchievements.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 bg-white border border-neutral-200 shadow-sm flex flex-col justify-between"
                      >
                        <span className="font-mono text-xl text-black font-extrabold mb-3">
                          0{idx + 1}
                        </span>
                        <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Meta Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Role & Timeline Box */}
              <div className="p-6 bg-white border border-neutral-200 shadow-sm space-y-4">
                <h3 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">PROJECT METADATA</h3>
                <div>
                  <span className="block text-[11px] font-mono text-neutral-400 font-semibold uppercase">MY ROLE</span>
                  <span className="text-sm font-semibold text-black leading-relaxed block mt-0.5">
                    {project.role || "Software Developer"}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-mono text-neutral-400 font-semibold uppercase">TIMELINE</span>
                  <span className="text-sm font-mono text-neutral-800">
                    {project.year || "2026"}
                  </span>
                </div>
              </div>

              {/* Technologies List */}
              <div className="p-6 bg-white border border-neutral-200 shadow-sm">
                <h3 className="text-xs font-mono font-bold text-neutral-500 mb-4 flex items-center gap-2 uppercase tracking-wider">
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

              {/* Contact Callout */}
              <div className="p-6 bg-neutral-50 border border-neutral-200 shadow-sm">
                <h3 className="font-heading font-bold text-sm text-black uppercase mb-2">
                  CONNECT WITH ME
                </h3>
                <p className="text-xs text-neutral-600 mb-4 leading-relaxed font-sans">
                  Interested in discussing software development, version control, or open-source collaboration?
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center w-full bg-black text-white text-xs font-semibold tracking-wider py-3 hover:bg-neutral-800 transition-colors"
                >
                  START A CONVERSATION
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
