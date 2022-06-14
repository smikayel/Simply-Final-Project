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
        roleId: Joi.number().required(),
      })
    ),
  },
  deleteUserSchema: {
    body: Joi.object({
      id: Joi.number().required(),
    }),
  },

  changePasswordSchema: {
    body: Joi.object({
      id: Joi.number().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }),
  },

  setTestFinishSchema: {
    body: Joi.object({
      testId: Joi.number().integer().required(),
      isComplete: Joi.boolean().required(),
    }),
  },

  setUserMarkSchema: {
    body: Joi.object({
      studentId: Joi.number().integer().required(),
      testId: Joi.number().integer().required(),
      mark: Joi.number().min(0).required(),
    }),
  },
}
