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

    const userById = await new UserService().findById(id);
    if (!userById) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...user } = userById;
    req.body = user;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json(error.message);
  }
}
