import bcrypt from "bcryptjs";
import ConnectToDB from "@/lib/DBConnection";
import User from "@/models/UserModel";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
            user.password
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
  ],

  

  pages: {
    signIn: "/login",
  },

  secret: process.env.JWT_SECRET,

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 60 * 60 * 24 * 7,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
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
