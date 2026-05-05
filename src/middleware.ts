import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  const isAuth = !!token;
  const isLoginPage = pathname === "/login";
  const isPublic = pathname.startsWith("/api/auth") || pathname.startsWith("/_next") || pathname.includes(".");

  if (isPublic) return NextResponse.next();
  if (isAuth && isLoginPage) return NextResponse.redirect(new URL("/dashboard", request.url));
  if (!isAuth && !isLoginPage) return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
