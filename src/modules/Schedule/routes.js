import { Router } from 'express'
import { validateSchema, verifyRoles } from '../../helpers/validations.js'
import validations from './validation.js'
import {
  handleCreateSchedule,
  handleDeleteSchedule,
  handleGetSchedule,
  handleUpdateSchedule,
} from './service.js'

const { createScheduleSchema } = validations

const router = Router()

router.get('/:groupId', handleGetSchedule)
router.post('/', verifyRoles(['Admin']), validateSchema(createScheduleSchema), handleCreateSchedule)
router.delete('/:id', handleDeleteSchedule)
router.put('/', handleUpdateSchedule)

export { router as scheduleRoutes }
