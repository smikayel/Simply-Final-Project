import { Router } from 'express'
import { companiesRoutes } from '../modules/companies/routes.js'
import { UserRoutes } from '../modules/Users/routes.js'

const router = Router()



export { router as v1 }
