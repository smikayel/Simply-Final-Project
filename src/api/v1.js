import { Router } from 'express'
import { authRoutes } from '../modules/Auth/routes.js'
import { usersRoutes } from '../modules/Users/routes.js'
import { groupsRoutes } from '../modules/Groups/routes.js'
import { verifyJWT } from '../helpers/validations.js';
import { testsRoutes } from "../modules/Test/routes.js";

const router = Router();

router.use('/auth', authRoutes);
// router.use(verifyJWT);

router.use('/tests', testsRoutes)
router.use('/users', usersRoutes);



router.use('/groups', groupsRoutes);



export { router as v1 }
