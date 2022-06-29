import Joi from 'joi'

export default {
  createGroupSchema: {
    body: Joi.object({
      name: Joi.string().min(1).max(30).required(),
    }),
  },
  getGroupByIdSchema: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
  deleteGroupSchema: {
    body: Joi.object({
      id: Joi.number().required(),
    }),
  },
  getGroupUsersSchema: {
    params: Joi.object({ id: Joi.number().required() }),
  },
}
