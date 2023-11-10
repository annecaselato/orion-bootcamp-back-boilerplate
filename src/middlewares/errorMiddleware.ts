import { NextFunction, Response } from 'express';
import { ApplicationErrorService } from '../services/AplicationErrorService';
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

/**
 * Middleware for handling errors.
 * @public
 */
export class ErrorMiddleware {
  /**
   * Handles errors by logging them, saving them to the repository, and sending an appropriate response to the client.
   * @param err - The error that occurred.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function in the stack.
   * @returns A promise that resolves when the error has been handled.
   * @public
   */
  static async handleError(err: Error | CustomError, req: Request, res: Response, next: NextFunction): Promise<void> {
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
  }
}
