import { NextFunction, Response } from 'express';
import { ApplicationErrorService } from '../services/aplicationErrorService';
import { Request as ExpressRequest } from 'express';

interface Request extends ExpressRequest {
  user?: { id: number };
}

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = async (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const errorService = new ApplicationErrorService();
  await errorService.create([
    {
      userId: req.user ? req.user.id : null,
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack
      }
    }
  ]);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'An error occurred on the server' });
  }
};
