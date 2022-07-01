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
  deleteGroupsSchema: {
    body: Joi.object({
      ids: Joi.array().items(Joi.number().integer().strict().required()).required(),
    }),
  },
  getGroupUsersSchema: {
    params: Joi.object({ id: Joi.number().required() }),
  },
}
