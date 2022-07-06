import { Router } from 'express'
import { verifyRoles } from '../../helpers/validations.js'
import { handleGetAllRoles } from './service.js'

const router = Router()

router.get('/', verifyRoles(['Admin', 'Students', 'Teacher']), handleGetAllRoles)

export { router as rolesRoutes }

/**
 * @swagger
 * tags:
 *   name: role
 *   description: The role managing API
 */

/**
 * @swagger
 * /api/v1/tests/:
 *    get:
 *     description: Use to get all roles.
 *     tags: [role]
 *     consumes:
 *      - application/json
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get all roles
 *      '400':
 *        description: Bad request
 */
