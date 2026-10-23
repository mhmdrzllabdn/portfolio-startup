"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  CheckCircle2,
  ExternalLink,
  Search,
  FileText,
  Clock,
  Sparkles,
  ArrowUpRight,
  FolderTree,
  Terminal,
  Server,
  Code2,
  Database,
  Smartphone,
  Tablet,
  Monitor,
  Copy,
  Check,
} from "lucide-react";

export interface SolutionDetail {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  concept: string;
  approach: string;
  features: string[];
  systemHighlights: { label: string; value: string }[];
}

interface SolutionDetailModalProps {
  solution: SolutionDetail | null;
  onClose: () => void;
}

// Sample dataset for PKL archive simulator (Solutions 01 & 02)
const sampleArchives = [
  {
    id: "ARS-2026-001",
    title: "Official Internship Application Letter",
    category: "Incoming Letters",
    date: "14 Feb 2026",
    size: "420 KB",
    status: "Verified",
    summary: "Official application letter for vocational internship placement.",
  },
  {
    id: "ARS-2026-002",
    title: "Final Internship Project Report",
    category: "Internship Reports",
    date: "28 Feb 2026",
    size: "2.8 MB",
    status: "Archived",
    summary: "Comprehensive technical report documenting system engineering achievements during internship.",
  },
  {
    id: "ARS-2026-003",
    title: "Performance Evaluation & Score Sheet",
    category: "Evaluation & Certificates",
    date: "02 Mar 2026",
    size: "310 KB",
    status: "Approved",
    summary: "Formal evaluation sheet measuring technical competencies, discipline, and milestones.",
  },
  {
    id: "ARS-2026-004",
    title: "Certificate of Internship Completion",
    category: "Evaluation & Certificates",
    date: "05 Mar 2026",
    size: "890 KB",
    status: "Issued",
    summary: "Official digital certificate with unique serial verification code.",
  },
  {
    id: "ARS-2026-005",
    title: "Recommendation & Acknowledgement Letter",
    category: "Incoming Letters",
    date: "10 Mar 2026",
    size: "350 KB",
    status: "Archived",
    summary: "Formal appreciation letter from partner institution recognizing digital archiving contributions.",
  },
];

// 1. BACKEND STRUCTURE DATA (Matching README specifications)
const backendStructureData = [
  {
    category: "prisma/",
    badge: "DATABASE ORM",
    items: [
      {
        path: "backend/prisma/schema.prisma",
        name: "schema.prisma",
        role: "Database Modeling",
        desc: "8 Complete Database Entities matching ERD (User, Report, Department, Class, FileMetadata, Comment, DownloadHistory, AuditLog).",
        highlight: "Full PostgreSQL relational model with Role ENUM (5 roles) & ReportStatus (PENDING, APPROVED, REJECTED).",
      },
      {
        path: "backend/prisma/seed.js",
        name: "seed.js",
        role: "Database Seeding",
        desc: "Seed dataset provisioning 4 Departments, 10 Classes, & 5 User Roles for an instant testing sandbox.",
        highlight: "Injects demo accounts for admin, supervisor, active student, alumni, and institution auditor.",
      },
    ],
  },
  {
    category: "src/config/",
    badge: "CONFIG & LIFECYCLE",
    items: [
      {
        path: "backend/src/config/database.js",
        name: "database.js",
        role: "Prisma Client Connection",
        desc: "Prisma Client instance initialization & PostgreSQL connection pooling manager.",
        highlight: "Guarantees stable connection lifecycle with graceful shutdown hooks upon server termination.",
      },
    ],
  },
  {
    category: "src/controllers/",
    badge: "REST CONTROLLERS",
    items: [
      {
        path: "backend/src/controllers/auth.controller.js",
        name: "auth.controller.js",
        role: "Authentication & Profile",
        desc: "Login, Registration, Profile, Password Changes secured with Bcrypt hashing.",
        highlight: "Generates JWT Tokens with embedded role payload for frontend authorization.",
      },
      {
        path: "backend/src/controllers/report.controller.js",
        name: "report.controller.js",
        role: "Internship Report Management",
        desc: "Report CRUD, Faceted Filtering, Teacher Academic Reviews, & Download Tracker.",
        highlight: "Status transitions PENDING -> APPROVED or REJECTED with structured feedback logs.",
      },
      {
        path: "backend/src/controllers/user.controller.js",
        name: "user.controller.js",
        role: "User Management",
        desc: "User administration, account activation, and role mutation secured for Admins.",
        highlight: "Protected against self-lockout so admins cannot remove their own administrator access.",
      },
      {
        path: "backend/src/controllers/master.controller.js",
        name: "master.controller.js",
        role: "Master Data & Analytics",
        desc: "Department & class management, dashboard telemetry metrics, and Audit Log recording.",
        highlight: "Guarantees referential integrity so academic records cannot be pruned while active reports exist.",
      },
    ],
  },
  {
    category: "src/middlewares/",
    badge: "SECURITY GUARDS",
    items: [
      {
        path: "backend/src/middlewares/auth.middleware.js",
        name: "auth.middleware.js",
        role: "JWT & RBAC Guard",
        desc: "Bearer Token verification & Role-Based Access Control (RBAC) authorization guards.",
        highlight: "Blocks unauthorized access to private endpoints if credentials do not match permitted roles.",
      },
      {
        path: "backend/src/middlewares/audit.middleware.js",
        name: "audit.middleware.js",
        role: "Audit Trail Logger",
        desc: "Automatic audit trail capturing all critical data mutations into the audit_logs table.",
        highlight: "Transparently logs old_values, new_values, user_id, IP address, and timestamps.",
      },
      {
        path: "backend/src/middlewares/upload.middleware.js",
        name: "upload.middleware.js",
        role: "File Security & Sanitization",
        desc: "Multer PDF-only filtering, unique filename sanitization, & executable script blocking.",
        highlight: "Enforces strict MIME-type validation (application/pdf) and maximum file size limits.",
      },
    ],
  },
  {
    category: "src/routes/ & Core",
    badge: "SERVER CORE",
    items: [
      {
        path: "backend/src/routes/*.routes.js",
        name: "auth.routes, report.routes, user.routes, master.routes",
        role: "API Routing",
        desc: "REST API route mapping binding controllers and security guard middlewares.",
        highlight: "Clean RESTful URL topology: /api/auth, /api/reports, /api/users, /api/master.",
      },
      {
        path: "backend/server.js",
        name: "server.js",
        role: "Express Server Entrypoint",
        desc: "Express application bootstrapping with Helmet security headers, CORS, and Rate Limiting.",
        highlight: "Mitigates brute-force attacks, DDoS attempts, and malicious header injections.",
      },
      {
        path: "uploads/",
        name: "uploads/ (Protected Storage)",
        role: "Isolated File Storage",
        desc: "PDF file storage outside the public web root (Protected Static Storage).",
        highlight: "Files are only accessible through authorized download endpoints to prevent hotlinking.",
      },
    ],
  },
];

