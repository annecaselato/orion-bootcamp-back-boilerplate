import CharacterModel from '../library/CharacterInterface';

export const imageNotAviable = (str: string): boolean => {
  return (
    str == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
  );
};

// apenas extrai name, description e thumb
export function extractCharacters(charactersData): Array<CharacterModel> {
  const untranslatedCharacters = charactersData.map(
    (character): CharacterModel => {
      const characterId = character.id;
      const characterName = character.name;
      const characterDescription = character.description;
      const characterThumb = character.thumbnail;
      return {
        idMarvel: characterId,
        enName: characterName,
        ptName: 'not aviable',
        description: characterDescription,
        thumb: characterThumb,
        isTranslated: false
      };
    }
  );
  return untranslatedCharacters;
}
