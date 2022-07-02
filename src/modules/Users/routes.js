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
  handleGetTopUsers,
  handleGetUserById,
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
  getAllUsersSchema,
  getUserByIdSchema,
} = validations

const router = Router()

router.get(
  '/',
  verifyRoles(['Admin', 'Teacher', 'Student']),
  validateSchema(getAllUsersSchema),
  handleGetAllUsers
)
router.get(
  '/:id',
  verifyRoles(['Admin', 'Teacher', 'Student']),
  validateSchema(getUserByIdSchema),
  handleGetUserById
)
router.get(
  '/testResults/:userId/:testId',
  validateSchema(getTestResultsSchema),
  handleGetUserTestResults
)
router.get('/topUsers', verifyRoles(['Admin', 'Teacher', 'Student']), handleGetTopUsers)
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
