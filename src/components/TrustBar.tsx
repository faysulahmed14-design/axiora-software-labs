"use client";

import React from "react";
import { FaAws } from "react-icons/fa6";
import { SiGooglecloud } from "react-icons/si";

export default function TrustBar() {
  return (
    <section className="py-12 border-y border-slate-800/80 bg-[#080e1b]/70 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-slate-400 font-semibold mb-8">
          Accredited by Global Tech & Security Standards
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          {/* 1. AWS Certified Partner */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0c1424] border border-slate-800 hover:border-[#FF9900]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF9900]/10 group cursor-default">
            <div className="w-9 h-9 rounded-xl bg-[#060b13] border border-slate-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaAws className="w-5 h-5 text-[#FF9900]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FF9900] transition-colors">
                AWS Certified
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-tight">
                Partner Network
              </span>
            </div>
          </div>

          {/* 2. Microsoft Solutions Partner */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0c1424] border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 group cursor-default">
            <div className="w-9 h-9 rounded-xl bg-[#060b13] border border-slate-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              {/* Official Microsoft 4-Color Squares */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                Microsoft
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-tight">
                Solutions Partner
              </span>
            </div>
          </div>

          {/* 3. Google Cloud Premier Partner */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0c1424] border border-slate-800 hover:border-[#4285F4]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#4285F4]/10 group cursor-default">
            <div className="w-9 h-9 rounded-xl bg-[#060b13] border border-slate-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <SiGooglecloud className="w-5 h-5 text-[#4285F4]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#4285F4] transition-colors">
                Google Cloud
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-tight">
                Premier Partner
              </span>
            </div>
          </div>

          {/* 4. ISO 27001 Certified Security */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0c1424] border border-slate-800 hover:border-sky-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 group cursor-default">
            <div className="w-9 h-9 rounded-xl bg-[#060b13] border border-slate-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              {/* ISO 27001 Certified Security Shield Emblem */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L4 5.5V11.5C4 16.5 7.4 21.1 12 22.5C16.6 21.1 20 16.5 20 11.5V5.5L12 2Z"
                  fill="#0284c7"
                  fillOpacity="0.25"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />
                <path
                  d="M8.5 12L11 14.5L15.5 10"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                ISO/IEC 27001
              </span>
              <span className="text-[10px] text-sky-400 font-mono tracking-tight">
                Information Security
              </span>
            </div>
          </div>

          {/* 5. SOC 2 Type II Compliant */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0c1424] border border-slate-800 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group cursor-default">
            <div className="w-9 h-9 rounded-xl bg-[#060b13] border border-slate-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              {/* SOC 2 Trust Security Emblem */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#34d399" strokeWidth="1.5" fill="#10b981" fillOpacity="0.15" />
                <path d="M12 7V12L15 15" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2" fill="#34d399" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                SOC 2 Type II
              </span>
              <span className="text-[10px] text-emerald-400 font-mono tracking-tight">
                Certified Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
