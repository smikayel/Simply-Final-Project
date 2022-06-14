import JoiF from 'joi'
import JoiDate from '@joi/date'

const Joi = JoiF.extend(JoiDate)

export default {
  getScheduleSchema: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },

  getSchedulebyGroupSchema: {
    params: Joi.object({
      groupId: Joi.number().integer().required(),
    }),
    query: Joi.object({
      day: Joi.number().integer().greater(0).less(8).optional(),
    }).unknown(true),
  },

  deleteScheduleSchema: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },

  createScheduleSchema: {
    body: Joi.object({
      day: Joi.number().integer().greater(0).less(8).required(),
      groupId: Joi.number().required(),
      scheduleSubject: Joi.array()
        .items(
          Joi.object({
            subjectId: Joi.number().required(),
            time: Joi.string().required(),
            // time: Joi.date().format("YYYY-MM-DD HH:mm:ss").required(),
          })
        )
        .required(),
    }),
  },

  updateScheduleSchema: {
    body: Joi.object({
      id: Joi.number().integer().required(),
      day: Joi.number().integer().greater(0).less(8).required(),
      groupId: Joi.number().required(),
      scheduleSubject: Joi.array()
        .items(
          Joi.object({
            id: Joi.number().integer().required(),
            // oldTime: Joi.string().required(),
            subjectId: Joi.number().required(),
            time: Joi.string().required(),
            // time: Joi.date().format("YYYY-MM-DD HH:mm:ss").required(),
          })
        )
        .required(),
    }),
  },
}
