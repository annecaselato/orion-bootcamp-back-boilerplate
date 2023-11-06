import Character from './CharacterInterface';

// apenas extrai name, description e formata thumbnail
export function extractUntranslatedData(charactersData): Array<Character> {
  const untranslatedCharacters = charactersData.map((character): Character => {
    const characterName = character.name;
    const characterDescription = character.description;
    const characterThumb: string = `${character.thumbnail.path}.jpg`;

    return {
      name: characterName,
      description: characterDescription,
      thumbnail: characterThumb
    };
  });
  return untranslatedCharacters;
}
