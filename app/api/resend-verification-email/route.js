import User from "@/models/UserModel";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

//Custom libs
import ConnectToDB from "@/lib/DBConnection";

const JWT_Secret = process.env.JWT_SECRET;
const NEXT_AUTH_URL = process.env.NEXT_AUTH_URL;

export async function POST(req) {
  const { email } = await req.json();

  try {
    await ConnectToDB();

    const isExistUser = await User.findOne({ email });
    const isUserVerified = isExistUser.isVarified;

    if (isExistUser && !isUserVerified) {
      try {
        console.log(isExistUser);
        
        return NextResponse.json(
          { message: "Verification email sent successfully" },
          { status: 200 },
        );
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    //     const mailOption = {
    //       from: "developerriteshsarkar@gmail.com",
    //       to: user.email,
    //       subject: "WhisperPost | Verify Your Email",
    //       html: `
    //   <div style="
    //     background: #0a0a0f;
    //     padding: 40px 16px;
    //     font-family: Inter, Poppins, Arial, sans-serif;
    //     color: #f8fafc;
    //   ">

    //     <div style="
    //       max-width: 600px;
    //       margin: auto;
    //       background: rgba(255,255,255,0.05);
    //       border: 1px solid rgba(255,255,255,0.1);
    //       border-radius: 16px;
    //       padding: 32px;
    //       text-align: center;
    //     ">

    //       <!-- Brand -->
    //       <h1 style="
    //         font-size: 26px;
    //         font-weight: 600;
    //         color: #f8fafc;
    //         margin-bottom: 8px;
    //       ">
    //         WhisperPost
    //       </h1>

    //       <p style="
    //         color: #9ca3af;
    //         font-size: 14px;
    //         margin-bottom: 28px;
    //       ">
    //         Anonymous. Secure. Yours.
    //       </p>

    //       <!-- Title -->
    //       <h2 style="
    //         font-size: 20px;
    //         font-weight: 600;
    //         color: #f8fafc;
    //         margin-bottom: 16px;
    //       ">
    //         Verify your email
    //       </h2>

    //       <!-- Message -->
    //       <p style="
    //         font-size: 15px;
    //         color: #9ca3af;
    //         line-height: 1.6;
    //         margin-bottom: 28px;
    //       ">
    //         Hey ${user.name || "there"},<br/><br/>
    //         You're just one step away from accessing your WhisperPost account.
    //         Click below to verify your email and start receiving anonymous messages.
    //       </p>

    //       <!-- CTA Button -->
    //       <a href="${NEXT_AUTH_URL}/verify/${token}" style="
    //         display: inline-block;
    //         padding: 12px 28px;
    //         background: linear-gradient(135deg, #7c3aed, #ec4899);
    //         color: #ffffff;
    //         text-decoration: none;
    //         font-weight: 600;
    //         border-radius: 10px;
    //       ">
    //         Verify Account →
    //       </a>

    //       <!-- Divider -->
    //       <div style="
    //         margin: 32px 0;
    //         height: 1px;
    //         background: rgba(255,255,255,0.1);
    //       "></div>

    //       <!-- Footer -->
    //       <p style="
    //         font-size: 13px;
    //         color: #9ca3af;
    //         line-height: 1.5;
    //       ">
    //         If you didn’t create this account, you can safely ignore this email.
    //       </p>

    //       <p style="
    //         margin-top: 20px;
    //         font-size: 12px;
    //         color: #9ca3af;
    //       ">
    //         © ${new Date().getFullYear()} WhisperPost. All rights reserved.
    //       </p>

    //     </div>
    //   </div>
    //   `,
    //     };

    //     const transport = nodemailer.createTransport({
    //       host: process.env.SMTP_HOST,
    //       port: parseInt(process.env.SMTP_PORT),
    //       auth: {
    //         user: process.env.SMTP_USER,
    //         pass: process.env.SMTP_PASSWORD,
    //       },
    //     });

    //     await transport.sendMail(mailOption);

    //     return NextResponse.json(
    //       {
    //         message:
    //           "Signup successful! Please check your email to verify your account.",
    //       },
    //       { status: 200 },
    //     );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
