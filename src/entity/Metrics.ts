import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';

import { Character } from './Character';
import { User } from './User';

@Entity('metrics')
export class Metrics {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User) // Define uma relação com a entidade User
  @JoinColumn({ name: 'user_id' }) // Define a coluna de referência em Metrics
  user: User; // Isso representa a relação com a tabela User

  @ManyToOne(() => Character) // Define uma relação com a entidade Character
  @JoinColumn({ name: 'character_id' }) // Define a coluna de referência em Metrics
  character: Character; // Isso representa a relação com a tabela Character

  @Column({ type: 'int' })
  clicks: number;
}
