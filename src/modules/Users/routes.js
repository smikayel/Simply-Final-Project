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
  handleForgotPassword,
  handleResetPassword,
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
  resetPasswordSchema,
} = validations
const router = Router()
router.get(
  '/',
  verifyRoles(['Admin', 'Teacher', 'Student']),
  validateSchema(getAllUsersSchema),
  handleGetAllUsers
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
router.get('/forgotPassword', handleForgotPassword)
router.post(
  '/resetPassword/:userId/:token',
  validateSchema(resetPasswordSchema),
  handleResetPassword
)
router.get(
  '/:id',
  verifyRoles(['Admin', 'Teacher', 'Student']),
  validateSchema(getUserByIdSchema),
  handleGetUserById
)
router.delete('/', validateSchema(deleteUsersSchema), verifyRoles(['Admin']), handleDeleteUsers)
export { router as usersRoutes }
/**
 * @swagger
 * tags:
 *   name: user
 *   description: The user managing API
 */
/**
 * @swagger
 * /api/v1/users/:
 *    get:
 *     description: Use to get all users. Can be filtered by user first name
 *     tags: [user]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: query
 *        name: firstName
 *        description: User firstname
 *        required: false
 *        schema:
 *          type: string
 *          example: John
 *          maxLength: 30
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get all users or users whos first name contains the given first name in query
 *      '400':
 *        description: Bad request
 */
/**
 * @swagger
 * /api/v1/users/testsResults/{userId}/{testId}:
 *    get:
 *     description: Use to get test results for given user and test. Students can view only their test results
 *     tags: [user]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: path
 *        name: userId
 *        description: User id
 *        required: true
 *        schema:
 *         type: number
 *         example: 1
 *      - in: path
 *        name: testId
 *        description: Test id
 *        required: true
 *        schema:
 *         type: number
 *         example: 1
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get user test results. Contains user mark answers correct answers and all questions marks
 *      '400':
 *        description: Bad request
 */
/**
 * @swagger
 * /api/v1/users/topUsers:
 *    get:
 *     description: Use to get top 3 users by average mark
 *     tags: [user]
 *     consumes:
 *      - application/json
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get top 3 users by average mark
 *      '400':
 *        description: Bad request
 */
/**
 * @swagger
 * /api/v1/users/{id}:
 *    get:
 *     description: Use to get user by id
 *     tags: [user]
 *     parameters:
 *      - in: path
 *        name: id
 *        description: User id
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     consumes:
 *      - application/json
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get user
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/users/forgotPassword:
 *    get:
 *     description: Use to get email containing instructions on how to reset user password
 *     tags: [user]
 *     parameters:
 *      - in: query
 *        name: email
 *        description: User email
 *        required: true
 *        schema:
 *          type: string
 *          example: h@gmai.com
 *     consumes:
 *      - application/json
 *     responses:
 *      '200':
 *        description: Successfully get email with link to reset user password. Link is valid for only one time and for 1h
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/users/resetPassword/{userId}/{token}:
 *    get:
 *     description: Use to reset user password
 *     tags: [user]
 *     parameters:
 *      - in: path
 *        name: userId
 *        description: User id
 *        required: true
 *        schema:
 *         type: number
 *         example: 1
 *      - in: path
 *        name: token
 *        description: token
 *        required: true
 *        schema:
 *         type: string
 *         example: asjdfaksd;laks;ldkas;lkd;alskd;lask
 *      - in: body
 *        name: New password
 *        description: New password
 *        required: true
 *        schema:
 *          type: string
 *          example: newPassword
 *     consumes:
 *      - application/json
 *     responses:
 *      '200':
 *        description: Successfully get email with link to reset user password. Link is valid for only one time and for 1h
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/users/:
 *    post:
 *     description: Use to create new students and teachers. Only admin can create new users
 *     tags: [user]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: User data
 *        required:
 *          - firstName
 *          - lastName
 *          - email
 *          - password
 *          - roleId
 *        schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *              firstName:
 *                type: string
 *                example: John
 *                maxLength: 30
 *              lastName:
 *                type: string
 *                example: Doe
 *                maxLength: 30
 *              email:
 *                type: string
 *                example: example@gmail.com
 *                description: Email address. Only com, net, am
 *              password:
 *                type: string
 *                example: password
 *                description: Password contains only latin letters, numbers and special characters
 *              roleId:
 *                type: integer
 *                example: 3
 *                description: 1 - student, 2 - teacher, 3 - admin
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '201':
 *        description: Successfully create new user. Returns newly created user data
 *      '400':
 *        description: Bad request
 */
/**
 * @swagger
 * /api/v1/users/:
 *    put:
 *     description: Use to change user password
 *     tags: [user]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: New user password
 *        description: User data
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - password
 *            - newPassword
 *            - id
 *          properties:
 *            password:
 *              type: string
 *              example: oldPassword
 *              description: Old password
 *            newPassword:
 *              type: string
 *              example: newPassword
 *              description: Password contains only latin letters, numbers and special characters
 *            id:
 *              type: integer
 *              example: 1
 *              description: User id whos password will be changed
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully change user password. Return new user data
 *      '401':
 *        description: Unauthorized
 */
/**
 * @swagger
 * /api/v1/users/submitTest:
 *    post:
 *     description: Use to submit test. Submit test for logged in student. If test expires or is finished, user can't submit test and will automatically get 0 on that test
 *     tags: [user]
 *     consumes:
 *      - application/json
 *     parameters:
 *     -  in: body
 *        name: User test data
 *        required: true
 *        schema:
 *           type: object
 *           required:
 *              - testId
 *              - answerIds
 *           properties:
 *              testId:
 *                type: integer
 *                example: 1
 *                description: Test id
 *              answerIds:
 *                type: array
 *                items:
 *                  type: integer
 *                  example: 1
 *                description: Users selected answers id's
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '201':
 *        description: Successfully submit test. Return user test results
 *      '400':
 *        description: Bad request
 */
/**
 * @swagger
 * /api/v1/users/setMark:
 *    put:
 *     description: Use to set user mark manually. Only teacher. Teacher can set mark only for his students
 *     tags: [user]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: User mark data
 *        description: User mark data
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - password
 *            - newPassword
 *            - id
 *          properties:
 *            studentId:
 *              type: integer
 *              example: 1
 *              description: student id to set mark
 *            testId:
 *              type: integer
 *              example: 1
 *              description: test id to set mark
 *            mark:
 *              type: integer
 *              example: 20
 *              description: student mark
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully set student mark. Return student mark
 *      '401':
 *        description: Unauthorized
 */
/**
 * @swagger
 * /api/v1/users/:
 *    delete:
 *     description: Use to delete users. Only admin
 *     tags: [user]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: User ids
 *        description: User ids
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - ids
 *          properties:
 *            ids:
 *              type: array
 *              items:
 *                type: integer
 *                example: 1
 *              description: User ids to delete
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully set delete users. Return deleted users count
 *      '400':
 *        description: Bad request
 */
