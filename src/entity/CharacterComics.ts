import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import Character from './Character';
import Comic from './Comic';

@Entity('character_comics')
export class CharacterComics {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @ManyToOne(() => Comic)
  @JoinColumn({ name: 'comic_id' })
  comic: Comic;
}