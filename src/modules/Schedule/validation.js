// import Joi from 'joi'

// export default {
//   createUserSchema: {
//     body: Joi.object({
//       firstName: Joi.string().min(3).max(30).required(),
//       lastName: Joi.string().min(3).max(30).required(),
//       email: Joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'am'] } })
//         .required(),
//       password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
//       // userGroup: Joi.array().items()
//       roleId: Joi.number().required(),
//     }),
//   },
// }
