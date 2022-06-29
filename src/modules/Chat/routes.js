import { Router } from 'express'
import { validateSchema, verifyRoles } from '../../helpers/validations.js'
import { handleGetGroupMessages } from './service.js'
import validations from './validation.js'

const { getGroupMessagesSchema } = validations

const router = Router()

router.get(
  '/:groupId/messages',
  verifyRoles(['Admin', 'Student', 'Teacher']),
  validateSchema(getGroupMessagesSchema),
  handleGetGroupMessages
)

export { router as chatsRoutes }
