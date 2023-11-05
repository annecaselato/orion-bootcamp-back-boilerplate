import md5 from 'md5';
import MarvelCharactersProperties from '../library/charactersPropertiesInterface';

export const hashGenarator = async (timestamp: number): Promise<string> => {
  return md5(
    timestamp + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_API_KEY
  );
};

export function extractWantedData(
  characterers: Array<MarvelCharactersProperties>
): Array<MarvelCharactersProperties> {
  const extractedCharacters: Array<MarvelCharactersProperties> =
    characterers.map((character): MarvelCharactersProperties => {
      const characterName = character.name;
      const characterDescription = character.description;
      const characterThumb = character.thumbnail;
      return {
        name: characterName,
        description: characterDescription,
        thumbnail: characterThumb
      };
    });
  return extractedCharacters;
}
