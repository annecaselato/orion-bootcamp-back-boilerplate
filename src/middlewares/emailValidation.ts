import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from '../utils/httpCodes';

const validateEmail = (email: string): RegExpMatchArray =>
  email.toLowerCase().match('[a-z0-9]+.com');

export const emailValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  if (!email) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "email" é obrigatório'
    });
  }
  if (!validateEmail(email)) {
    return res.status(BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"'
    });
  }
  next();
};
