import { Router } from 'express'
import { validateSchema, verifyRoles } from '../../helpers/validations.js'
import {
  handleGetAllUsers,
  handleCreateUsers,
  handleDeleteUser,
  handleUpdateUser,
  handleSetUserMark,
  handleUpdateUserTest,
  handleUserTestSubmit,
} from './service.js'
import validations from './validation.js'

const {
  createUsersSchema,
  deleteUserSchema,
  setTestFinishSchema,
  setUserMarkSchema,
  changePasswordSchema,
  submitTestSchema,
} = validations

const router = Router()

router.get('/', verifyRoles(['Admin', 'Teacher', 'Student']), handleGetAllUsers)
router.post('/', validateSchema(createUsersSchema), verifyRoles(['Admin']), handleCreateUsers)
router.put(
  '/',
  verifyRoles(['Admin', 'Student', 'Teacher']),
  validateSchema(changePasswordSchema),
  handleUpdateUser
)
router.post(
  '/submitTest/',
  verifyRoles(['Student', 'Admin']),
  validateSchema(submitTestSchema),
  handleUserTestSubmit
)
router.put(
  '/setMark',
  verifyRoles(['Teacher']),
  validateSchema(setUserMarkSchema),
  handleSetUserMark
)
router.put(
  '/finishTest',
  verifyRoles(['Student']),
  validateSchema(setTestFinishSchema),
  handleUpdateUserTest
)
router.delete('/', validateSchema(deleteUserSchema), verifyRoles(['Admin']), handleDeleteUser)

export { router as usersRoutes }
