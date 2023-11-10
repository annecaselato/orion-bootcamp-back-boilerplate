import { Translate } from '@google-cloud/translate/build/src/v2';
import CharacterModel from '../library/CharacterInterface';
import { extractCharacters, thumbFomatter } from '../utils/formatHelpers';
import 'dotenv/config';

const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY; //Key da API google Translate
const projectId = process.env.GOOGLE_TRANSLATE_PROJECT_ID; // ID do projeto google Translate

export default class FormatHandler {
  translateClient = new Translate({ projectId, key: apiKey });

  async extractAndTryTotranslate(charactersData): Promise<CharacterModel[]> {
    try {
      const formattedCharacters: CharacterModel[] = await Promise.all(
        charactersData.map(async (character) => {
          const [nameTranslation]: string | undefined =
            await this.translateClient.translate(character.name, 'pt');

          const [descriptionTranslation]: string | undefined =
            await this.translateClient.translate(character.description, 'pt');

          const path: string = character.thumbnail.path;

          const characterThumb: string | undefined = thumbFomatter(path);

          const translated: boolean = true;
          const idMarvel: number = character.id;
          const enName: string = character.name;

          const formattedCharacters: CharacterModel = {
            idMarvel: idMarvel,
            enName: enName,
            ptName: nameTranslation,
            description: descriptionTranslation,
            thumb: characterThumb,
            isTranslated: translated
          };
          return formattedCharacters;
        })
      );

      return formattedCharacters;
    } catch (error) {
      // Se houver erro na tradução, retorna o personagem original não traduzido
      console.error('Não foi possível traduzir os dados');
      const extractedCharacters: CharacterModel[] =
        extractCharacters(charactersData);

      return extractedCharacters;
    }
  }

  // criterios de filtro a serem definidos na proxima sprint
  private filterValidCharacters(
    formattedCharacters: Array<CharacterModel>
  ): Array<CharacterModel> {
    const filteredArray = formattedCharacters.filter((character) => {
      return (
        (character.enName || character.ptName) &&
        character.description &&
        character.thumb
      );
    });
    return filteredArray;
  }
}
