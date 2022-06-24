import { Router } from 'express'
import { validateSchema, verifyRoles } from '../../helpers/validations.js'
import {
  handleCreateTest,
  handleGetTest,
  handleDeleteTest,
  handleGetAllTests,
  handleGetAllTestsForUser,
} from './service.js'
import validations from './validation.js'

const { createTestSchema, getUsersTestsSchema } = validations

const router = Router()

router.get('/', verifyRoles(['Admin']), handleGetAllTests)
router.get(
  '/usersAll',
  verifyRoles(['Admin', 'Student', 'Teacher']),
  validateSchema(getUsersTestsSchema),
  handleGetAllTestsForUser
)
router.get('/:id', verifyRoles(['Admin', 'Student', 'Teacher']), handleGetTest)
router.post(
  '/',
  validateSchema(createTestSchema),
  verifyRoles(['Admin', 'Teacher']),
  handleCreateTest
)
router.delete('/', verifyRoles(['Admin', 'Teacher']), handleDeleteTest)

export { router as testsRoutes }