// 2. FRONTEND STRUCTURE DATA (Matching README specifications)
const frontendStructureData = [
  {
    category: "src/components/",
    badge: "REUSABLE UI & RBAC GUARDS",
    items: [
      {
        path: "frontend/src/components/Navbar.jsx",
        name: "Navbar.jsx",
        role: "Role-Based Navigation",
        desc: "Dynamic navigation driven by RBAC permissions (menus dynamically adapt to active role).",
        highlight: "Displays review portals only for Teachers, and Admin Panels only for Administrators.",
      },
      {
        path: "frontend/src/components/Footer.jsx",
        name: "Footer.jsx",
        role: "Institutional Info",
        desc: "Security disclosures, PRD specifications, and digital repository compliance status.",
        highlight: "Ensures transparency around data privacy and academic archiving standards.",
      },
      {
        path: "frontend/src/components/ReportCard.jsx",
        name: "ReportCard.jsx",
        role: "Catalog Card",
        desc: "Report catalog card with rich metadata (Title, Author, Department, Class, & Date).",
        highlight: "Equipped with document preview thumbnail, status badge, and detail action triggers.",
      },
      {
        path: "frontend/src/components/StatusBadge.jsx",
        name: "StatusBadge.jsx",
        role: "Report Visual Status",
        desc: "Interactive visual status badges: Pending (PENDING), Approved (APPROVED), Rejected (REJECTED).",
        highlight: "Intuitive icons and colors so students immediately understand review outcomes.",
      },
      {
        path: "frontend/src/components/RoleBadge.jsx",
        name: "RoleBadge.jsx",
        role: "User Role Identity",
        desc: "5 User Role Badges: Student, Alumni, Teacher Supervisor, Public Viewer, and Administrator.",
        highlight: "Provides clear role identification throughout the entire application.",
      },
      {
        path: "frontend/src/components/ProtectedRoute.jsx",
        name: "ProtectedRoute.jsx",
        role: "Client Route Guard",
        desc: "Client-side authentication and authorization guards powered by JWT verification.",
        highlight: "Automatically redirects unauthenticated or unauthorized users to safe routes.",
      },
    ],
  },
  {
    category: "src/context/",
    badge: "STATE MANAGEMENT",
    items: [
      {
        path: "frontend/src/context/AuthContext.jsx",
        name: "AuthContext.jsx",
        role: "Centralized Auth State",
        desc: "Auth state management, JWT token persistence, user profiles, and session synchronization.",
        highlight: "Supports one-click 5-role demo login and automatic session expiration handling.",
      },
    ],
  },
  {
    category: "src/pages/",
    badge: "PAGES & PORTALS",
    items: [
      {
        path: "frontend/src/pages/HomePage.jsx",
        name: "HomePage.jsx",
        role: "Main Catalog",
        desc: "Primary repository catalog with multi-facet search (Department, Class, Graduation Year, Company).",
        highlight: "Instant responsive search with pagination and archive telemetry summaries.",
      },
      {
        path: "frontend/src/pages/ReportDetailPage.jsx",
        name: "ReportDetailPage.jsx",
        role: "Detail & Download Tracker",
        desc: "PDF document preview, revision and comment history, & download telemetry tracking.",
        highlight: "Captures IP address and user-agent metadata on official document download events.",
      },
      {
        path: "frontend/src/pages/LoginPage.jsx",
        name: "LoginPage.jsx",
        role: "Auth Portal",
        desc: "Login form equipped with One-Click 5-Role Demo buttons for evaluator convenience.",
        highlight: "Enables fast feature evaluation without typing test credentials manually.",
      },
      {
        path: "frontend/src/pages/RegisterPage.jsx",
        name: "RegisterPage.jsx",
        role: "Student & Alumni Registration",
        desc: "Registration for students, alumni, and reviewers with student ID verification.",
        highlight: "Duplicate registration prevention and institutional identity validation.",
      },
      {
        path: "frontend/src/pages/UploadReportPage.jsx",
        name: "UploadReportPage.jsx",
        role: "Report Upload",
        desc: "Drag-and-drop PDF report upload form with company and internship metadata.",
        highlight: "Automatic PDF extension checks and pre-upload file size calculations.",
      },
      {
        path: "frontend/src/pages/MyReportsPage.jsx",
        name: "MyReportsPage.jsx",
        role: "Student Portal",
        desc: "Personal report management and supervisor revision history tracking.",
        highlight: "Students can upload revised drafts and review specific supervisor feedback.",
      },
      {
        path: "frontend/src/pages/TeacherReviewPage.jsx",
        name: "TeacherReviewPage.jsx",
        role: "Teacher Supervisor Portal",
        desc: "Academic review portal for supervisors: Approve, Reject, and provide revision notes.",
        highlight: "Optimized review interface with quick filters for PENDING reports.",
      },
      {
        path: "frontend/src/pages/AdminDashboardPage.jsx",
        name: "AdminDashboardPage.jsx",
        role: "Administrator Panel",
        desc: "User administration, academic master data management, & system audit log observer.",
        highlight: "Real-time charts tracking report volumes, download counts, and data mutations.",
      },
    ],
  },
  {
    category: "src/services/ & Root",
    badge: "SERVICES & BUNDLER",
    items: [
      {
        path: "frontend/src/services/api.js",
        name: "api.js",
        role: "Axios Client & Interceptor",
        desc: "Configured Axios client with automatic Bearer token injection and 401 error handlers.",
        highlight: "Ensures every REST API request is authenticated without boilerplate.",
      },
      {
        path: "frontend/vite.config.js",
        name: "vite.config.js",
        role: "Vite Bundler Config",
        desc: "Reverse proxy to Express backend on port 5000 to eliminate browser CORS barriers.",
        highlight: "Seamless developer experience with lightning-fast Hot Module Replacement (HMR).",
      },
    ],
  },
];

