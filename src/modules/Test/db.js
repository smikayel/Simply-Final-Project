import { prisma } from '../../services/Prisma.js'
import { changeStructureForAnswers } from './helpers.js'
import includes from './includes.js'

const { userTest } = prisma

export const getAllTests = async () => {
  const allTests = await prisma.test.findMany({
    include: includes(true), // include answers with isCorrect
  })
  return allTests
}

export const getTest = async (id, completed) => {
  const foundedTest = await prisma.test.findUnique({
    where: { id },
    include: includes(completed),
  })
  return foundedTest
}

export function createTests(testData) {
  return prisma.$transaction(async (prisma) => {
    const startDate = new Date(testData.start)
    let questions = testData.questions

    questions.forEach((question, i) => {
      let isMulti = false
      let count = 0
      for (const answer of testData.answers[i]) {
        if (answer.isCorrect) count++
        if (count > 1) {
          isMulti = true
          break
        }
      }
      question.isMultiSelect = isMulti
    })

    const newTest = await prisma.Test.create({
      data: {
        name: testData.name,
        subjectId: +testData.subjectId,
        start: testData.start, //'2022-06-11T21:38:26.832Z'
        length: testData.length, // in minutes
        highestScore: testData.highestScore,
        questions: {
          create: testData.questions,
        },
      },
      include: includes(false),
    })

    questions = newTest.questions
    const questionsIds = questions.reduce((acc, element) => {
      acc.push(element.id)
      return acc
    }, [])
    const answersData = changeStructureForAnswers(testData.answers, questionsIds)

    await prisma.Answer.createMany({
      data: answersData,
    })
    await prisma.UserTest.create({
      data: { userId: testData.userId, testId: newTest.id },
    })
    await prisma.GroupTest.create({
      data: { groupId: +testData.group, testId: newTest.id },
    })
    const groupUsers = await prisma.userGroup.findMany({
      where: { groupId: +testData.group },
    })
    const groupUsersIds = groupUsers.map((userGroupElement) => {
      if (testData.userId !== userGroupElement.userId)
        return { userId: userGroupElement.userId, testId: newTest.id }
    })

    const groupUsersIdsFilterd = groupUsersIds.filter((element) => {
      return element !== undefined
    })
    await prisma.UserTest.createMany({
      data: groupUsersIdsFilterd,
    })

    const dateInLocal = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)

    setTimeout(async () => {
      await userTest.updateMany({
        where: {
          testId: newTest.id,
          isComplete: false,
        },
        data: { isComplete: true, mark: 0 },
      })
    }, startDate - dateInLocal + testData.length * 60 * 1000)

    return newTest
  })
}

export async function deleteTest(testData) {
  const deletedTest = await prisma.Test.delete({
    where: {
      id: testData.id,
    },
  })
  return deletedTest
}

export const getAllUserTests = async (userId, isCompleteVal, take, skip, subjectId) => {
  const order = !isCompleteVal ? 'asc' : 'desc'

  const userTests = await prisma.UserTest.findMany({
    where: {
      userId,
      isComplete: isCompleteVal,
      test: {
        subjectId,
      },
    },
    include: {
      test: { include: { questions: true } },
    },
    take,
    skip,
    orderBy: {
      test: {
        start: order,
      },
    },
  })

  const userTestsCount = await prisma.UserTest.aggregate({
    where: {
      userId,
      isComplete: isCompleteVal,
      test: {
        subjectId,
      },
    },
    _count: true,
  })

  const allTests = userTests.map((userTest) => {
    const test = userTest.test
    test.mark = userTest.mark
    test.isComplete = userTest.isComplete
    test.questions = test.questions.length
    return test
  })
  return { allTests, count: userTestsCount }
}
