import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { slugify, calculateReadTime } from "@/lib/slugify";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    await connectToDatabase();

    const updateData: any = { ...body };

    if (body.title && !body.slug) {
      updateData.slug = slugify(body.title);
    }
    if (body.content) {
      updateData.readTime = calculateReadTime(body.content);
    }
    if (typeof body.tags === "string") {
      updateData.tags = body.tags.split(",").map((t: string) => t.trim());
    }

    const updated = await BlogPost.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: updated }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();

    await BlogPost.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Article deleted" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to delete article" },
      { status: 500 }
    );
  }
}
