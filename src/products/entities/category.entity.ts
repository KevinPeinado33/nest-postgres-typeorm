import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn, 
  UpdateDateColumn } from 'typeorm';

@Entity({ name: 'categorys' })
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'varchar', length: 255 })
  name: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createAt: Date;
  
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateAt: Date;

}
