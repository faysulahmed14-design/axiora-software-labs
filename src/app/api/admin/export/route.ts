import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import JobApplication from "@/models/JobApplication";
import Subscriber from "@/models/Subscriber";

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "inquiries";

  try {
    await connectToDatabase();

    if (type === "subscribers") {
      const subs = await Subscriber.find({}).sort({ createdAt: -1 }).lean();
      const headers = ["ID", "Email", "Status", "Source", "Subscribed At"];
      const rows = subs.map((s: any) => [
        `"${s._id}"`,
        `"${(s.email || "").replace(/"/g, '""')}"`,
        `"${s.status || ""}"`,
        `"${s.source || ""}"`,
        `"${new Date(s.createdAt).toISOString()}"`,
      ]);

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="axiora-subscribers-${Date.now()}.csv"`,
        },
      });
    } else if (type === "applications") {
      const apps = await JobApplication.find({}).sort({ createdAt: -1 }).lean();
      const headers = ["ID", "Name", "Email", "Phone", "Role", "Status", "Resume", "Created At"];
      const rows = apps.map((a: any) => [
        `"${a._id}"`,
        `"${(a.name || "").replace(/"/g, '""')}"`,
        `"${(a.email || "").replace(/"/g, '""')}"`,
        `"${(a.phone || "").replace(/"/g, '""')}"`,
        `"${(a.role || "").replace(/"/g, '""')}"`,
        `"${a.status || ""}"`,
        `"${(a.resumeFileName || "").replace(/"/g, '""')}"`,
        `"${new Date(a.createdAt).toISOString()}"`,
      ]);

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="axiora-applications-${Date.now()}.csv"`,
        },
      });
    } else {
      const inqs = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
      const headers = ["ID", "Name", "Email", "Company", "Service", "Budget", "Status", "Created At", "Message"];
      const rows = inqs.map((i: any) => [
        `"${i._id}"`,
        `"${(i.name || "").replace(/"/g, '""')}"`,
        `"${(i.email || "").replace(/"/g, '""')}"`,
        `"${(i.company || "").replace(/"/g, '""')}"`,
        `"${(i.service || "").replace(/"/g, '""')}"`,
        `"${(i.budget || "").replace(/"/g, '""')}"`,
        `"${i.status || ""}"`,
        `"${new Date(i.createdAt).toISOString()}"`,
        `"${(i.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      ]);

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="axiora-inquiries-${Date.now()}.csv"`,
        },
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Export failed" },
      { status: 500 }
    );
  }
}
