import { Request, Response } from 'express';
import axios from 'axios';
import md5 from 'md5';
import MarvelAPITranslatorHandler from './MarvelAPITranslatorHandler';

const baseURL = (): string => {
  return 'https://gateway.marvel.com/v1/public';
};

const maxMarvelAPILimit = (): number => {
  return 100;
};

const cardsPerPage = (): number => {
  return 9;
};

const maximunValidPage = (): number => {
  return 174;
};

export default class MarvelAPIHandler {
  static async getCharacters(req: Request, res: Response, page: number = 1) {
    try {
      const validPage = Math.min(maximunValidPage(), page); // evita retornar objeto vazio
      const offset = (validPage - 1) * cardsPerPage(); // se page === 1, offset = 0
      const limit = Math.min(maxMarvelAPILimit(), validPage * cardsPerPage()); // valor máximo de 100 no limit

      const timestamp = Date.now();
      const hash = md5(
        timestamp + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_API_KEY
      );
      const response = await axios.get(`${baseURL()}/characters`, {
        params: {
          offset: offset,
          limit: limit,
          ts: timestamp,
          apikey: process.env.MARVEL_API_KEY,
          hash: hash
        }
      });

      //res.json(response.data);

      const characterData = await response.data.data.results;
      const marvelAPITranslator = new MarvelAPITranslatorHandler();

      const characters = characterData.map((character) => {
        const characterName = character.name;
        const characterDescription = character.description;
        const characterThumb = character.thumbnail;
        return {
          name: characterName,
          description: characterDescription,
          thumbnail: characterThumb
        };
      });

      const charactersTranslated = await Promise.all(
        characterData.map(async (character) => {
          try {
            const translatedCharacter =
              await marvelAPITranslator.translateCharacter(character);
            return translatedCharacter;
          } catch (error) {
            console.error('Erro ao traduzir:', error);
            // Se houver erro na tradução, retorna o personagem original não traduzido
            res.status(303).json({
              date: new Date(),
              status: true,
              data: `Erro ao traduzir: ${error}`,
              characters
            });
          }
        })
      );

      res
        .status(200)
        .json({ date: new Date(), status: true, data: charactersTranslated });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        date: new Date(),
        status: false,
        data: 'Erro interno do servidor'
      });
    }
  }
}
