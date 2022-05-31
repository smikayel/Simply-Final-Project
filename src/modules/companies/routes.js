import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import validations from './validations.js'
import { getAllCompanies, getCompanyById } from './services.js'

const { getCompanyByIdSchema } = validations

const router = Router()

router.get('/', getAllCompanies)
router.get('/:companyId', validate(getCompanyByIdSchema), getCompanyById)

export { router as companiesRoutes }
