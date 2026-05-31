import { NextResponse } from "next/server";
import Message from "@/models/MessageModel";
import User from "@/models/UserModel";
import ConnectToDB from "@/lib/DBConnection";

// Get all messages by user ID
export async function POST(req) {
  const { userID } = await req.json();

  try {
    await ConnectToDB();

    const user = await User.findById(userID);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const messages = await Message.find({ user: user._id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// toggle isLoved, isPinned, isNew
export async function PATCH(req) {
  const { messageID, action } = await req.json();

  try {
    const message = await Message.findById(messageID);

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    if (action === "toggle-love") {
      message.loved = !message.loved;
    }



    if (action === "toggle-new") {
      message.isNew = false;
    }

    if (action === "toggle-pin") {
      message.isPinned = !message.isPinned;
    }

    await message.save();

    return NextResponse.json({ status: 200, updated: message });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete message
export async function DELETE(req) {
  const { messageID } = await req.json();

  try {
    const message = await Message.findById(messageID);
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    await message.deleteOne();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
