import Joi from 'joi'

export default {
  createMessageSchema: {
    body: Joi.object({
      senderId: Joi.number().strict().required(),
      groupId: Joi.number().strict().required(),
      text: Joi.string().min(1).max(160).required(),
    }),
  },

  getGroupMessagesSchema: {
    params: Joi.object({
      groupId: Joi.number().required(),
    }),
    query: Joi.object({
      take: Joi.number(),
      skip: Joi.number(),
    }).unknown(true),
  },
}
