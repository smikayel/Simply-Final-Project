import Joi from 'joi'

export default {
  getCompanyByIdSchema: {
    params: Joi.object({
      companyId: Joi.number().integer().required(),
    }),
  },
}
