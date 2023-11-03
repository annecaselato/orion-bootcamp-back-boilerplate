import { Request, Response } from 'express';
import axios from 'axios';
import md5 from 'md5';
import { Link } from 'swagger-jsdoc';

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

      res.json(characters);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
