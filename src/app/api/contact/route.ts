import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message } = body;

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
