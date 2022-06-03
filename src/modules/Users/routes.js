import { Router } from "express"
import { validateSchema, verifyRoles  } from "../../helpers/validations.js"
import { handleGetAllUsers, handleCreateUser, handleDeleteUser } from "./service.js"
import validations from './validation.js'

const { createUserSchema, deleteUserSchema } = validations

const router = Router()

router.get('/', verifyRoles(["Admin"]), handleGetAllUsers);
router.post('/', validateSchema(createUserSchema), verifyRoles(["Admin"]), handleCreateUser);
router.delete('/', validateSchema(deleteUserSchema), verifyRoles(["Admin"]), handleDeleteUser)

export { router as usersRoutes }