import { prisma } from '../../services/Prisma.js'
import { getAvgMarks } from './helpers.js'

const { user, userGroup, userTest, answer } = prisma

export const getAllUsers = async () => {
  try {
    return prisma.$transaction(async (prisma) => {
      const avgMarks = await getAvgMarks(prisma)
      let users = await prisma.user.findMany({
        include: {
          role: true,
        },
      })
      users = users.map((user) => {
        //eslint-disable-next-line
        const { password, refreshToken, ...userData } = user
        userData['avgMark'] = avgMarks.find((avg) => avg.userId === +user.id)?._avg.mark
        return userData
      })

      return users
    })
  } catch (error) {
    return error
  }
}

export const getUser = async (data) => {
  try {
    return prisma.$transaction(async (prisma) => {
      const foundUser = await prisma.user.findUnique({
        where: data,
        include: {
          role: true,
          userTest: true,
          userGroup: {
            select: { group: true },
          },
        },
      })
      if (foundUser) {
        const avgMarks = await getAvgMarks(prisma, foundUser.id)
        foundUser['avgMark'] = avgMarks[0]?._avg?.mark
      }
      return foundUser
    })
  } catch (error) {
    return error
  }
}

export const updateUserbyId = async (id, data) => {
  try {
    const updatedUser = await user.update({
      where: {
        id,
      },
      data,
    })
    return updatedUser
  } catch (error) {
    return error
  }
}

export const deleteUserById = async (id) => {
  try {
    const deletedUser = await user.delete({
      where: {
        id,
      },
    })
    return deletedUser
  } catch (error) {
    return error
  }
}

export const createUsers = async (data) => {
  try {
    const createdUsers = await user.createMany({
      data,
    })
    return createdUsers
  } catch (error) {
    return error
  }
}

export const getUserTests = async (email) => {
  try {
    const foundedTests = await user.findUnique({
      where: { email },
      select: {
        userTest: {
          select: {
            test: true,
          },
        },
      },
    })
    return foundedTests.userTest
  } catch (error) {
    return error
  }
}

export const addMark = async (
  teacherEmail,
  { studentId: userId, testId, mark },
  secure = false
) => {
  if (!secure) {
    let { userGroup: teacherGroups } = await user.findUnique({
      select: {
        userGroup: {
          select: { groupId: true },
        },
      },
      where: {
        email: teacherEmail,
      },
    })

    teacherGroups = teacherGroups.map((elem) => elem.groupId)

    if (teacherGroups.length === 0) {
      throw new Error('You cant add mark for this test')
    }
    const foundUser = await userGroup.findFirst({
      where: {
        userId,
        groupId: {
          in: teacherGroups,
        },
        user: {
          role: {
            name: 'Student',
          },
        },
      },
    })
    if (!foundUser) {
      throw new Error('You cant add mark for this student')
    }
  }
  const updatedUserTest = await userTest.update({
    where: {
      userId_testId: {
        userId,
        testId,
      },
    },
    data: {
      mark,
      isComplete: true,
    },
  })
  return updatedUserTest
}

export const getMarks = async (userId) => {
  const testsMarks = prisma.userTest.findMany({
    where: {
      userId,
    },
    include: {
      test: true,
    },
  })
  return testsMarks
}

export const updateUserTest = async (userId, { testId, ...data }) => {
  const updatedUserTest = await userTest.update({
    data,
    where: {
      userId_testId: {
        userId,
        testId,
      },
    },
  })
  return updatedUserTest
}

export const calculateUserTestMark = async ({ answersIds, optionsCount }) => {
  const score = await answer.groupBy({
    by: ['questionId'],
    _count: {
      id: true,
    },
    where: {
      isCorrect: true,
      id: {
        in: answersIds,
      },
    },
  })
  if (!optionsCount) {
    return score.reduce((acc, elem) => acc + elem._count.id, 0)
  }

  const mark = score.reduce((acc, curr) => {
    const count = optionsCount.find((elem) => elem.questionId === curr.questionId)?.count || 1
    return acc + curr._count.id / count
  }, 0)

  return mark
}
