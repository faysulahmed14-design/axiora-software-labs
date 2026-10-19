"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  Globe2,
  Mail,
  Phone,
  ShieldCheck,
  ArrowUp
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#010206] border-t border-cyan-950/40 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-cyan-950/40">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center group">
              <Image
                src="/axiora-logo-v2.png"
                alt="Axiora Software Labs"
                width={260}
                height={120}
                className="h-13 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Axiora Software Labs is a premier custom software development and AI engineering agency delivering resilient architectures for startups and global enterprise leaders worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {/* LinkedIn SVG */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.27 1.64 1.64 0 0 0 0 3.27m1.4 9.74V9.92H5.06v8.58h2.8z" />
                </svg>
              </a>

              {/* GitHub SVG */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </a>

              {/* Twitter / X SVG */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Engineering Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Software & AI
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Custom Software Dev
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  AI & Machine Learning
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Cloud & DevOps Architecture
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Mobile App Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Enterprise Modernization
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  QA & Security Hardening
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Digital Marketing & Creative */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Marketing & Growth
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors">
                  Social Media Marketing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors">
                  Paid Advertising (PPC)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors">
                  SEO & Organic Search
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors">
                  Graphic Design & Creative
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors">
                  Influencer & Affiliate
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors">
                  Marketing Automation & CRM
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors">
                  Strategy & Management
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Headquarters & Delivery */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Headquarters
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-200 font-semibold flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                Malibagh, Dhaka
              </li>
              <li className="text-slate-400">
                Bangladesh
              </li>
              <li className="pt-1">
                <a href="#global_office" className="text-cyan-400 hover:underline">
                  View Office Details &rarr;
                </a>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                Delivering Globally from Dhaka
              </li>
              <li className="pt-2">
                <a href="#careers" className="text-cyan-300 font-semibold hover:underline flex items-center gap-1">
                  Join Our Team (Careers) &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>&copy; 2026 Axiora Software Labs Ltd. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </a>
            <a href="#about" className="hover:text-slate-200 transition-colors">
              Terms of Engagement
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
