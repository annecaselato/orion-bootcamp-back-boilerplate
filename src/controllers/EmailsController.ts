import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { httpCodes } from '../utils/httpCodes';

export class EmailController {
  async registerUserEmail(req: Request, res: Response) {
    const { email, username } = req.body;
    try {
      await new UserService().emailWelcome(email, username);
      return res.status(httpCodes.OK).json('OK');
    } catch (error) {
      return res.status(httpCodes.BAD_REQUEST).json({ error });
    }
  }
}
