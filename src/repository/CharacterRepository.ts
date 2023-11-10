import * as repoAuxiliary from '../utils/charactersRepoHelpers';
import CharacterModel from 'library/CharacterInterface';

export default class CharacterRepository {
  async updateOrSave(characters: Array<CharacterModel>): Promise<void> {
    const objectsToSave: Array<CharacterModel> = [];
    const objectsToUpdate: Array<CharacterModel> = [];

    for (const character of characters) {
      const characterRegistered = await repoAuxiliary.findOneByMarvelId(
        character.idMarvel
      );

      if (!characterRegistered) {
        objectsToSave.push(character);
      } else if (repoAuxiliary.identical(character, characterRegistered)) {
        return;
      } else {
        objectsToUpdate.push(character);
      }
    }

    await Promise.all(characters);
    if (objectsToSave.length) {
      await repoAuxiliary.createAndSave(objectsToSave);
    }
    if (objectsToUpdate.length) {
      await repoAuxiliary.update(objectsToUpdate);
    }
  }
}
