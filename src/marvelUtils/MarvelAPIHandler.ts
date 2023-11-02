import { Request, Response } from 'express';
import axios from 'axios';
import md5 from 'md5';

const apikey = 'cf74744cec6c801980e3c73b4b00134b';
const privateKey = '78b87919ce0eed1540a945af0fabfb8aa7215f9a';
const baseURL = 'https://gateway.marvel.com/v1/public';

export default class MarvelAPIHandler {
  static async getCharacters(
    req: Request,
    res: Response,
    limit: number = 20,
    offset: number = 0
  ) {
    try {
      const timestamp = Date.now();
      const hash = md5(timestamp + privateKey + apikey);
      const response = await axios.get(`${baseURL}/characters`, {
        params: {
          offset: offset,
          limit: limit,
          ts: timestamp,
          apikey: apikey,
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

      //   console.log(characterData.length);

      //   const characterName = characterData.name;
      //   const characterDescription = characterData.description;
      //   const characterThumb = characterData.thumbnail;

      //   res.json({
      //     name: characterName,
      //     description: characterDescription,
      //     thumbnail: characterThumb
      //   });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
