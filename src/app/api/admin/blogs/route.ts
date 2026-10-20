import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { slugify, calculateReadTime } from "@/lib/slugify";

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const query: any = {};
    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [{ title: regex }, { category: regex }, { author: regex }];
    }

    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, posts }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, excerpt, content, category, author, tags, published, featured } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { success: false, error: "Title, excerpt, and content are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    let slug = slugify(title);
    // Ensure uniqueness
    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const post = await BlogPost.create({
      title: title.trim(),
      slug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category || "Software Engineering",
      author: author || "Axiora Architecture Pod",
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t: string) => t.trim()) : [],
      readTime: calculateReadTime(content),
      published: published !== undefined ? published : true,
      featured: featured !== undefined ? featured : false,
      views: 0,
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to create article" },
      { status: 500 }
    );
  }
}
