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

/**
 * @swagger
 * tags:
 *   name: chat
 *   description: The chat managing API
 */

/**
 * @swagger
 * /api/v1/chats/{groupId}/messages:
 *    get:
 *     description: Use to get messages for a group. Can specify limit and offset for messages
 *     tags: [chat]
 *     consumes:
 *      - application/json
 *     parameters:
 *     - in: path
 *       name: groupId
 *       description: The group id
 *       required: true
 *       schema:
 *        type: string
 *        example: 1
 *        description: The group id
 *     - in: query
 *       name: take
 *       description: The number of messages to take
 *       required: false
 *       schema:
 *        type: integer
 *        example: 10
 *     - in: query
 *       name: skip
 *       description: The number of messages to skip
 *       required: false
 *       schema:
 *        type: integer
 *        example: 3
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get group messages sorted by date desc
 *      '400':
 *        description: Bad request
 *      '402':
 *        description: User is not authorized to get group messages
 */
