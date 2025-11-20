// app/api/story-card/[username]/route.js
import { NextResponse } from "next/server";
import ConnectToDB from "@/lib/DBConnection";
import ShortLink from "@/models/ShortLink";

export const runtime = "nodejs"; // ← switch from edge to node

export async function GET(req, { params }) {
  try {
    const username = params.username;
    await ConnectToDB();

    const short = await ShortLink.findOne({ username });

    const displayUrl = short?.slug
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/s/${short.slug}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/message/${username}`;

    return NextResponse.json({ displayUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error generating link" }, { status: 500 });
  }
}
