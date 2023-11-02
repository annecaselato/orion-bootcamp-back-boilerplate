import { Request, Response } from 'express';
import axios from 'axios';
import md5 from 'md5';
import MarvelAPITranslatorHandler from './MarvelAPITranslatorHandler';

const PUBLIC_KEY = 'd6935a5ba12ffc48bed7b437e35f8aca';
const PRIVATE_KEY = '4f8a055b0352f0f2b17b611f9a9208398493b5b4';
const baseURL = 'https://gateway.marvel.com/v1/public';

export default class MarvelAPIHandler {
  static async getCharacters(req: Request, res: Response, page: number = 1) {
    try {
      const offset = (page - 1) * 9;
      const limit = Math.min(100, page * 9); // valor máximo de 100 no limit

      const timestamp = Date.now();
      const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
      const response = await axios.get(`${baseURL}/characters`, {
        params: {
          offset: offset,
          limit: limit,
          ts: timestamp,
          apikey: PUBLIC_KEY,
          hash: hash
        }
      });

      const characterData = response.data.data.results;

      const marvelAPITranslator = new MarvelAPITranslatorHandler();

      const charactersTranslated = await Promise.all(
        characterData.map(async (character) => {
          try {
            const translatedCharacter =
              await marvelAPITranslator.translateCharacter(character);
            return translatedCharacter;
          } catch (error) {
            console.error('Erro ao traduzir:', error);
            // Se houver erro na tradução, retorna o personagem original não traduzido
            return character;
          }
        })
      );

      res.json(charactersTranslated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
