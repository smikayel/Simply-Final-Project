import JoiF from 'joi'
import JoiDate from '@joi/date'

const Joi = JoiF.extend(JoiDate)

export default {
  createSubjectSchema: {
    body: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
      })
    ),
  },
}
