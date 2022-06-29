import { prisma } from '../../services/Prisma.js'

const { message } = prisma

export const createMessage = async ({ senderId, groupId, message: text }) => {
  const createdMessage = await message.create({
    data: {
      text,
      senderId,
      groupId,
    },
    userMessage: {
      userId: senderId,
      seen: true,
    },
  })
  return createdMessage
}

export const getGroupMessages = async ({ groupId, take, skip }) => {
  const messages = await message.findMany({
    where: {
      groupId,
    },
    take,
    skip,
    include: {
      sender: true,
    },
  })
  return messages
}
