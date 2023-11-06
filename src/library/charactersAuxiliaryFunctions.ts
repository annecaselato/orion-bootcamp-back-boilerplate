import MarvelCharactersProperties from './charactersPropertiesInterface';

// apenas extrai name, description e thumb
export function extractUntranslatedData(
  charactersData: Array<MarvelCharactersProperties>
): Array<MarvelCharactersProperties> {
  const untranslatedCharacters: Array<MarvelCharactersProperties> =
    charactersData.map((character): MarvelCharactersProperties => {
      const characterName = character.name;
      const characterDescription = character.description;
      const characterThumb = character.thumbnail;
      return {
        name: characterName,
        description: characterDescription,
        thumbnail: characterThumb
      };
    });
  return untranslatedCharacters;
}
