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
 * /api/v1/auth/login:
 *    post:
 *     description: Use to login user. Sends email to user if user has looged in from a new ip address.
 *     tags: [auth]
 *     consumes:
 *      - application/json
 *     parameters:
 *     - in: body
 *       name: login
 *       schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *              example: h@gmail.com
 *              description: User email
 *            password:
 *              type: string
 *              example: test
 *              description: User password
 *       description: Email and password of user
 *       required: true
 *     responses:
 *      '200':
 *        description: Successfully login user. Get user tests groups roles and access token
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/auth/logout:
 *    get:
 *     description: Use to logout user. Will clear refresh token from db
 *     tags: [auth]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: cookie
 *        name: jwt
 *        schema:
 *         type: string
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6NCwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOnsiaWQiOjMsIm5hbWUiOiJTdHVkZW50In19LCJpYXQiOjE2NTYxNzM5ODUsImV4cCI6MTY1NjE3NDI4NX0.hOnGzInMr_tJV4rwo75g0cgYgPAQSz4wiVaAU7Fmor4
 *     responses:
 *      '204':
 *        description: Successfully logout user
 */

/**
 * @swagger
 * /api/v1/auth/refresh:
 *    get:
 *     description: Use to get new access token.
 *     tags: [auth]
 *
 *     parameters:
 *      - in: cookie
 *        name: jwt
 *        schema:
 *         type: string
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6NCwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOnsiaWQiOjMsIm5hbWUiOiJTdHVkZW50In19LCJpYXQiOjE2NTYxNzM5ODUsImV4cCI6MTY1NjE3NDI4NX0.hOnGzInMr_tJV4rwo75g0cgYgPAQSz4wiVaAU7Fmor4
 *     responses:
 *      '200':
 *        description: Successfully send new access token to user
 *      '401':
 *        description: Refresh token is expired
 *      '403':
 *        description: Refresh token is not valid
 */

export { router as authRoutes }
