"use client";

import React from "react";
import { ShieldCheck, Zap, Users, Code } from "lucide-react";

export default function AboutSection() {
  const pillars = [
    {
      title: "Senior Engineering Talent",
      desc: "Top 3% vetted full-stack engineers, cloud architects, and data scientists. Zero junior developer handoffs on production code.",
      icon: Users,
    },
    {
      title: "Domain-Driven Architectures",
      desc: "We design software systems modularly to avoid technical debt, using domain-driven design (DDD) and clean architecture.",
      icon: Code,
    },
    {
      title: "Agile Sprint Transparency",
      desc: "Real-time Slack / Teams access to your dedicated developers, weekly sprint demos, and direct Jira / GitHub board visibility.",
      icon: Zap,
    },
    {
      title: "Bank-Grade Security & Compliance",
      desc: "ISO 27001, SOC 2 Type II, HIPAA, and GDPR compliance embedded directly into our continuous integration & deployment pipelines.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#03050c]/80 border-t border-cyan-950/40 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Story */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-3 py-1 rounded-full">
              Why Axiora
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4 leading-tight">
              An Engineering Partner That Thinks Like a Product Owner
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Founded by software veterans and systems architects, Axiora Software Labs was built to bridge the gap between business velocity and deep technical craftsmanship.
            </p>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              We don&apos;t just write lines of code; we analyze your business economics, user journeys, and scalability bottlenecks to deliver sustainable digital advantage.
            </p>
          </div>

          {/* Right Column: 4 Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#060913] border border-cyan-950/50 p-6 hover:border-cyan-500/40 transition-all hover:shadow-xl group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-950/70 border border-cyan-800/40 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
