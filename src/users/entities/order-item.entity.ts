import {
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Entity,
    Column,
    ManyToOne
  } from 'typeorm';

import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'order-item' })
export class OrderItem {

    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;
  
    @UpdateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;
  
    @Column({ type: 'int'})
    quantity: number;

    @ManyToOne(() => Product)
    product: Product;

    @ManyToOne(() => Order, ( order ) => order.items)
    order: Order;
}