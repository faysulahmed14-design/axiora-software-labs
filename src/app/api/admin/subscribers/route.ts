import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";

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
      query.email = new RegExp(search.trim(), "i");
    }

    const subscribers = await Subscriber.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, subscribers }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}
