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
  const msg = await message.findUnique({
    where: {
      id: createdMessage.id,
    },
    include: {
      sender: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          roleId: true,
          role: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })
  return msg
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
          role: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  return messages
}

export const checkUserInGroup = async (userId, groupId) => {
  console.log(userId, groupId)
  const user = await prisma.userGroup.findUnique({
    where: {
      userId_groupId: {
        userId,
        groupId,
      },
    },
  })
  return user
}
