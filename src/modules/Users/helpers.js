import { prisma } from '../../services/Prisma.js'
const { userTest } = prisma

export const getAvgMarks = async (userId, limit = undefined) =>
  prisma.userTest.groupBy({
    by: ['userId'],
    _avg: {
      mark: true,
    },
    where: {
      mark: {
        gte: 0,
      },
      isComplete: true,
      userId,
    },
    orderBy: {
      _avg: {
        mark: 'desc',
      },
    },
    take: limit,
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

export const getQuestionMarks = async (
  testQuestions,
  answerCounts,
  questionAnswerCount,
  questionMaxMark,
  highestScore
) => {
  const questionMarks = {}
  let mark = 0
  console.log(
    console.log(answerCounts['correct']),
    answerCounts['wrong'],
    questionAnswerCount,
    questionMaxMark
  )
  for (const key of testQuestions) {
    questionMarks[key] = 0 // if student chose all answers of question give 0
    if (!questionAnswerCount[key] || (!answerCounts['correct'][key] && !answerCounts['wrong'][key]))
      continue
    if (questionAnswerCount[key]['all'] === questionAnswerCount[key]['correct']) {
      questionMarks[key] = questionMaxMark
      mark += questionMarks[key]
      continue
    }
    if (
      !(
        answerCounts['correct'][key] + answerCounts['wrong'][key] ===
        questionAnswerCount[key]['all']
      )
    ) {
      questionMarks[key] =
        questionMaxMark *
        ((answerCounts['correct'][key] - answerCounts['wrong'][key]) /
          questionAnswerCount[key]['correct'])
      questionMarks[key] = questionMarks[key] < 0 ? 0 : questionMarks[key] // give 0 if more answers are wrong than correct
      questionMarks[key] = Math.round(questionMarks[key] * 1e2) / 1e2 // round to 2 decimal places
    }
    console.log(questionMarks[key], key)
    mark += questionMarks[key]
  }
  console.log(mark)
  // if student answered all questions correct give highest score to avoid round errors
  if (mark > highestScore) mark = highestScore
  mark = Math.round(mark * 1e2) / 1e2 // round to 2 decimal places
  console.log(mark)
  return { mark, questionMarks }
}

export const validateTestResultReq = async (userId, testId) => {
  const findTest = await userTest.findUnique({
    where: {
      userId_testId: {
        userId,
        testId,
      },
    },
  })
  if (!findTest) throw new Error('You cant view this test results')
}

export const validateTestSubmit = async (userId, testId) => {
  const findTest = await userTest.findUnique({
    where: {
      userId_testId: {
        userId,
        testId,
      },
    },
  })
  if (!findTest || findTest.isComplete) throw new Error("You can't submit this test")
}
