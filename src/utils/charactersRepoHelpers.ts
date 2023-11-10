import { MysqlDataSource } from '../config/database';
import CharacterModel from '../library/CharacterInterface';
import { Character } from '../entity/Character';

const repository = MysqlDataSource.getRepository(Character);

export function identical(object: CharacterModel, objectRegistered: Character) {
  return (
    object.enName === objectRegistered.enName &&
    object.description === objectRegistered.description &&
    object.thumb === objectRegistered.thumb
  );
}

export async function createAndSave(charactersArray: Array<CharacterModel>) {
  let newCharacters: Array<CharacterModel> = [];

  newCharacters = charactersArray.map((character) => {
    const newCharacter = new Character();
    newCharacter.idMarvel = character.idMarvel;
    newCharacter.enName = character.enName;
    newCharacter.ptName = character.ptName;
    newCharacter.description = character.description;
    newCharacter.thumb = character.thumb;
    newCharacter.isTranslated = character.isTranslated;
    newCharacter.lastUpdate = new Date();

    return newCharacter;
  });
  await repository.manager.save(newCharacters);
}

export async function update(objectsToUpdate: Array<CharacterModel>) {
  const updatedObjects = objectsToUpdate.map(async (character) => {
    await MysqlDataSource.createQueryBuilder()
      .update(Character)
      .set({
        enName: character.enName,
        ptName: character.ptName,
        description: character.description,
        thumb: character.thumb,
        isTranslated: character.isTranslated,
        lastUpdate: new Date()
      })
      .where('idMarvel = :idMarvel', { idMarvel: character.idMarvel })
      .execute();
  });
  await Promise.all(updatedObjects);
}

export async function findOneByMarvelId(idMarvel: number): Promise<Character> {
  const characterRegistered = await repository.findOne({
    where: { idMarvel: idMarvel }
  });
  return characterRegistered;
}
