import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';

import { Character } from './Character';
import { User } from './User';

/**
 * Entidade com informações relacionadas a métricas que relacionam o usuário a personagens
 */
//TODO alterar nome dessa entidade para um mais adequado
@Entity('metrics')
export class Metrics {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @Column({ type: 'int' })
  clicks: number;
}
