import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bodyParser from 'body-parser';

const router = Router();
router.use(bodyParser.json());

/**
 * POST route for user login (authentication).
 *
 * @route POST /login
 * @group Authentication

 * @param {Request} req - HTTP request object.
 * @param {Response} res - HTTP response object.
 *
 * @throws {ValidationError} Errors array from validationResult(req) object
 *
 * @example - request data:
 * POST /login
 * {
 *   "email": "user@example.com",
 *   "password": "SafePassword123!" // Min 8 char.,  1 uppercase, 1 lowercase, 1 number.
 * }
 *
 * Success return:
 *
 * @returns {object} JSON object with successful authentication message.
 * @returns {number} status 200 - Success status.
 *
 * Failure return:
 *
 * @returns {object} JSON object with validation errors for failed authentication.
 * @returns {number} status 400 - Bad request status for validations.
 */
router.post(
  '/login',
  [body('email').isEmail(), body('password').isStrongPassword()],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    } else {
      return res.status(200).json({ message: 'Login efetuado com sucesso' });
    }
  }
);

export default router;
