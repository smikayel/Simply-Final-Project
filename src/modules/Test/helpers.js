export const changeStructureForAnswers = (req_body, questionsIds) => {
  const answersNested = Object.values(req_body)
  const answers = answersNested.reduce((acc, element, index) => {
    const answer = element.map(({ name, isCorrect }) => {
      return { name, questionId: questionsIds[index], isCorrect }
    })
    acc.push(...answer)
    return acc
  }, [])
  return answers
}
