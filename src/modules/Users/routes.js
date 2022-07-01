import { Router } from 'express'
import { validateSchema, verifyRoles } from '../../helpers/validations.js'
import {
  handleGetAllUsers,
  handleCreateUsers,
  handleUpdateUser,
  handleSetUserMark,
  handleUpdateUserTest,
  handleUserTestSubmit,
  handleGetUserTestResults,
  handleDeleteUsers,
} from './service.js'
import validations from './validation.js'

const {
  createUsersSchema,
  deleteUsersSchema,
  setTestFinishSchema,
  setUserMarkSchema,
  changePasswordSchema,
  submitTestSchema,
  getTestResultsSchema,
} = validations

const router = Router()

router.get('/', verifyRoles(['Admin', 'Teacher', 'Student']), handleGetAllUsers)
router.get(
  '/testResults/:userId/:testId',
  validateSchema(getTestResultsSchema),
  handleGetUserTestResults
)
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
router.delete('/', validateSchema(deleteUsersSchema), verifyRoles(['Admin']), handleDeleteUsers)

export { router as usersRoutes }
