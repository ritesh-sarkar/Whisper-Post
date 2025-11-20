import User from "@/models/UserModel";
import ConnectToDB from "@/lib/DBConnection";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; 
const JWT_Secret = process.env.JWT_SECRET;

export async function POST(req) {
  const { token } = await req.json();
  const decoded = jwt.verify(token, JWT_Secret);
  const UserId = decoded.userId;
  const email = decoded.email;

  try {
    await ConnectToDB();

    const user = await User.findOne({ _id: UserId, email: email });
    if (user) {
      user.isVarified = true;
      await user.save();
      return NextResponse.json(
        { message: "User verified successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
