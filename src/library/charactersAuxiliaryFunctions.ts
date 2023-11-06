import CharacterModel from './CharacterInterface';

// apenas extrai name, description e formata thumbnail
export function extractUntranslatedData(charactersData): Array<CharacterModel> {
  const untranslatedCharacters = charactersData.map((character): CharacterModel => {
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
