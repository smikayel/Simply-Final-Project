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
    body: Joi.object({
      groupId: Joi.number().strict().required(),
      take: Joi.number().strict().required(),
      skip: Joi.number().strict().required(),
    }),
  },
}
