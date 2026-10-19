"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Code2,
  Cpu,
  Cloud,
  Smartphone,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Share2,
  Target,
  Search,
  Palette,
  Handshake,
  Workflow,
  Compass,
  Layers
} from "lucide-react";

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "engineering" | "marketing">("all");
  const [activeId, setActiveId] = useState("custom-software");

  const services = [
    // --- Software & AI Engineering ---
    {
      id: "custom-software",
      category: "engineering",
      title: "Custom Software Engineering",
      shortTitle: "Custom Software",
      icon: Code2,
      image: "/images/services/custom-software.jpg",
      tagline: "Tailored software systems engineered for extreme scale, security, and velocity.",
      description:
        "We build bespoke software from ground-up architectures to complex distributed backends. Our team delivers enterprise-grade software engineered with clean code paradigms, domain-driven design, and battle-tested DevOps pipelines.",
      features: [
        "Distributed Microservices & Event-Driven Systems",
        "Legacy Code Refactoring & Cloud Modernization",
        "High-Concurrency High-Availability APIs (GraphQL & REST)",
        "Database Architecture & Performance Optimization",
      ],
      technologies: ["Node.js", "Go", "Python", "React", "Next.js", "PostgreSQL", "Kafka", "Docker"],
      impact: "300% faster feature releases with zero unscheduled downtime.",
    },
    {
      id: "ai-ml",
      category: "engineering",
      title: "AI & Machine Learning Engineering",
      shortTitle: "AI & Machine Learning",
      icon: Cpu,
      image: "/images/services/ai-ml.jpg",
      tagline: "Harness autonomous AI agents, enterprise LLMs, and predictive intelligence.",
      description:
        "From fine-tuning specialized domain LLMs and Retrieval-Augmented Generation (RAG) to building predictive computer vision systems, we unlock actionable business value through modern AI engineering.",
      features: [
        "Enterprise LLM Integration & Private RAG Pipelines",
        "Autonomous AI Agents for Workflow Automation",
        "Predictive Modeling & Big Data Analytics",
        "Computer Vision & NLP Solutions",
      ],
      technologies: ["Python", "PyTorch", "TensorFlow", "OpenAI", "LangChain", "Vector DBs (Pinecone/pgvector)", "HuggingFace"],
      impact: "Reduced operational processing time by up to 75% for finance & logistics clients.",
    },
    {
      id: "cloud-devops",
      category: "engineering",
      title: "Cloud & DevOps Architecture",
      shortTitle: "Cloud & DevOps",
      icon: Cloud,
      image: "/images/services/cloud-devops.jpg",
      tagline: "Cloud-native infrastructure with automated CI/CD and self-healing Kubernetes clusters.",
      description:
        "Accelerate your deployment frequency and slash cloud expenditures. Our AWS, Azure, and Google Cloud architects design fault-tolerant, auto-scaling architectures with automated security audits.",
      features: [
        "Multi-Cloud & Hybrid Cloud Migration",
        "Infrastructure as Code (Terraform, Pulumi)",
        "Kubernetes Orchestration & Service Mesh (Istio)",
        "Zero-Trust Cloud Security & 24/7 SRE Monitoring",
      ],
      technologies: ["AWS", "Google Cloud", "Azure", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Prometheus"],
      impact: "Achieved 99.999% system availability and 40% reduction in cloud infrastructure bills.",
    },
    {
      id: "mobile-apps",
      category: "engineering",
      title: "Mobile App Development",
      shortTitle: "Mobile Apps",
      icon: Smartphone,
      image: "/images/services/mobile-apps.jpg",
      tagline: "Native and cross-platform mobile apps with fluid animations and offline sync.",
      description:
        "We engineer high-performance mobile applications for iOS and Android that users love. From real-time messaging and biometric authentication to low-latency payment processing.",
      features: [
        "iOS (Swift) & Android (Kotlin) Native Development",
        "High-Performance Cross-Platform (React Native & Flutter)",
        "Offline-First Data Synchronization & Push Notifications",
        "App Store & Google Play Continuous Delivery Pipeline",
      ],
      technologies: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "GraphQL", "WebSockets"],
      impact: "Over 5M+ combined active users across mobile applications developed by our teams.",
    },
    {
      id: "enterprise-solutions",
      category: "engineering",
      title: "Enterprise Digital Modernization",
      shortTitle: "Enterprise Modernization",
      icon: Building2,
      image: "/images/services/enterprise.jpg",
      tagline: "Transform monolithic enterprise workflows into agile, modern digital platforms.",
      description:
        "We help large organizations dismantle legacy bottlenecks by integrating modern ERP, CRM, and automated BPM workflows without disrupting active business operations.",
      features: [
        "Enterprise ERP & CRM Custom Development & Integration",
        "B2B Portal & Partner Integration Platforms",
        "Automated Field Force & Inventory Systems",
        "Cross-System Data Harmonization & BI Dashboards",
      ],
      technologies: ["NestJS", "Java / Spring Boot", ".NET Core", "Odoo", "Salesforce Integration", "Power BI"],
      impact: "Streamlined inter-department operations across 12 countries for retail & logistics groups.",
    },
    {
      id: "qa-security",
      category: "engineering",
      title: "QA Automation & Cyber Security",
      shortTitle: "QA & Security",
      icon: ShieldCheck,
      image: "/images/services/qa-security.jpg",
      tagline: "Bulletproof software quality with automated test suites and ISO-standard audits.",
      description:
        "We eliminate production bugs and safeguard sensitive client data with continuous automated regression testing, penetration testing, and security compliance verification.",
      features: [
        "Automated E2E, Integration, & Load Testing (Playwright, Cypress)",
        "Vulnerability Assessment & Penetration Testing (VAPT)",
        "OWASP Top 10 Security Hardening & Zero-Day Patching",
        "Performance Benchmarking & Stress Simulation",
      ],
      technologies: ["Playwright", "Cypress", "JMeter", "Selenium", "SonarQube", "OWASP ZAP", "Postman"],
      impact: "Zero critical security incidents and 98% automated test coverage in production deployments.",
    },

    // --- Digital Marketing & Creative Growth ---
    {
      id: "social-media-marketing",
      category: "marketing",
      title: "Social Media Marketing",
      shortTitle: "Social Media Marketing",
      icon: Share2,
      image: "/images/services/social-media-marketing.jpg",
      tagline: "Data-driven social campaigns that turn casual followers into passionate brand evangelists.",
      description:
        "We architect multi-channel social media strategies across Meta, LinkedIn, X, TikTok, and YouTube. From viral storytelling and community management to conversion-optimized organic funnels.",
      features: [
        "Omnichannel Content Strategy & Visual Storytelling",
        "Community Growth, Moderation & Brand Engagement",
        "Viral Reels, TikToks & Short-Form Video Production",
        "Social Listening, Trend Analytics & Sentiment Intelligence",
      ],
      technologies: ["Meta Business Suite", "LinkedIn Campaign Manager", "TikTok Ads", "Buffer", "Hootsuite", "Canva Pro", "Sprout Social"],
      impact: "Delivered +240% organic reach and 4.2x audience engagement growth for brand partners.",
    },
    {
      id: "paid-advertising",
      category: "marketing",
      title: "Paid Advertising (PPC & Performance)",
      shortTitle: "Paid Advertising",
      icon: Target,
      image: "/images/services/paid-advertising.jpg",
      tagline: "High-ROI PPC, programmatic ads, and conversion-optimized performance funnels.",
      description:
        "Maximize your customer acquisition efficiency with precision-targeted Google Ads, Meta Ads, LinkedIn B2B campaigns, and remarketing funnels engineered for maximum Return on Ad Spend (ROAS).",
      features: [
        "Google Search, Performance Max & Display Network",
        "Meta Ads (Facebook & Instagram Hyper-Targeting)",
        "B2B LinkedIn Account-Based Advertising (ABM)",
        "Conversion Rate Optimization (CRO) & A/B Split Testing",
      ],
      technologies: ["Google Ads", "Meta Pixel & CAPI", "Google Tag Manager", "LinkedIn Ads", "TikTok Ads Manager", "Hotjar", "GA4"],
      impact: "Achieved average 4.8x ROAS and reduced Cost Per Acquisition (CPA) by 38%.",
    },
    {
      id: "seo",
      category: "marketing",
      title: "Search Engine Optimization (SEO)",
      shortTitle: "Search Engine Optimization",
      icon: Search,
      image: "/images/services/seo.jpg",
      tagline: "Dominate search engine rankings with technical SEO and high-intent keyword authority.",
      description:
        "Propel your brand to the top of Google and Bing with comprehensive technical audits, programmatic SEO architectures, content topical authority, and high-impact white-hat backlink acquisition.",
      features: [
        "Technical Core Web Vitals Audits & Site Architecture",
        "High-Intent Keyword Research & Content Topical Clusters",
        "Local SEO, Google Business Profile & Geotargeting",
        "Authority Link Building & White-Hat Digital PR",
      ],
      technologies: ["SEMrush", "Ahrefs", "Google Search Console", "Screaming Frog", "SurferSEO", "Yoast", "Schema.org"],
      impact: "Drove over 1.2M+ organic search visits with 85% of target keywords on Google Page 1.",
    },
    {
      id: "graphic-design",
      category: "marketing",
      title: "Graphic Design & Creative Marketing",
      shortTitle: "Graphic Design & Creative",
      icon: Palette,
      image: "/images/services/graphic-design.jpg",
      tagline: "Visual identity, brand collateral, and high-converting creative ad assets.",
      description:
        "Transform your visual branding with striking creative design that captivates audiences. We craft memorable brand identity systems, high-converting ad banners, social collateral, 3D graphics, and packaging.",
      features: [
        "Complete Corporate Brand Identity & Design Systems",
        "High-Converting Ad Creatives (Static, Carousel, Motion)",
        "UI/UX Visual Prototyping & Pitch Deck Presentations",
        "Vector Illustrations, 3D Renderings & Print Media",
      ],
      technologies: ["Figma", "Adobe Illustrator", "Photoshop", "After Effects", "Blender 3D", "InDesign"],
      impact: "Boosted creative click-through rates (CTR) by 62% across multichannel ad creatives.",
    },
    {
      id: "influencer-marketing",
      category: "marketing",
      title: "Influencer & Affiliate Marketing",
      shortTitle: "Influencer & Affiliate",
      icon: Handshake,
      image: "/images/services/influencer-marketing.jpg",
      tagline: "Leverage vetted creator networks and performance affiliate partnerships.",
      description:
        "Tap into hyper-engaged creator audiences that resonate with your product. We manage end-to-end influencer outreach, negotiation, contractual compliance, tracking links, and affiliate network scaling.",
      features: [
        "Vetted Nano, Micro & Macro Influencer Matchmaking",
        "End-to-End Campaign Outreach, Contracts & Gifting",
        "Custom Affiliate Tracking, Commission Tiers & Payouts",
        "UGC (User-Generated Content) Licensing & Paid Amplification",
      ],
      technologies: ["Grin", "Upfluence", "Impact.com", "ShareASale", "TrackDesk", "Refersion"],
      impact: "Generated 3.5M+ organic impressions and 18,000+ new verified customer acquisitions.",
    },
    {
      id: "marketing-automation",
      category: "marketing",
      title: "Marketing Automation & CRM",
      shortTitle: "Marketing Automation & CRM",
      icon: Workflow,
      image: "/images/services/marketing-automation.jpg",
      tagline: "Nurture leads automatically with intelligent email flows and synced CRM pipelines.",
      description:
        "Turn cold prospects into loyal customers on autopilot. We design hyper-personalized email workflows, lead scoring algorithms, SMS triggers, and bidirectional CRM integrations with zero leakage.",
      features: [
        "Automated Customer Lifecycle Email & SMS Journeys",
        "Lead Scoring, Behavioral Triggers & Dynamic Segmentation",
        "HubSpot, ActiveCampaign & Klaviyo Architecture",
        "Omnichannel CRM Pipeline Synchronization & Attribution",
      ],
      technologies: ["HubSpot", "Klaviyo", "ActiveCampaign", "Zapier", "Make.com", "Salesforce", "Customer.io"],
      impact: "Increased customer repeat purchase rates by 45% and automated 90% of lead qualification.",
    },
    {
      id: "digital-marketing-strategy",
      category: "marketing",
      title: "Digital Marketing Strategy & Management",
      shortTitle: "Marketing Strategy & Mgmt",
      icon: Compass,
      image: "/images/services/digital-marketing-strategy.jpg",
      tagline: "Comprehensive full-funnel digital marketing roadmaps aligned with revenue KPIs.",
      description:
        "Stop guessing and start scaling with a battle-tested digital marketing playbook. Our fractional CMOs and senior strategists analyze competitors, define go-to-market roadmaps, and manage multichannel execution.",
      features: [
        "Fractional CMO & Executive Marketing Leadership",
        "Go-To-Market (GTM) Strategy & Customer Persona Mapping",
        "Full-Funnel Attribution Modeling & CAC:LTV Optimization",
        "Quarterly Growth Roadmaps & KPI Performance Tracking",
      ],
      technologies: ["Looker Studio", "Google Analytics 4", "Mixpanel", "Tableau", "Supermetrics", "Notion"],
      impact: "Helped enterprise and startup clients achieve predictable, sustainable 3x YoY revenue growth.",
    },
  ];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  // Fallback if activeId is not in filtered list
  const current =
    filteredServices.find((s) => s.id === activeId) || filteredServices[0];

  const handleCategoryChange = (cat: "all" | "engineering" | "marketing") => {
    setActiveCategory(cat);
    const newFiltered = cat === "all" ? services : services.filter((s) => s.category === cat);
    if (!newFiltered.some((s) => s.id === activeId)) {
      setActiveId(newFiltered[0].id);
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden scroll-mt-16">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Full-Spectrum Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Technology & Growth Services Built for High Scale
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            From resilient enterprise software and AI architectures to high-converting performance marketing and organic growth funnels.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === "all"
                ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 scale-105"
                : "bg-[#0c1424] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>All Services ({services.length})</span>
          </button>
          <button
            onClick={() => handleCategoryChange("engineering")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === "engineering"
                ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 scale-105"
                : "bg-[#0c1424] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Software & AI Engineering (6)</span>
          </button>
          <button
            onClick={() => handleCategoryChange("marketing")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === "marketing"
                ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 scale-105"
                : "bg-[#0c1424] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Digital Marketing & Growth (7)</span>
          </button>
        </div>

        {/* Horizontal Tab Buttons with Fundamental Picture Thumbnails */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar mb-10 border-b border-slate-800">
          {filteredServices.map((item) => {
            const isActive = current.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/25 to-indigo-500/25 text-cyan-300 border border-cyan-500/50 shadow-xl shadow-cyan-950/50 scale-[1.02]"
                    : "text-slate-400 hover:text-slate-200 bg-[#0c1424]/80 hover:bg-slate-800/70 border border-slate-800/80"
                }`}
              >
                {/* Micro Thumbnail Image */}
                <div className="relative w-6 h-6 rounded-lg overflow-hidden shrink-0 border border-slate-700/80 group-hover:scale-105 transition-transform">
                  <Image
                    src={item.image}
                    alt={item.shortTitle}
                    fill
                    className="object-cover"
                    sizes="24px"
                  />
                </div>
                <span>{item.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display Card */}
        <div className="relative rounded-3xl bg-[#0c1424]/90 border border-slate-800 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Description & Bullet features */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center shrink-0">
                  <current.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {current.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-400/90 font-medium">
                    {current.tagline}
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2 mb-6">
                {current.description}
              </p>

              {/* Key Features */}
              <div className="space-y-3 mb-8">
                {current.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Consult on {current.shortTitle}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: High-Res Fundamental Visual Preview & Tech Stack */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Fundamental Service Visual Image */}
              <div className="relative h-60 sm:h-64 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-2xl group">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1424] via-[#0c1424]/30 to-black/20" />

                {/* Service Category Tag */}
                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#060b13]/85 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 backdrop-blur-md">
                  {current.category === "engineering" ? "Engineering" : "Marketing & Growth"}
                </div>

                {/* Bottom Impact Floating Strip */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 rounded-xl bg-[#0c1424]/90 border border-cyan-500/30 backdrop-blur-md">
                  <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                    Proven Impact
                  </div>
                  <div className="text-xs font-semibold text-slate-100 mt-0.5 line-clamp-2">
                    &ldquo;{current.impact}&rdquo;
                  </div>
                </div>
              </div>

              {/* Technologies Pill Grid */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2.5 block">
                  Featured Platforms & Tools
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
