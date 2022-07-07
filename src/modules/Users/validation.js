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
  deleteUsersSchema: {
    body: Joi.object({
      ids: Joi.array().items(Joi.number().strict().required()).required(),
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
    body: Joi.object({
      answersIds: Joi.array().items(Joi.number().strict().integer().min(1)).required(),
      testId: Joi.number().integer().strict().min(1).required(),
    }),
  },

  getTestResultsSchema: {
    params: Joi.object({
      userId: Joi.number().integer().min(1),
      testId: Joi.number().integer().min(1),
    }),
  },

  getAllUsersSchema: {
    query: Joi.object({
      search: Joi.string().allow('').max(30),
    }).unknown(true),
  },

  getUserByIdSchema: {
    params: Joi.object({
      id: Joi.number().integer().min(1),
    }),
  },

  resetPasswordSchema: {
    params: Joi.object({
      userId: Joi.number().integer().min(1).required(),
      token: Joi.string().required(),
    }),
  },
}
