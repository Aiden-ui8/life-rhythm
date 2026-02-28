// src/modules/habit/server/habit.service.ts  （业务逻辑层）
import { findHabits, createHabit } from "./habit.repo"
import { prisma } from "@/infrastructure/prisma"

export async function getHabitStats(
  userId: string,
  tenantId: string
) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(today.getDate() - 6)
  sevenDaysAgo.setHours(0, 0, 0, 0)

  // 1️⃣ 总习惯数
  const total = await prisma.habit.count({
    where: { userId, tenantId },
  })

  // 2️⃣ 今日完成数
  const completedToday = await prisma.habitLog.count({
    where: {
      userId,
      tenantId,
      date: today,
    },
  })

  // 3️⃣ 最近7天完成率
  const last7DaysLogs = await prisma.habitLog.count({
    where: {
      userId,
      tenantId,
      date: {
        gte: sevenDaysAgo,
      },
    },
  })

  const completionRate7d =
    total === 0 ? 0 : Number(((last7DaysLogs / (total * 7)) * 100).toFixed(1))

  // 4️⃣ 计算 streak（简单版本）
  const logs = await prisma.habitLog.findMany({
    where: { userId, tenantId },
    orderBy: { date: "desc" },
  })

  let streak = 0
  let currentDate = new Date(today)

  for (const log of logs) {
    if (log.date.getTime() === currentDate.getTime()) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }

  return {
    total,
    completedToday,
    bestStreak: streak,
    completionRate7d,
  }
}

export async function getHabitsWithTodayStatus(
  userId: string,
  tenantId: string
) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const habits = await findHabits(userId, tenantId)

  return habits.map((habit) => ({
    id: habit.id,
    name: habit.name,
    frequency: habit.frequency,
    todayCompleted: habit.logs.some(
      (log) => log.date.getTime() === today.getTime()
    ),
  }))
}

export async function addHabit(
  userId: string,
  tenantId: string,
  body: { name: string; frequency: string }
) {
  return createHabit({
    name: body.name,
    frequency: body.frequency,
    userId,
    tenantId,
  })
}