import { Translate } from '@google-cloud/translate/build/src/v2';
import MarvelCharactersProperties from '../library/charactersPropertiesInterface';
import { extractCharacters } from '../utils/formatHelpers';

const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY; //Key da API google Translate
const projectId = process.env.GOOGLE_TRANSLATE_PROJECT_ID; // ID do projeto google Translate

export default class FormatHandler {
  translateClient = new Translate({ projectId, key: apiKey });

  async extractCharactersAndTryTotranslate(charactersData) {
    try {
      const translatedCharacters = await Promise.all(
        charactersData.map(async (character: MarvelCharactersProperties) => {
          const [nameTranslation]: string =
            await this.translateClient.translate(character.name, 'pt');
          const [descriptionTranslation]: string =
            await this.translateClient.translate(character.description, 'pt');
          const characterThumb: string = `${character.thumbnail.path}.jpg`;
          const translatedCharacters = {
            name: nameTranslation,
            description: descriptionTranslation,
            thumbnail: characterThumb
          };
          return translatedCharacters;
        })
      );
      return { translated: true, translatedCharacters };
    } catch (error) {
      // Se houver erro na tradução, retorna o personagem original não traduzido
      console.error('Não foi possível traduzir os dados');
      const untranslatedCharacters = extractCharacters(charactersData);
      return { translated: false, untranslatedCharacters };
    }
  }
}
