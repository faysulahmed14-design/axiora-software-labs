import crypto from "crypto";
import { NextRequest } from "next/server";

const SECRET = process.env.ADMIN_JWT_SECRET || "axiora_default_dev_secret_2026_xyz";
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function createAdminToken(): string {
  const payload = {
    role: "admin",
    issuedAt: Date.now(),
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(payloadBase64)
    .digest("base64url");
  return `${payloadBase64}.${signature}`;
}

export function verifyAdminToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadBase64, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", SECRET)
    .update(payloadBase64)
    .digest("base64url");

  // Constant-time comparison to prevent timing attacks
  if (
    signature.length !== expectedSig.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))
  ) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString());
    if (payload.role !== "admin") return false;
    if (Date.now() - payload.issuedAt > TOKEN_MAX_AGE_MS) return false;
    return true;
  } catch {
    return false;
  }
}

export function verifyAdminRequest(request: NextRequest): boolean {
  // Check cookie first
  const cookieToken = request.cookies.get("axiora_admin_token")?.value;
  if (cookieToken && verifyAdminToken(cookieToken)) return true;

  // Check Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const headerToken = authHeader.substring(7);
    if (verifyAdminToken(headerToken)) return true;
  }

  return false;
}