// 3. RUN GUIDE & DATABASE SETUP DATA
const setupGuideData = [
  {
    step: "01",
    title: "PostgreSQL Database Setup",
    desc: "Configuring local relational PostgreSQL instance and environment credentials.",
    commands: [
      {
        label: "Create Database",
        cmd: "CREATE DATABASE pkl_archive_db;",
        note: "Execute via psql CLI, pgAdmin, or TablePlus.",
      },
      {
        label: "Configure backend/.env",
        cmd: 'DATABASE_URL="postgresql://postgres:password@localhost:5432/pkl_archive_db?schema=public"\nPORT=5000\nJWT_SECRET="pkl_archive_secret_key_2026"',
        note: "Update with your local PostgreSQL credentials.",
      },
    ],
  },
  {
    step: "02",
    title: "Backend Initialization (Migration & Seeding)",
    desc: "Synchronizing 8-entity Prisma schema with database and injecting initial seed callsets.",
    commands: [
      {
        label: "Navigate to Backend & Sync Schema",
        cmd: "cd backend\nnpx prisma db push",
        note: "Automatically provisions 8 relational tables, enums, and foreign key constraints.",
      },
      {
        label: "Inject Seed Data",
        cmd: "node prisma/seed.js",
        note: "Creates 4 Departments, 10 Classes, and 5 Default Role accounts for testing.",
      },
      {
        label: "Start API Server",
        cmd: "npm run dev",
        note: "REST API server active on http://localhost:5000 with live request logging.",
      },
    ],
  },
  {
    step: "03",
    title: "Frontend Initialization (Vite Client)",
    desc: "Launching React.js client interface with proxy integration to Express backend.",
    commands: [
      {
        label: "Navigate to Frontend & Start",
        cmd: "cd frontend\nnpm run dev",
        note: "Dev server ready at http://localhost:5173 with Hot Module Replacement (HMR).",
      },
    ],
  },
  {
    step: "04",
    title: "Concurrent Execution (One-Command Dev)",
    desc: "Streamlined workflow to spin up backend and frontend concurrently from project root.",
    commands: [
      {
        label: "Start All from Root",
        cmd: "npm run dev",
        note: "Concurrently launches: Backend (Port 5000) and Frontend (Port 5173).",
      },
    ],
  },
];

