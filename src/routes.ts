import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import loginRoute from './api/v1/loginRoute';
import recoveryRoute from './api/v1/recoveryRoute';
import solesRoute from './api/v1/solesRoute';
import logoutRoute from './api/v1/logoutRoute';
import homePageCardsRoute from './api/v1/getHomePageCardsRoute';

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

/**
 * GET route for home page cards
 *
 * @route GET /get-home-page-cards
 * @group Home Page Cards
 */
router.use('/v1', homePageCardsRoute);

/**
 * GET route for home
 *
 * @route GET /
 * @group Default
 */
router.get('/', new HomeController().hello);

export default router;
