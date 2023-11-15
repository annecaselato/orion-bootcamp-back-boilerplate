import { Translate } from '@google-cloud/translate/build/src/v2';
import CategoryModel from '../library/CategoryInterface';
import 'dotenv/config';

const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY; //Key da API google Translate
const projectId = process.env.GOOGLE_TRANSLATE_PROJECT_ID; // ID do projeto google Translate
const translateClient = new Translate({ projectId, key: apiKey });

// avalia tradução de cada propriedade individualmente
// 'isTranslated: true' apenas se todos os atributos não nulos forem traduzidos
export async function extractAndTryTotranslate(
  object,
  categoryAlias
): Promise<CategoryModel> {
  let translated: boolean = true;
  let description: string = '';

  try {
    if (object.description) {
      const [descriptionTranslation] = await translateClient.translate(
        object.description,
        'pt'
      );
      description = descriptionTranslation;
    }
  } catch (error) {
    description = object.description;
    translated = false;
    console.error(
      `Não foi possível traduzir description do objeto: ${categoryAlias} IdMarvel: `,
      object.id,
      '\n' + error
    );
  }

  const formattedObject: CategoryModel = {
    idMarvel: object.id,
    description: description,
    thumb: thumbFormatter(object),
    isTranslated: translated
  };

  if (object.name) {
    try {
      const [nameTranslation] = await translateClient.translate(
        object.name,
        'pt'
      );
      formattedObject.enName = object.name;
      formattedObject.ptName = nameTranslation;
    } catch (error) {
      formattedObject.enName = object.name;
      formattedObject.ptName = 'not available';
      translated = false;
      console.error(
        `Não foi possível traduzir o nome do objeto: ${categoryAlias} IdMarvel: `,
        object.id,
        '\n' + error
      );
    }
  } else {
    try {
      const [titleTranslation] = await translateClient.translate(
        object.title,
        'pt'
      );
      formattedObject.enTitle = object.title;
      formattedObject.ptTitle = titleTranslation;
    } catch (error) {
      formattedObject.enTitle = object.title;
      formattedObject.ptTitle = 'not available';
      translated = false;
      console.error(
        `Não foi possível traduzir o título do objeto: ${categoryAlias} IdMarvel: `,
        object.id,
        '\n' + error
      );
    }
  }
  formattedObject.isTranslated = translated;
  return formattedObject;
}

export function thumbFormatter(object): string {
  let thumb: string = '';

  // stories não possui path
  if ((object.resourceURI as string).includes('stories')) {
    const thumbnail: string | undefined = object.thumbnail;
    thumb =
      thumbnail && !thumbnail.includes('not_available')
        ? `${thumbnail}.jpg`
        : '';
  } else {
    const thumbnail: string = object.thumbnail.path;
    thumb =
      thumbnail && !thumbnail.includes('not_available')
        ? `${thumbnail}.jpg`
        : '';
  }
  return thumb;
}
