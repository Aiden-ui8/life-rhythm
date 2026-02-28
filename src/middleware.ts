import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/infrastructure/jwt"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const { pathname } = req.nextUrl


  // 判断是否 API
  const isApiRequest = pathname.startsWith("/api")
  const isLoginPage = pathname.startsWith("/login")

  // 🟢 不需要鉴权的接口
  if (
    pathname.startsWith("/api/auth/login") ||
    pathname.startsWith("/api/auth/register")
  ) {
    return NextResponse.next()
  }

  // 🟢 登录页直接放行
  // if (isLoginPage) {
  //   return NextResponse.next()
  // }
  // 🔴 没 token
  if (!token) {
    if (isApiRequest) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    return NextResponse.redirect(new URL("/login", req.url))
  }



  try {
    const payload = await verifyToken(token) as {
      userId: string
      tenantId: string
    }

    const requestHeaders = new Headers(req.headers)
    requestHeaders.set("x-user-id", payload.userId)
    requestHeaders.set("x-tenant-id", payload.tenantId)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

  } catch {
    if (isApiRequest) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/private/:path*"],
}