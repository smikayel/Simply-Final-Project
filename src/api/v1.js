import { Router } from 'express'
import { companiesRoutes } from '../modules/companies/routes.js'
import { UserRoutes } from '../modules/Users/routes.js'

const router = Router()

router.use('/companies', companiesRoutes)
router.use('/users', UserRoutes)

export { router as v1 }
