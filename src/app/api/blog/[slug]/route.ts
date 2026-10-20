import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectToDatabase();

    const post = await BlogPost.findOneAndUpdate(
      { slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    // Also find related posts in the same category
    const related = await BlogPost.find({
      category: post.category,
      slug: { $ne: slug },
      published: true,
    })
      .limit(3)
      .select("title slug excerpt category readTime createdAt")
      .lean();

    return NextResponse.json({ success: true, post, related }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to load article" },
      { status: 500 }
    );
  }
}
