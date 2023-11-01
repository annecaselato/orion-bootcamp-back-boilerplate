import { Router } from 'express';
import { HomeController } from './controller/HomeController';
// import { SolController } from './controller/SolController';
import loginRoute from './api/v1/loginRoute';
import recoveryRoute from './api/v1/recoveryRoute';
import solesRoute from './api/v1/solesRoute';

const router = Router();

/**
 * POST route for user login (authentication)
 * Logic on controller/LoginController.ts
 *
 * @route POST /login
 * @group Authentication
 */
router.use('/v1', loginRoute);
router.use('/v1', recoveryRoute);
/**
 * GET route for soles data
 *
 * @route GET /soles
 * @group Soles data
 */
router.use('/v1', solesRoute);

router.get('/', new HomeController().hello);

export default router;
