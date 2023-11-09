import CharacterModel from '../library/CharacterInterface';
import { Character } from '../entity/Character';

export default function identical(
  character: CharacterModel,
  characterRegistered: Character
) {
  if (
    character.enName === characterRegistered.enName &&
    character.description === characterRegistered.description &&
    character.thumb === characterRegistered.thumb
  ) {
    return true;
  } else {
    return false;
  }
}
