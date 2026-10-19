import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AiNeuralBackground from "@/components/AiNeuralBackground";
import ServicesSection from "@/components/ServicesSection";
import IndustrySection from "@/components/IndustrySection";
import TechStackSection from "@/components/TechStackSection";
import GlobalOfficesSection from "@/components/GlobalOfficesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import CareersSection from "@/components/CareersSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#010206] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3D Moving AI Neural Network Background */}
      <AiNeuralBackground />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Core Technology Services (Interactive Tabs) */}
      <ServicesSection />

      {/* Industry Solutions */}
      <IndustrySection />

      {/* Interactive Tech Stack Matrix */}
      <TechStackSection />

      {/* Global Office Presence (#global_office) */}
      <GlobalOfficesSection />

      {/* Why Axiora / About Us */}
      <AboutSection />

      {/* Contact & Consultation Scheduling */}
      <ContactSection />

      {/* Join Our Team / Careers & CV Upload */}
      <CareersSection />

      {/* Enterprise Footer */}
      <Footer />
    </main>
  );
}
