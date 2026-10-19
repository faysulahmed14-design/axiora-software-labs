"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  CheckCircle2,
  ArrowRight,
  Globe2,
  Sparkles,
  Wifi,
  ShieldCheck
} from "lucide-react";

export default function GlobalOfficesSection() {
  const office = {
    name: "Axiora Software Labs Headquarters",
    role: "Global Engineering & Innovation Center",
    area: "Malibagh",
    city: "Dhaka",
    country: "Bangladesh",
    address: "Malibagh, Dhaka, Bangladesh",
    phone: "01346658678",
    email: "axiorasoftwarelabs@gmail.com",
    timeZone: "BST (Bangladesh Standard Time, UTC+6)",
    hours: "Sun – Thu: 9:30 AM – 6:30 PM BST (24/7 Support Available)",
  };

  const remoteHighlights = [
    {
      title: "Global Client Overlap",
      desc: "Flexible working hours matching Americas (EST), Europe (GMT), and Middle East (GST) timezones.",
    },
    {
      title: "Enterprise Infrastructure",
      desc: "High-speed redundant gigabit connectivity, secure VPN access, and ISO-compliant workstation standards.",
    },
    {
      title: "Real-Time Collaboration",
      desc: "Direct communication with your dedicated engineers via Slack, Microsoft Teams, and Jira boards.",
    },
    {
      title: "Rapid Project Kickoff",
      desc: "Fast onboarding with transparent sprint planning and bi-weekly production releases.",
    },
  ];

  return (
    <section id="global_office" className="py-24 relative overflow-hidden scroll-mt-16">
      {/* Background radial accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" /> Engineering Headquarters
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Office & Innovation Hub
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Based in the tech corridor of Dhaka, Bangladesh, our centralized engineering center powers robust digital products and custom software for clients around the globe.
          </p>
        </div>

        {/* Office Feature Grid */}
        <div className="rounded-3xl bg-[#0c1424]/90 border border-slate-800 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Office Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Main Engineering Office
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Dhaka, Bangladesh
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white tracking-tight">
                  {office.area}, {office.city}
                </h3>
                <p className="text-sm font-medium text-cyan-400 mt-1">
                  {office.role}
                </p>
              </div>

              {/* Details List */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Physical Address</div>
                    <div className="text-sm font-semibold text-slate-200 mt-0.5">
                      {office.address}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Direct Phone</div>
                      <a
                        href="tel:+8801346658678"
                        className="text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors mt-0.5 block"
                      >
                        {office.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Direct Email</div>
                      <a
                        href={`mailto:${office.email}`}
                        className="text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors mt-0.5 block"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Operating Timezone</div>
                      <div className="text-sm font-semibold text-slate-200 mt-0.5">
                        {office.timeZone}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Office Working Hours</div>
                      <div className="text-sm font-semibold text-slate-200 mt-0.5">
                        {office.hours}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Schedule an In-Person / Virtual Meeting <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Global Remote Delivery Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#070c16] border border-slate-800 p-6 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Worldwide Remote Delivery
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    GLOBAL SERVICE
                  </span>
                </div>

                <div className="my-6 space-y-4">
                  {remoteHighlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Headquarters Location</span>
                  <span className="text-cyan-300 font-semibold font-mono">Malibagh, Dhaka</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
