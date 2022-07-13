import { Router } from 'express'
import { validateSchema, verifyRoles } from '../../helpers/validations.js'
import validations from './validation.js'
import {
  handleCreateSchedule,
  handleDeleteSchedule,
  handleGetScheduleByGroup,
  handleUpdateSchedule,
  handleGetScheduleById,
} from './service.js'
import { ROLE_ADMIN, ROLE_TEACHER } from '../constants.js'

const {
  createScheduleSchema,
  getSchedulebyGroupSchema,
  getScheduleSchema,
  deleteScheduleSchema,
  updateScheduleSchema,
} = validations

const router = Router()

router.get('/:id', validateSchema(getScheduleSchema), handleGetScheduleById)
router.get('/group/:groupId', validateSchema(getSchedulebyGroupSchema), handleGetScheduleByGroup)
router.post(
  '/',
  verifyRoles([ROLE_ADMIN, ROLE_TEACHER]),
  validateSchema(createScheduleSchema),
  handleCreateSchedule
)
router.delete(
  '/:id',
  validateSchema(deleteScheduleSchema),
  verifyRoles([ROLE_ADMIN]),
  handleDeleteSchedule
)
router.put(
  '/',
  validateSchema(updateScheduleSchema),
  verifyRoles([ROLE_ADMIN, ROLE_TEACHER]),
  handleUpdateSchedule
)

export { router as scheduleRoutes }

/**
 * @swagger
 * tags:
 *   name: schedule
 *   description: The schedule managing API
 */

/**
 * @swagger
 * /api/v1/schedules/{id}/:
 *    get:
 *     description: Use to get all schedule for a day with schedule id
 *     tags: [schedule]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *         example: 1
 *        description: The id of shcedule
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get schedule
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/schedules/group/{groupId}/:
 *    get:
 *     description: Use to get all schedules for group by group id or for a specific day
 *     tags: [schedule]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: path
 *        name: groupId
 *        schema:
 *         type: integer
 *         example: 1
 *        description: The id of group
 *        required: true
 *      - in: query
 *        name: day
 *        schema:
 *         type: integer
 *         example: '3'
 *        description: The day of week. day = 1 is monday, day = 2 is tuesday, day = 3 is wednesday, day = 4 is thursday, day = 5 is friday, day = 6 is saturday, day = 7 is sunday
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully get schedule
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/schedules/:
 *    post:
 *     description: Use to create schedule for a group. Will replace old schedule if there already exists schedule for that group and day. Only Admin and teacher
 *     tags: [schedule]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: Schedule data
 *        schema:
 *          type: object
 *          required:
 *            - schedule
 *            - groupId
 *          properties:
 *            groupId:
 *              type: integer
 *              example: 3
 *            schedule:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  day:
 *                    type: integer
 *                    example: 1
 *                  scheduleSubject:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        subjectId:
 *                          type: integer
 *                          example: 1
 *                        time:
 *                          type: string
 *                          example: '2022-06-30T15:02:13.264Z'
 *                          description: The starting time of subject in format YYYY-MM-DDTHH:mm:ss.SSSZ. year part doesnt matter
 *        description: The groupId and schedule
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '201':
 *        description: Successfully create schedule and return newly create schedule
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/schedules/{id}/:
 *    delete:
 *     description: Use to delete schedule by id. Only Admin
 *     tags: [schedule]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *         example: 1
 *        description: The id of shcedule
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully delete schedule
 *      '400':
 *        description: Bad request
 */

/**
 * @swagger
 * /api/v1/schedules/:
 *    put:
 *     description: Use to update schedule for a group. Only Admin and teacher
 *     tags: [schedule]
 *     consumes:
 *      - application/json
 *     parameters:
 *     -  in: body
 *        name: Update schedule
 *        schema:
 *          type: object
 *          required:
 *            - day
 *            - groupId
 *            - id
 *            - scheduleSubject
 *          properties:
 *            groupId:
 *              type: integer
 *              example: 1
 *            day:
 *              type: integer
 *              example: 1
 *            id:
 *              type: integer
 *              example: 1
 *            scheduleSubject:
 *              type: array
 *              items:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    subjectId:
 *                      type: integer
 *                      example: 1
 *                    time:
 *                      type: string
 *                      example: '2022-06-30T15:02:13.264Z'
 *                      description: The starting time of subject in format YYYY-MM-DDTHH:mm:ss.SSSZ. year part doesnt matter
 *        description: The id of schedule to update with new day groupId and scheduleSubject
 *        required: true
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      '200':
 *        description: Successfully update schedkue
 *      '400':
 *        description: Bad request
 */
