"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Code2,
  Cpu,
  Cloud,
  Smartphone,
  ShieldCheck,
  Building2,
  Globe2,
  Sparkles,
  ArrowRight,
  Share2,
  Target,
  Search,
  Palette,
  Handshake,
  Workflow,
  Compass
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const engineeringServices = [
    {
      title: "Custom Software Engineering",
      desc: "Robust web applications & scalable cloud platforms.",
      icon: Code2,
      href: "#services",
    },
    {
      title: "AI & Machine Learning",
      desc: "Autonomous AI agents, LLM integrations & computer vision.",
      icon: Cpu,
      href: "#services",
    },
    {
      title: "Cloud & DevOps Architecture",
      desc: "Multi-cloud orchestration, CI/CD pipelines & Kubernetes.",
      icon: Cloud,
      href: "#services",
    },
    {
      title: "Mobile App Development",
      desc: "High-performance iOS, Android & cross-platform apps.",
      icon: Smartphone,
      href: "#services",
    },
    {
      title: "Enterprise Digital Modernization",
      desc: "Legacy system migration, microservices & ERP solutions.",
      icon: Building2,
      href: "#services",
    },
    {
      title: "Cyber Security & QA Automation",
      desc: "Vulnerability audits and automated QA testing.",
      icon: ShieldCheck,
      href: "#services",
    },
  ];

  const marketingServices = [
    {
      title: "Social Media Marketing",
      desc: "Viral reels, omnichannel content & community growth.",
      icon: Share2,
      href: "#services",
    },
    {
      title: "Paid Advertising (PPC)",
      desc: "Hyper-targeted Google Ads & Meta performance funnels.",
      icon: Target,
      href: "#services",
    },
    {
      title: "Search Engine Optimization",
      desc: "Technical SEO audits & Google Page 1 keyword ranking.",
      icon: Search,
      href: "#services",
    },
    {
      title: "Graphic Design & Creative",
      desc: "Brand identity systems, motion graphics & ad banners.",
      icon: Palette,
      href: "#services",
    },
    {
      title: "Influencer & Affiliate Marketing",
      desc: "Vetted creator partnerships & affiliate sales scaling.",
      icon: Handshake,
      href: "#services",
    },
    {
      title: "Marketing Automation & CRM",
      desc: "Personalized email flows & lead nurturing on autopilot.",
      icon: Workflow,
      href: "#services",
    },
    {
      title: "Digital Marketing Strategy",
      desc: "Fractional CMO advisory & full-funnel GTM roadmaps.",
      icon: Compass,
      href: "#services",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#010206]/90 backdrop-blur-xl border-b border-cyan-950/40 shadow-2xl shadow-black/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group py-1">
            <Image
              src="/axiora-logo-v2.png"
              alt="Axiora Software Labs"
              width={280}
              height={125}
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Services with Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors py-2">
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdown ? "rotate-180 text-cyan-400" : ""
                  }`}
                />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full -left-36 w-[800px] pt-3 animate-in fade-in zoom-in-95 duration-200">
                  <div className="bg-[#060913] border border-cyan-950/60 rounded-2xl p-6 shadow-2xl shadow-black/90 backdrop-blur-2xl">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Left: Engineering & AI */}
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2 pb-2 border-b border-slate-800">
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          Software & AI Engineering
                        </div>
                        <div className="space-y-1">
                          {engineeringServices.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                              <a
                                key={idx}
                                href={item.href}
                                onClick={() => setServicesDropdown(false)}
                                className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-800/60 transition-all group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center shrink-0 group-hover:border-cyan-400/50 group-hover:bg-cyan-900/40 transition-colors">
                                  <Icon className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                  <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                                    {item.title}
                                  </div>
                                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                    {item.desc}
                                  </div>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Digital Marketing & Growth */}
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2 pb-2 border-b border-slate-800">
                          <Target className="w-3.5 h-3.5 text-purple-400" />
                          Digital Marketing & Growth
                        </div>
                        <div className="space-y-1">
                          {marketingServices.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                              <a
                                key={idx}
                                href={item.href}
                                onClick={() => setServicesDropdown(false)}
                                className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-800/60 transition-all group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center shrink-0 group-hover:border-purple-400/50 group-hover:bg-purple-900/40 transition-colors">
                                  <Icon className="w-4 h-4 text-purple-400" />
                                </div>
                                <div>
                                  <div className="text-xs font-semibold text-slate-200 group-hover:text-purple-300 transition-colors">
                                    {item.title}
                                  </div>
                                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                    {item.desc}
                                  </div>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Looking for an end-to-end technology & marketing partner?</span>
                      <a href="#contact" className="text-cyan-400 font-semibold hover:underline flex items-center gap-1">
                        Consult an architect <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="#industries" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">
              Industries
            </a>

            <a href="#tech-stack" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">
              Tech Stack
            </a>

            <a
              href="#global_office"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-cyan-400" />
              Our Office
            </a>

            <a href="#about" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">
              About
            </a>

            <Link href="/blog" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">
              Insights
            </Link>

            <a href="#careers" className="text-sm font-medium text-cyan-300 hover:text-cyan-400 transition-colors flex items-center gap-1">
              Careers <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">Hiring</span>
            </a>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Book a Consultation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-6 pt-2 border-t border-cyan-950/60 bg-[#060913] rounded-2xl p-5 shadow-2xl">
            <div className="flex flex-col gap-4">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-cyan-400"
              >
                Services
              </a>
              <a
                href="#industries"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-cyan-400"
              >
                Industries
              </a>
              <a
                href="#tech-stack"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-cyan-400"
              >
                Tech Stack
              </a>
              <a
                href="#global_office"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-cyan-400 flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-cyan-400" />
                Our Office
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-cyan-400"
              >
                About Us
              </a>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-cyan-400 flex items-center justify-between"
              >
                <span>Insights & Blog</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">Articles</span>
              </Link>
              <a
                href="#careers"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-cyan-300 hover:text-cyan-400 flex items-center justify-between"
              >
                <span>Join Our Team</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">Hiring</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
