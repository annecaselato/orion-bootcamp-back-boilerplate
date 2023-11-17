import { Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { Request as ExpressRequest } from 'express';

interface Request extends ExpressRequest {
  card?: {
    title: string;
    image: string;
    description: string;
    access: string;
  };
}

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

    const card = {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      access: req.body.access
    };

    req.card = card;

    next();
  }
];
