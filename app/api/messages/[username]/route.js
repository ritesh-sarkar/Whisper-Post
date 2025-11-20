import { NextResponse } from "next/server";
import Message from "@/models/MessageModel";
import User from "@/models/UserModel";
import ConnectToDB from "@/lib/DBConnection";

export async function POST(req, { params }) {
  try {
    const { message } = await req.json();
    const { username } = params;

    await ConnectToDB();

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await Message.create({ user: user._id, message });

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
