import { NextRequest, NextResponse } from "next/server";
import { createAdminToken } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  try {
    // Brute-force protection: Max 5 login attempts per 15 minutes
    const rateCheck = checkRateLimit("admin_login", request, 5, 900);
    if (!rateCheck.success) {
      const waitMinutes = Math.ceil(rateCheck.resetInSeconds / 60);
      return NextResponse.json(
        {
          success: false,
          error: `Security Alert: Too many failed login attempts. Administrative gateway is temporarily locked for ${waitMinutes} minute(s).`,
        },
        {
          status: 429,
          headers: { "Retry-After": rateCheck.resetInSeconds.toString() },
        }
      );
    }

    const body = await request.json();
    const { password } = body;

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AxioraAdmin2026!";

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Invalid administrator password." },
        { status: 401 }
      );
    }

    const token = createAdminToken();

    const response = NextResponse.json(
      { success: true, message: "Authentication successful." },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set("axiora_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
