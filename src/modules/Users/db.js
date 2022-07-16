import { prisma } from '../../services/Prisma.js'
import {
  getAvgMarks,
  storeUsersTest,
  getQuestionsAnswersCount,
  getTestHighestScore,
  getUsersAnsweredQuestions,
  getQuestionMarks,
} from './helpers.js'
import { ROLE_STUDENT, ROLE_ADMIN } from '../constants.js'
import { getAllGroups } from '../Groups/db.js'

const { user, userTest, userTestAnswers } = prisma

export const getAllUsers = async (search) => {
  const avgMarks = await getAvgMarks()
  let users = await prisma.user.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
        {
          lastName: {
            contains: search,
          },
        },
      ],
    },
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
}
export const getUserById = async (id) => {
  const userProfile = await user.findUnique({
    where: {
      id: +id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: { select: { id: true, name: true } },
      createdAt: true,
      updatedAt: true,
    },
  })
  const avgMark = await getAvgMarks(+id)
  userProfile.avgMark = avgMark[0]?._avg?.mark || 0

  return userProfile
}
export const getTopUsers = async () => {
  const avgMarks = await getAvgMarks(undefined, 3)
  const userIds = avgMarks.map((avg) => avg.userId)
  let users = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
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
  users.sort((a, b) => b.avgMark - a.avgMark)
  return users
}
export const getUser = async (data) => {
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
    const avgMarks = await getAvgMarks(foundUser.id)
    foundUser['avgMark'] = avgMarks[0]?._avg?.mark
  }
  if (foundUser?.role.name === ROLE_ADMIN) {
    const tmp = await getAllGroups()
    foundUser.userGroup = tmp.map((group) => {
      return { group }
    })
  }
  return foundUser
}
export const updateUserbyId = async (id, data) => {
  const updatedUser = await user.update({
    where: {
      id,
    },
    data,
  })
  return updatedUser
}
export const deleteUserByIds = async (ids) => {
  const deletedUsers = await user.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  })
  return deletedUsers
}
export const createUsers = async (data) => {
  return prisma.$transaction(async (prisma) => {
    for (const { firstName, lastName, email, password, roleId, groups } of data) {
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          roleId: +roleId,
        },
      })

      const groupIds = groups.reduce((acc, group) => {
        if (group.checked) acc.push(group.id)
        return acc
      }, [])

      for (const groupId of groupIds) {
        await prisma.userGroup.upsert({
          where: { userId_groupId: { userId: user.id, groupId } },
          update: {},
          create: {
            userId: user.id,
            groupId,
          },
        })
      }
    }

    return { error: null }
  })
}
export const getUserTests = async (email) => {
  const foundedTests = await user.findUnique({
    where: { email },
    select: {
      userTest: {
        select: {
          test: true,
          isComplete: true,
        },
      },
    },
  })
  return foundedTests.userTest
}
export const addMark = async (
  teacherEmail,
  { studentId: userId, testId, mark },
  secure = false,
  prisma = prisma
) => {
  if (!secure) {
    let { userGroup: teacherGroups } = await prisma.user.findUnique({
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
    const foundUser = await prisma.userGroup.findFirst({
      where: {
        userId,
        groupId: {
          in: teacherGroups,
        },
        user: {
          role: {
            name: ROLE_STUDENT,
          },
        },
      },
    })
    if (!foundUser) {
      throw new Error('You cant add mark for this student')
    }
  }
  const updatedUserTest = await prisma.userTest.update({
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
export const calculateUserTestMark = async (prisma, answersIds, userId, testId) => {
  const answerData = await getUsersAnsweredQuestions(prisma, answersIds)
  const { highestScore, _count, questions } = await getTestHighestScore(prisma, testId)
  const testQuestions = questions.map((elem) => elem.id)
  const questionMaxMark = highestScore / _count.questions
  const questionAnswerCount = await getQuestionsAnswersCount(prisma, testQuestions)
  const answerCounts = { wrong: {}, correct: {} }
  const answerResult = { wrong: [], correct: [] }
  const questionAnswers = []
  answerData.forEach((answer) => {
    questionAnswers.push({ questionId: answer.questionId, answerId: answer.id, userId, testId })
    answerCounts['wrong'][answer.questionId] = answerCounts['wrong'][answer.questionId] || 0
    answerCounts['correct'][answer.questionId] = answerCounts['correct'][answer.questionId] || 0
    if (answer.isCorrect) {
      answerCounts['correct'][answer.questionId]++
      answerResult['correct'].push(answer.id)
      return
    }
    answerCounts['wrong'][answer.questionId]++
    answerResult['wrong'].push(answer.id)
  })
  const { mark, questionMarks } = await getQuestionMarks(
    testQuestions,
    answerCounts,
    questionAnswerCount,
    questionMaxMark,
    highestScore
  )
  return {
    mark,
    correctAnswerIds: answerResult['correct'],
    wrongAnswerIds: answerResult['wrong'],
    questionAnswers,
    questionMarks,
  }
}

export const submitTest = async (body, userId) => {
  return prisma.$transaction(async (prisma) => {
    const { testId, answersIds } = body
    if (answersIds.length === 0) {
      await addMark('dummy', { studentId: userId, testId, mark: 0 }, true, prisma)
      return { mark: 0 }
    }
    const data = await calculateUserTestMark(prisma, answersIds, userId, testId)

    await addMark('dummy', { studentId: userId, testId, mark: data.mark }, true, prisma)
    await storeUsersTest(prisma, data.questionAnswers, userId, testId)
    return data
  })
}
export const getUserTestResults = async (userId, testId) => {
  const { highestScore, _count, questions } = (await getTestHighestScore(prisma, testId)) || {}
  if (!highestScore || !_count || !questions) throw 'Test Not Found'
  const questionMaxMark = highestScore / _count.questions
  const testQuestions = questions.map((elem) => elem.id)
  const questionAnswerCount = await getQuestionsAnswersCount(prisma, testQuestions)
  const usersAnswers = await userTestAnswers.findMany({
    where: {
      testId,
      userId,
    },
    select: {
      answer: true,
    },
  })
  const answerCounts = { wrong: {}, correct: {} }
  const answerResult = {}

  usersAnswers.forEach(({ answer }) => {
    answerCounts['wrong'][answer.questionId] = answerCounts['wrong'][answer.questionId] || 0
    answerCounts['correct'][answer.questionId] = answerCounts['correct'][answer.questionId] || 0

    answerResult[answer.questionId] = answerResult[answer.questionId] || {}
    if (answer.isCorrect) {
      answerCounts['correct'][answer.questionId]++
      answerResult[answer.questionId][answer.id] = true
      return
    }
    answerCounts['wrong'][answer.questionId]++
    answerResult[answer.questionId][answer.id] = false
  })

  const { mark, questionMarks } = await getQuestionMarks(
    testQuestions,
    answerCounts,
    questionAnswerCount,
    questionMaxMark,
    highestScore
  )

  return {
    mark,
    answerResult,
    questionMarks,
  }
}

export const getUsersIpAddresses = async (email) => {
  const userIp = await user.findUnique({
    where: {
      email,
    },
    select: {
      ipAddresses: true,
    },
  })
  return userIp
}

export const updateUserIpAddresses = async (userId, ipAddress) => {
  const newIp = await prisma.ipAddresses.create({
    data: {
      userId,
      ipAddress,
    },
  })
  return newIp
}

export const getOnlineUsers = async () => {
  const onlineUsers = await user.findMany({
    where: {
      isOnline: true,
    },
    select: {
      role: true,
      id: true,
    },
  })

  return onlineUsers
}
