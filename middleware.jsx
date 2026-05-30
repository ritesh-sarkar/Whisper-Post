import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const protectedRoutes =
    request.nextUrl.pathname.startsWith("/dashboard")

  if (protectedRoutes && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
