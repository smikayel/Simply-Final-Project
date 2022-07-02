import { Router } from 'express'
import { validateSchema } from '../../helpers/validations.js'
import { handleLogin, handleRefreshToken, handleLogout } from './service.js'
import validations from './validation.js'

const { loginSchema } = validations

const router = Router()

router.post('/login', validateSchema(loginSchema), handleLogin)
router.get('/logout', handleLogout)
router.get('/refresh', handleRefreshToken)

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: The auth managing API
 */

/**
 * @swagger
 * /auth/login:
 *    post:
 *     description: Use to login user
 *     tags: [auth]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          properties:
 *               userid:
 *                 type: string
 *                 description: the id (or email address) inserted by the user in the login form
 *                 example: test
 *                 required: true
 *     responses:
 *      '200':
 *        description: Successfully login user
 */

export { router as authRoutes }
