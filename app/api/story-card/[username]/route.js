// app/api/story-card/[username]/route.js
import { ImageResponse } from "@vercel/og";
import ConnectToDB from "@/lib/DBConnection";
import ShortLink from "@/models/ShortLink";

export const runtime = "edge";

export async function GET(req, { params }) {
  try {
    const username = params.username;
    await ConnectToDB();

    const short = await ShortLink.findOne({ username });
    const displayUrl = short ? `${process.env.NEXT_PUBLIC_BASE_URL}/s/${short.slug}` : `${process.env.NEXT_PUBLIC_BASE_URL}/message/${username}`;

    let fontData;
    try {
      const fontRes = await fetch("https://raw.githubusercontent.com/rsms/inter/main/docs/Inter-Regular.ttf");
      fontData = await fontRes.arrayBuffer();
    } catch {}

    return new ImageResponse(
      (
        <div
          style={{
            width: "1080px",
            height: "1920px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "80px",
            fontFamily: "Inter, system-ui",
            background: "#ffffff",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ color: "#0b74ff", fontSize: 28, fontWeight: 700 }}>WhisperPost</div>
            <div style={{ color: "#0f172a", fontSize: 64, fontWeight: 800 }}>Send an anonymous message</div>
            <div style={{ color: "#374151", fontSize: 22 }}>Tap the link below to send a private message</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, marginBottom: 60 }}>
            <div style={{
              padding: "30px 40px",
              background: "#0b1220",
              color: "white",
              borderRadius: 14,
              textAlign: "center"
            }}>
              <div style={{ fontSize: 50, fontWeight: 700 }}>@{username}</div>
              <div style={{ fontSize: 24, color: "#cbd5e1" }}>{displayUrl}</div>
            </div>
            <div style={{ color: "#6b7280", fontSize: 20 }}>Anonymous — delivered privately</div>
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1920,
        fonts: fontData ? [{ name: "Inter", data: fontData, weight: 400 }] : [],
      }
    );
  } catch (err) {
    console.error(err);
    return new Response("Error generating image", { status: 500 });
  }
}
