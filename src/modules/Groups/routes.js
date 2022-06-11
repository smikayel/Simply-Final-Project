import { Router } from 'express'
import { validateSchema, verifyRoles } from '../../helpers/validations.js'
import {
  handleCreateGroup,
  handleGetAllGroups,
  handleGetGroupById,
  handleDeleteGroupById,
} from './service.js'
import validations from './validation.js'

const { createGroupSchema, getGroupByIdSchema, deleteGroupSchema } = validations

const router = Router()

router.get('/', verifyRoles(['Admin']), handleGetAllGroups)
router.post('/', validateSchema(createGroupSchema), verifyRoles(['Admin']), handleCreateGroup)
router.delete('/', validateSchema(deleteGroupSchema), verifyRoles(['Admin']), handleDeleteGroupById)
router.get('/:id', validateSchema(getGroupByIdSchema), verifyRoles(['Admin']), handleGetGroupById)

export { router as groupsRoutes }
