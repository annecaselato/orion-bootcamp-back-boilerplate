import { Translate } from '@google-cloud/translate/build/src/v2';
import 'dotenv/config';

// constantes correspondentes, respectivamente, à chave pública e ID do projeto na API Google Cloud Translate
const [apiKey, projectId]: [string, string] = [
  process.env.GOOGLE_TRANSLATE_API_KEY,
  process.env.GOOGLE_TRANSLATE_PROJECT_ID
];

// Instância da classe Translate do Google Cloud Translate, construída a partir do número do ID e chave pública do projeto na API
const translateClient = new Translate({ projectId, key: apiKey });

/**
 * Classe que implementa operações de tradução de conteúdo utilizando a API Google Cloud Translate
 */
export default class TranslationAPIService {
  /**
   * @async - Função assíncrona responsável por envio de requisições de tradução de dados para API Google Cloud Translate
   *
   * @param {string} property - Nome da propriedade do objeto a ser traduzida
   * @param {string} propertyValue - valor a ser traduzido da propriedade informada
   * @returns {Promise<string>} - retorna promise string a ser resolvida quando da tradução dos dados, ou undefined em caso de erro
   */
  async getTranslation(
    property: string,
    propertyValue: string
  ): Promise<string> {
    try {
      const [translation] = await translateClient.translate(
        propertyValue,
        'pt'
      );
      return translation;
    } catch (error) {
      console.error(`Não foi possível traduzir ${property}.`);
    }
  }
}
