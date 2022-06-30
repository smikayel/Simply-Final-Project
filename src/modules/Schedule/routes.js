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
  verifyRoles(['Admin', 'Teacher']),
  validateSchema(createScheduleSchema),
  handleCreateSchedule
)
router.delete(
  '/:id',
  validateSchema(deleteScheduleSchema),
  verifyRoles(['Admin']),
  handleDeleteSchedule
)
router.put('/', validateSchema(updateScheduleSchema), handleUpdateSchedule)

export { router as scheduleRoutes }
