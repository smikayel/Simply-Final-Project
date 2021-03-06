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
  let correctQuestionsCount = 0

  for (const key of testQuestions) {
    questionMarks[key] = 0
    if (!questionAnswerCount[key] || !answerCounts['correct'][key]) continue // 0 if user doesnt have correct answers or any answers

    if (
      answerCounts['correct'][key] === questionAnswerCount[key]['correct'] &&
      answerCounts['wrong'][key] === 0
    ) {
      // all answers were correct and user chose them
      questionMarks[key] = questionMaxMark
      correctQuestionsCount++
    } else if (
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
    }

    // if none of ifs worket it means chose all answers of question and there were worng answers so give 0
    questionMarks[key] = Math.round(questionMarks[key] * 1e2) / 1e2 // round to 2 decimal places
    mark += questionMarks[key]
  }

  // if student answered all questions correct give highest score to avoid round errors
  if (mark > highestScore || correctQuestionsCount === testQuestions.length) mark = highestScore
  mark = Math.round(mark * 1e2) / 1e2 // round to 2 decimal places

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
