import { badRequestErrorCreator, unauthorizedErrorCreator } from './errors.js'
import jwt from 'jsonwebtoken'
import { AUTH_NOT_REQUIRED } from '../modules/constants.js'

export const validateSchema = (schema) => {
  if (typeof schema !== 'object' || schema === null) throw new Error('Schema is not an object')

  return async (req, res, next) => {
    const { params, body, query } = req
    try {
      schema.params && (await schema.params.validateAsync(params))
      schema.body && (await schema.body.validateAsync(body))
      schema.query && (await schema.query.validateAsync(query))
      return next()
    } catch (error) {
      console.log(error.details)
      next(badRequestErrorCreator(error.details))
    }
  }
}

export const validateSocketShcema = async (schema, data) => {
  try {
    await schema.body.validateAsync(data)
    return 0
  } catch (error) {
    console.log(error.details)
    return badRequestErrorCreator(error.details)
  }
}

export const verifyJWT = (req, res, next) => {
  if (AUTH_NOT_REQUIRED.some((url) => req.url.startsWith(url))) {
    return next()
  }

  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader?.startsWith('Bearer '))
    return res.json(unauthorizedErrorCreator('Access token expired!'))

  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json(err)
    } //invalid token
    req.email = decoded.UserInfo.email
    req.role = decoded.UserInfo.role
    req.id = decoded.UserInfo.id
    next()
  })
}

export const verifyRoles = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader) return res.sendStatus(404)
    const token = authHeader.split(' ')[1]
    const { UserInfo } = jwt.decode(token)
    const { name } = UserInfo.role
    if (!UserInfo.role) return res.status(404).json(unauthorizedErrorCreator('Role not found!'))

    const result = allowedRoles.some((allowedRole) => allowedRole === name)

    if (!result) return res.json(unauthorizedErrorCreator('Role not allowed!'))

    next()
  }
}
