import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export class ErrorsValidator {
  public errorValidate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  }
}
