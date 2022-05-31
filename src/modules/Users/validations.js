import Joi from 'joi'

export default {
  getUserByIdSchema: {
    params: Joi.object({
      UserId: Joi.number().integer().required(),
    }),
  },
  postCreeateUserSchema: {
      name: Joi.string().min(3).max(45).required(),
      username: Joi.string().min(6).max(20).required(),
      email: Joi.string().min(4).max(250).required(),
      password: Joi.string().min(4).max(250).required()
  },
  deleteUserSchema: {
    username: Joi.string().min(6).max(20).required(),
  },
  updateUserSchema: {
    name: Joi.string().min(3).max(45),
    username: Joi.string().min(6).max(20),
    email: Joi.string().min(4).max(250),
    password: Joi.string().min(4).max(250),
    role: Joi.string().max(250)
  }
}
