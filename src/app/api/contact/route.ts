import { NextRequest, NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validation";

// In-memory rate limiting store
const ipRequestTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    
    // Rate limiting check
    const now = Date.now();
    const timestamps = ipRequestTimestamps.get(ip) || [];
    const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    
    if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please wait 1 minute before trying again.",
        },
        { status: 429 }
      );
    }

    recentTimestamps.push(now);
    ipRequestTimestamps.set(ip, recentTimestamps);

    const body = await request.json();

    // Honeypot spam check
    if (body.website_trap) {
      return NextResponse.json({
        success: true,
        message: "Message received successfully.",
      });
    }

    const { isValid, errors } = validateContactForm(body);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please review your form inputs.",
          errors,
        },
        { status: 400 }
      );
    }

    // Insert record into PostgreSQL contact_messages table if configured
    try {
      const crypto = await import("crypto");
      const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32);

      const pool = (await import("@/lib/db")).default;
      await pool.query(
        `INSERT INTO contact_messages (name, email, subject, message, status, ip_hash)
         VALUES ($1, $2, $3, $4, 'new', $5)`,
        [body.name.trim(), body.email.trim(), body.subject.trim(), body.message.trim(), ipHash]
      );
    } catch (dbErr) {
      console.warn("Database storage warning (proceeding gracefully):", dbErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been sent successfully. I will get back to you promptly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing your message.",
      },
      { status: 500 }
    );
  }
}
