import { Prisma } from "@prisma/client"

export const userRepo = {
  findByEmail(tx: Prisma.TransactionClient, email: string) {
    return tx.user.findUnique({
      where: { email },
    })
  },

  create(
    tx: Prisma.TransactionClient,
    data: {
      email: string
      password: string
      tenantId: string
    }
  ) {
    return tx.user.create({
      data,
    })
  },
}