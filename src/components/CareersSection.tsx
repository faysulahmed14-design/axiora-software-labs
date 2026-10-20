"use client";

import React, { useState } from "react";
import {
  Briefcase,
  UploadCloud,
  CheckCircle2,
  FileText,
  Sparkles,
  Send,
  Zap,
  GraduationCap,
  Heart,
  Globe2
} from "lucide-react";

export default function CareersSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileData, setFileData] = useState<{
    name: string;
    size: number;
    dataUrl: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Full-Stack Software Engineer",
    portfolioUrl: "",
    note: "",
    _hp_check: "",
  });

  const perks = [
    {
      title: "Competitive Compensation",
      desc: "Top-tier compensation packages with bi-annual performance evaluations & bonuses.",
      icon: Zap,
    },
    {
      title: "Modern Tech & Hardware",
      desc: "Latest Apple M-series workstations, dual monitors, and unlimited AI tooling credits.",
      icon: Sparkles,
    },
    {
      title: "Learning & Growth",
      desc: "Cloud certification sponsorships (AWS/GCP), conference tickets, and technical mentorship.",
      icon: GraduationCap,
    },
    {
      title: "Flexible Work Culture",
      desc: "Autonomous agile pods with flexible timings from our Malibagh, Dhaka Innovation Hub.",
      icon: Heart,
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("File size exceeds 10MB limit. Please upload a smaller PDF/DOCX.");
        return;
      }
      setFileName(file.name);
      setErrorMessage(null);
      const reader = new FileReader();
      reader.onload = () => {
        setFileData({
          name: file.name,
          size: file.size,
          dataUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          resumeFileName: fileData?.name || fileName || "",
          resumeFileSize: fileData?.size || 0,
          resumeDataUrl: fileData?.dataUrl || "",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit job application.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "Full-Stack Software Engineer",
        portfolioUrl: "",
        note: "",
        _hp_check: "",
      });
      setFileName(null);
      setFileData(null);
    } catch (err: any) {
      setErrorMessage(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="careers" className="py-24 bg-[#080e1b]/80 border-t border-slate-800/80 relative scroll-mt-16">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" /> We Are Hiring Top Talent
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Join Our Team
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Passionate about building resilient distributed systems, mission-critical cloud backends, and cutting-edge AI architectures? Submit your CV and grow with Axiora Software Labs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Perks & Culture */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Why Build Your Career at Axiora?
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                We believe exceptional software is built by empowered developers. We foster an engineering-first culture with zero bureaucracy and maximum creative freedom.
              </p>
            </div>

            {/* Perks Grid */}
            <div className="space-y-4 pt-2">
              {perks.map((perk, idx) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#0c1424] border border-slate-800 flex items-start gap-4 hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{perk.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        {perk.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Office Badge */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 flex items-center gap-3">
              <Globe2 className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-white">Office Location: </span>
                Malibagh, Dhaka, Bangladesh (Hybrid & On-site Pods)
              </div>
            </div>
          </div>

          {/* Right Column: CV Submission Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0c1424]/90 border border-slate-800 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
              {submitted ? (
                <div className="py-16 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-6 text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for applying to Axiora Software Labs. Our engineering hiring committee reviews every CV carefully. If your background matches an active track, our team will reach out via email or phone.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFileName(null);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-all"
                  >
                    Submit Another CV
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot Bot Trap: Invisible to human users, traps automated scrapers & bots */}
                  <input
                    type="text"
                    name="_hp_check"
                    value={formData._hp_check}
                    onChange={(e) => setFormData({ ...formData, _hp_check: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", opacity: 0, zIndex: -1, pointerEvents: "none", width: 0, height: 0 }}
                  />

                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Submit Your CV / Resume
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Fill out the form below and attach your latest resume.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
                      <span className="text-base">⚠️</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Tanvir Ahmed"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070c16] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. tanvir@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070c16] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070c16] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Role You Are Applying For *
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070c16] border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all"
                      >
                        <option>Full-Stack Software Engineer</option>
                        <option>Frontend Engineer (Next.js / React)</option>
                        <option>Backend Engineer (Go / Node.js / Python)</option>
                        <option>AI / Machine Learning Engineer</option>
                        <option>Mobile App Developer (Flutter / React Native)</option>
                        <option>DevOps & Cloud Engineer (AWS / Kubernetes)</option>
                        <option>QA Automation & Testing Engineer</option>
                        <option>UI/UX Product Designer</option>
                        <option>Internship / Junior Developer</option>
                        <option>General Application</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      GitHub / LinkedIn / Portfolio URL
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      placeholder="https://github.com/your-username"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070c16] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>

                  {/* CV Upload Box */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Upload Your CV (PDF or DOCX) *
                    </label>
                    <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700/80 rounded-2xl cursor-pointer hover:border-cyan-500/60 bg-[#070c16]/70 hover:bg-[#070c16] transition-all group">
                      <input
                        type="file"
                        required
                        accept=".pdf,.docx,.doc"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <UploadCloud className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform mb-2" />
                      {fileName ? (
                        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                          <FileText className="w-4 h-4" />
                          <span>{fileName}</span>
                        </div>
                      ) : (
                        <>
                          <span className="text-xs sm:text-sm font-medium text-slate-200">
                            Click to upload your resume
                          </span>
                          <span className="text-[11px] text-slate-500 mt-1">
                            PDF, DOCX up to 10MB
                          </span>
                        </>
                      )}
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Short Note / About Yourself (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="Tell us about your core strengths, preferred tech stack, or why you want to join Axiora..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070c16] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Uploading CV & Submitting...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Application
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    We respect your privacy. Your application and CV will only be reviewed by our internal talent acquisition team.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
