import Joi from 'joi'

export default {
  createUsersSchema: {
    body: Joi.array().items(
      Joi.object({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'am'] } })
          .required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        // userGroup: Joi.array().items()
        roleId: Joi.number().strict().required(),
      })
    ),
  },
  deleteUserSchema: {
    body: Joi.object({
      id: Joi.number().strict().required(),
    }),
  },

  changePasswordSchema: {
    body: Joi.object({
      id: Joi.number().strict().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }),
  },

  setTestFinishSchema: {
    body: Joi.object({
      testId: Joi.number().strict().integer().required(),
      isComplete: Joi.boolean().required(),
    }),
  },

  setUserMarkSchema: {
    body: Joi.object({
      studentId: Joi.number().strict().integer().required(),
      testId: Joi.number().strict().integer().required(),
      mark: Joi.number().strict().min(0).required(),
    }),
  },

  submitTestSchema: {
    params: Joi.object({
      testId: Joi.number().integer().min(1).required(),
    }),
    body: Joi.object({
      questionIds: Joi.array().items(Joi.number().strict().integer().min(1)),
      answersIds: Joi.array().items(Joi.number().strict().integer().min(1).required()),
      optionsCount: Joi.array().items(
        Joi.object({
          questionId: Joi.number().strict().integer().min(1).required(),
          count: Joi.number().strict().integer().min(1).required(),
        })
      ),
    }),
  },
}
