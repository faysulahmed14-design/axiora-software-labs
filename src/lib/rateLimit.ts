import { NextRequest } from "next/server";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory token bucket rate-limit cache
const ipCache = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of ipCache.entries()) {
      if (now > value.resetAt) {
        ipCache.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  return "127.0.0.1";
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Checks if the request from a client IP exceeds the allowed rate limit
 * @param keyPrefix unique identifier for the endpoint (e.g. "contact", "careers", "admin_login")
 * @param request the NextRequest object
 * @param limit maximum allowed requests in the time window (e.g. 5)
 * @param windowSeconds time window in seconds (e.g. 600 for 10 minutes)
 */
export function checkRateLimit(
  keyPrefix: string,
  request: NextRequest,
  limit: number = 5,
  windowSeconds: number = 600
): RateLimitResult {
  const ip = getClientIp(request);
  const cacheKey = `${keyPrefix}:${ip}`;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  const record = ipCache.get(cacheKey);

  if (!record || now > record.resetAt) {
    // New window
    ipCache.set(cacheKey, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetInSeconds: windowSeconds,
    };
  }

  // Existing window
  if (record.count >= limit) {
    const resetInSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
    return {
      success: false,
      limit,
      remaining: 0,
      resetInSeconds,
    };
  }

  // Increment
  record.count += 1;
  const resetInSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));

  return {
    success: true,
    limit,
    remaining: limit - record.count,
    resetInSeconds,
  };
}

/**
 * Checks if a honeypot field has been filled (which indicates a bot submission)
 * @param honeypotValue value from the hidden trap input
 */
export function isBotSubmission(honeypotValue: any): boolean {
  if (honeypotValue && typeof honeypotValue === "string" && honeypotValue.trim().length > 0) {
    return true;
  }
  return false;
}
