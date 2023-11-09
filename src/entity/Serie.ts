import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate
  } from 'typeorm';
  
  @Entity('series')
  export class Serie {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int' })
    idMarvel: number;
  
    @Column({ type: 'varchar', length: 128 })
    title: string;
  
    @Column({ type: 'varchar', length: 2048, default: null })
    description: string;
  
    @Column({ type: 'varchar', length: 256, default: null })
    thumb: string;
  
    @Column({ default: false })
    isTranslated: boolean;
  
    @Column({ update: false })
    createdAt: Date;

    @BeforeInsert()
    createdAtDate() {
      this.createdAt = new Date();
    }
  
    @Column()
    lastUpdate: Date;
  
    @BeforeUpdate()
    updateDates() {
      this.lastUpdate = new Date();
    }
  }
  