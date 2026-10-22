"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import RevealOnScroll from "./RevealOnScroll";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website_trap: "", // Honeypot anti-spam
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mhmdrzllabdnn@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMsg("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setResponseMsg(data.message || "An error occurred. Please check your form input.");
        if (data.errors) setFieldErrors(data.errors);
      } else {
        setStatus("success");
        setResponseMsg("Thank you! Your message has been sent. I will respond within 24 hours.");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          website_trap: "",
        });
      }
    } catch {
      setStatus("error");
      setResponseMsg("Failed to send message via form. Please reach out directly via email.");
    }
  };

  return (
    <section id="contact" className="bg-[#FAFAFA] text-black border-b border-neutral-200 relative overflow-hidden py-16 sm:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex relative">
        {/* Left Vertical Editorial Gutter */}
        <div className="hidden md:flex flex-col justify-between items-center pr-6 lg:pr-8 py-8 border-r border-neutral-200 select-none flex-shrink-0 w-14 lg:w-16">
          <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
            08
          </div>
          <div className="vertical-lr text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-medium hover:text-black transition-colors whitespace-nowrap">
            Contact
          </div>
          <div className="text-[11px] font-mono text-neutral-400 font-semibold tracking-wider">
            CONTACT
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 pl-0 sm:pl-6 md:pl-10 lg:pl-12">
          {/* Header */}
          <RevealOnScroll>
            <div className="pb-6 sm:pb-8 border-b border-neutral-200 mb-8 sm:mb-12">
              <p className="text-xs font-mono text-neutral-500 tracking-widest uppercase mb-2 sm:mb-3">
                Let&apos;s Connect
              </p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-black tracking-tight leading-[1.1] max-w-4xl">
                Have a Project in Mind?
                <br />
                Let&apos;s Build It Together.
              </h2>
              <div className="text-sm sm:text-base text-neutral-600 max-w-xl mt-3 sm:mt-4 leading-relaxed font-sans space-y-2">
                <p>
                  If you are planning a new website, developing a web application, or improving an existing digital system, I welcome the opportunity to discuss your requirements.
                </p>
                <p>
                  Share your project objectives, expected features, and timeline, and we can explore an appropriate approach together.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Email Strip with One-Click Copy */}
          <RevealOnScroll delayMs={60}>
            <div className="p-5 sm:p-8 bg-white border border-neutral-200 hover:border-black transition-all mb-8 sm:mb-10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-semibold mb-1">
                  DIRECT EMAIL ADDRESS
                </span>
                <span className="font-heading font-bold text-base sm:text-2xl md:text-3xl text-black tracking-tight select-all break-all sm:break-normal">
                  mhmdrzllabdnn@gmail.com
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white hover:bg-neutral-800 text-xs font-mono font-semibold px-5 py-3 transition-all cursor-pointer active:scale-95 shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>EMAIL COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY EMAIL ADDRESS</span>
                  </>
                )}
              </button>
            </div>
          </RevealOnScroll>

          {/* Two-Column Studio Inquiry Desk */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Message Inquiry Form (Cols 1-7) */}
            <div className="lg:col-span-7 bg-white border border-neutral-200 p-5 sm:p-8 lg:p-10 shadow-xs">
              <RevealOnScroll delayMs={80}>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200">
                  <span className="font-heading font-extrabold text-sm uppercase tracking-wider text-black">
                    MESSAGE INQUIRY FORM
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 font-semibold">
                    EXPECTED RESPONSE TIME: WITHIN 24 HOURS
                  </span>
                </div>

                {status === "success" && (
                  <div
                    role="status"
                    className="mb-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-3 font-mono animate-fadeIn"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                {status === "error" && (
                  <div
                    role="alert"
                    className="mb-6 p-4 bg-red-50 border border-red-300 text-red-900 text-xs flex items-start gap-3 font-mono animate-fadeIn"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Honeypot trap */}
                  <input
                    type="text"
                    name="website_trap"
                    value={formData.website_trap}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label htmlFor="inquiry-name" className="block text-[11px] font-mono text-neutral-500 uppercase font-semibold mb-1">
                        [01] FULL NAME *
                      </label>
                      <input
                        id="inquiry-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full bg-[#FAFAFA] border border-neutral-200 focus:border-black px-3.5 py-2.5 text-sm sm:text-xs text-black placeholder-neutral-400 focus:outline-none transition-colors"
                      />
                      {fieldErrors.name && (
                        <p className="text-[10px] text-red-500 mt-1">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="inquiry-email" className="block text-[11px] font-mono text-neutral-500 uppercase font-semibold mb-1">
                        [02] EMAIL ADDRESS *
                      </label>
                      <input
                        id="inquiry-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="w-full bg-[#FAFAFA] border border-neutral-200 focus:border-black px-3.5 py-2.5 text-sm sm:text-xs text-black placeholder-neutral-400 focus:outline-none transition-colors"
                      />
                      {fieldErrors.email && (
                        <p className="text-[10px] text-red-500 mt-1">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiry-subject" className="block text-[11px] font-mono text-neutral-500 uppercase font-semibold mb-1">
                      [03] PROJECT SUBJECT / INQUIRY *
                    </label>
                    <input
                      id="inquiry-subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Website Development / Information System"
                      className="w-full bg-[#FAFAFA] border border-neutral-200 focus:border-black px-3.5 py-2.5 text-sm sm:text-xs text-black placeholder-neutral-400 focus:outline-none transition-colors"
                    />
                    {fieldErrors.subject && (
                      <p className="text-[10px] text-red-500 mt-1">{fieldErrors.subject}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="inquiry-message" className="block text-[11px] font-mono text-neutral-500 uppercase font-semibold">
                        [04] MESSAGE DETAILS OR TIMELINE *
                      </label>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {formData.message.length} / 1000
                      </span>
                    </div>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      required
                      maxLength={1000}
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project requirements, objectives, expected features, or preferred timeline."
                      className="w-full bg-[#FAFAFA] border border-neutral-200 focus:border-black px-3.5 py-2.5 text-sm sm:text-xs text-black placeholder-neutral-400 focus:outline-none transition-colors resize-none font-sans"
                    />
                    {fieldErrors.message && (
                      <p className="text-[10px] text-red-500 mt-1">{fieldErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full inline-flex items-center justify-center gap-2 bg-black text-white hover:bg-neutral-800 disabled:opacity-50 text-xs font-semibold tracking-wider py-3.5 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>SENDING MESSAGE...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </RevealOnScroll>
            </div>

            {/* Right: Info Status & Socials (Cols 8-12) */}
            <div className="lg:col-span-5 space-y-6">
              <RevealOnScroll delayMs={120}>
                {/* Work Availability Card */}
                <div className="p-5 sm:p-6 bg-white border border-neutral-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-neutral-200">
                    <span className="text-neutral-500 uppercase font-bold">WORK AVAILABILITY</span>
                    <span className="text-neutral-400 font-bold">GRESIK, ID</span>
                  </div>

                  <div className="space-y-3 text-xs font-mono">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-neutral-500 uppercase">LOCATION</span>
                      <span className="text-black font-semibold text-right">GRESIK, INDONESIA</span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-neutral-500 uppercase">ENGAGEMENT MODEL</span>
                      <span className="text-black font-semibold text-right">FREELANCE &amp; CONTRACT PROJECTS</span>
                    </div>
                  </div>
                </div>

                {/* Direct Touchpoints (GitHub, LinkedIn) */}
                <div className="p-5 sm:p-6 bg-white border border-neutral-200 shadow-xs space-y-3">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                    PROFESSIONAL PROFILES
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://github.com/mhmdrzllabdn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-neutral-50 hover:bg-black hover:text-white border border-neutral-200 text-xs font-mono font-semibold flex items-center justify-center sm:justify-start gap-2 transition-all active:scale-95 group"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GITHUB</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/reza-fullstack"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-neutral-50 hover:bg-black hover:text-white border border-neutral-200 text-xs font-mono font-semibold flex items-center justify-center sm:justify-start gap-2 transition-all active:scale-95 group"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                      <span>LINKEDIN</span>
                    </a>
                  </div>
                </div>

                {/* Visual Card linked to GitHub */}
                <a
                  href="https://github.com/mhmdrzllabdn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Muhammad Rizal Abidin's GitHub Profile"
                  className="relative w-full aspect-[16/9] bg-neutral-100 overflow-hidden border border-neutral-200 shadow-xs group block"
                >
                  <Image
                    src="/images/architectural-about.jpg"
                    alt="Muhammad Rizal Abidin"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center filter grayscale contrast-110 group-hover:scale-104 group-hover:filter-none transition-all duration-700 ease-out"
                  />
                </a>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
