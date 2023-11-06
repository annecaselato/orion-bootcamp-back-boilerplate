import Characters from './CharactersInterface';

// apenas extrai name, description e formata thumbnail
export function extractUntranslatedData(charactersData): Array<Characters> {
  const untranslatedCharacters = charactersData.map((character): Characters => {
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
