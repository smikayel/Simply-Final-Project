import Joi from 'joi'

const now = () => new Date() - 10000 * 60 // add 1 mintue delay

export default {
  createTestSchema: {
    body: Joi.object({
      userId: Joi.number().strict().required(),
      name: Joi.string().min(3).required(),
      subjectId: Joi.number().integer().required(),
      start: Joi.date().required().min(now()),
      length: Joi.number().strict().required(),
      highestScore: Joi.number().strict().required(),
      group: Joi.number().integer().required(),
      questions: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().min(3).max(160).required(),
          })
        )
        .required(),
      answers: Joi.array()
        .items(
          Joi.array()
            .items(
              Joi.object({
                name: Joi.string().min(1).max(160).required(),
                isCorrect: Joi.boolean().required(),
              })
            )
            .has(
              Joi.object({
                name: Joi.string().min(1).max(160).required(),
                isCorrect: true,
              })
            )
        )
        .required(),
    }).assert(
      '.questions.length',
      Joi.ref('answers.length'),
      'questions and answers must have the same length'
    ),
  },

  getUsersTestsSchema: {
    query: Joi.object({
      isComplete: Joi.boolean(),
      take: Joi.number().integer(),
      skip: Joi.number().integer(),
      subjectId: Joi.number().integer(),
    }).unknown(true),
  },

  getTestSchema: {
    params: Joi.object({ id: Joi.number().required() }),
  },

  deleteTestSchema: {
    body: Joi.object({ id: Joi.number().strict().required() }),
  },
}
