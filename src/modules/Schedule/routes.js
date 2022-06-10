import { Router } from "express"
import {validateSchema, verifyRoles} from "../../helpers/validations.js"
import validations from './validation.js'
import { handleCreateSchedule, handleGetSchedule } from "./service.js";

const { createScheduleSchema } = validations

const router = Router()

router.get('/:groupId',  handleGetSchedule);
router.post('/',  verifyRoles(["Admin"]), validateSchema(createScheduleSchema), handleCreateSchedule);

export { router as scheduleRoutes }