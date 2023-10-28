import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/UserService';

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const token = authorization.replace('Bearer', '').trim();

  const secretKey: string | undefined = process.env.JWT_PASS;
  if (!secretKey) {
    throw new Error('There is no token key');
  }

  try {
    const data = jwt.verify(token, secretKey);
    const { id } = data as TokenPayload;

    const confirmId = await new UserService().findById(id);
    if (!confirmId) {
      throw new Error('Invalid credentials');
    }
    req.body = id;

    return next();
  } catch {
    return res.status(401).json({ message: 'Expired Token' });
  }
}
