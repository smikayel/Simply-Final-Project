import { Router } from "express"
import { validateSchema, verifyRoles  } from "../../helpers/validations.js"
import { handleGetAllUsers } from "./service.js"
import validations from './validation.js'

const { createUserSchema } = validations

const router = Router()

router.get('/', verifyRoles(["Admin"]), handleGetAllUsers)

export { router as usersRoutes }