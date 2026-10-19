"use client";

import React from "react";
import Image from "next/image";
import {
  Landmark,
  HeartPulse,
  ShoppingBag,
  Truck,
  GraduationCap,
  Building,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";

export default function IndustrySection() {
  const industries = [
    {
      title: "FinTech & Digital Banking",
      desc: "PCI-DSS compliant payment gateways, micro-lending platforms, core banking integrations, and algorithmic fraud detection systems.",
      icon: Landmark,
      image: "/images/industries/fintech.jpg",
      features: ["Core Banking Modernization", "Digital Wallets & Payments", "Automated AML / KYC"],
    },
    {
      title: "HealthTech & Life Sciences",
      desc: "HIPAA-compliant telemedicine applications, electronic health record (EHR/EMR) integrations, and medical diagnostic AI models.",
      icon: HeartPulse,
      image: "/images/industries/healthtech.jpg",
      features: ["HIPAA/GDPR Compliance", "Telehealth Platforms", "AI Medical Image Analytics"],
    },
    {
      title: "E-Commerce & Retail",
      desc: "Omnichannel e-commerce engines, AI product recommendation algorithms, headless storefronts, and automated inventory sync.",
      icon: ShoppingBag,
      image: "/images/industries/ecommerce.jpg",
      features: ["Headless Commerce", "Real-Time Flash Sales Engine", "AI Search & Recommendations"],
    },
    {
      title: "Logistics & Supply Chain",
      desc: "IoT fleet management, dynamic route optimization, warehouse automation software, and end-to-end cargo shipment tracking.",
      icon: Truck,
      image: "/images/industries/logistics.jpg",
      features: ["Fleet Tracking & Telematics", "Smart Warehouse Management", "Real-time Route Optimization"],
    },
    {
      title: "EdTech & Interactive Learning",
      desc: "Next-gen Learning Management Systems (LMS), gamified interactive classrooms, proctored exam suites, and adaptive student analytics.",
      icon: GraduationCap,
      image: "/images/industries/edtech.jpg",
      features: ["Custom LMS Architecture", "Live Interactive Classrooms", "AI Adaptive Learning Paths"],
    },
    {
      title: "Telecom & Large Enterprise",
      desc: "High-throughput billing engines, field-force automation apps, self-care portals, and unified internal employee hubs.",
      icon: Building,
      image: "/images/industries/enterprise.jpg",
      features: ["Field Force Automation", "Billing & Subscriber Care", "B2B Partner Integration"],
    },
  ];

  return (
    <section id="industries" className="py-24 bg-[#080e1b]/70 border-t border-slate-800/80 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-3 py-1 rounded-full">
            Industry Focus
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Domain Expertise Tailored for Regulated & High-Growth Sectors
          </h2>
          <p className="mt-4 text-base text-slate-400">
            We understand the regulatory, security, and scalability nuances of critical industries across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl bg-[#0c1424] border border-slate-800/90 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/40 flex flex-col justify-between"
              >
                {/* Visual Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1424] via-[#0c1424]/40 to-black/25" />

                  {/* Floating Icon Badge */}
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-[#060b13]/85 border border-cyan-500/40 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/60 group-hover:border-cyan-400 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Corner Arrow Indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#060b13]/70 border border-slate-700/60 backdrop-blur-md flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                      {ind.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {ind.desc}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                    {ind.features.map((feat, fIdx) => (
                      <div key={fIdx} className="text-xs text-slate-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
