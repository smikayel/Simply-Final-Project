import JoiF from 'joi'
import JoiDate from '@joi/date'

const Joi = JoiF.extend(JoiDate)

export default {
  createScheduleSchema: {
    body: Joi.object({
      day: Joi.number().integer().greater(0).less(8).required(),
      groupId: Joi.number().required(),
      scheduleSubject: Joi.array().items(Joi.object({
        subjectId: Joi.number().required(),
        time: Joi.string().required(),
        // time: Joi.date().format("YYYY-MM-DD HH:mm:ss").required(),
      })).required(),
    }),
  },
}