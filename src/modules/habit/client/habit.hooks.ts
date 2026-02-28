// React Query 层）
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getHabits, createHabit, Habit, getHabitStats } from "./habit.api"

export function useHabits() {
  return useQuery<Habit[]>({
    queryKey: ["habits"],
    queryFn: getHabits,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}

export function useCreateHabit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] })
    },
  })
}

export function useHabitStats() {
  return useQuery({
    queryKey: ["habit-stats"],
    queryFn: getHabitStats,
    staleTime: 1000 * 60,
  })
}