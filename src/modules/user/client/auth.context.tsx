"use client"

import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
} from "react"
import { usePathname } from "next/navigation"
import { useProfile } from "./user.hooks"

type User = {
  id: string
  email: string
  tenantId: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
})

const publicRoutes = ["/login", "/register"]

export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isPublic = publicRoutes.includes(pathname)

  // 🔥 只有私有页面才请求 profile
  const { data, isLoading } = useProfile({
    enabled: !isPublic,
  })

  // 登录页直接放行
  if (isPublic) {
    return <>{children}</>
  }

  // 🔥 加载中不渲染页面（防闪屏）
  if (isLoading) {
    return null
  }

  const value = useMemo(
    () => ({
      user: data ?? null,
      isLoading,
    }),
    [data, isLoading]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}