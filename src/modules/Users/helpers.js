export const getAvgMarks = async (prisma, userId) =>
  prisma.userTest.groupBy({
    by: ['userId'],
    _avg: {
      mark: true,
    },
    where: {
      mark: {
        gte: 0,
      },
      userId,
    },
    orderBy: {
      _avg: {
        mark: 'desc',
      },
    },
  })

export const storeUsersTest = async (prisma, data) =>
  prisma.userTestAnswers.createMany({
    data,
  })

export const getQuestionsAnswersCount = async (prisma, questionIds) => {
  const data = await prisma.answer.findMany({
    select: {
      id: true,
      questionId: true,
      isCorrect: true,
    },
    where: {
      questionId: {
        in: questionIds,
      },
    },
  })
  const answersCount = {}
  data.forEach((elem) => {
    answersCount[elem.questionId] = answersCount[elem.questionId] || {}
    if (elem.isCorrect)
      answersCount[elem.questionId].correct = (answersCount[elem.questionId].correct || 0) + 1
    answersCount[elem.questionId].all = (answersCount[elem.questionId].all || 0) + 1
  })

  return answersCount
}

export const getTestHighestScore = async (prisma, testId) =>
  prisma.test.findUnique({
    include: {
      _count: {
        select: { questions: true },
      },
      questions: {
        select: {
          id: true,
        },
      },
    },

    where: {
      id: testId,
    },
  })

export const getUsersAnsweredQuestions = async (prisma, answersIds) =>
  prisma.answer.findMany({
    select: {
      id: true,
      questionId: true,
      isCorrect: true,
    },
    where: {
      id: {
        in: answersIds,
      },
    },
  })
