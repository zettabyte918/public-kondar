import { NextResponse } from "next/server";

const hasCookie = (key, req) => {
  return !!req.cookies.get(key);
};

// This function can be marked `async` if using `await` inside
export function middleware(req, res) {
  const { pathname } = req.nextUrl;
  const isAuthenticated = hasCookie("user", req);

  if (!isAuthenticated && pathname != "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  } else if (pathname == "/auth/login" && isAuthenticated)
    return NextResponse.redirect(new URL("/cours", req.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/cours/:path*",
    "/remarques/:path*",
    "/absences/:path*",
    "/auth/login/:path*",
  ],
};
