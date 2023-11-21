import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import loginRoute from './api/v1/loginRoute';
import recoveryRoute from './api/v1/recoveryRoute';
import solesRoute from './api/v1/solesRoute';
import logoutRoute from './api/v1/logoutRoute';
import quotesRoute from './api/v1/quotesRoute';
import planCardsRoute from './api/v1/planCardsRoute';
import homePageCardsRoute from './api/v1/HomePageCardsRoute';

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
 * GET route for PlanCards data
 *
 * @route GET /plan-cards
 * @group plan cards data
 */
router.use('/v1', planCardsRoute);

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
 * @route POST /v1/create-home-page-card
 * @group Home Page Cards
 */
router.use('/v1', homePageCardsRoute);

/**
 * GET route for quotes
 *
 * @route GET /quotes
 * @group Quotes
 */
router.use('/v1', quotesRoute);

/**
 * GET route for home
 *
 * @route GET /
 * @group Default
 */
router.get('/', new HomeController().hello);

export default router;
