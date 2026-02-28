import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProfile, login, logout, register } from "./user.api"

export function useProfile(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["profile"],
      })
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: register,
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
      window.location.href = "/login"
    },
  })
}
