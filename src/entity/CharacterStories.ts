import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import Character from './Character';
import Story from './Story';

@Entity('character_stories')
export class CharacterStories {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @ManyToOne(() => Story)
  @JoinColumn({ name: 'story_id' })
  story: Story;
}
