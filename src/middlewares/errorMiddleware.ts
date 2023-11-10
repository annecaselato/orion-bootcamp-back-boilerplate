import { NextFunction, Response } from 'express';
import { ApplicationErrorService } from '../services/aplicationErrorService';
import { Request as ExpressRequest } from 'express';

interface Request extends ExpressRequest {
  user?: { id: number }; // Adjust this to match the shape of your user object
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

  // Save the error to the database
  const errorService = new ApplicationErrorService();
  await errorService.create([
    {
      userId: req.user ? req.user.id : null, // If you have an authentication system
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack
      }
    }
  ]);

  // Respond to the client with a generic error
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'An error occurred on the server' });
  }
};
