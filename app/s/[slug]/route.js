// app/s/[slug]/route.js
import { NextResponse } from "next/server";
import ConnectToDB from "@/lib/DBConnection";
import ShortLink from "@/models/ShortLink";

export async function GET(req, { params }) {
  try {
    const { slug } = params;
    await ConnectToDB();

    const doc = await ShortLink.findOne({ slug });
    if (!doc) return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL);

    ShortLink.updateOne({ slug }, { $inc: { clicks: 1 } }).catch(console.error);

    return NextResponse.redirect(doc.fullUrl);
  } catch (err) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL);
  }
}
