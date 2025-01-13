// import { NextRequest } from "next/server";
// import authenticated from "./app/auth/authenticated";
// import { unauthenticatedRoutes } from "./app/lib/constants/routes";

// export function middleware(request: NextRequest) {
//   if (
//     !authenticated() &&
//     !unauthenticatedRoutes.some((route) =>
//       request.nextUrl.pathname.startsWith(route.path)
//     )
//   ) {
//     return Response.redirect(new URL("/auth/login", request.url));
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = "/hr";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = request.cookies.get("Authentication");
    const isProtectedRoute = pathname.startsWith(protectedRoutes);

    if (!sessionCookie && isProtectedRoute) {
        return Response.redirect(new URL("/auth/login", request.url));
    }
    if (sessionCookie && pathname === "/auth/login") {
        return NextResponse.redirect(new URL("/hr", request.url));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
