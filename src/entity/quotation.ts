import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { Product } from './product';

@Entity({ name: 'quotations' })
export class Quotation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => User, (user) => user.quotations)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @ManyToOne(() => Product, (product) => product.quotations)
  @JoinColumn({ name: 'product_id' })
  product_id: Product;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
