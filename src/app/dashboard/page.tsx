"use client"

import { StatCard } from "@/components/stat-card"
import { useHabitStats } from "@/modules/habit/client/habit.hooks"
import { useAuth } from "@/modules/user/client/auth.context"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  const { data: stats } = useHabitStats()

  if (isLoading) return <p>Loading...</p>
  if (!user) return <p>Not authenticated</p>

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Welcome {user.email}
      </h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Habits" value={stats?.total ?? 0} />
        <StatCard title="Completed Today" value={stats?.completedToday ?? 0} />
        <StatCard title="Best Streak" value={stats?.bestStreak ?? 0} />
        <StatCard title="7d Completion %" value={`${stats?.completionRate7d ?? 0}%`} />
      </div>
    </div>
  )
}