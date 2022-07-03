import { Router } from 'express'
import { validateSchema, verifyRoles } from '../../helpers/validations.js'
import validations from './validation.js'
import { handleGetSubjects, handleCreateSubjects } from './service.js'

const { createSubjectSchema } = validations

const router = Router()

router.get('/', verifyRoles(['Admin', 'Teacher', 'Student']), handleGetSubjects)
router.post('/', validateSchema(createSubjectSchema), verifyRoles(['Admin']), handleCreateSubjects)
export { router as subjectRoutes }

/**
 * @swagger
 * tags:
 *   name: subject
 *   description: The subject managing API
 */

/**
 * @swagger
 * /api/v1/subjects/:
 *    get:
 *     description: Use to get all subjects
 *     tags: [subject]
 *     consumes:
 *      - application/json
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get all subjects
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/subjects/:
 *    post:
 *     description: Use to create new subjects. Only admin
 *     tags: [subject]
 *     parameters:
 *     - in: body
 *       name: Subject data
 *       required: true
 *       schema:
 *          type: array
 *          required: true
 *          items:
 *             type: object
 *             properties:
 *              name:
 *               type: string
 *               example: Math
 *               description: The name of subject
 *       description: The names of subjects in an array
 *     consumes:
 *      - application/json
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '201':
 *        description: Successfully create subjects
 *      '400':
 *        description: Bad request
 */
