import { headers } from "next/headers"

export async function getCurrentUserId() {
  const h = await headers()
  return h.get("x-user-id")
}

export async function getCurrentTenantId() {
  const h = await headers()
  return h.get("x-tenant-id")
}