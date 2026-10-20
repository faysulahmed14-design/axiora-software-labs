import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { sendInquiryNotification, sendClientAutoReply } from "@/lib/resend";
import { checkRateLimit, isBotSubmission } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  try {
    // 1. IP Rate Limiting (Max 5 inquiries per 10 minutes)
    const rateCheck = checkRateLimit("contact", request, 5, 600);
    if (!rateCheck.success) {
      const waitMinutes = Math.ceil(rateCheck.resetInSeconds / 60);
      return NextResponse.json(
        {
          success: false,
          error: `Security Rate Limit: You have reached the submission limit. Please wait ${waitMinutes} minute(s) before trying again.`,
        },
        {
          status: 429,
          headers: { "Retry-After": rateCheck.resetInSeconds.toString() },
        }
      );
    }

    const body = await request.json();
    const { name, email, company, service, budget, message, _hp_check } = body;

    // 2. Honeypot Bot Trap: If hidden bot field is filled, silently discard
    if (isBotSubmission(_hp_check)) {
      console.warn("Spam Bot blocked by Honeypot in /api/contact");
      return NextResponse.json(
        {
          success: true,
          message: "Your inquiry has been received. Our team will contact you shortly.",
        },
        { status: 200 }
      );
    }

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide your full name." },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!service || typeof service !== "string") {
      return NextResponse.json(
        { success: false, error: "Please select a service." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please describe your project or message." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Capture metadata (IP and User-Agent if available)
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "";
    const userAgent = request.headers.get("user-agent") || "";

    // Create inquiry
    const inquiry = await Inquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : "",
      service: service.trim(),
      budget: budget ? budget.trim() : "Not specified",
      message: message.trim(),
      ipAddress,
      userAgent,
      status: "new",
    });

    // Send email notification to admin asynchronously
    sendInquiryNotification({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : "",
      service: service.trim(),
      budget: budget ? budget.trim() : "Not specified",
      message: message.trim(),
    }).catch((emailErr) => {
      console.error("Non-blocking email send error:", emailErr);
    });

    // Send confirmation auto-reply email to client asynchronously
    sendClientAutoReply({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      service: service.trim(),
      company: company ? company.trim() : "",
    }).catch((clientErr) => {
      console.warn("Non-blocking client auto-reply error:", clientErr);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received. Our team will contact you shortly.",
        id: inquiry._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API /api/contact error:", error);

    // Friendly error message if MongoDB connection failed
    if (error?.message?.includes("MONGODB_URI") || error?.name === "MongooseServerSelectionError") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Database connection failed. Please ensure MONGODB_URI is correctly configured in .env.local",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Axiora Software Labs Contact API is active." },
    { status: 200 }
  );
}
