import { Router } from "express"
import {validateSchema, verifyJWT, verifyRoles} from "../../helpers/validations.js"
import { handleCreateTest, handleGetTest } from "./service.js";
import validations from './validation.js'

const { createUserSchema, deleteUserSchema, changePasswordSchema } = validations

const router = Router()

router.get('/:id', verifyRoles(["Admin", "Student", "Teacher"]), handleGetTest);
router.post('/',verifyJWT, verifyRoles(["Admin", "Teacher"]), handleCreateTest);
// router.delete('/',verifyJWT, verifyRoles(["Admin", "Teacher"]), handleDeleteTest);


export { router as testsRoutes }