export default function SolutionDetailModal({ solution, onClose }: SolutionDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "interactive">("overview");

  // Archive Simulator State (for Solutions 01 & 02)
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedDoc, setSelectedDoc] = useState(sampleArchives[0]);

  // Web Development Architecture State (for Solution 03)
  const [webDevSubTab, setWebDevSubTab] = useState<"backend" | "frontend" | "setup" | "responsive">("backend");
  const [selectedBackendFile, setSelectedBackendFile] = useState(backendStructureData[0].items[0]);
  const [selectedFrontendFile, setSelectedFrontendFile] = useState(frontendStructureData[0].items[0]);
  const [treeSearch, setTreeSearch] = useState("");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // Responsive Viewport State
  const [previewViewport, setPreviewViewport] = useState<"mobile" | "tablet" | "desktop">("desktop");

  const isWebDev = solution?.id === "pengembangan-website";
  const [activeCoverImage, setActiveCoverImage] = useState<string | null>(null);

  useEffect(() => {
    if (solution) {
      setActiveCoverImage(solution.coverImage);
    }
  }, [solution]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (solution) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [solution, onClose]);

  if (!solution) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const filteredArchives = sampleArchives.filter((doc) => {
    const matchesCat = categoryFilter === "All" || doc.category === categoryFilter;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-solution-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm transition-all"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div className="relative w-full max-w-5xl max-h-[100vh] sm:max-h-[92vh] overflow-y-auto bg-white border border-neutral-300 shadow-2xl z-10 text-black flex flex-col animate-fadeIn rounded-t-xl sm:rounded-none">
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 bg-white/95 backdrop-blur-md border-b border-neutral-200">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">
              {solution.number}
            </span>
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider font-semibold truncate">
              {solution.subtitle}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal window"
            className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-neutral-200 bg-neutral-50 px-4 sm:px-8">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-mono font-bold tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "overview"
                ? "border-black text-black bg-white"
                : "border-transparent text-neutral-500 hover:text-black"
            }`}
          >
            OVERVIEW &amp; SPECIFICATIONS
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("interactive")}
            className={`py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-mono font-bold tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "interactive"
                ? "border-black text-black bg-white"
                : "border-transparent text-neutral-500 hover:text-black"
            }`}
          >
            {isWebDev ? "PROJECT STRUCTURE & RUN GUIDE" : "INTERACTIVE SIMULATION"}
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1">
          {activeTab === "overview" ? (
            <>
              {/* Cover Image Frame */}
              <div className="space-y-2">
                <div className="relative w-full aspect-[16/8] sm:aspect-[21/9] bg-neutral-950 border border-neutral-200 overflow-hidden shadow-xs">
                  <Image
                    src={activeCoverImage || solution.coverImage}
                    alt={solution.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 950px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 sm:left-6 text-white font-mono text-xs flex items-center gap-2">
                    <span className="bg-black/80 backdrop-blur-sm px-2.5 py-1 uppercase tracking-wider border border-white/20">
                      {solution.title}
                    </span>
                    {isWebDev && (
                      <span className="bg-black/80 text-white px-2 py-1 text-[10px] font-bold border border-white/20">
                        PROJECT README DOCUMENT
                      </span>
                    )}
                  </div>
                </div>

                {/* Screenshot Switcher for Solution 03 */}
                {isWebDev && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-mono text-neutral-500 font-semibold">
                      SCREENSHOTS:
                    </span>
                    {[
                      {
                        label: "Figure 3 (Execution Guide)",
                        src: "/images/pkl-structure-setup.png",
                      },
                      {
                        label: "Figure 1 (Frontend Architecture)",
                        src: "/images/pkl-structure-frontend.png",
                      },
                      {
                        label: "Figure 2 (Backend Architecture)",
                        src: "/images/pkl-structure-backend.png",
                      },
                    ].map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveCoverImage(img.src)}
                        className={`px-2.5 py-1 text-[11px] font-mono border transition-all cursor-pointer ${
                          (activeCoverImage || solution.coverImage) === img.src
                            ? "bg-black text-white border-black font-bold"
                            : "bg-white text-neutral-600 border-neutral-200 hover:border-black"
                        }`}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Core Summary */}
              <div className="space-y-3">
                <h2
                  id="modal-solution-title"
                  className="text-2xl sm:text-3xl font-heading font-extrabold text-black tracking-tight"
                >
                  {solution.title}
                </h2>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
                  {solution.description}
                </p>
              </div>

              {/* Concept & Approach Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="p-5 bg-neutral-50 border border-neutral-200 space-y-2">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-500 uppercase">
                    01 BACKGROUND &amp; CONTEXT
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                    {solution.concept}
                  </p>
                </div>

                <div className="p-5 bg-neutral-50 border border-neutral-200 space-y-2">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-500 uppercase">
                    02 ARCHITECTURAL APPROACH
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                    {solution.approach}
                  </p>
                </div>
              </div>

              {/* Key Features Breakdown */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest">
                  CORE IMPLEMENTATION POINTS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {solution.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white border border-neutral-200 flex items-start gap-3 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-neutral-900 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-neutral-800 font-sans font-medium">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Highlights Table */}
              <div className="p-4 sm:p-5 bg-white border border-neutral-200 space-y-3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                  SYSTEM SPECIFICATIONS
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  {solution.systemHighlights.map((sh, idx) => (
                    <div key={idx} className="border-l border-neutral-200 pl-3">
                      <span className="text-neutral-400 block text-[10px] uppercase font-bold">{sh.label}</span>
                      <span className="text-black font-semibold text-xs mt-0.5 block">{sh.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Interactive Simulation Tab */
            <div className="space-y-6 animate-fadeIn">
              {isWebDev ? (
                /* 3-PART ARCHITECTURE & DIRECTORY EXPLORER FOR WEB ENGINEERING */
                <div className="space-y-5">
                  {/* Sub-tab Switcher: Backend / Frontend / Database Setup / Responsive */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                        REAL-WORLD PROJECT ARCHITECTURE &amp; SPECS
                      </span>
                      <h3 className="text-lg font-heading font-extrabold text-black mt-0.5">
                        Architecture of PKL Archive Management System
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono bg-neutral-100 p-1 border border-neutral-200 overflow-x-auto no-scrollbar max-w-full">
                      <button
                        type="button"
                        onClick={() => setWebDevSubTab("backend")}
                        className={`px-2.5 sm:px-3 py-1.5 font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                          webDevSubTab === "backend"
                            ? "bg-black text-white shadow-xs"
                            : "text-neutral-600 hover:text-black hover:bg-neutral-200/60"
                        }`}
                      >
                        <Server className="w-3.5 h-3.5" />
                        <span>1. BACKEND</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setWebDevSubTab("frontend")}
                        className={`px-2.5 sm:px-3 py-1.5 font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                          webDevSubTab === "frontend"
                            ? "bg-black text-white shadow-xs"
                            : "text-neutral-600 hover:text-black hover:bg-neutral-200/60"
                        }`}
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>2. FRONTEND</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setWebDevSubTab("setup")}
                        className={`px-2.5 sm:px-3 py-1.5 font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                          webDevSubTab === "setup"
                            ? "bg-black text-white shadow-xs"
                            : "text-neutral-600 hover:text-black hover:bg-neutral-200/60"
                        }`}
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>3. SETUP &amp; DATABASE</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setWebDevSubTab("responsive")}
                        className={`px-2.5 sm:px-3 py-1.5 font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                          webDevSubTab === "responsive"
                            ? "bg-black text-white shadow-xs"
                            : "text-neutral-600 hover:text-black hover:bg-neutral-200/60"
                        }`}
                      >
                        <Monitor className="w-3.5 h-3.5" />
                        <span>RESPONSIVE</span>
                      </button>
                    </div>
                  </div>

                  {/* Sub-tab 1: Backend Structure */}
                  {webDevSubTab === "backend" && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="p-3 bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                        <div className="flex flex-wrap items-center gap-2">
                          <FolderTree className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                          <span className="font-bold text-black">BACKEND DIRECTORY:</span>
                          <span className="text-neutral-500">Node.js + Express.js + Prisma ORM + PostgreSQL</span>
                        </div>
                        <span className="text-[10px] bg-neutral-200 px-2 py-0.5 text-neutral-800 font-semibold self-start sm:self-auto">
                          CLICK FILE FOR DETAILED SPECS
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                        {/* Tree List (7 Cols) */}
                        <div className="md:col-span-7 space-y-3">
                          {backendStructureData.map((group, gIdx) => (
                            <div key={gIdx} className="border border-neutral-200 bg-white">
                              <div className="bg-neutral-100 px-3 py-1.5 border-b border-neutral-200 flex items-center justify-between text-[11px] font-mono">
                                <span className="font-bold text-neutral-700 flex items-center gap-1.5">
                                  <FolderTree className="w-3.5 h-3.5 text-neutral-500" />
                                  {group.category}
                                </span>
                                <span className="text-[9px] bg-white px-1.5 py-0.5 border border-neutral-300 text-neutral-600">
                                  {group.badge}
                                </span>
                              </div>
                              <div className="divide-y divide-neutral-100">
                                {group.items.map((file, fIdx) => (
                                  <button
                                    key={fIdx}
                                    type="button"
                                    onClick={() => setSelectedBackendFile(file)}
                                    className={`w-full text-left p-3 text-xs font-mono transition-all flex items-start gap-2.5 cursor-pointer ${
                                      selectedBackendFile.path === file.path
                                        ? "bg-neutral-100 border-l-3 border-l-black font-semibold text-black"
                                        : "hover:bg-neutral-50 text-neutral-700"
                                    }`}
                                  >
                                    <FileText className="w-3.5 h-3.5 text-neutral-400 mt-0.5 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center justify-between">
                                        <span className="font-bold truncate">{file.name}</span>
                                        <span className="text-[9px] text-neutral-400 ml-2 uppercase">
                                          {file.role}
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-neutral-500 font-sans mt-0.5 line-clamp-1">
                                        {file.desc}
                                      </p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Selected File Details Inspector (5 Cols) */}
                        <div className="md:col-span-5 p-5 bg-neutral-50 border border-neutral-200 space-y-4 shadow-xs sticky top-20">
                          <div className="flex items-center justify-between pb-2 border-b border-neutral-200 text-[10px] font-mono">
                            <span className="text-neutral-500">BACKEND FILE INSPECTOR</span>
                            <span className="bg-neutral-200 text-neutral-800 px-2 py-0.5 font-bold uppercase">
                              {selectedBackendFile.role}
                            </span>
                          </div>

                          <div>
                            <span className="text-[11px] font-mono text-neutral-400 block truncate">
                              {selectedBackendFile.path}
                            </span>
                            <h4 className="font-mono font-extrabold text-base text-black mt-1">
                              {selectedBackendFile.name}
                            </h4>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">
                              Responsibility Description:
                            </span>
                            <p className="text-xs text-neutral-700 font-sans leading-relaxed bg-white p-3 border border-neutral-200">
                              {selectedBackendFile.desc}
                            </p>
                          </div>

                          <div className="space-y-1.5 pt-2 border-t border-neutral-200">
                            <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">
                              Architectural &amp; Security Aspect:
                            </span>
                            <p className="text-xs text-neutral-800 bg-neutral-100 p-3 border border-neutral-200 font-sans leading-relaxed">
                              {selectedBackendFile.highlight}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-tab 2: Frontend Structure */}
                  {webDevSubTab === "frontend" && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="p-3 bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                        <div className="flex flex-wrap items-center gap-2">
                          <FolderTree className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                          <span className="font-bold text-black">FRONTEND DIRECTORY:</span>
                          <span className="text-neutral-500">React 18 + Vite SPA + Context API + Axios Interceptor</span>
                        </div>
                        <span className="text-[10px] bg-neutral-200 px-2 py-0.5 text-neutral-800 font-semibold self-start sm:self-auto">
                          CLICK FILE FOR DETAILED SPECS
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                        {/* Tree List (7 Cols) */}
                        <div className="md:col-span-7 space-y-3">
                          {frontendStructureData.map((group, gIdx) => (
                            <div key={gIdx} className="border border-neutral-200 bg-white">
                              <div className="bg-neutral-100 px-3 py-1.5 border-b border-neutral-200 flex items-center justify-between text-[11px] font-mono">
                                <span className="font-bold text-neutral-700 flex items-center gap-1.5">
                                  <FolderTree className="w-3.5 h-3.5 text-neutral-500" />
                                  {group.category}
                                </span>
                                <span className="text-[9px] bg-white px-1.5 py-0.5 border border-neutral-300 text-neutral-600">
                                  {group.badge}
                                </span>
                              </div>
                              <div className="divide-y divide-neutral-100">
                                {group.items.map((file, fIdx) => (
                                  <button
                                    key={fIdx}
                                    type="button"
                                    onClick={() => setSelectedFrontendFile(file)}
                                    className={`w-full text-left p-3 text-xs font-mono transition-all flex items-start gap-2.5 cursor-pointer ${
                                      selectedFrontendFile.path === file.path
                                        ? "bg-neutral-100 border-l-3 border-l-black font-semibold text-black"
                                        : "hover:bg-neutral-50 text-neutral-700"
                                    }`}
                                  >
                                    <FileText className="w-3.5 h-3.5 text-neutral-400 mt-0.5 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center justify-between">
                                        <span className="font-bold truncate">{file.name}</span>
                                        <span className="text-[9px] text-neutral-400 ml-2 uppercase">
                                          {file.role}
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-neutral-500 font-sans mt-0.5 line-clamp-1">
                                        {file.desc}
                                      </p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Selected File Details Inspector (5 Cols) */}
                        <div className="md:col-span-5 p-5 bg-neutral-50 border border-neutral-200 space-y-4 shadow-xs sticky top-20">
                          <div className="flex items-center justify-between pb-2 border-b border-neutral-200 text-[10px] font-mono">
                            <span className="text-neutral-500">FRONTEND FILE INSPECTOR</span>
                            <span className="bg-sky-100 text-sky-800 px-2 py-0.5 font-bold uppercase">
                              {selectedFrontendFile.role}
                            </span>
                          </div>

                          <div>
                            <span className="text-[11px] font-mono text-neutral-400 block truncate">
                              {selectedFrontendFile.path}
                            </span>
                            <h4 className="font-mono font-extrabold text-base text-black mt-1">
                              {selectedFrontendFile.name}
                            </h4>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">
                              Responsibility Description:
                            </span>
                            <p className="text-xs text-neutral-700 font-sans leading-relaxed bg-white p-3 border border-neutral-200">
                              {selectedFrontendFile.desc}
                            </p>
                          </div>

                          <div className="space-y-1.5 pt-2 border-t border-neutral-200">
                            <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">
                              Application in User Workflow:
                            </span>
                            <p className="text-xs text-sky-950 bg-sky-50/80 p-3 border border-sky-200 font-sans leading-relaxed">
                              {selectedFrontendFile.highlight}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-tab 3: Database & Setup Guide */}
                  {webDevSubTab === "setup" && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="p-3.5 bg-neutral-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-neutral-300 flex-shrink-0" />
                          <span className="font-bold text-white">HOW TO RUN THE PROJECT &amp; DATABASE SETUP</span>
                        </div>
                        <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 self-start sm:self-auto">
                          PostgreSQL 18 + Prisma CLI + Vite Dev
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {setupGuideData.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-5 bg-white border border-neutral-200 space-y-3 flex flex-col justify-between shadow-xs"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-[11px] font-mono">
                                <span className="font-bold text-black uppercase">
                                  STEP [{item.step}]
                                </span>
                                <span className="text-neutral-400 font-medium">PKL RUNTIME</span>
                              </div>
                              <h4 className="font-heading font-bold text-sm text-black">
                                {item.title}
                              </h4>
                              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                                {item.desc}
                              </p>
                            </div>

                            <div className="space-y-2.5 pt-2 border-t border-neutral-100">
                              {item.commands.map((cmdItem, cIdx) => (
                                <div key={cIdx} className="space-y-1">
                                  <div className="flex items-center justify-between text-[10px] font-mono">
                                    <span className="text-neutral-500 font-bold">{cmdItem.label}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopy(cmdItem.cmd, `${idx}-${cIdx}`)}
                                      className="inline-flex items-center gap-1 text-[10px] font-mono text-black hover:text-neutral-600 cursor-pointer font-bold transition-colors"
                                    >
                                      {copiedCmd === `${idx}-${cIdx}` ? (
                                        <>
                                          <Check className="w-3 h-3 text-black" />
                                          <span className="text-black">COPIED</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3 h-3" />
                                          <span>COPY</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <pre className="p-2.5 bg-neutral-900 text-neutral-100 text-[11px] font-mono overflow-x-auto whitespace-pre-wrap rounded-xs selection:bg-neutral-700">
                                    <code>{cmdItem.cmd}</code>
                                  </pre>
                                  {cmdItem.note && (
                                    <p className="text-[10px] font-mono text-neutral-400">
                                      ℹ {cmdItem.note}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Live Demo Banner */}
                      <div className="p-4 bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                        <div className="flex items-center gap-2 text-neutral-900">
                          <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                          <span>
                            Complete source code with 8 relational Prisma models, JWT auth, and RBAC routes is accessible on GitHub.
                          </span>
                        </div>
                        <a
                          href="https://github.com/mhmdrzllabdn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline font-bold text-black hover:text-neutral-700 inline-flex items-center gap-1"
                        >
                          <span>Explore Repository</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Sub-tab 4: Responsive Simulator Viewport */}
                  {webDevSubTab === "responsive" && (
                    <div className="border border-neutral-200 bg-white p-4 sm:p-6 space-y-5 shadow-xs animate-fadeIn">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
                        <div>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">
                            RESPONSIVE PREVIEW SIMULATOR
                          </span>
                          <h3 className="text-lg font-heading font-extrabold text-black mt-1">
                            Multi-Device Viewport Testing
                          </h3>
                        </div>

                        {/* Viewport Switcher */}
                        <div className="flex items-center gap-1 text-xs font-mono bg-neutral-100 p-1 border border-neutral-200">
                          {(["mobile", "tablet", "desktop"] as const).map((vp) => (
                            <button
                              key={vp}
                              type="button"
                              onClick={() => setPreviewViewport(vp)}
                              className={`px-3 py-1 font-semibold uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
                                previewViewport === vp
                                  ? "bg-black text-white"
                                  : "text-neutral-600 hover:text-black"
                              }`}
                            >
                              {vp === "mobile" && <Smartphone className="w-3 h-3" />}
                              {vp === "tablet" && <Tablet className="w-3 h-3" />}
                              {vp === "desktop" && <Monitor className="w-3 h-3" />}
                              <span>{vp}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Mock Container */}
                      <div className="bg-neutral-100 p-2 sm:p-6 flex items-center justify-center min-h-[300px] border border-neutral-200 overflow-hidden">
                        <div
                          style={{
                            maxWidth: "100%",
                            width:
                              previewViewport === "mobile"
                                ? "320px"
                                : previewViewport === "tablet"
                                ? "min(540px, 100%)"
                                : "100%",
                            transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                          className="bg-white border border-neutral-300 shadow-md p-3 sm:p-4 space-y-3 mx-auto w-full"
                        >
                          <div className="flex items-center justify-between border-b border-neutral-200 pb-2 text-[10px] font-mono text-neutral-400">
                            <span>PKL REPOSITORY PORTAL</span>
                            <span className="uppercase">{previewViewport} VIEW</span>
                          </div>
                          <div className="h-6 bg-neutral-100 w-3/4 rounded-xs" />
                          <div className="grid grid-cols-2 gap-2">
                            <div className="h-16 bg-neutral-50 border border-neutral-200 p-2 text-[10px] font-mono text-neutral-600">
                              Digital Catalog Multi-Filter
                            </div>
                            <div className="h-16 bg-neutral-50 border border-neutral-200 p-2 text-[10px] font-mono text-neutral-600">
                              Supervisor Validation &amp; Notes
                            </div>
                          </div>
                          <div className="h-10 bg-neutral-100 w-full" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Interactive Archive Simulator for Solutions 01 & 02 */
                <div className="border border-neutral-200 bg-white shadow-xs p-4 sm:p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">
                        WEB-BASED ARCHIVE MANAGEMENT SIMULATOR
                      </span>
                      <h3 className="text-lg font-heading font-extrabold text-black mt-1">
                        Digital PKL Archive Directory
                      </h3>
                    </div>

                    {/* Category Filter */}
                    <div className="flex overflow-x-auto no-scrollbar gap-1.5 text-xs font-mono pb-1 max-w-full">
                      {["All", "Incoming Letters", "Internship Reports", "Evaluation & Certificates"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategoryFilter(cat)}
                          className={`px-2.5 py-1 border transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 text-[11px] sm:text-xs ${
                            categoryFilter === cat
                              ? "bg-black text-white border-black font-semibold"
                              : "bg-white text-neutral-600 border-neutral-200 hover:border-black"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Search files by title or archive code..."
                      className="w-full pl-9 pr-4 py-2 border border-neutral-200 text-xs font-sans text-black focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  {/* Two-Column Explorer: Document List + Detail Inspector */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    {/* Document Items List (Cols 1-7) */}
                    <div className="md:col-span-7 space-y-2 max-h-[360px] overflow-y-auto pr-1">
                      {filteredArchives.length === 0 ? (
                        <div className="p-8 text-center text-xs font-mono text-neutral-400 border border-neutral-200">
                          No archive files matched this search query.
                        </div>
                      ) : (
                        filteredArchives.map((doc) => {
                          const isSelected = selectedDoc.id === doc.id;
                          return (
                            <button
                              key={doc.id}
                              type="button"
                              onClick={() => setSelectedDoc(doc)}
                              className={`w-full text-left p-3 border transition-all flex items-start gap-3 cursor-pointer ${
                                isSelected
                                  ? "bg-neutral-50 border-black shadow-xs"
                                  : "bg-white border-neutral-200 hover:border-neutral-400"
                              }`}
                            >
                              <FileText className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                                  <span>{doc.id}</span>
                                  <span>{doc.date}</span>
                                </div>
                                <h4 className="font-bold text-xs text-black truncate mt-0.5">
                                  {doc.title}
                                </h4>
                                <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.5 bg-neutral-100 text-neutral-600">
                                  {doc.category}
                                </span>
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>

                    {/* Selected Document Details Card (Cols 8-12) */}
                    <div className="md:col-span-5 p-4 bg-neutral-50 border border-neutral-200 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-neutral-200 text-[10px] font-mono text-neutral-500">
                        <span>SELECTED DOCUMENT DETAILS</span>
                        <span className="text-neutral-700 font-bold">{selectedDoc.status}</span>
                      </div>

                      <h4 className="font-heading font-extrabold text-sm text-black leading-snug">
                        {selectedDoc.title}
                      </h4>

                      <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                        {selectedDoc.summary}
                      </p>

                      <div className="pt-2 border-t border-neutral-200 space-y-1.5 text-[11px] font-mono">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Registration No:</span>
                          <span className="font-bold text-black">{selectedDoc.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">File Size:</span>
                          <span className="text-black">{selectedDoc.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Recorded Date:</span>
                          <span className="text-black">{selectedDoc.date}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-200">
                        <button
                          type="button"
                          className="w-full text-center py-2 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 text-[11px] font-mono font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                        >
                          SIMULATE DOCUMENT PREVIEW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="sticky bottom-0 px-4 sm:px-8 py-3 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3 text-xs font-mono">
          <span className="text-neutral-500 hidden sm:inline-block">
            REAL-WORLD PKL ARCHIVE DIGITIZATION EXPERIENCE
          </span>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-3 sm:px-4 py-2 border border-neutral-300 bg-white text-neutral-800 hover:text-black hover:border-black active:scale-95 transition-all font-semibold cursor-pointer text-xs"
            >
              CLOSE
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 bg-black text-white hover:bg-neutral-800 active:scale-95 transition-all font-semibold text-xs flex-1 sm:flex-initial text-center"
            >
              <span className="hidden xs:inline">DISCUSS PROJECT REQUIREMENTS</span>
              <span className="xs:hidden">DISCUSS PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
