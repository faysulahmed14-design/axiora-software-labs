import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";
import { sendCareerApplicationNotification } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, role, portfolioUrl, note, resumeFileName, resumeFileSize, resumeDataUrl } = body;

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

    if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide a contact phone number." },
        { status: 400 }
      );
    }

    if (!role || typeof role !== "string") {
      return NextResponse.json(
        { success: false, error: "Please select the role you are applying for." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Create job application
    const application = await JobApplication.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: role.trim(),
      portfolioUrl: portfolioUrl ? portfolioUrl.trim() : "",
      note: note ? note.trim() : "",
      resumeFileName: resumeFileName || "",
      resumeFileSize: resumeFileSize || 0,
      resumeDataUrl: resumeDataUrl || "",
      status: "submitted",
    });

    // Send email notification to axiorasoftwarelabs@gmail.com asynchronously
    sendCareerApplicationNotification({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: role.trim(),
      portfolioUrl: portfolioUrl ? portfolioUrl.trim() : "",
      note: note ? note.trim() : "",
      resumeFileName: resumeFileName || "",
    }).catch((emailErr) => {
      console.error("Non-blocking email send error:", emailErr);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your application has been received successfully.",
        id: application._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API /api/careers/apply error:", error);

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
    { message: "Axiora Software Labs Careers API is active." },
    { status: 200 }
  );
}
