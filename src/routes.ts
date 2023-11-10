import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import loginRoute from './api/v1/loginRoute';
import recoveryRoute from './api/v1/recoveryRoute';
import solesRoute from './api/v1/solesRoute';
import logoutRoute from './api/v1/logoutRoute';

const router = Router();

/**
 * POST route for user login (authentication)
 * Logic on controller/LoginController.ts
 *
 * @route POST /login
 * @group Authentication
 */
router.use('/v1', loginRoute);

/**
 * POST route for password recovery
 *
 * @route POST /login
 * @group Authentication
 */

router.use('/v1', recoveryRoute);

/**
 * GET route for soles data
 *
 * @route GET /soles
 * @group Soles data
 */
router.use('/v1', solesRoute);

/**
 * PATCH route for logout
 *
 * @route PATCH /logout
 * @group Logout
 */
router.use('/v1', logoutRoute);

router.get('/', new HomeController().hello);

export default router;
