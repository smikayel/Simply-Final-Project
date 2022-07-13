import { Router } from 'express'
import { validateSchema, verifyRoles } from '../../helpers/validations.js'
import {
  handleCreateGroup,
  handleGetAllGroups,
  handleGetGroupById,
  handleDeleteGroupsById,
  handleGetGroupUsers,
} from './service.js'
import validations from './validation.js'
import { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER } from '../constants.js'

const { createGroupSchema, getGroupByIdSchema, deleteGroupsSchema, getGroupUsersSchema } =
  validations

const router = Router()

router.get('/', verifyRoles([ROLE_ADMIN]), handleGetAllGroups)
router.get(
  '/:id/users',
  validateSchema(getGroupUsersSchema),
  verifyRoles([ROLE_ADMIN, ROLE_TEACHER, ROLE_STUDENT]),
  handleGetGroupUsers
)
router.post('/', validateSchema(createGroupSchema), verifyRoles([ROLE_ADMIN]), handleCreateGroup)
router.delete(
  '/',
  validateSchema(deleteGroupsSchema),
  verifyRoles([ROLE_ADMIN]),
  handleDeleteGroupsById
)
router.get(
  '/:id',
  validateSchema(getGroupByIdSchema),
  verifyRoles([ROLE_ADMIN]),
  handleGetGroupById
)

/**
 * @swagger
 * tags:
 *   name: group
 *   description: The group managing API
 */

/**
 * @swagger
 * /api/v1/groups/:
 *    get:
 *     description: Use to get all groups only admin
 *     tags: [group]
 *     consumes:
 *      - application/json
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get all groups
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/groups/{id}/users:
 *    get:
 *     description: Use to get all users of group with group id
 *     tags: [group]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *         example: 1
 *        required: true
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get all group users
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/groups/:
 *    post:
 *     description: Use to create new group. Only admin
 *     tags: [group]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: Group name
 *        schema:
 *          type: object
 *          required:
 *            - name
 *          properties:
 *            name:
 *              type: string
 *              minLength: 1
 *              maxLength: 30
 *              example: 907
 *              description: Group name
 *        required: true
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '201':
 *        description: Successfully created new group
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/groups/:
 *    delete:
 *     description: Use to delete groups
 *     tags: [group]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: Group ids
 *        schema:
 *          type: object
 *          required:
 *            - ids
 *          properties:
 *            ids:
 *              type: array
 *              items:
 *                type: number
 *              example: [2, 3]
 *          description: Group ids
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully delete all groups by ids
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/groups/{id}/:
 *    get:
 *     description: Use to get group info plus groups users schedule and by group id
 *     tags: [group]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: number
 *         example: 1
 *        required: true
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get group info by id
 *      '400':
 *        description: Bad request
 */

export { router as groupsRoutes }
