import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define protected routes
// "/api/video"
const protectedRoutes = ["/studio" ];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // console.log("🔍 Middleware executed:", req.nextUrl.pathname);
  // If the route is protected and the user is not authenticated, redirect to login
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    // return NextResponse.redirect(new URL("/?modal=true", req.url));
      return NextResponse.redirect(new URL("/?modal=true", req.url));
    
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/studio/:path*" , "/api/:path*"],
  
};
