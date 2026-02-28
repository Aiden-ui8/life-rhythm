import { NextResponse } from "next/server"
import { withAuth } from "@/infrastructure/protected-route"
import { getHabitStats } from "@/modules/habit/server/habit.service"

export const GET = withAuth(async ({ userId, tenantId }) => {
  const stats = await getHabitStats(userId, tenantId)

  return NextResponse.json(stats)
})