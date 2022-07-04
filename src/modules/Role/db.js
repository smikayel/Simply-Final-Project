import { prisma } from '../../services/Prisma.js'

const { role } = prisma

export const getRoles = async () => {
  const roles = await role.findMany()
  return roles
}
