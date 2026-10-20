import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { slugify, calculateReadTime } from "@/lib/slugify";

// Seed articles if empty
const INITIAL_ARTICLES = [
  {
    title: "Architecting Ultra-Low Latency Cloud Backends with Go and Kubernetes",
    excerpt: "How our senior engineering teams design microservice architectures that maintain sub-15ms p99 latency under 200,000 concurrent RPS.",
    category: "Cloud Architecture",
    author: "Tariqul Islam & Axiora Backend Pod",
    tags: ["Kubernetes", "Go", "Cloud", "Microservices"],
    featured: true,
    content: `## The Modern Latency Challenge

In mission-critical enterprise systems, latency is not merely an engineering metric—it directly dictates revenue retention, transactional throughput, and user trust. When dealing with high-frequency financial platforms or real-time IoT feeds, sub-15ms p99 response times are an uncompromising necessity.

### 1. Eliminating Serialization Bottlenecks with Protocol Buffers
Traditional JSON-over-HTTP architectures suffer from excessive parsing overhead and payload bloat. By migrating internal service-to-service communications to gRPC and Protocol Buffers, we achieved:
- **68% reduction** in network payload footprints
- **4.2x faster** CPU deserialization speed
- Strict type-safety guarantees across polyglot microservice boundaries

\`\`\`go
// High-performance concurrency pool
type WorkerPool struct {
    Tasks chan Task
    Limit int
}
\`\`\`

### 2. Multi-Region Kubernetes Topology with Envoy Service Mesh
Deploying services across geographical pods demands intelligent load balancing. Utilizing Envoy proxy with active circuit breakers prevents cascading failures when downstream database shards experience transient degradation.

### 3. Conclusion
Architecting resilient cloud backends requires disciplined zero-allocation memory practices in Go, fine-tuned Linux kernel network buffers, and automated canary deployments. At Axiora Software Labs, these architectural patterns form the core of every enterprise platform we ship.`,
  },
  {
    title: "The Shift to Compound AI Systems: Why Single LLMs Are No Longer Enough",
    excerpt: "Analyzing why modern enterprise AI is moving from raw foundation models to agentic orchestration pipelines, verified retrieval, and deterministic verification.",
    category: "AI & Machine Learning",
    author: "Axiora AI Research Lab",
    tags: ["AI", "LLMs", "RAG", "Agentic Systems"],
    featured: true,
    content: `## Beyond the Single-Model Paradigm

In 2023, the industry focused on scaling raw Foundation Models. However, enterprise production deployments quickly revealed critical shortcomings: stochastic hallucinations, lack of fresh domain state, and prohibitive reasoning costs.

### What Is a Compound AI System?
A compound AI system integrates multiple collaborating components rather than relying solely on a single monolithic prompt:
1. **Dynamic Retrieval (Vector + BM25 Hybrid Search)**
2. **Deterministic Code Execution & Schema Validation**
3. **Multi-Agent Deliberation and Self-Correction Loops**

> "Real enterprise reliability doesn't come from a bigger model; it comes from surrounding the model with deterministic guardrails and architectural verification."

### Real-World Business Impact
In an automated customer underwriting pipeline deployed by Axiora Software Labs, switching to a compound multi-agent architecture reduced output hallucinations by **97.4%** while slashing inference costs by **64%**.`,
  },
  {
    title: "Next.js App Router & Server Components: Enterprise Performance Blueprint",
    excerpt: "Deep architectural breakdown of React 19 Server Components, streaming partial pre-rendering, and global caching patterns for corporate platforms.",
    category: "Software Engineering",
    author: "Axiora Frontend Architecture Team",
    tags: ["Next.js", "React", "Frontend", "Performance"],
    featured: false,
    content: `## The Evolution of Corporate Web Engineering

Modern corporate portals demand the speed of static sites combined with the dynamic capabilities of enterprise web applications. With Next.js App Router and React Server Components (RSC), developers no longer have to compromise.

### Zero-Bundle Server Components
By default, React Server Components execute exclusively on the Node/Edge runtime:
- **0 KB client JavaScript bundle overhead** for rendered components
- Direct, secure access to databases and microservices without exposing internal endpoints
- Automatic streaming HTML with progressive hydration

### Practical Production Lessons
1. Keep stateful interactions strictly at the leaf nodes of your component tree.
2. Leverage partial pre-rendering (PPR) for instant initial shell loads.
3. Use Next.js persistent cache tagging for on-demand invalidation.`,
  },
];

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Check count; seed if empty
    const count = await BlogPost.countDocuments();
    if (count === 0) {
      for (const item of INITIAL_ARTICLES) {
        await BlogPost.create({
          ...item,
          slug: slugify(item.title),
          readTime: calculateReadTime(item.content),
          published: true,
          views: Math.floor(Math.random() * 300) + 120,
        });
      }
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "20");

    const query: any = { published: true };
    if (category && category !== "all") {
      query.category = category;
    }
    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [{ title: regex }, { excerpt: regex }, { category: regex }, { tags: regex }];
    }

    const posts = await BlogPost.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, posts }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
