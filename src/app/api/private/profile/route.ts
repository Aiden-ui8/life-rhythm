import { NextResponse } from "next/server"
import { prisma } from "@/infrastructure/prisma"
import { withAuth } from "@/infrastructure/protected-route"

export const GET = withAuth(async ({ userId, tenantId }) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      tenantId: tenantId,
    },
  })

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  return NextResponse.json({
      id: user.id,
      email: user.email,
      tenantId: user.tenantId,
    })
})