import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateHomePageCard = [
  body('title').notEmpty().isString().trim(),
  body('image').notEmpty().isString().trim(),
  body('description').notEmpty().isString().trim(),
  body('access').notEmpty().isString().trim(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
];
