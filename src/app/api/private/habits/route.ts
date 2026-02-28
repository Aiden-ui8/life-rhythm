import { NextResponse } from "next/server"
import { withAuth } from "@/infrastructure/protected-route"
import { getHabitsWithTodayStatus, addHabit } from "@/modules/habit/server/habit.service"

export const GET = withAuth(async ({ userId, tenantId }) => {
  const data = await getHabitsWithTodayStatus(userId, tenantId)

  return NextResponse.json(data)
})

export const POST = withAuth(async ({ userId, tenantId, request }) => {
  const body = await request.json()

  const habit = await addHabit(userId, tenantId, body)

  return NextResponse.json(habit)
})