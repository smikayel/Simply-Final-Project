import { prisma } from '../../services/Prisma.js'

const { group } = prisma

export const createGroup = async (data) => {
  try {
    const createdGroup = await group.create({
      data,
    })
    return createdGroup
  } catch (error) {
    return error
  }
}

export const getGroupById = async (id) => {
  try {
    const foundGroup = await group.findUnique({
      where: {
        id,
      },
      include: {
        userGroup: true,
        schedule: true,
      },
    })
    return foundGroup
  } catch (error) {
    return error
  }
}

export const getAllGroups = async () => {
  try {
    const groups = await group.findMany()
    return groups
  } catch (error) {
    return error
  }
}

export const deleteGroupById = async (id) => {
  try {
    const deletedGroup = await group.delete({
      where: {
        id,
      },
    })
    return deletedGroup
  } catch (error) {
    return error
  }
}

export const getGroupUsers = async (id) => {
  let group = await prisma.UserGroup.findMany({
    where: {
      groupId: id,
    },
    select: {
      user: {
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

  group = { id, users: group }

  return group
}
