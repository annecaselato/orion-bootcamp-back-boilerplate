import { NextFunction, Request, Response } from 'express';
import { JwtUtils } from '../library/jwtUtils';
import { UserRepository } from '../repositories/userRepository';

/**
 * Middleware for authentication and authorization.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 * @returns A Promise that resolves if the authentication is successful or sends an error response if it fails.
 */
export async function authValidation(req: Request, res: Response, next: NextFunction): Promise<void> {
  const accessToken = req.headers.authorization;
  const { email } = req.body;

  try {
    const user = await UserRepository.findUserByEmail(email);

    const verifiedToken = await JwtUtils.verifyJWTToken(accessToken);

    if (verifiedToken.error) {
      const errorMessage =
        {
          'jwt must be provided': 'Access token deve ser fornecido',
          'invalid signature': 'Access token inválido',
          'jwt expired': 'Access token expirado'
        }[verifiedToken.error.message] || 'Não autorizado';

      res.status(401).json({ message: errorMessage });
    } else if (user.accessToken !== accessToken) {
      res.status(401).json({ message: 'Access token inválido' });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
