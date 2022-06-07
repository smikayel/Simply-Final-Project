import { Router } from "express"
import {validateSchema, verifyJWT, verifyRoles} from "../../helpers/validations.js"
import { handleGetTest, handleGetAllTests } from "./service.js";
import validations from './validation.js'


const router = Router()

router.get('/', verifyJWT, verifyRoles(["Admin"]), handleGetAllTests);
router.get('/:id', verifyJWT, verifyRoles(["Admin", "Student", "Teacher"]), handleGetTest);

export { router as testsRoutes }