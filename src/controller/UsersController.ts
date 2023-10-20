import { Request, Response } from 'express';
import { autenticacaoUser } from '../services/UserService';

export class UsersController {
  login = (req: Request, res: Response) => {
    const { useremail, password } = req.body;
    const user = autenticacaoUser(useremail, password);

    if (user) {
      res.json({ message: 'Login realizado com sucesso' });
    }
    res.status(401).json({ message: 'Usuário ou senha incorreto' });
  };
}
