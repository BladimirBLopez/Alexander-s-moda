import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE, tokenValido } from "@/lib/sesion";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/api/admin/login") return NextResponse.next();

  const valido = await tokenValido(req.cookies.get(COOKIE)?.value);

  if (pathname === "/admin/login") {
    return valido
      ? NextResponse.redirect(new URL("/admin", req.url))
      : NextResponse.next();
  }
  if (valido) return NextResponse.next();
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  }
  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
