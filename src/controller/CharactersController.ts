import { Request, Response } from 'express';

export default class CharactersController {
  viewCharacters(error, req: Request, res: Response) {
    if (error) {
      console.error('Erro ao traduzir os dados: ', error);
      const untranslatedCharacters = res.locals.untranslatedCharacters;

      // Se houver erro na tradução, retorna o personagem original não traduzido
      res.status(303).json({
        date: new Date(),
        status: true,
        data: `Erro ao traduzir: ${error}`,
        untranslatedCharacters
      });
    } else {
      const translatedCharacters = res.locals.translatedCharacters;
      res
        .status(200)
        .json({ date: new Date(), status: true, data: translatedCharacters });
    }
  }
}
