import { Prisma } from "@prisma/client"

export const tenantRepo = {
  create(tx: Prisma.TransactionClient, name: string) {
    return tx.tenant.create({
      data: { name },
    })
  },
}