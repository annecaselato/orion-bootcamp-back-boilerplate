import { MysqlDataSource } from '../config/database';
import { Request, Response } from 'express';
import { Character } from '../entity/Character';
import CharacterModel from 'library/CharacterInterface';

export default class CharacterRepository {
  private repository = MysqlDataSource.getRepository(Character);

  constructor() {}

  async createAndSave(
    untranslatedCharacters: Array<CharacterModel>,
    translatedCharacters?: Array<CharacterModel>,
    req?: Request,
    res?: Response
  ): Promise<void> {
    const characters: CharacterModel[] = translatedCharacters
      ? translatedCharacters
      : untranslatedCharacters;

    characters.forEach(async (character: CharacterModel) => {
      const newCharacter = new Character();
      newCharacter.description = character.description;
      newCharacter.thumb = character.thumbnail;
      newCharacter.pt_name = character.name;

      await this.repository.manager.save(newCharacter);
    });
  }
}
