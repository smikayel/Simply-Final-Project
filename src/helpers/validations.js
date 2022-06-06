import { badRequestErrorCreator, unauthorizedErrorCreator } from './errors.js'
import jwt from 'jsonwebtoken'
import { handleRefreshToken } from "../modules/Auth/service.js";

export const validateSchema = (schema) => {

  if (typeof schema !== 'object' || schema === null) throw new Error('Schema is not an object')

  return async (req, res, next) => {
    const { params, body } = req

    try {
      schema.params && (await schema.params.validateAsync(params))
      schema.body && (await schema.body.validateAsync(body))
      return next()
    } catch (error) {
      console.log(error.details);
      next(badRequestErrorCreator(error.details))
    }
  }
}

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer '))
      return res.json(unauthorizedErrorCreator("Access token expired!"));

      const token = authHeader.split(' ')[1];

      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
              return res.status(403).json(err);
            } //invalid token
            req.email = decoded.UserInfo.email;
            req.role = decoded.UserInfo.role;
            next();
        }
    );
}

export const verifyRoles = (allowedRoles) => {
  
  return (req, res, next) => {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      const token = authHeader.split(' ')[1];
      const { UserInfo } = jwt.decode(token);
      const { name } = UserInfo.role;
      if (!UserInfo.role) 
        return res.json(unauthorizedErrorCreator('Role not found!'));

      const result = allowedRoles.some(allowedRole => allowedRole === name);

      if (!result) 
        return res.json(unauthorizedErrorCreator('Role not allowed!'));
      next();
  }

}
