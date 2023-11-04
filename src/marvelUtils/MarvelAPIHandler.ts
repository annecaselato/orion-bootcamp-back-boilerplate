import { Request, Response } from 'express';
import axios from 'axios';
import md5 from 'md5';
import MarvelAPITranslatorHandler from './MarvelAPITranslatorHandler';

interface MarvelAPIParams {
  offset: number;
  limit: number;
  ts: number;
  apikey: string;
  hash: string;
}

interface MarvelCharactersProperties {
  name: string;
  description: string;
  thumbnail: string;
}

export default class MarvelAPIHandler {
  private timestamp: number = Date.now();

  private hashGenarator = async (): Promise<string> => {
    return md5(
      this.timestamp +
        process.env.MARVEL_PRIVATE_KEY +
        process.env.MARVEL_API_KEY
    );
  };

  private baseURL = (): string => {
    return 'https://gateway.marvel.com/v1/public';
  };

  private maxMarvelAPILimit = (): number => {
    return 100;
  };

  private cardsPerPage = (): number => {
    return 9;
  };

  private maximunValidPage = (): number => {
    return 174;
  };

  async getCharacters(
    req: Request,
    res: Response,
    page: number = 1
  ): Promise<void> {
    const hash = await this.hashGenarator();
    try {
      const validPage = Math.min(this.maximunValidPage(), page); // evita retornar objeto vazio
      const offset = (validPage - 1) * this.cardsPerPage(); // se page === 1, offset = 0
      const limit = Math.min(
        this.maxMarvelAPILimit(),
        validPage * this.cardsPerPage()
      ); // valor máximo de 100 no limit

      const response = await axios.get<MarvelAPIParams>(
        `${this.baseURL()}/characters`,
        {
          params: {
            offset: offset,
            limit: limit,
            ts: this.timestamp,
            apikey: process.env.MARVEL_API_KEY,
            hash: hash
          }
        }
      );

      //res.json(response.data);
      const characterData: Array<MarvelCharactersProperties> =
        await response.data.data.results;
      const marvelAPITranslator: MarvelAPITranslatorHandler =
        new MarvelAPITranslatorHandler();

      const characters: Array<MarvelCharactersProperties> = characterData.map(
        (character): MarvelCharactersProperties => {
          const characterName = character.name;
          const characterDescription = character.description;
          const characterThumb = character.thumbnail;
          return {
            name: characterName,
            description: characterDescription,
            thumbnail: characterThumb
          };
        }
      );

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
