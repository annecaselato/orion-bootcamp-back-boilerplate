import { MysqlDataSource } from '../config/database';
import identical from '../utils/charactersRepoHelpers';
import { Character } from '../entity/Character';
import CharacterModel from 'library/CharacterInterface';

export default class CharacterRepository {
  private repository = MysqlDataSource.getRepository(Character);

  async updateOrSave(characters: Array<CharacterModel>): Promise<void> {
    characters.forEach(async (character: CharacterModel) => {
      const characterRegistered = await this.findOneByMarvelId(
        character.idMarvel
      );

      if (!characterRegistered) {
        this.createAndSave(character);
      } else if (identical(character, characterRegistered)) {
        return;
      } else {
        MysqlDataSource.createQueryBuilder()
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
      }
    });
  }

  private async createAndSave(
    character?: CharacterModel,
    characters?: Array<CharacterModel>
  ): Promise<void> {
    if (characters) {
      characters.forEach((character: CharacterModel) => {
        this.save(character);
      });
    }

    if (character) {
      this.save(character);
    }
  }

  private async save(character: CharacterModel): Promise<void> {
    const newCharacter = new Character();
    newCharacter.idMarvel = character.idMarvel;
    newCharacter.enName = character.enName;
    newCharacter.ptName = character.ptName;
    newCharacter.description = character.description;
    newCharacter.thumb = character.thumb;
    newCharacter.isTranslated = character.isTranslated;
    newCharacter.lastUpdate = new Date();
    await this.repository.manager.save(newCharacter);
  }

  private async findOneByMarvelId(idMarvel: number): Promise<Character> {
    const characterRegistered = await this.repository.findOne({
      where: {
        idMarvel: idMarvel
      }
    });
    return characterRegistered;
  }
}
