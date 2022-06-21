import { Router } from 'express'
import { validateSchema, verifyRoles } from '../../helpers/validations.js'
import validations from './validation.js'
import { handleGetSubjects, handleCreateSubjects } from './service.js'

const { createSubjectSchema } = validations

const router = Router()

router.get('/', verifyRoles(['Admin', 'Teacher', 'Student']), handleGetSubjects)
router.post('/', validateSchema(createSubjectSchema), verifyRoles(['Admin']), handleCreateSubjects)
export { router as subjectRoutes }
