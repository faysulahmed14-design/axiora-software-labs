"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  ShieldCheck,
  Send,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "Custom Software Engineering",
    budget: "$25,000 - $50,000",
    message: "",
    _hp_check: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "Custom Software Engineering",
        budget: "$25,000 - $50,000",
        message: "",
        _hp_check: "",
      });
    } catch (err: any) {
      setErrorMessage(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden scroll-mt-16">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Advisory */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Start Your Engagement
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Let&apos;s Build Your Next High-Performance Software Platform
              </h2>

              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                Whether you need a dedicated full-stack engineering team, modernizing a legacy enterprise system, or building a bespoke AI model, our senior architects are ready to assist.
              </p>

              {/* Guarantees */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Guaranteed Fast Response</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      You will receive a tailored technical assessment from a Solution Architect within 24 business hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Strict Non-Disclosure (NDA)</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Your IP, source code, and business concepts are 100% confidential under mutual enterprise NDAs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct channels */}
              <div className="mt-10 p-6 rounded-2xl bg-[#0c1424] border border-slate-800 space-y-3">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Direct Inquiries
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <a href="mailto:axiorasoftwarelabs@gmail.com" className="hover:text-cyan-400 transition-colors">
                    axiorasoftwarelabs@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <a href="tel:+8801346658678" className="hover:text-cyan-400 transition-colors">
                    01346658678 (Dhaka Office)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0c1424]/90 border border-slate-800 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
              {submitted ? (
                <div className="py-16 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mb-6 text-cyan-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                    Thank you for reaching out to Axiora Software Labs. An Enterprise Solution Architect has been assigned to review your inquiry and will reach out shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-all"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      Request a Project Consultation
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Fill out the form below to receive a customized architecture proposal and estimate.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
                      <span className="text-base">⚠️</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-[#070c16] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#070c16] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Company Name / URL
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Corp (acme.com)"
                        className="w-full px-4 py-3 rounded-xl bg-[#070c16] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Primary Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#070c16] border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                      >
                        <option>Custom Software Engineering</option>
                        <option>AI & Machine Learning</option>
                        <option>Cloud & DevOps Architecture</option>
                        <option>Mobile App Development</option>
                        <option>Enterprise Modernization / ERP</option>
                        <option>Dedicated Developer Pods</option>
                        <option>QA & Security Audit</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#070c16] border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    >
                      <option>$10,000 - $25,000</option>
                      <option>$25,000 - $50,000</option>
                      <option>$50,000 - $100,000</option>
                      <option>$100,000 - $250,000</option>
                      <option>$250,000+ (Enterprise Scale)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Project Goals & Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your objectives, target timeline, technical requirements, or current challenges..."
                      className="w-full px-4 py-3 rounded-xl bg-[#070c16] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Transmitting to Engineering Team...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Request Proposal & Consultation
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    By submitting, you agree to our standard mutual NDA and privacy terms.
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
