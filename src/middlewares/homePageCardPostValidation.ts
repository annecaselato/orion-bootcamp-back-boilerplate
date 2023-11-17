import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateHomePageCard = [
  body('title').notEmpty().isString().trim().isLength({ max: 100 }),
  body('image').notEmpty().isString().trim().isLength({ max: 200 }),
  body('description').notEmpty().isString().trim().isLength({ max: 500 }),
  body('access').notEmpty().isString().trim().isLength({ max: 100 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
