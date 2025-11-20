import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import User from "@/models/UserModel";
import OTP from "@/models/otpModel";
import ConnectToDB from "@/lib/DBConnection";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await ConnectToDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // Remove old OTPs
    try {
      await OTP.deleteMany({ email });
    } catch (err) {
      return NextResponse.json(
        { message: "Error deleting old OTPs", error: err.message },
        { status: 500 }
      );
    }

    const otp = new OTP({
      email,
      otp: generatedOTP,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    try {
      await otp.save();
    } catch (error) {
      return NextResponse.json(
        { message: "Error saving OTP", error: error.message },
        { status: 500 }
      );
    }

    // Send email
    try {
      const mailOption = {
        from: "developerriteshsarkar@gmail.com",
        to: user.email,
        subject: "WhisperPost | Reset Password",
        html: `
    <div style="background-color: #ffffff; padding: 40px; font-family: Arial, sans-serif; color: #1e40af; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); max-width: 600px; margin: auto;">
      <h2 style="text-align: center; color: #1e40af; margin-bottom: 20px;">Password Reset Request</h2>

      <p style="font-size: 16px; color: #333333; margin-bottom: 24px;">
        Hello ${user.name || "User"},<br/><br/>
        We received a request to reset your password for your <strong>WhisperPost</strong> account. Use the OTP below to continue:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; background-color: #f0f4ff; color: #1e40af; font-size: 24px; font-weight: bold; padding: 12px 24px; border-radius: 6px; letter-spacing: 2px;">
          ${generatedOTP}
        </div>
      </div>

      <p style="font-size: 14px; color: #555555; text-align: center;">
        This OTP will expire in 5 minutes.<br/>
        If you didn’t request this, you can safely ignore this email.
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
        { message: "An OTP is sent to your email" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error sending OTP", error: error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
