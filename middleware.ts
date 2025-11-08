import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow public routes
  if (pathname === "/" || pathname.startsWith("/student/grievance")) {
    return NextResponse.next()
  }

  // Admin routes - check for authentication token
  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin_auth")?.value

    // Allow login page without token
    if (pathname === "/admin/login") {
      return NextResponse.next()
    }

    // Redirect to login if no token for other admin routes
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon-.*|apple-icon).*)"],
}
