import { Request, Response } from 'express';
import { JwtUtils } from '../library/jwtUtils';
import { UserRepository } from '../repositories/userRepository';
/**
 * Finds user and removes access token.
 */
export class LogoutController {
  /**
   * @swagger
   * /v1/logout:
   *   patch:
   *     summary: Logout a user.
   *     tags: [Logout]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       204:
   *         description: User logged out successfully
   */
  public static async logout(req: Request, res: Response): Promise<Response> {
    const accessToken = req.headers.authorization;

    const { id } = await JwtUtils.verifyJWTToken(accessToken);

    await UserRepository.removeAccessTokenFromUser(id);

    return res.status(204).end();
  }
}
