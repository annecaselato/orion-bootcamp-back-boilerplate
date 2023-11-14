import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { httpCodes } from '../utils/httpCodes';

export class ErrorsValidator {
  public errorValidate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    return next();
  }
}
