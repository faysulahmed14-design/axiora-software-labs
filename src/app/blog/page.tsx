"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Search,
  ArrowRight,
  Clock,
  Calendar,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  Cpu,
  Eye
} from "lucide-react";

interface PostItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  views: number;
  featured: boolean;
  tags: string[];
  createdAt: string;
}

export default function BlogListingPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "Cloud Architecture",
    "AI & Machine Learning",
    "Software Engineering",
    "Digital Strategy",
  ];

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const url =
        selectedCategory === "all"
          ? "/api/blog"
          : `/api/blog?category=${encodeURIComponent(selectedCategory)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.tags?.some((t) => t.toLowerCase().includes(q))
    );
  });

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const regularPosts = featuredPost
    ? filteredPosts.filter((p) => p._id !== featuredPost._id)
    : filteredPosts;

  return (
    <div className="min-h-screen bg-[#010206] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#060b13]/90 backdrop-blur-md border-b border-cyan-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/" className="relative w-36 h-10 block">
            <Image
              src="/axiora-logo-v2.png"
              alt="Axiora Software Labs"
              fill
              className="object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link
              href="/"
              className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <Link
              href="/#contact"
              className="px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-800/40 text-cyan-400 hover:bg-cyan-900/60 transition-all"
            >
              Consult an Architect
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-600/10 blur-[150px] pointer-events-none rounded-full" />

        <div className="relative text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Engineering & Architecture Insights
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Architectural Teardowns & <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">AI Breakthroughs</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Technical playbooks, distributed systems analyses, and production insights written directly by senior architects at Axiora Software Labs.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search by topic, architecture, or tech stack..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#0c1424] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all shadow-xl"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25"
                  : "bg-[#0c1424] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat === "all" ? "All Tracks" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full flex-1">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-slate-400">Loading Engineering Insights...</span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-base text-slate-400">No articles matched your search query.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-cyan-400"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Post Hero Card */}
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block rounded-3xl bg-gradient-to-r from-[#0c1424] via-[#091120] to-[#0d1628] border border-slate-800/90 hover:border-cyan-500/50 p-8 sm:p-12 shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full group-hover:bg-cyan-500/10 transition-colors" />

                <div className="flex items-center gap-2.5 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-[11px] font-bold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" /> Featured Teardown
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-cyan-300 transition-colors tracking-tight leading-snug max-w-4xl">
                  {featuredPost.title}
                </h2>

                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-white">{featuredPost.author}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {featuredPost.views} reads
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                    Read Full Teardown <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            )}

            {/* Regular Grid */}
            {regularPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group rounded-2xl bg-[#0c1424] border border-slate-800/80 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-800/30 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                      <span className="text-[11px] font-medium text-slate-300 truncate max-w-[140px]">
                        {post.author}
                      </span>
                      <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Read <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-950/40 py-8 bg-[#010206] text-center text-xs text-slate-500">
        <p>&copy; 2026 Axiora Software Labs Inc. &bull; Malibagh, Dhaka, Bangladesh</p>
      </footer>
    </div>
  );
}
