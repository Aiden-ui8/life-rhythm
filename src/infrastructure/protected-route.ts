import { NextResponse } from "next/server"
import { getCurrentUserId, getCurrentTenantId } from "./request-context"

type HandlerContext = {
  userId: string
  tenantId: string
  request: Request
}

export function withAuth(
  handler: (ctx: HandlerContext) => Promise<Response>
) {
  return async function (request: Request) {
    const userId = await getCurrentUserId()
    const tenantId = await getCurrentTenantId()

    if (!userId || !tenantId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    return handler({ userId, tenantId, request })
  }
}