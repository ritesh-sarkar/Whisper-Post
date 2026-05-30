import bcrypt from "bcryptjs";
import ConnectToDB from "@/lib/DBConnection";
import User from "@/models/UserModel";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Siemreap } from "next/font/google";
import { signIn } from "next-auth/react";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          await ConnectToDB();

          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          if (!user.isVarified) {
            throw new Error("User is not varified yet!");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isPasswordCorrect) {
            throw new Error("Invalid credentials!");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            username: user.username,
            email: user.email,
          };
        } catch (error) {
          throw new Error(error.message || "Something went wrong!");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 60 * 60 * 24 * 7,
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await ConnectToDB();

        const userExists = await User.findOne({ email: user.email });

        if (userExists && userExists.provider === "credentials") {
          return "/login?error=email_exists";
        }

        if (userExists && userExists.provider === "google") {
          return true;
        }

        // Creating New user
        const generatedUsername =
          user.email.split("@")[0] +
          Math.floor(Math.random() * 1000) +
          "_" +
          Date.now().toString().slice(-6);

        await User.create({
          name: user.name,
          username: generatedUsername,
          email: user.email,
          provider: "google",
          imageUrl: user.image,
          isVarified: true,
        });

        return true; // Explicitly return true for new registrations
      }

      return true;
    },

    async jwt({ token, user, account }) {
      await ConnectToDB();

      // Initial sign-in setup
      if (user) {
        if (account?.provider === "google") {
          // For Google, look up the user by email to get the correct MongoDB _id
          const dbUser = await User.findOne({ email: user.email });
          if (dbUser) {
            token.id = dbUser._id.toString();
          }
        } else {
          // For Credentials, your authorize() function already returned the mongo ID as user.id
          token.id = user.id;
        }
      }

      // Sync latest data from database using the verified MongoDB ID
      if (token.id) {
        const dbUser = await User.findById(token.id);
        if (dbUser) {
          token.name = dbUser.name;
          token.username = dbUser.username;
          token.email = dbUser.email;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.email = token.email;
      return session;
    },
  },
};
