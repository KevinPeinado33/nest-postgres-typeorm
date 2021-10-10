import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany } from 'typeorm';

import { Product } from './product.entity';

@Entity({ name: 'brands' })
export class Brand {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'varchar', length: 255 })
  name: string;

  @Column({ type:'varchar', length: 255 })
  image: string;

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

  @OneToMany( 
    () => Product, 
    ( product ) => product.brand 
  )
  products: Product[];

}
