import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import type { CustomMiddleware } from "./chain";

const publicRoutes = ["/", "/api/webhooks", "/search", "/api/uploadthing"];

export function authMiddleware(middleware: CustomMiddleware): CustomMiddleware {
	return async (
		request: NextRequest,
		event: NextFetchEvent,
		response: NextResponse,
	) => {
		const token = await getToken({
			req: request,
			secret: process.env.NEXTAUTH_SECRET,
		});

		const isLoginPage = request.url.includes("login");

		// Redirect logged-in user to homepage
		if (token && isLoginPage) {
			return NextResponse.redirect(new URL("/", request.url));
		}

		// Allow public routes
		if (
			publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
		) {
			return NextResponse.next();
		}
		if (!token) return NextResponse.redirect(new URL("/login", request.url));

		return middleware(request, event, response);
	};
}
