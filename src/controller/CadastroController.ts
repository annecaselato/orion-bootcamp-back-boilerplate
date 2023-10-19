import { Request, Response } from 'express';

export class CadastroController {
  // rota 'user/cadastro'
  async msg(req: Request, res: Response) {
    try {
      //lógica para lidar com a rota '/cadastro'
      const message = 'Esta é a página de cadastro';
      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao processar a solicitação.' });
    }
  }
}

export default CadastroController;
