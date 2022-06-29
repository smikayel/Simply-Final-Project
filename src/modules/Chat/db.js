import { prisma } from '../../services/Prisma.js'

const { message } = prisma

export const createMessage = async ({ senderId, groupId, text }) => {
  const createdMessage = await message.create({
    data: {
      text,
      senderId,
      groupId,
      userMessage: {
        create: {
          userId: senderId,
          seen: true,
        },
      },
    },
  })
  return createdMessage
}

export const getGroupMessages = async (groupId, take, skip) => {
  const messages = await message.findMany({
    where: {
      groupId,
    },
    take,
    skip,
    include: {
      sender: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          roleId: true,
        },
      },
    },
  })
  return messages
}
