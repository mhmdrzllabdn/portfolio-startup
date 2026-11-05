import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Security & Access Control Middleware
 * - Enforces role-based authorization for administrative pathways (prevents IDOR/BOLA)
 * - Restricts unauthorized or 'guest' roles from sensitive records like /admin/users
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect administrative routes and APIs
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const authHeader = request.headers.get("authorization");
    const roleCookie = request.cookies.get("user_role")?.value;
    const sessionToken = request.cookies.get("session_token")?.value;

    // Check presence of valid authentication
    const hasAuth = Boolean(sessionToken || authHeader);
    const role = roleCookie?.toLowerCase() || "guest";

    // Reject unauthenticated requests or 'guest' roles
    if (!hasAuth || role === "guest" || role !== "admin") {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          {
            success: false,
            error: "Forbidden",
            message: "Access denied. Role 'guest' or unauthenticated users cannot access administrative resources.",
          },
          { status: 403 }
        );
      }

      // Redirect browser requests to login or unauthorized landing
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

