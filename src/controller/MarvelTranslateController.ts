import { Request, Response } from 'express';

export default class MarvelTranslateController {
  viewCharacters(error, req: Request, res: Response) {
    if (error) {
      console.error('Erro ao traduzir os dados: ', error);
      const originalCharacters = res.locals.originalCharactersFiletered;

      // Se houver erro na tradução, retorna o personagem original não traduzido
      res.status(303).json({
        date: new Date(),
        status: true,
        data: `Erro ao traduzir: ${error}`,
        originalCharacters
      });
    } else {
      const charactersTranslated = res.locals.charactersTranslated;
      res
        .status(200)
        .json({ date: new Date(), status: true, data: charactersTranslated });
    }
  }
}
