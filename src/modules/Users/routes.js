import { Router } from "express"
import { validate  } from "../../helpers/common.js"
import { getAllUsers, getUser, createUser, deleteUser, updateUser } from "./services.js"
import validations from './validations.js'

const { getUserByIdSchema, postCreeateUserSchema, deleteUserSchema, updateUserSchema } = validations

const router = Router()

router.get('/', getAllUsers)
router.get('/:UserId', validate(getUserByIdSchema), getUser)
router.post('/', validate(postCreeateUserSchema), createUser)
router.delete('/', validate(deleteUserSchema), deleteUser)
router.put('/', validate(updateUserSchema), updateUser)

export { router as UserRoutes }
