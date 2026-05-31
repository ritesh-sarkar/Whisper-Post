import { NextResponse } from "next/server";
import Message from "@/models/MessageModel";
import User from "@/models/UserModel";
import ConnectToDB from "@/lib/DBConnection";

// Simple in-memory rate limiter
const rateLimitMap = new Map();

const RATE_LIMIT = 5; // messages
const WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(ip) {
  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, {
      count: 1,
      startTime: now,
    });

    return true;
  }

  const data = rateLimitMap.get(ip);

  if (now - data.startTime > WINDOW_MS) {
    rateLimitMap.set(ip, {
      count: 1,
      startTime: now,
    });

    return true;
  }

  if (data.count >= RATE_LIMIT) {
    return false;
  }

  data.count += 1;
  return true;
}

export async function POST(req, { params }) {
  try {
    const { username } = params;
    const { message, mood, hint } = await req.json();

    // Get user IP
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Rate limiting
    const allowed = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many messages. Please try again later.",
        },
        { status: 429 },
      );
    }

    // Validation
    if (!message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required",
        },
        { status: 400 },
      );
    }

    if (!mood?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Mood is required",
        },
        { status: 400 },
      );
    }

    const validMoods = ["confession", "love", "funny", "advice", "secret"];

    if (!validMoods.includes(mood)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid mood selected",
        },
        { status: 400 },
      );
    }

    // Backend length validation (don't trust frontend)
    if (message.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          error: "Message exceeds maximum length",
        },
        { status: 400 },
      );
    }

    await ConnectToDB();

    const user = await User.findOne({
      username: username.trim(),
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 },
      );
    }

    const createdMessage = await Message.create({
      user: user._id,
      message: message.trim(),
      mood,
      hint: hint?.trim() || "N/A",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
        messageId: createdMessage._id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Message Create Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
