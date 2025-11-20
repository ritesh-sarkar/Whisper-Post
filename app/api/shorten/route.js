// app/api/shorten/route.js
import { NextResponse } from "next/server";
import ConnectToDB from "@/lib/DBConnection";
import ShortLink from "@/models/ShortLink";

function generateCode(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function POST(req) {
  try {
    const { username } = await req.json();
    if (!username) return NextResponse.json({ error: "username required" }, { status: 400 });

    await ConnectToDB();

    let short = await ShortLink.findOne({ username });
    if (short) return NextResponse.json({ shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/s/${short.slug}` });

    // create new
    let slug;
    for (let i = 0; i < 8; i++) {
      const candidate = generateCode(6);
      const exists = await ShortLink.findOne({ slug: candidate });
      if (!exists) {
        slug = candidate;
        break;
      }
    }
    if (!slug) slug = generateCode(8);

    const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/message/${username}`;

    await ShortLink.create({ slug, username, fullUrl });

    return NextResponse.json({ shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/s/${slug}` });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
