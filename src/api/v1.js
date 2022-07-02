import { Router } from 'express'
import { authRoutes } from '../modules/Auth/routes.js'
import { usersRoutes } from '../modules/Users/routes.js'
import { groupsRoutes } from '../modules/Groups/routes.js'
import { verifyJWT } from '../helpers/validations.js'
import { testsRoutes } from '../modules/Test/routes.js'
import { scheduleRoutes } from '../modules/Schedule/routes.js'
import { subjectRoutes } from '../modules/Subject/routes.js'
import { chatsRoutes } from '../modules/Chat/routes.js'

import { swaggerRoutes } from './swagger.js'

const router = Router()

router.use('/api-docs', swaggerRoutes)
router.use('/auth', authRoutes)
router.use(verifyJWT)

router.use('/tests', testsRoutes)
router.use('/users', usersRoutes)

router.use('/groups', groupsRoutes)
router.use('/schedules', scheduleRoutes)
router.use('/subjects', subjectRoutes)
router.use('/chats', chatsRoutes)

export { router as v1 }
