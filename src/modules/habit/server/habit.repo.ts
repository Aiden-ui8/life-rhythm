// src/modules/habit/server/habit.repo.ts （数据访问层）
import { prisma } from "@/infrastructure/prisma"

export async function findHabits(userId: string, tenantId: string) {
  return prisma.habit.findMany({
    where: { userId, tenantId },
    include: {
      logs: true,
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function createHabit(data: {
  name: string
  frequency: string
  userId: string
  tenantId: string
}) {
  return prisma.habit.create({ data })
}