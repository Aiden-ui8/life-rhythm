import { NextResponse } from "next/server"
import { prisma } from "@/infrastructure/prisma"
import { withAuth } from "@/infrastructure/protected-route"

export const POST = withAuth(async ({ userId, tenantId, request }) => {
  const { habitId } = await request.json()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const log = await prisma.habitLog.upsert({
    where: {
      habitId_date: {
        habitId,
        date: today,
      },
    },
    update: {},
    create: {
      habitId,
      userId,
      tenantId,
      date: today,
      completed: true,
    },
  })

  return NextResponse.json(log)
})