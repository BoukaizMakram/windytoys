import { NextRequest, NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="AeroPlay Admin"',
    },
  });
}

function decodeBasicAuth(value: string) {
  const encoded = value.replace(/^Basic\s+/i, "");
  const decoded = atob(encoded);
  const separator = decoded.indexOf(":");

  if (separator === -1) {
    return { user: "", password: "" };
  }

  return {
    user: decoded.slice(0, separator),
    password: decoded.slice(separator + 1),
  };
}

export function proxy(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminUser = process.env.ADMIN_USER ?? "admin";

  if (!adminPassword) {
    return new NextResponse("ADMIN_PASSWORD is not configured", { status: 503 });
  }

  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return unauthorized();
  }

  try {
    const credentials = decodeBasicAuth(authorization);

    if (
      credentials.user === adminUser &&
      credentials.password === adminPassword
    ) {
      return NextResponse.next();
    }
  } catch {
    return unauthorized();
  }

  return unauthorized();
}

export const config = {
  matcher: "/admin/:path*",
};
