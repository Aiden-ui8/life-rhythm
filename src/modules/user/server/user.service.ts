import bcrypt from "bcryptjs"
import { prisma } from "@/infrastructure/prisma"
import { userRepo } from "./user.repo"
import { signToken } from "@/infrastructure/jwt"
import { tenantRepo } from "@/modules/tenant/server/tenant.repo"

export const userService = {
  async register(email: string, password: string) {
    return prisma.$transaction(async (tx) => {
      const existing = await userRepo.findByEmail(tx, email)

      if (existing) {
        throw new Error("Email already exists")
      }

      const passwordHash = await bcrypt.hash(password, 10)

      const tenant = await tenantRepo.create(
        tx,
        `${email}'s Workspace`
      )

      return userRepo.create(tx, {
        email,
        password: passwordHash,
        tenantId: tenant.id,
      })
    })
  },
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error("Invalid credentials")
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      throw new Error("Invalid credentials")
    }

    return await signToken({
      userId: user.id,
      tenantId: user.tenantId,
    })
  }
}