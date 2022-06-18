import { prisma } from '../../services/Prisma.js'
import {
  getAvgMarks,
  storeUsersTest,
  getQuestionsAnswersCount,
  getTestHighestScore,
  getUsersAnsweredQuestions,
} from './helpers.js'

const { user, userTest } = prisma

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
            name: 'Student',
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

export const calculateUserTestMark = async (prisma, { answersIds }, userId, testId) => {
  const answerData = await getUsersAnsweredQuestions(prisma, answersIds)

  const {
    highestScore,
    _count,
    questions: testQuestions,
  } = await getTestHighestScore(prisma, testId)
  const questionMaxMark = highestScore / _count.questions

  let questionIds = new Set(answerData.map((elem) => elem.questionId))
  questionIds = [...questionIds]
  const questionAnswerCount = await getQuestionsAnswersCount(prisma, questionIds)

  const correctAnswerIds = []
  const questionAnswers = []
  const wrongAnswerIds = []
  const count = {}
  const wrongCount = {}
  answerData.forEach((elem) => {
    questionAnswers.push({ questionId: elem.questionId, answerId: elem.id, userId, testId })
    count[elem.questionId] = count[elem.questionId] || 0
    wrongCount[elem.questionId] = wrongCount[elem.questionId] || 0
    if (elem.isCorrect) {
      correctAnswerIds.push(elem.id)
      count[elem.questionId]++
      return
    }
    wrongAnswerIds.push(elem.id)
    wrongCount[elem.questionId]++
  })

  const questionMarks = {}
  let mark = 0
  for (const key in count) {
    questionMarks[key] = 0 // if student chose all answers of question give 0
    if (!(count[key] + wrongCount[key] === questionAnswerCount[key]['all'])) {
      questionMarks[key] =
        questionMaxMark * ((count[key] - wrongCount[key]) / questionAnswerCount[key]['correct'])
      questionMarks[key] = questionMarks[key] < 0 ? 0 : questionMarks[key] // give 0 if more answers are wrong than correct
      questionMarks[key] = Math.round(questionMarks[key] * 1e2) / 1e2 // round to 2 decimal places
    } else if (questionAnswerCount[key]['all'] === questionAnswerCount[key]['correct']) {
      questionMarks[key] = questionMaxMark
    }
    mark += questionMarks[key]
  }
  // if student answered all questions correct give highest score to avoid round errors
  if (mark > highestScore) mark = highestScore
  mark = Math.round(mark * 1e2) / 1e2 // round to 2 decimal places
  // set non answered question marks equal to 0
  testQuestions.forEach(({ id }) => (questionMarks[id] = questionMarks[id] || 0))
  return { mark, correctAnswerIds, wrongAnswerIds, questionAnswers, questionMarks }
}

export const submitTest = async (body, userId, testId) => {
  return prisma.$transaction(async (prisma) => {
    const data = await calculateUserTestMark(prisma, body, userId, testId)
    await addMark('dummy', { studentId: userId, testId, mark: data.mark }, true, prisma)
    await storeUsersTest(prisma, data.questionAnswers, userId, testId)
    return data
  })
}
