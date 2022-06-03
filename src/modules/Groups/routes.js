import { Router } from "express"
import { validateSchema  } from "../../helpers/validations.js"
// import { handleCreateGroup } from "./service.js"
import validations from './validation.js'

const { createGroupSchema } = validations

const router = Router()

// router.post('/',validateSchema(createGroupSchema), handleCreateGroup);


export { router as groupsRoutes }