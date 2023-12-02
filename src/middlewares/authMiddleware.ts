import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/UserService';
import { httpCodes } from '../utils/httpCodes';
import TokenPayload from '../interfaces/ITokenPayload';
import { TokenService } from '../services/TokenService';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(httpCodes.UNAUTHORIZED)
      .json({ message: 'Token missing' });
  }

  const token = authorization.replace('Bearer', '').trim();

  const secretKey: string | undefined = process.env.JWT_PASS;
  if (!secretKey) {
    throw new Error('There is no token key');
  }

  const savedToken = await new TokenService().getToken(token);
  if (!savedToken) {
    return res
      .status(httpCodes.UNAUTHORIZED)
      .json({ message: 'Invalid token' });
  }

  try {
    const data = jwt.verify(token, secretKey);
    const { id } = data as TokenPayload;

    const userById = await new UserService().findById(id);
    if (!userById) {
      await new TokenService().removeToken(token);
      throw new Error('Invalid credentials');
    }

    const user = { ...userById, password: undefined };
    req.body.authUser = user;

    return next();
  } catch (error) {
    await new TokenService().removeToken(token);
    return res.status(httpCodes.UNAUTHORIZED).json(error.message);
  }
}
