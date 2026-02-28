import { api } from "@/lib/api-client"

export type Profile = {
  id: string
  email: string
  tenantId: string
}

export interface UserProfile {
  id: string
  email: string
  nickname: string
  avatar?: string
}

export function getProfile() {
  return api.get<Profile>("/api/private/profile")
}

export function login(data: {
  email: string
  password: string
}) {
  return api.post<void>("/api/auth/login", data)
}

export function register(data: {
  email: string
  password: string
  name: string
}) {
  return api.post<void>("/api/auth/register", data)
}

export function logout() {
  return api.post<void>("/api/auth/logout")
}