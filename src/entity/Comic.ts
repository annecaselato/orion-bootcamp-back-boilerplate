import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate
  } from 'typeorm';
  
  @Entity('comics')
  export class Comic {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int' })
    idMarvel: number;
  
    @Column({ type: 'varchar', length: 128 })
    enTitle: string;
  
    @Column({ type: 'varchar', length: 128 })
    ptTitle: string;
  
    @Column({ type: 'varchar', length: 2048, default: null })
    description: string;
  
    @Column({ type: 'varchar', length: 256, default: null })
    thumb: string;
  
    @Column({ default: false })
    isTranslated: boolean;
  
    @Column({ update: false })
    createdAt: Date;
  
    @Column()
    lastUpdate: Date;
  
    @BeforeInsert()
    createdAtDate() {
      this.createdAt = new Date();
    }
  
    @BeforeUpdate()
    updateDates() {
      this.lastUpdate = new Date();
    }
  }
  