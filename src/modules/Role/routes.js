import { Router } from 'express'
import { verifyRoles } from '../../helpers/validations.js'
import { handleGetAllRoles } from './service.js'

const router = Router()

router.get('/', verifyRoles(['Admin', 'Students', 'Teacher']), handleGetAllRoles)

export { router as rolesRoutes }
