import { Router } from 'express'
import { validateSchema, verifyRoles } from '../../helpers/validations.js'
import {
  handleGetAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
  handleSetUserMark,
} from './service.js'
import validations from './validation.js'

const { createUserSchema, deleteUserSchema, changePasswordSchema } = validations

const router = Router()

router.get('/', verifyRoles(['Admin', 'Teacher', 'Student']), handleGetAllUsers)
router.post('/', validateSchema(createUserSchema), verifyRoles(['Admin']), handleCreateUser)
router.put(
  '/',
  verifyRoles(['Admin', 'Student', 'Teacher']),
  validateSchema(changePasswordSchema),
  handleUpdateUser
)
router.put('/setMark', verifyRoles(['Teacher']), handleSetUserMark)
router.delete('/', validateSchema(deleteUserSchema), verifyRoles(['Admin']), handleDeleteUser)

export { router as usersRoutes }
