import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { NodemailerService } from '../library/nodemailerUtils';

/**
 * Controller user password recovery. Returns status 200 if user is found or not. If
 * user is found, attaches possword recovery token to the user object and sends recovery email.
 */
export class RecoveryController {
  /**
   * @swagger
   * /v1/recovery:
   *   post:
   *     summary: Request password recovery for a user.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: Password recovery request successful
   *       400:
   *         description: Invalid email
   */
  public static async recovery(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      return res.status(200).end();
    }

    await UserRepository.addPasswordRecoveryToken(user, user.id);

    NodemailerService.sendPasswordRecoveryEmail(user.email);

    return res.status(200).end();
  }
}
