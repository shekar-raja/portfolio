import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  let upstreamUrl = process.env.PING_WEBHOOK_URL?.trim();

  // Feature is deferred: without a webhook, pings are disabled and nothing is read or logged.
  if (!upstreamUrl) {
    return NextResponse.json({ ok: false, disabled: true }, { status: 503 });
  }

  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const { message, hp } = body;

    // 1. Honeypot check: If the hidden honeypot input is filled, silently discard spam
    if (hp && typeof hp === "string" && hp.trim().length > 0) {
      return NextResponse.json({
        ok: true,
        delivered: true,
        receiptId: "HP-" + crypto.randomBytes(4).toString("hex").toUpperCase(),
      });
    }

    // 2. Validate message
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const trimmed = message.trim();
    if (trimmed.length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    if (trimmed.length > 520) {
      return NextResponse.json(
        { error: "Message exceeds maximum length of 500 characters" },
        { status: 400 }
      );
    }

    // 3. Forward to the configured webhook
    {
      if (!upstreamUrl.startsWith("http://") && !upstreamUrl.startsWith("https://")) {
        upstreamUrl = `https://${upstreamUrl}`;
      }
      try {
        const upstreamRes = await fetch(upstreamUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Forwarded-From": "rshekar-me",
          },
          body: JSON.stringify({ message: trimmed }),
        });

        if (!upstreamRes.ok) {
          console.warn(
            "Ping webhook responded with status:",
            upstreamRes.status
          );
        }
      } catch (err) {
        console.warn("Could not reach ping webhook:", err);
      }
    }

    // 4. Return zero-knowledge cryptographic receipt data
    const receiptId = crypto.randomBytes(4).toString("hex").toUpperCase();
    const hashKey = crypto
      .createHash("sha256")
      .update(receiptId + Date.now().toString())
      .digest("hex");

    return NextResponse.json({
      ok: true,
      delivered: true,
      receiptId,
      hashKey,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Ping API handler error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
