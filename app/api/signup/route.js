import User from "@/models/UserModel";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ConnectToDB from "@/lib/DBConnection";

const JWT_Secret = process.env.JWT_SECRET;
const NEXT_AUTH_URL = process.env.NEXT_AUTH_URL;

export async function POST(req) {
  const { name, username, email, password } = await req.json();

  try {
    await ConnectToDB();

    const isExistUser = await User.findOne({ email });
    const isExistUsername = await User.findOne({ username });

    if (isExistUser) {
      return NextResponse.json(
        { error: "User already exist!" },
        { status: 400 }
      );
    }
    if (isExistUsername) {
      return NextResponse.json(
        { error: "username already taken!" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      isVarified: false,
    });

    await user.save();

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      JWT_Secret,
      {
        expiresIn: "1h",
      }
    );

    const mailOption = {
      from: "developerriteshsarkar@gmail.com",
      to: user.email,
      subject: "WhisperPost | Verify Your Email",
      html: `
  <div style="background-color: #ffffff; padding: 40px; font-family: Arial, sans-serif; color: #1e40af; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); max-width: 600px; margin: auto;">
    <h2 style="text-align: center; color: #1e40af; margin-bottom: 20px;">WhisperPost Email Verification</h2>
    
    <p style="font-size: 16px; color: #333333; margin-bottom: 24px;">
      Hello ${user.name || "User"},<br/><br/>
      Thank you for registering on <strong>WhisperPost</strong>! Please verify your email address to activate your account and start sharing your thoughts.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${NEXT_AUTH_URL}/verify/${token}" style="display: inline-block; background-color: #1e40af; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
        Verify Email
      </a>
    </div>

    <p style="font-size: 14px; color: #555555; text-align: center;">
      If you did not create this account, you can safely ignore this email.
    </p>

    <hr style="margin: 32px 0; border: none; border-top: 1px solid #eeeeee;" />

    <p style="font-size: 12px; color: #999999; text-align: center;">
      &copy; ${new Date().getFullYear()} WhisperPost. All rights reserved.
    </p>
  </div>
  `,
    };

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transport.sendMail(mailOption);

    return NextResponse.json(
      {
        message:
          "Signup successful! Please check your email to verify your account.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
