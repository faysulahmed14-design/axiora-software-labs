"use client";

import React, { useState } from "react";
import { Terminal, Cpu, Database, Cloud, Smartphone, Monitor } from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVuedotjs,
  SiNodedotjs,
  SiGo,
  SiPython,
  SiSpringboot,
  SiDotnet,
  SiGooglecloud,
  SiKubernetes,
  SiTerraform,
  SiGithubactions,
  SiPytorch,
  SiAnthropic,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiApachekafka,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbBrandOpenai } from "react-icons/tb";

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Technologies", icon: Terminal },
    { id: "frontend", name: "Frontend", icon: Monitor },
    { id: "backend", name: "Backend", icon: Terminal },
    { id: "cloud", name: "Cloud & DevOps", icon: Cloud },
    { id: "ai", name: "AI & Data Science", icon: Cpu },
    { id: "mobile", name: "Mobile", icon: Smartphone },
    { id: "database", name: "Databases", icon: Database },
  ];

  const technologies = [
    // Frontend
    {
      name: "Next.js 15",
      category: "frontend",
      level: "Expert",
      desc: "Server Components & SSR",
      icon: SiNextdotjs,
      brandColor: "#ffffff",
    },
    {
      name: "React 19",
      category: "frontend",
      level: "Expert",
      desc: "Interactive Web Apps",
      icon: SiReact,
      brandColor: "#61dafb",
    },
    {
      name: "TypeScript",
      category: "frontend",
      level: "Expert",
      desc: "Strict Type Safety",
      icon: SiTypescript,
      brandColor: "#3178c6",
    },
    {
      name: "Tailwind CSS",
      category: "frontend",
      level: "Expert",
      desc: "Design Systems & Tokens",
      icon: SiTailwindcss,
      brandColor: "#06b6d4",
    },
    {
      name: "Vue.js / Nuxt",
      category: "frontend",
      level: "Advanced",
      desc: "Reactive Frontend Architecture",
      icon: SiVuedotjs,
      brandColor: "#4fc08d",
    },

    // Backend
    {
      name: "Node.js & NestJS",
      category: "backend",
      level: "Expert",
      desc: "Enterprise Scalable APIs",
      icon: SiNodedotjs,
      brandColor: "#5fa04e",
    },
    {
      name: "Go (Golang)",
      category: "backend",
      level: "Expert",
      desc: "Ultra-High Concurrency",
      icon: SiGo,
      brandColor: "#00add8",
    },
    {
      name: "Python / FastAPI",
      category: "backend",
      level: "Expert",
      desc: "Microservices & AI Backends",
      icon: SiPython,
      brandColor: "#3776ab",
    },
    {
      name: "Java / Spring Boot",
      category: "backend",
      level: "Advanced",
      desc: "Banking & Enterprise Microservices",
      icon: SiSpringboot,
      brandColor: "#6db33f",
    },
    {
      name: ".NET Core",
      category: "backend",
      level: "Advanced",
      desc: "Enterprise Distributed Services",
      icon: SiDotnet,
      brandColor: "#512bd4",
    },

    // Cloud & DevOps
    {
      name: "Amazon Web Services",
      category: "cloud",
      level: "Certified",
      desc: "AWS Partner Network Architecture",
      icon: FaAws,
      brandColor: "#ff9900",
    },
    {
      name: "Google Cloud Platform",
      category: "cloud",
      level: "Certified",
      desc: "GCP Global Infrastructure",
      icon: SiGooglecloud,
      brandColor: "#4285f4",
    },
    {
      name: "Kubernetes & Docker",
      category: "cloud",
      level: "Expert",
      desc: "Container Orchestration & Mesh",
      icon: SiKubernetes,
      brandColor: "#326ce5",
    },
    {
      name: "Terraform",
      category: "cloud",
      level: "Expert",
      desc: "Infrastructure as Code (IaC)",
      icon: SiTerraform,
      brandColor: "#844fba",
    },
    {
      name: "CI/CD Pipelines",
      category: "cloud",
      level: "Expert",
      desc: "Automated Deployments & GitOps",
      icon: SiGithubactions,
      brandColor: "#2088ff",
    },

    // AI & Data
    {
      name: "PyTorch & TensorFlow",
      category: "ai",
      level: "Expert",
      desc: "Deep Learning & Neural Networks",
      icon: SiPytorch,
      brandColor: "#ee4c2c",
    },
    {
      name: "OpenAI & Anthropic",
      category: "ai",
      level: "Expert",
      desc: "LLMs & Agentic Systems",
      icon: TbBrandOpenai,
      brandColor: "#10a37f",
    },
    {
      name: "Claude & Anthropic",
      category: "ai",
      level: "Expert",
      desc: "Advanced Reasoning Agents",
      icon: SiAnthropic,
      brandColor: "#d97706",
    },
    {
      name: "Vector Databases",
      category: "ai",
      level: "Expert",
      desc: "Pinecone / pgvector / Qdrant",
      icon: Database,
      brandColor: "#a855f7",
    },

    // Mobile
    {
      name: "React Native",
      category: "mobile",
      level: "Expert",
      desc: "Cross-Platform Mobile Ecosystem",
      icon: SiReact,
      brandColor: "#61dafb",
    },
    {
      name: "Flutter",
      category: "mobile",
      level: "Expert",
      desc: "Multi-Platform Fluid UI",
      icon: SiFlutter,
      brandColor: "#02569b",
    },
    {
      name: "Swift (iOS)",
      category: "mobile",
      level: "Advanced",
      desc: "Native Apple Mobile Architecture",
      icon: SiSwift,
      brandColor: "#f05138",
    },
    {
      name: "Kotlin (Android)",
      category: "mobile",
      level: "Advanced",
      desc: "Native Google Mobile Architecture",
      icon: SiKotlin,
      brandColor: "#7f52ff",
    },

    // Databases
    {
      name: "PostgreSQL",
      category: "database",
      level: "Expert",
      desc: "Relational & High-Throughput JSON",
      icon: SiPostgresql,
      brandColor: "#4169e1",
    },
    {
      name: "MongoDB",
      category: "database",
      level: "Expert",
      desc: "Distributed Document Database",
      icon: SiMongodb,
      brandColor: "#47a248",
    },
    {
      name: "Redis",
      category: "database",
      level: "Expert",
      desc: "In-Memory Caching & PubSub",
      icon: SiRedis,
      brandColor: "#ff4438",
    },
    {
      name: "Apache Kafka",
      category: "database",
      level: "Advanced",
      desc: "Distributed Event Streaming",
      icon: SiApachekafka,
      brandColor: "#ffffff",
    },
  ];

  const filtered =
    activeCategory === "all"
      ? technologies
      : technologies.filter((t) => t.category === activeCategory);

  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-3 py-1 rounded-full">
            Engineering Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Our Technology Stack
          </h2>
          <p className="mt-4 text-base text-slate-400">
            We build with world-class, battle-tested frameworks and cloud architectures that ensure your products scale effortlessly.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 scale-105"
                    : "bg-[#0c1424] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Tech Grid with Official Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0c1424]/90 border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/40 group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Official Tech Logo + Level Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#060b13] border border-slate-800 flex items-center justify-center shadow-md group-hover:border-slate-700 group-hover:scale-110 transition-transform">
                      <Icon
                        className="w-5 h-5 transition-transform"
                        style={{ color: item.brandColor }}
                      />
                    </div>

                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        item.level === "Certified"
                          ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          : item.level === "Expert"
                          ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                          : "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                      }`}
                    >
                      {item.level}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h4>
                </div>

                <p className="text-[11px] sm:text-xs text-slate-400 mt-2 font-mono line-clamp-2">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
