import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';

import { User } from './User';
import { Series } from './Series';

/**
 * Entidade com informações de cliques por usuário por card de séries.
 */
@Entity('user_series_clicks')
export class UserSeriesClicks {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Series)
  @JoinColumn({ name: 'series_id' })
  series: Series;

  @Column({ type: 'int' })
  clicks: number;
}
