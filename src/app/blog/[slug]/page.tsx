"use client";

import React, { useState, useEffect, use, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  Eye,
  Calendar,
  Share2,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

interface PostDetail {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  views: number;
  tags: string[];
  createdAt: string;
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  createdAt: string;
}

function BlogPostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [post, setPost] = useState<PostDetail | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/${slug}`);
      const data = await res.json();
      if (data.success) {
        setPost(data.post);
        setRelated(data.related || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#010206] text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-400">Loading Article...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#010206] text-slate-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-white mb-2">Article Not Found</h1>
        <p className="text-xs text-slate-400 mb-6">The requested publication could not be found or has been moved.</p>
        <Link
          href="/blog"
          className="px-5 py-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/40 text-cyan-400 text-xs font-semibold hover:bg-cyan-900/60 transition-all"
        >
          ← Return to All Insights
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010206] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#060b13]/90 backdrop-blur-md border-b border-cyan-950/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <Link href="/" className="relative w-36 h-10 block">
            <Image
              src="/axiora-logo-v2.png"
              alt="Axiora Software Labs"
              fill
              className="object-contain"
              priority
            />
          </Link>

          <Link
            href="/blog"
            className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Insights
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        {/* Meta Header */}
        <div className="space-y-4 pb-8 border-b border-slate-800/80">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs font-medium transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Link Copied
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" /> Share Article
                </>
              )}
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 font-bold text-[10px]">
                A
              </div>
              <span className="text-white font-semibold">{post.author}</span>
            </div>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> {post.views} views
            </span>
          </div>
        </div>

        {/* Article Body */}
        <article className="py-10 prose prose-invert max-w-none text-slate-300 text-base leading-relaxed space-y-6">
          {post.content.split("\n\n").map((block, idx) => {
            const trimmed = block.trim();

            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={idx} className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-6 pb-2 border-b border-slate-800">
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }

            if (trimmed.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-xl font-bold text-cyan-300 tracking-tight pt-4">
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }

            if (trimmed.startsWith("> ")) {
              return (
                <blockquote key={idx} className="p-4 rounded-xl bg-cyan-950/30 border-l-4 border-cyan-400 text-slate-200 italic my-4">
                  {trimmed.replace("> ", "")}
                </blockquote>
              );
            }

            if (trimmed.startsWith("```")) {
              const code = trimmed.replace(/```[a-z]*\n?/g, "").trim();
              return (
                <pre key={idx} className="p-4 rounded-xl bg-[#070c16] border border-slate-800 overflow-x-auto text-xs font-mono text-cyan-300">
                  <code>{code}</code>
                </pre>
              );
            }

            if (trimmed.startsWith("- ")) {
              const lines = trimmed.split("\n");
              return (
                <ul key={idx} className="list-disc list-inside space-y-2 pl-2">
                  {lines.map((li, liIdx) => (
                    <li key={liIdx}>{li.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }

            if (/^\d+\./.test(trimmed)) {
              const lines = trimmed.split("\n");
              return (
                <ol key={idx} className="list-decimal list-inside space-y-2 pl-2">
                  {lines.map((li, liIdx) => (
                    <li key={liIdx}>{li.replace(/^\d+\.\s*/, "")}</li>
                  ))}
                </ol>
              );
            }

            return <p key={idx}>{trimmed}</p>;
          })}
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-6 pb-8 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold mr-1">Tags:</span>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-[#0c1424] border border-slate-800 text-[11px] font-medium text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Consultation Callout Banner */}
        <div className="my-12 p-8 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-800/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Work with Axiora
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to Build Resilient Software or Custom AI?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Schedule a technical discovery session with our Solution Architects. Receive an architectural assessment within 24 hours.
            </p>
          </div>

          <Link
            href="/#contact"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-semibold text-xs whitespace-nowrap shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            Start Project Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="pt-10 border-t border-slate-800/80 space-y-6">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Related Engineering Teardowns
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/blog/${rel.slug}`}
                  className="p-5 rounded-2xl bg-[#0c1424] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mt-2 line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-xs text-slate-500 mt-4 flex items-center justify-between">
                    <span>{rel.readTime}</span>
                    <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center">
                      Read <ChevronRight className="w-3 h-3" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
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

export default function SingleBlogPage(props: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#010206] text-slate-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-slate-400">Loading Publication...</span>
          </div>
        </div>
      }
    >
      <BlogPostContent {...props} />
    </Suspense>
  );
}
