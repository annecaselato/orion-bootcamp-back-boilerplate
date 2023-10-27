import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const token = authorization.replace('Bearer', '').trim();

  const secretKey: string | undefined = 'secretkey';
  if (!secretKey) {
    throw new Error('There is no token key');
  }

  try {
    const data = jwt.verify(token, secretKey);
    const { id } = data as TokenPayload;
    req.userId = id;
    return next();
  } catch {
    return res.sendStatus(401).json({ message: 'Token expirado' });
  }
}
