import { Translate } from '@google-cloud/translate/build/src/v2';
import { Request, Response, NextFunction } from 'express';
import MarvelCharactersProperties from '../library/charactersPropertiesInterface';

const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY; //Key da API google Translate
const projectId = process.env.GOOGLE_TRANSLATE_PROJECT_ID; // ID do projeto google Translate

export default class TranslatorAPIMiddleware {
  translateClient = new Translate({ projectId, key: apiKey });

  async translateCharacters(req: Request, res: Response, next: NextFunction) {
    try {
      const characters: Array<MarvelCharactersProperties> =
        res.locals.originalCharactersFiletered;

      const charactersTranslated = await Promise.all(
        characters.map(async (character: MarvelCharactersProperties) => {
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

      res.locals.charactersTranslated = charactersTranslated;
      next();
    } catch (error) {
      next(error);
    }
  }
}
