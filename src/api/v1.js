import { Router } from 'express'
import { authRoutes } from '../modules/Auth/routes.js'
import { usersRoutes } from '../modules/Users/routes.js'
import { groupsRoutes } from '../modules/Groups/routes.js'
import { verifyJWT } from '../helpers/validations.js';

const router = Router();

router.use('/auth', authRoutes);
router.use(verifyJWT);


router.use('/users', usersRoutes);



router.use('/group', groupsRoutes);



export { router as v1 }
