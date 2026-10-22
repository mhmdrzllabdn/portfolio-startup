import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import AboutSection from "@/components/AboutSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import FaqSection from "@/components/FaqSection";
import TechnologyStack from "@/components/TechnologyStack";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col relative selection:bg-black selection:text-white">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 1. Global Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Featured Solutions & Simulation */}
        <FeaturedProjects />

        {/* 4. About Me & Bio */}
        <AboutSection />

        {/* 5. Services & Capabilities */}
        <CapabilitiesSection />

        {/* 6. Development Workflow / Process */}
        <ProcessTimeline />

        {/* 7. Frequently Asked Questions (FAQ) */}
        <FaqSection />

        {/* 8. Tech Stack & Engineering Tools */}
        <TechnologyStack />

        {/* 9. Contact Section */}
        <ContactSection />
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
