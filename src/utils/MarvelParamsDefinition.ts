import { format, subDays } from 'date-fns';
import md5 from 'md5';
import 'dotenv/config';

/**
 * Classe auxiliar que fornece valores constantes a serem utilizados como parâmetros para requisição de dados à API da Marvel
 */
export default class MarvelParamsDefinition {
  /**
   * Função geradora que retorna valores a serem utilizados como offset na requisição.
   * Primeiro valor gerado é \'0' e demais \'100', considerando limite máximo de retorno de dados da API
   */
  *offsetter() {
    let value = 0;
    while (true) {
      yield value;
      value += this.maxMarvelAPILimit();
    }
  }

  /**
   * Método que retorna valor numérico correspondente ao número de milissegundos desde 1º de janeiro de 1970, representando timestamp de data e hora atuais
   * @returns {number}  - valor numérico que representa data e hora atuais em milissegundos
   */
  getTimestamp(): number {
    return Date.now();
  }

  /**
   * Método que retorna URL Base da plataforma a ser utilizada na requisição
   * @returns {string} - URL Base Marvel Requisições GET
   */
  baseURL(): string {
    return process.env.MARVEL_URL_BASE;
  }

  /**
   * Método que retorna chave pública de cadastro na API a ser utilizada na requisição
   * @returns {string} - chave pública Marvel
   */
  apikey(): string {
    return process.env.MARVEL_API_KEY;
  }

  /**
   * Método que retorna valor máximo de dados a serem retornados pela API Marvel a cada requisição.
   * Valor definido como sendo o máximo permitido pela própria API
   *
   * @returns {number} - número máximo de dados retornados por requisição
   */
  maxMarvelAPILimit(): number {
    return 100;
  }

  /**
   * Método que retorna string em formato de data correspondente à data base a partir da qual os dados modificados devem ser retornados pela API da Marvel
   *
   * @param {number} daysInterval - número de dias a ser subtraído da data atual para cálculo da data base
   * @returns {strig} - string em formato de data correspondete à data base de atualização dos dados a serem retornados
   */
  modifiedsSince(daysInterval: number): string {
    const today = new Date();
    const daysAgoString: string = format(
      subDays(today, daysInterval),
      'yyyy-MM-dd'
    );
    return daysAgoString;
  }

  /**
   * Método gerador de hash de autorização a ser utilizada para realização das requisições à API da Marvel
   *
   * @param {number} timestamp - valor numérico que representa data e hora atuais em milissegundos
   * @returns {string} - string correspondente à criptografia da união de timestamp, chave pública e chave privada da API, considerando algoritmo md5
   */
  hashGenerator(timestamp: number): string {
    return md5(
      timestamp + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_API_KEY
    );
  }
}
