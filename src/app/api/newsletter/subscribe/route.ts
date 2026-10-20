import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";
import { resend } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (
      !email ||
      typeof email !== "string" ||
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await Subscriber.findOne({ email: normalizedEmail });

    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "";

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json(
          {
            success: true,
            alreadySubscribed: true,
            message: "You are already subscribed to Axiora Insights! Thank you.",
          },
          { status: 200 }
        );
      } else {
        existing.status = "active";
        await existing.save();
        return NextResponse.json(
          {
            success: true,
            message: "Welcome back! Your subscription has been reactivated.",
          },
          { status: 200 }
        );
      }
    }

    const subscriber = await Subscriber.create({
      email: normalizedEmail,
      status: "active",
      source: "website_footer",
      ipAddress,
    });

    // Optionally send welcome email via Resend
    if (resend) {
      resend.emails
        .send({
          from: process.env.RESEND_FROM_EMAIL || "Axiora Software Labs <onboarding@resend.dev>",
          to: [normalizedEmail],
          replyTo: "axiorasoftwarelabs@gmail.com",
          subject: "Welcome to Axiora Software Labs Insights",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0c1424; color: #f8fafc; padding: 28px; border-radius: 14px;">
              <h2 style="color: #38bdf8; margin-top: 0;">Welcome to Axiora Insights!</h2>
              <p style="color: #cbd5e1; line-height: 1.6;">
                Thank you for subscribing to our technical insights. You will receive curated updates on distributed cloud systems, modern AI engineering, and enterprise digital strategy.
              </p>
              <p style="color: #94a3b8; font-size: 13px;">
                Axiora Software Labs &bull; Malibagh, Dhaka, Bangladesh
              </p>
            </div>
          `,
        })
        .catch((err) => {
          console.warn("Subscriber welcome email note:", err?.message);
        });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing to Axiora Tech Insights!",
        id: subscriber._id,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to subscribe" },
      { status: 500 }
    );
  }
}
