const includes = (completed) => {
  return {
    userTest: {
      select: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    },
    subject: true,
    questions: {
      include: {
        answers: { select: { name: true, id: true, questionId: true, isCorrect: completed } },
      },
    },
  }
}

export default includes
