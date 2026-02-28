// （请求封装）
import { api } from "@/lib/api-client"

export interface Habit {
  id: string
  name: string
  frequency: "daily" | "weekly"
  todayCompleted: boolean
}

export function getHabits() {
  return api.get<Habit[]>("/api/private/habits")
}

export function createHabit(data: {
  name: string
  frequency: string
}) {
  return api.post("/api/private/habits", data)
}

export interface HabitStats {
  total: number
  completedToday: number
  bestStreak: number
  completionRate7d: number
}

export function getHabitStats() {
  return api.get<HabitStats>("/api/private/habits/stats")
}