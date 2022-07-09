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

const { createTestSchema, getUsersTestsSchema, deleteTestSchema, getTestSchema } = validations

const router = Router()

router.get('/', verifyRoles(['Admin']), handleGetAllTests)
router.get(
  '/usersAll',
  verifyRoles(['Admin', 'Student', 'Teacher']),
  validateSchema(getUsersTestsSchema),
  handleGetAllTestsForUser
)
router.get(
  '/:id',
  validateSchema(getTestSchema),
  verifyRoles(['Admin', 'Student', 'Teacher']),
  handleGetTest
)
router.post(
  '/',
  validateSchema(createTestSchema),
  verifyRoles(['Admin', 'Teacher']),
  handleCreateTest
)
router.delete(
  '/',
  validateSchema(deleteTestSchema),
  verifyRoles(['Admin', 'Teacher']),
  handleDeleteTest
)

export { router as testsRoutes }

/**
 * @swagger
 * tags:
 *   name: test
 *   description: The test managing API
 */

/**
 * @swagger
 * /api/v1/tests/:
 *    get:
 *     description: Use to get all tests. Only admin
 *     tags: [test]
 *     consumes:
 *      - application/json
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get all tests
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/tests/usersAll:
 *    get:
 *     description: Use to get all tests for logged in user
 *     tags: [test]
 *     consumes:
 *      - application/json
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get all user tests
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/tests/{id}:
 *    get:
 *     description: Use to delete test by testId
 *     tags: [test]
 *     consumes:
 *      - application/json
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       type: number
 *       example: 1
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get test by id
 *      '400':
 *        description: Bad request
 *      '402':
 *        description: No access to this test
 */

/**
 * @swagger
 * /api/v1/tests/:
 *    post:
 *     description: Use to create new test. Only admin and teacher
 *     tags: [test]
 *     consumes:
 *      - application/json
 *     parameters:
 *     -  in: body
 *        name: Test data
 *        schema:
 *         type: object
 *         required:
 *           - name
 *           - userId
 *           - subjectId
 *           - start
 *           - length
 *           - highestScore
 *           - group
 *           - questions
 *           - answers
 *         properties:
 *           name:
 *             type: string
 *             example: Test 1
 *             description: Test name
 *           userId:
 *             type: number
 *             example: 1
 *             description: User id who is creating the test
 *           subjectId:
 *             type: number
 *             example: 1
 *             description: Id of subject test is for
 *           start:
 *             type: string
 *             example: 2020-01-01T00:00:00.000Z
 *             description: Test start date
 *           length:
 *             type: number
 *             example: 60
 *             description: Test length in minutes
 *           highestScore:
 *             type: number
 *             example: 100
 *             description: Highest score for test
 *           group:
 *             type: number
 *             example: 2
 *             description: Group id test is for
 *           questions:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Question 1
 *                   description: Question name
 *                   minLength: 3
 *                   maxLength: 160
 *             description: Questions for test
 *           answers:
 *             type: array
 *             items:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - name
 *                   - isCorrect
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Answer 1
 *                     description: Answer name
 *                     minLength: 3
 *                     maxLength: 160
 *                   isCorrect:
 *                     type: boolean
 *                     example: true
 *                     description: Answer is correct
 *             description: Answers for questions in test. Must be in same order as questions
 *        description: Test data
 *
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '201':
 *        description: Successfully create new test. Returns newly created test object
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/tests/:
 *    delete:
 *     description: Use to delete test by testId. Only admin and teacher
 *     tags: [test]
 *     consumes:
 *      - application/json
 *     parameters:
 *     - in: body
 *       name: test to delete
 *       required: true
 *       schema:
 *        type: object
 *        required:
 *          - id
 *        properties:
 *          id:
 *            type: integer
 *            example: 1
 *            description: Test id to delete
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully delete test
 *      '400':
 *        description: Bad request
 */
