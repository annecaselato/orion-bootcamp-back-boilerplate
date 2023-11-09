import { Translate } from '@google-cloud/translate/build/src/v2';
import 'dotenv/config';

const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY; //Key da API google Translate
const projectId = process.env.GOOGLE_TRANSLATE_PROJECT_ID; // ID do projeto google Translate

export default class MarvelAPITranslatorHandler {
  translateClient = new Translate({ projectId, key: apiKey });

  async translateCharacter(character) {
    try {
      const [nameTranslation] = await this.translateClient.translate(
        character.name,
        'pt'
      );
      const [descriptionTranslation] = await this.translateClient.translate(
        character.description,
        'pt'
      );
      const characterThumb = `${character.thumbnail.path}.jpg`;

      return {
        name: nameTranslation,
        description: descriptionTranslation,
        thumbnail: characterThumb
      };
    } catch (error) {
      console.error('Erro ao traduzir:', error);
      throw new Error('Erro ao traduzir o personagem.');
    }
  }
}
