import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const isValid = verifyAdminRequest(request);
  return NextResponse.json({ authenticated: isValid }, { status: 200 });
}
