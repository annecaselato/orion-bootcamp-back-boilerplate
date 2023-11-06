import { Translate } from '@google-cloud/translate/build/src/v2';
import { Request, Response, NextFunction } from 'express';
import Character from '../library/CharacterInterface';
import { extractUntranslatedData } from '../library/charactersAuxiliaryFunctions';

const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY; //Key da API google Translate
const projectId = process.env.GOOGLE_TRANSLATE_PROJECT_ID; // ID do projeto google Translate

export default class TranslateMiddleware {
  translateClient = new Translate({ projectId, key: apiKey });

  async translateCharacters(req: Request, res: Response, next: NextFunction) {
    const charactersData = res.locals.charactersData;
    try {
      const translatedCharacters: Array<Character> = await Promise.all(
        charactersData.map(async (character) => {
          const [nameTranslation]: string =
            await this.translateClient.translate(character.name, 'pt');
          const [descriptionTranslation]: string =
            await this.translateClient.translate(character.description, 'pt');
          const characterThumb: string = `${character.thumbnail.path}.jpg`;

          return {
            name: nameTranslation,
            description: descriptionTranslation,
            thumbnail: characterThumb
          };
        })
      );
      res.locals.translatedCharacters = translatedCharacters;
      next();
    } catch (error) {
      // Se houver erro na tradução, retorna o personagem original não traduzido
      const untranslatedCharacters = extractUntranslatedData(charactersData);
      res.locals.untranslatedCharacters = untranslatedCharacters;
      next(error);
    }
  }
}
