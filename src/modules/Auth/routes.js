import { Router } from "express"
import { validateSchema  } from "../../helpers/validations.js"
import { handleLogin, handleRefreshToken, handleLogout } from "./service.js"
import validations from './validation.js'

const { loginSchema } = validations

const router = Router()

router.post('/login',validateSchema(loginSchema) ,handleLogin);
router.get('/logout', handleLogout);
router.get('/refresh', handleRefreshToken);

export { router as authRoutes }